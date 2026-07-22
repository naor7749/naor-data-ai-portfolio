import { siteContent, type Locale, type Project } from "./content";
import { DocumentLanguage } from "./document-language";
import { ProjectCard } from "./project-card";
import { PortfolioAgent } from "./portfolio-agent";

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
      "בנצ'מרק מקצה לקצה לחיזוי מחירי רכבים, עם עיבוד נתונים ללא דליפת מידע, הנדסת מאפיינים, Cross Validation והשוואת מודלים.",
    outcome:
      "מודל XGBoost השיג R-squared של 0.9627 ושגיאה מוחלטת ממוצעת של כ-1,328 דולר.",
    technologies: ["Python", "XGBoost", "scikit-learn", "Feature Engineering"],
    href: "https://github.com/naor7749/car-price-ml-benchmark",
  },
};
const projectResults: Record<Locale, Record<string, string>> = {
  en: {
    "ICD-10-GM Embedding Benchmark":
      "BioLORD achieved 90.9% Patient Hit@10 on a synthetic benchmark of 1,000 patients, retrieving from 16,905 German ICD-10-GM codes.",
    "NBA Functional Archetypes":
      "In 2023-24, functional roster diversity correlated 0.83 with team win percentage, compared with 0.31 for traditional positions.",
    "Global Life Expectancy Analysis":
      "Schooling showed a Pearson correlation of 0.74 with life expectancy across 2,938 country-year observations.",
    "Scientific Metadata Pipeline":
      "Processed 3,305 unique scientific articles into a consistent 44-column dataset with automatic checkpoints and CI-backed tests.",
    "Glasses Classification - CNN":
      "EfficientNetV2B0 and MobileNetV3Small both achieved 85.11% validation accuracy; EfficientNetV2B0 reached 0.9322 ROC-AUC, while MobileNetV3Small used about 6.5× fewer parameters.",
  },
  he: {
    "ICD-10-GM Embedding Benchmark":
      "BioLORD השיג Patient Hit@10 של 90.9% בבנצ'מרק סינתטי של 1,000 מטופלים, בחיפוש מתוך 16,905 קודי ICD-10-GM בגרמנית.",
    "NBA Functional Archetypes":
      "בעונת 2023-24, מגוון תפקודי בסגל הציג מתאם של 0.83 עם אחוז הניצחונות, לעומת 0.31 עבור העמדות המסורתיות.",
    "Global Life Expectancy Analysis":
      "מספר שנות הלימוד הציג מתאם פירסון של 0.74 עם תוחלת החיים, על פני 2,938 תצפיות של מדינות ושנים.",
    "Scientific Metadata Pipeline":
      "המערכת עיבדה 3,305 מאמרים מדעיים ייחודיים למאגר עקבי בן 44 עמודות, עם שמירות ביניים אוטומטיות ובדיקות CI.",
    "Glasses Classification - CNN":
      "EfficientNetV2B0 ו-MobileNetV3Small השיגו דיוק של 85.11%; ‏EfficientNet הגיע ל-ROC-AUC של 0.9322, בעוד MobileNet השתמש בכפי 6.5 פחות פרמטרים.",
  },
};

function ArrowIcon({ external = false, locale }: { external?: boolean; locale: Locale }) {
  return <span aria-hidden="true">{external ? "↗" : locale === "he" ? "←" : "→"}</span>;
}

