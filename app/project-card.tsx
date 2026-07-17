"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";
import type { Locale, Project } from "./content";

type LocalizedText = Record<Locale, string>;

type VisualConfig =
  | {
      type: "image";
      src: string;
      alt: LocalizedText;
    }
  | {
      type: "iframe";
      src: string;
      title: LocalizedText;
      fullHref: string;
    }
  | {
      type: "pipeline";
      steps: Record<Locale, string[]>;
      caption: LocalizedText;
    };

const projectVisuals: Record<string, VisualConfig> = {
  "ICD-10-GM Embedding Benchmark": {
    type: "image",
    src: "/projects/icd-benchmark.png",
    alt: {
      en: "Bar chart comparing Patient Hit at 10 across four embedding models",
      he: "תרשים עמודות המשווה Patient Hit at 10 בין ארבעה מודלי embedding",
    },
  },
  "NBA Functional Archetypes": {
    type: "image",
    src: "/projects/nba-archetypes.png",
    alt: {
      en: "Correlation heatmap comparing functional and traditional roster diversity",
      he: "מפת חום המשווה מגוון תפקודי ומגוון עמדות מסורתי",
    },
  },
  "Global Life Expectancy Analysis": {
    type: "iframe",
    src: "/interactive/life-expectancy.html",
    title: {
      en: "Interactive schooling and life expectancy visualization",
      he: "גרף אינטראקטיבי של שנות לימוד ותוחלת חיים",
    },
    fullHref:
      "https://naor7749.github.io/global-life-expectancy-analysis/interactive/schooling_vs_life_expectancy.html",
  },
  "Scientific Metadata Pipeline": {
    type: "pipeline",
    steps: {
      en: [
        "Journal issues",
        "Article discovery",
        "Metadata extraction",
        "44-column schema",
        "Validated Excel output",
      ],
      he: [
        "גיליונות כתבי עת",
        "איתור מאמרים",
        "חילוץ מטא-דאטה",
        "מבנה של 44 עמודות",
        "קובץ Excel בדוק",
      ],
    },
    caption: {
      en: "3,305 unique articles processed with automatic checkpoints and CI-backed tests.",
      he: "3,305 מאמרים ייחודיים עובדו עם שמירות ביניים אוטומטיות ובדיקות CI.",
    },
  },
  "Glasses Classification - CNN": {
    type: "image",
    src: "/projects/glasses-classification.png",
    alt: {
      en: "Comparison of EfficientNetV2B0 and MobileNetV3Small",
      he: "השוואת ביצועים בין EfficientNetV2B0 ל-MobileNetV3Small",
    },
  },
};

function ProjectVisual({
  visual,
  locale,
}: {
  visual: VisualConfig | undefined;
  locale: Locale;
}) {
  if (!visual) {
    return (
      <div className="project-modal-empty">
        {locale === "he" ? "המחשה תתווסף בהמשך" : "Visual coming soon"}
      </div>
    );
  }

  if (visual.type === "image") {
    return (
      <div className="project-modal-image">
        <Image
          src={visual.src}
          alt={visual.alt[locale]}
          fill
          priority
          sizes="(max-width: 900px) 94vw, 1100px"
        />
      </div>
    );
  }

  if (visual.type === "iframe") {
    return (
      <div className="project-modal-interactive">
        <iframe
          src={visual.src}
          title={visual.title[locale]}
          loading="eager"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
        <a
          className="project-modal-full-link"
          href={visual.fullHref}
          target="_blank"
          rel="noreferrer"
        >
          {locale === "he" ? "פתיחה במסך מלא ↗" : "Open full screen ↗"}
        </a>
      </div>
    );
  }

  return (
    <div className="project-modal-pipeline">
      <div className="modal-pipeline-list">
        {visual.steps[locale].map((step, index) => (
          <div className="modal-pipeline-item" key={step}>
            <span>{step}</span>
            {index < visual.steps[locale].length - 1 && (
              <b aria-hidden="true">↓</b>
            )}
          </div>
        ))}
      </div>
      <p>{visual.caption[locale]}</p>
    </div>
  );
}

export function ProjectCard({
  project,
  locale,
  technologiesLabel,
  githubLabel,
  result,
}: {
  project: Project;
  locale: Locale;
  technologiesLabel: string;
  githubLabel: string;
  result: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const visual = projectVisuals[project.title];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function openProject() {
    setIsOpen(true);
  }

  return (
    <>
      <article
        className={`project-card project-launch-card ${
          project.featured ? "featured" : ""
        }`}
        role="button"
        tabIndex={0}
        aria-label={
          locale === "he"
            ? `פתיחת המחשה עבור ${project.title}`
            : `Open visual for ${project.title}`
        }
        onClick={openProject}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject();
          }
        }}
      >
        <div className="project-card-top">
          <span className="project-number">{project.number}</span>
          <span className="project-label">{project.label}</span>
        </div>

        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>

        <div className="project-outcome">
          <span>{locale === "he" ? "תוצאה מרכזית" : "KEY RESULT"}</span>
          <strong>{result}</strong>
        </div>

        <div className="project-footer">
          <ul aria-label={`${technologiesLabel} ${project.title}`}>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>

          <span className="project-open-hint">
            {locale === "he" ? "לחיצה לפתיחה ↗" : "Click to expand ↗"}
          </span>
        </div>
      </article>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="project-modal-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <section
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              dir={locale === "he" ? "rtl" : "ltr"}
            >
              <header className="project-modal-header">
                <div>
                  <span className="project-modal-index">{project.number}</span>
                  <h2 id={titleId}>{project.title}</h2>
                </div>

                <button
                  type="button"
                  className="project-modal-close"
                  onClick={() => setIsOpen(false)}
                  aria-label={locale === "he" ? "סגירה" : "Close"}
                >
                  ×
                </button>
              </header>

              <div className="project-modal-body">
                <ProjectVisual visual={visual} locale={locale} />
              </div>

              <footer className="project-modal-footer">
                <p>{result}</p>

                <div>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${githubLabel}: ${project.title}`}
                    >
                      GitHub ↗
                    </a>
                  )}

                  <button type="button" onClick={() => setIsOpen(false)}>
                    {locale === "he" ? "סגירה" : "Close"}
                  </button>
                </div>
              </footer>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
