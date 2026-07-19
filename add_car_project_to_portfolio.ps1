param(
    [string]$RepoPath = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

function Write-Utf8NoBom {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Content
    )

    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

function Read-NormalizedText {
    param([Parameter(Mandatory = $true)][string]$Path)

    return ([System.IO.File]::ReadAllText($Path) -replace "`r`n", "`n")
}

$RepoPath = (Resolve-Path $RepoPath).Path
$PortfolioPage = Join-Path $RepoPath "app\portfolio-page.tsx"
$ProjectCard = Join-Path $RepoPath "app\project-card.tsx"
$NextConfig = Join-Path $RepoPath "next.config.ts"

foreach ($file in @($PortfolioPage, $ProjectCard, $NextConfig)) {
    if (-not (Test-Path $file)) {
        throw "Required file not found: $file`nRun this script from the portfolio repository root, or pass -RepoPath."
    }
}

Write-Host "Updating portfolio project content..." -ForegroundColor Cyan

$portfolio = Read-NormalizedText $PortfolioPage

$oldImport = 'import { siteContent, type Locale } from "./content";'
$newImport = 'import { siteContent, type Locale, type Project } from "./content";'

if ($portfolio.Contains($oldImport)) {
    $portfolio = $portfolio.Replace($oldImport, $newImport)
}
elseif (-not $portfolio.Contains($newImport)) {
    throw "Could not find the expected content import in app/portfolio-page.tsx."
}

if (-not $portfolio.Contains('"Car Price ML Benchmark"')) {
    $projectMarker = 'const projectResults: Record<Locale, Record<string, string>> = {'

    if (-not $portfolio.Contains($projectMarker)) {
        throw "Could not find the project results marker in app/portfolio-page.tsx."
    }

    $carProjectBlock = @'
const carProject: Record<Locale, Project> = {
  en: {
    number: "06",
    title: "Car Price ML Benchmark",
    label: "Supervised Learning",
    description:
      "An end-to-end benchmark for predicting vehicle listing prices with leakage-safe preprocessing, feature engineering, cross-validation, and model comparison.",
    outcome:
      "XGBoost achieved an R² of 0.9627 with a mean absolute error of approximately $1,328.",
    technologies: ["Python", "XGBoost", "scikit-learn", "Feature Engineering"],
    href: "https://github.com/naor7749/car-price-ml-benchmark",
  },
  he: {
    number: "06",
    title: "Car Price ML Benchmark",
    label: "למידה מונחית",
    description:
      "בנצ'מרק מקצה לקצה לחיזוי מחירי רכבים, עם preprocessing ללא דליפת מידע, הנדסת פיצ'רים, Cross Validation והשוואת מודלים.",
    outcome:
      "מודל XGBoost השיג R² של 0.9627 ושגיאה מוחלטת ממוצעת של כ-1,328 דולר.",
    technologies: ["Python", "XGBoost", "scikit-learn", "Feature Engineering"],
    href: "https://github.com/naor7749/car-price-ml-benchmark",
  },
};

'@

    $portfolio = $portfolio.Replace($projectMarker, $carProjectBlock + $projectMarker)
}

$contentLine = '  const content = siteContent[locale];'
$projectsLine = '  const projects = [...content.projects, carProject[locale]];'

if (-not $portfolio.Contains($projectsLine)) {
    if (-not $portfolio.Contains($contentLine)) {
        throw "Could not find the locale content line in app/portfolio-page.tsx."
    }

    $portfolio = $portfolio.Replace(
        $contentLine,
        $contentLine + "`n" + $projectsLine
    )
}

$oldMap = '{content.projects.map((project) => ('
$newMap = '{projects.map((project) => ('

if ($portfolio.Contains($oldMap)) {
    $portfolio = $portfolio.Replace($oldMap, $newMap)
}
elseif (-not $portfolio.Contains($newMap)) {
    throw "Could not find the projects map in app/portfolio-page.tsx."
}

Write-Utf8NoBom -Path $PortfolioPage -Content $portfolio

Write-Host "Adding the project visualization..." -ForegroundColor Cyan

$projectCardText = Read-NormalizedText $ProjectCard

if (-not $projectCardText.Contains('"Car Price ML Benchmark"')) {
    $visualMapStartText = 'const projectVisuals: Record<string, VisualConfig> = {'
    $visualMapStart = $projectCardText.IndexOf($visualMapStartText)

    if ($visualMapStart -lt 0) {
        throw "Could not find the project visuals map in app/project-card.tsx."
    }

    $visualMapEnd = $projectCardText.IndexOf("`n};", $visualMapStart)

    if ($visualMapEnd -lt 0) {
        throw "Could not find the end of the project visuals map."
    }

    $carVisualBlock = @'
  "Car Price ML Benchmark": {
    type: "image",
    src: "https://raw.githubusercontent.com/naor7749/car-price-ml-benchmark/main/figures/actual_vs_predicted.png",
    alt: {
      en: "Scatter plot comparing actual and predicted vehicle prices for the XGBoost holdout evaluation",
      he: "תרשים פיזור המשווה בין מחירי רכב אמיתיים למחירים שחזה מודל XGBoost בקבוצת הבדיקה",
    },
  },

'@

    $projectCardText = $projectCardText.Insert($visualMapEnd + 1, $carVisualBlock)
}

Write-Utf8NoBom -Path $ProjectCard -Content $projectCardText

Write-Host "Allowing the remote GitHub image in Next.js..." -ForegroundColor Cyan

$nextConfigContent = @'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/naor7749/car-price-ml-benchmark/**",
      },
    ],
  },
};

export default nextConfig;
'@

Write-Utf8NoBom -Path $NextConfig -Content ($nextConfigContent + "`n")

Write-Host "Running production build..." -ForegroundColor Cyan
Push-Location $RepoPath

try {
    npm run build

    Write-Host "Committing and pushing changes..." -ForegroundColor Cyan
    git add app/portfolio-page.tsx app/project-card.tsx next.config.ts

    $changes = git diff --cached --name-only
    if (-not $changes) {
        Write-Host "No new changes to commit. The project may already be present." -ForegroundColor Yellow
    }
    else {
        git commit -m "Add car price ML benchmark to portfolio"
        git push
    }
}
finally {
    Pop-Location
}

Write-Host ""
Write-Host "Done. Vercel should deploy the new commit automatically." -ForegroundColor Green