function DataCanvas() {
  return (
    <div className="data-canvas" aria-hidden="true">
      <div className="canvas-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="data-line line-one" />
      <div className="data-line line-two" />
      <div className="data-line line-three" />
      <span className="data-node node-one" />
      <span className="data-node node-two" />
      <span className="data-node node-three" />
      <span className="data-node node-four" />
      <div className="coordinates">
        <span>X: 35.6895</span>
        <span>Y: 32.0853</span>
      </div>
      <div className="signal-card">
        <span className="signal-label">SIGNAL / 04</span>
        <strong>+23.6%</strong>
        <span>pattern detected</span>
      </div>
    </div>
  );
}
type SocialIconName =
  | "linkedin"
  | "github"
  | "whatsapp"
  | "email"
  | "resume";

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.25 3.5A1.75 1.75 0 1 1 5.25 7a1.75 1.75 0 0 1 0-3.5ZM3.75 8.5h3v11h-3v-11Zm5 0h2.88v1.5h.04c.4-.76 1.38-1.96 3.83-1.96 4.1 0 4.86 2.7 4.86 6.21v5.25h-3v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73h-3v-11Z"
        />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.91a9.4 9.4 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.8-4.58 5.06.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12.04 2a9.82 9.82 0 0 0-8.48 14.75L2 22l5.39-1.5A9.89 9.89 0 1 0 12.04 2Zm0 17.82a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-3.2.89.86-3.12-.19-.32a7.77 7.77 0 1 1 6.8 3.81Zm4.27-5.83c-.23-.12-1.38-.69-1.59-.77-.21-.08-.37-.12-.52.12-.16.23-.6.77-.74.93-.13.16-.27.18-.5.06-.23-.12-.98-.37-1.86-1.18-.69-.62-1.15-1.38-1.29-1.61-.13-.23-.01-.36.1-.48.1-.1.23-.27.35-.41.12-.13.16-.23.23-.39.08-.15.04-.29-.02-.41-.06-.12-.52-1.27-.72-1.74-.19-.46-.38-.4-.52-.41h-.45c-.16 0-.41.06-.62.29-.21.23-.81.81-.81 1.97s.83 2.28.95 2.44c.12.15 1.63 2.55 4.04 3.47.56.2 1 .32 1.34.41.56.18 1.08.15 1.48.09.45-.07 1.38-.58 1.58-1.14.19-.56.19-1.04.13-1.14-.05-.1-.21-.16-.44-.28Z"
        />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5.5h18v13H3v-13Zm1.2 1.1L12 12.4l7.8-5.8"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 2.75h7l4 4v14.5H7V2.75Zm7 0v4h4M12.5 10v7m0 0-3-3m3 3 3-3"
      />
    </svg>
  );
}


