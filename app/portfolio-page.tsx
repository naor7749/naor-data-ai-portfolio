import { siteContent, type Locale, type Project } from "./content";
import { DocumentLanguage } from "./document-language";
import { ProjectCard } from "./project-card";


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
            <p className="hero-description">{content.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                {content.hero.projectsCta} <ArrowIcon locale={locale} />
              </a>
              <a className="button button-secondary" href="#experience">
                {content.hero.resumeCta} <ArrowIcon locale={locale} />
              </a>
            </div>
          </div>
        </div>

        <div className="credibility-bar">
          <div className="shell credibility-grid">
            {content.hero.credibility.map((item, index) => (
              <div className="credibility-item" key={item}>
                <span className="credibility-icon">{index === 0 ? "◇" : index === 1 ? "</>" : "✦"}</span>
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
    </main>
  );
}