export function PortfolioPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const projects = [...content.projects, carProject[locale]];
  const languageHref = locale === "he" ? "/" : "/he";
  const languageLabel = locale === "he" ? "EN" : "עב";

  return (
    <main className="portfolio-root" dir={locale === "he" ? "rtl" : "ltr"} lang={locale}>
      <DocumentLanguage locale={locale} />
      <a className="skip-link" href="#main-content">
        {content.skipLink}
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#about" aria-label={content.homeLabel}>
            <span>NS</span>
          </a>

          <div className="header-actions">
            <nav className="desktop-nav" aria-label={content.homeLabel}>
              {content.nav.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a className="language-switch" href={languageHref} hrefLang={locale === "he" ? "en" : "he"}>
              {languageLabel}
            </a>
          </div>

          <details className="mobile-menu">
            <summary aria-label={content.menuLabel}>
              <span />
              <span />
            </summary>
            <nav aria-label={content.mobileNavLabel}>
              {content.nav.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
              <a className="mobile-language-link" href={languageHref} hrefLang={locale === "he" ? "en" : "he"}>
                {locale === "he" ? "English" : "עברית"}
              </a>
            </nav>
          </details>
        </div>
      </header>
      <section className="hero" id="about">
        <div className="hero-visual">
          <DataCanvas />
        </div>

        <div className="shell hero-layout" id="main-content">
          <div className="hero-copy">
            <p className="eyebrow">DATA, AI &amp; BI</p>

            <h1>{content.hero.name}</h1>

            <h2>
              {content.hero.headline[0]}
              <br />
              {content.hero.headline[1]}
            </h2>

            <p className="hero-description">
              {content.hero.description}
            </p>

            <div className="hero-actions hero-actions-combined">
        <a
          className="button button-primary hero-action-projects"
          href="#projects"
        >
          {content.hero.projectsCta}
          <ArrowIcon locale={locale} />
        </a>

        <a
          className="button button-secondary hero-action-overview"
          href="#experience"
        >
          {content.hero.resumeCta}
          <ArrowIcon locale={locale} />
        </a>

        <div className="hero-bottom-actions">
          <a
            className="button button-secondary hero-download-button"
            href="/Naor-Shem-Tov-CV.pdf"
            download="Naor-Shem-Tov-CV.pdf"
          >
            {locale === "he" ? "\u05d4\u05d5\u05e8\u05d3\u05ea \u05e7\u05d5\u05e8\u05d5\u05ea \u05d7\u05d9\u05d9\u05dd" : "Download Resume"}
            <span className="hero-action-file-label" aria-hidden="true">
              PDF
            </span>
          </a>

          <div
            className="hero-social-links"
            aria-label={
              locale === "he"
                ? "׳§׳™׳©׳•׳¨׳™׳ ׳׳§׳¦׳•׳¢׳™׳™׳"
                : "Professional links"
            }
          >
            <a
              href="https://www.linkedin.com/in/naorshemtov/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <SocialIcon name="linkedin" />
            </a>

            <a
              href="https://github.com/naor7749"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <SocialIcon name="github" />
            </a>

            <a
              href="https://wa.me/972524493963"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <SocialIcon name="whatsapp" />
            </a>

            <a
              href="mailto:naor7749@gmail.com"
              aria-label={
                locale === "he"
                  ? "׳©׳׳™׳—׳× ׳“׳•׳׳¨ ׳׳׳§׳˜׳¨׳•׳ ׳™"
                  : "Send email"
              }
              title={locale === "he" ? "׳“׳•׳׳¨ ׳׳׳§׳˜׳¨׳•׳ ׳™" : "Email"}
            >
              <SocialIcon name="email" />
            </a>
          </div>
        </div>
      </div>
          </div>
        </div>

        <div className="credibility-bar">
          <div className="shell credibility-grid">
            {content.hero.credibility.map((item, index) => (
              <div className="credibility-item" key={item}>
                <span className="credibility-icon">
                  {index === 0 ? "◇" : index === 1 ? "</>" : "✦"}
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <p className="section-index">{content.projectsSection.index}</p>
              <h2>{content.projectsSection.title}</h2>
            </div>

            <p>{content.projectsSection.description}</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                locale={locale}
                technologiesLabel={content.projectsSection.technologiesLabel}
                githubLabel={content.projectsSection.githubLabel}
                result={projectResults[locale][project.title] ?? project.outcome}
              />
            ))}
          </div>

          <a
            className="text-link"
            href="https://github.com/naor7749"
            target="_blank"
            rel="noreferrer"
          >
            {content.projectsSection.allProjects}{" "}
            <ArrowIcon external locale={locale} />
          </a>
        </div>
      </section>
      <section className="section resume-section" id="experience">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <p className="section-index">{content.profileSection.index}</p>
              <h2>{content.profileSection.title}</h2>
            </div>
            <p>{content.profileSection.description}</p>
          </div>
{/* 
          <article className="service-highlight reveal">
            <div>
              <p className="service-kicker">{content.reserveService.label}</p>
              <h3>{content.reserveService.title}</h3>
              <p className="service-place">{content.reserveService.place}</p>
            </div>
            <p className="service-detail">{content.reserveService.detail}</p>
          </article> */}

          <div className="resume-layout">
            <div className="timeline">
              {content.experience.map((item) => (
                <article
                  className={`timeline-item${item.secondary ? " timeline-item-secondary" : ""}`}
                  key={`${item.period}-${item.role}`}
                >
                  <div className="timeline-period">{item.period}</div>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-place">{item.place}</p>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="skills-panel" aria-label={content.profileSection.capabilitiesLabel}>
              <p className="panel-kicker">{content.profileSection.capabilitiesLabel}</p>
              {content.skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell contact-layout">
          <div>
            <p className="section-index">{content.contact.index}</p>
            <h2>
              {content.contact.headline[0]}
              <br />
              {content.contact.headline[1]}
            </h2>
          </div>
          <div className="contact-copy">
            <p>{content.contact.description}</p>
            <div className="contact-links">
              {content.contact.links.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                >
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                  <ArrowIcon external={link.external} locale={locale} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <span>{content.footer.copyright}</span>
          <span>{content.footer.tagline}</span>
          <a href="#about">{content.footer.top}</a>
        </div>
      </footer>
      <PortfolioAgent locale={locale} />
    </main>
  );
}
