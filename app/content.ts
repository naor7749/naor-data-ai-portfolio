export type Locale = "he" | "en";

export type Project = {
  number: string;
  title: string;
  label: string;
  description: string;
  outcome: string;
  technologies: string[];
  href?: string;
  featured?: boolean;
};

type LocalizedContent = {
  nav: { label: string; href: string }[];
  skipLink: string;
  homeLabel: string;
  menuLabel: string;
  mobileNavLabel: string;
  hero: {
    name: string;
    headline: [string, string];
    description: string;
    projectsCta: string;
    resumeCta: string;
    credibility: string[];
  };
  projectsSection: {
    index: string;
    title: string;
    description: string;
    allProjects: string;
    technologiesLabel: string;
    githubLabel: string;
  };
  projects: Project[];
  profileSection: {
    index: string;
    title: string;
    description: string;
    capabilitiesLabel: string;
  };

  experience: {
    period: string;
    role: string;
    place: string;
    detail: string;
    secondary?: boolean;
  }[];
  skillGroups: { title: string; items: string[] }[];
  contact: {
    index: string;
    headline: [string, string];
    description: string;
    links: {
      label: string;
      value: string;
      href: string;
      external?: boolean;
    }[];
  };
  footer: { copyright: string; tagline: string; top: string };
};

const sharedProjects = {
  icd: {
    number: "01",
    title: "ICD-10-GM Embedding Benchmark",
    label: "Healthcare NLP",
    technologies: ["Python", "NLP", "Embeddings", "Retrieval"],
    href: "https://github.com/naor7749/icd10gm-embedding-benchmark",
    featured: true,
  },
  nba: {
    number: "02",
    title: "NBA Functional Archetypes",
    label: "Unsupervised Learning",
    technologies: ["Python", "K-Means", "Hierarchical", "UMAP"],
    href: "https://github.com/naor7749/nba-functional-archetypes",
    featured: true,
  },
  life: {
    number: "03",
    title: "Global Life Expectancy Analysis",
    label: "Data Storytelling",
    technologies: ["Pandas", "Seaborn", "Plotly", "Statistics"],
    href: "https://github.com/naor7749/global-life-expectancy-analysis",
  },
  metadata: {
    number: "04",
    title: "Scientific Metadata Pipeline",
    label: "Data Engineering",
    technologies: ["Python", "APIs", "ETL", "Data Quality"],
    href: "https://github.com/naor7749/scientific-article-metadata-pipeline",
  },
  glasses: {
    number: "05",
    title: "Glasses Classification - CNN",
    label: "Deep Learning",
    technologies: ["TensorFlow", "Keras", "CNN", "Computer Vision"],
    href: "https://github.com/naor7749/glasses-classification-deep-learning",
  },
};

export const siteContent: Record<Locale, LocalizedContent> = {
  he: {
    nav: [
      { label: "אודות", href: "#about" },
      { label: "פרויקטים", href: "#projects" },
      { label: "ניסיון", href: "#experience" },
      { label: "קשר", href: "#contact" },
    ],
    skipLink: "דילוג לתוכן הראשי",
    homeLabel: "נאור שם-טוב - ראש העמוד",
    menuLabel: "פתיחת תפריט ניווט",
    mobileNavLabel: "ניווט לנייד",
    hero: {
      name: "נאור שם-טוב",
      headline: ["הופך דאטה מורכב", "להחלטות ברורות"],
      description:
        "אנליסט ומפתח פתרונות דאטה שמחבר בין מחקר, טכנולוגיה ואנשים - כדי להפוך שאלות מורכבות לתובנות שאפשר לפעול לפיהן.",
      projectsCta: "לפרויקטים",
      resumeCta: "תקציר קורות חיים",
      credibility: [
        "M.A. Data Science & Applied AI",
        "Python · SQL · Power BI",
        "Research · Analytics · Data Products",
      ],
    },
    projectsSection: {
      index: "01 / SELECTED WORK",
      title: "פרויקטים נבחרים",
      description:
        "מחקר, מודלים וויזואליזציה - פרויקטים מקצה לקצה שמתחילים בשאלה טובה ומסתיימים בתוצר ברור, מתועד ושימושי.",
      allProjects: "לכל הפרויקטים ב-GitHub",
      technologiesLabel: "טכנולוגיות בפרויקט",
      githubLabel: "לצפייה בפרויקט ב-GitHub",
    },
    projects: [
      {
        ...sharedProjects.icd,
        description:
          "בנצ'מרק השוואתי למודלי embedding עבור קודים רפואיים בגרמנית, עם משימות retrieval, ולידציה ותהליך שחזור מלא.",
        outcome: "השוואה עקבית בין מודלים רפואיים ורב-לשוניים",
      },
      {
        ...sharedProjects.nba,
        description:
          "זיהוי ארכיטיפים תפקודיים של שחקני NBA באמצעות clustering, ובחינת הקשר בין מגוון קבוצתי להצלחה בעונה ובפלייאוף.",
        outcome: "תפקידים מבוססי ביצועים במקום תוויות עמדה מסורתיות",
      },
      {
        ...sharedProjects.life,
        description:
          "ניתוח חקר נתונים גלובלי של גורמי בריאות, חינוך ופיתוח הקשורים לתוחלת החיים, כולל המחשות אינטראקטיביות.",
        outcome: "הפיכת קשרים מורכבים לסיפור נתונים ברור",
      },
      {
        ...sharedProjects.metadata,
        description:
          "Pipeline לאיסוף, ניקוי, תקנון ובקרת איכות של מטא-דאטה ממאמרים מדעיים, עם תוצרים מסודרים להמשך ניתוח.",
        outcome: "תהליך ETL מתועד, בדיק ובר-הרחבה",
      },
      {
        ...sharedProjects.glasses,
        description:
          "פרויקט Computer Vision לסיווג תמונות עם ובלי משקפיים, כולל preprocessing, augmentation, אימון CNN מותאם אישית ושמירת checkpoints.",
        outcome: "יישום Deep Learning מקצה לקצה והערכתו במדדי סיווג",
      },
    ],
    profileSection: {
      index: "02 / PROFILE",
      title: "ניסיון, השכלה וכלים",
      description:
        "חשיבה אנליטית, הבנה אנושית ויישום מעשי - לפתרון בעיות אמיתיות ולא רק לאימון מודלים.",
      capabilitiesLabel: "יכולות וכלים",
    },
    experience: [
      {
        period: "2024 - היום",
        role: "מוביל פרויקטי Data & AI",
        place: "מחקר, פיתוח ויישום מקצה לקצה",
        detail:
          "הובלת פרויקטים בתחומי Healthcare NLP, Deep Learning, ניתוח נתוני ספורט, Data Pipelines וויזואליזציה אינטראקטיבית - מהגדרת הבעיה ואיסוף הנתונים ועד מידול, הערכה, תיעוד והצגת התוצרים.",
      },
      {
        period: "2025 - היום",
        role: "Data Analyst",
        place: "חטיבת פק\"ל, צה\"ל",
        detail:
          "בניית דשבורדים וכלי Excel אוטומטיים וניתוח נתונים לצורכי מחקר מבצעי ותכנון, לצד עבודה עם בעלי עניין ומפתחים.",
        secondary: true,
      },
      {
        period: "2022 - 2025",
        role: "מנהל הטמעת טכנולוגיה ודאטה",
        place: "מבוע",
        detail:
          "הטמעת Power BI ו-Monday.com, פיתוח דשבורדים למדדי ביצוע וניתוח כמותי לתמיכה בתהליכים ארגוניים.",
        secondary: true,
      },
      {
        period: "2023 - היום",
        role: 'מפקד פלוגה במילואים | רס"ן',
        place: 'שירות מילואים פעיל בצה"ל',
        detail:
          "פיקוד על פלוגה של כ-100 לוחמים ולוחמות במסגרת למעלה מ-450 ימי מילואים מאז 7 באוקטובר 2023, עם אחריות על אנשים, תכנון, תיאום וקבלת החלטות בתנאי אי-ודאות.",
      },
      {
        period: "M.A.",
        role: "Data Science & Applied AI",
        place: "אוניברסיטת בר-אילן",
        detail:
          "למידת מכונה, עיבוד וניתוח נתונים, ויזואליזציה, מערכות מידע ויישומי AI. סיום התואר בהצטיינות ובחירה לשאת את נאום הבוגרים בטקס הסיום.",
      },
      {
        period: "B.A.",
        role: "Economics & Political Science",
        place: "אוניברסיטת תל אביב",
        detail:
          "בסיס כמותי וחברתי שמחבר בין מספרים, מדיניות, התנהגות אנושית וקבלת החלטות, לצד קבלת מלגת הצטיינות מעיריית חולון במהלך התואר.",
      },
    ],
    skillGroups: [
      {
        title: "דאטה, בינה עסקית ופיתוח Web",
        items: [
          "Python",
          "SQL",
          "Power BI",
          "Excel",
          "Pandas",
          "Plotly",
          "Data Storytelling",
          "Statistical Analysis",
          "Next.js",
          "TypeScript",
          "Responsive Web Development",
          "Vercel",
        ],
      },
      {
        title: "בינה מלאכותית ולמידת מכונה",
        items: [
          "Machine Learning",
          "Deep Learning",
          "TensorFlow / Keras",
          "Computer Vision",
          "NLP",
          "Embeddings",
          "Clustering",
          "SHAP",
        ],
      },
    ],
    contact: {
      index: "03 / LET'S TALK",
      headline: ["יש בעיה מורכבת?", "בואו נהפוך אותה לתובנה."],
      description:
        "פתוח להזדמנויות בדאטה, BI ו-AI, ולשיתופי פעולה על פרויקטים שיש בהם עומק אנליטי והשפעה מעשית.",
      links: [
        {
          label: "טלפון",
          value: "+972 52-449-3963",
          href: "tel:+972524493963",
        },
        {
          label: "דואר אלקטרוני",
          value: "naor7749@gmail.com",
          href: "mailto:naor7749@gmail.com",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/naor-shem-tov",
          href: "https://www.linkedin.com/in/naorshemtov/",
          // external: true,
        },
      ],
    },
    footer: {
      copyright: "© 2026 נאור שם-טוב",
      tagline: "DATA · AI · BI",
      top: "חזרה למעלה ↑",
    },
  },
  en: {
    nav: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    skipLink: "Skip to main content",
    homeLabel: "Naor Shem-Tov - Home",
    menuLabel: "Open navigation menu",
    mobileNavLabel: "Mobile navigation",
    hero: {
      name: "Naor Shem-Tov",
      headline: ["Turning complex data", "into clear decisions"],
      description:
        "Data analyst and solution builder connecting research, technology, and people - turning complex questions into insights teams can act on.",
      projectsCta: "View projects",
      resumeCta: "Resume overview",
      credibility: [
        "M.A. Data Science & Applied AI",
        "Python · SQL · Power BI",
        "Research · Analytics · Data Products",
      ],
    },
    projectsSection: {
      index: "01 / SELECTED WORK",
      title: "Selected projects",
      description:
        "Research, models, and visualization - end-to-end projects that begin with a strong question and finish with a clear, documented, useful result.",
      allProjects: "Explore all projects on GitHub",
      technologiesLabel: "Technologies used in",
      githubLabel: "View project on GitHub",
    },
    projects: [
      {
        ...sharedProjects.icd,
        description:
          "A comparative embedding benchmark for German medical codes, including retrieval tasks, validation, and a fully reproducible workflow.",
        outcome: "A consistent comparison of medical and multilingual models",
      },
      {
        ...sharedProjects.nba,
        description:
          "Functional NBA player archetypes discovered through clustering, followed by an analysis of how team diversity relates to regular-season and playoff success.",
        outcome: "Performance-based roles beyond traditional position labels",
      },
      {
        ...sharedProjects.life,
        description:
          "An exploratory global analysis of health, education, and development factors associated with life expectancy, supported by interactive visualizations.",
        outcome: "Complex relationships translated into a clear data story",
      },
      {
        ...sharedProjects.metadata,
        description:
          "A pipeline for collecting, cleaning, standardizing, and validating scientific article metadata, with analysis-ready outputs.",
        outcome: "A documented, testable, and extensible ETL workflow",
      },
      {
        ...sharedProjects.glasses,
        description:
          "A computer vision project for classifying images with and without glasses, including preprocessing, augmentation, custom CNN training, and checkpointing.",
        outcome: "An end-to-end deep learning workflow evaluated with classification metrics",
      },
    ],
    profileSection: {
      index: "02 / PROFILE",
      title: "Experience, education, and tools",
      description:
        "Analytical thinking, human understanding, and practical implementation - applied to real problems, not just model training.",
      capabilitiesLabel: "Capabilities and tools",
    },

    experience: [
      {
        period: "2024 - Present",
        role: "Data & AI Project Lead",
        place: "End-to-end research, analytics & development",
        detail:
          "Development of independent projects across healthcare NLP, deep learning, sports analytics, data pipelines, and interactive visualization - from data collection and modeling to documentation and deployment.",
      },
      {
        period: "2025 - Present",
        role: "Data Analyst",
        place: "PAKAL Division, IDF",
        detail:
          "Building dashboards, automated Excel tools, and data analyses for operational research and planning, in collaboration with stakeholders and developers.",
        secondary: true,
      },
      {
        period: "2022 - 2025",
        role: "Technology & Data Implementation Manager",
        place: "Mabua",
        detail:
          "Implementing Power BI and Monday.com, developing KPI dashboards, and applying quantitative analysis to support organizational processes.",
        secondary: true,
      },
      {
        period: "2023 - Present",
        role: "Reserve Company Commander | Major",
        place: "Israel Defense Forces",
        detail:
          "Commanding a company of approximately 100 soldiers during more than 450 days of reserve service since October 7, 2023, with responsibility for personnel, planning, coordination, and decision-making under uncertainty.",
      },
      {
        period: "M.A.",
        role: "Data Science & Applied AI",
        place: "Bar-Ilan University",
        detail:
          "Machine learning, data processing and analysis, visualization, information systems, and applied AI. The degree was completed with honors, followed by selection to deliver the graduates' address at the commencement ceremony.",
      },
      {
        period: "B.A.",
        role: "Economics & Political Science",
        place: "Tel Aviv University",
        detail:
          "A quantitative and social-science foundation connecting numbers, policy, human behavior, and decision-making. Awarded a merit scholarship by the Holon Municipality during the degree.",
      },
    ],
    skillGroups: [
      {
        title: "Data, BI & Web",
        items: [
          "Python",
          "SQL",
          "Power BI",
          "Excel",
          "Pandas",
          "Plotly",
          "Data Storytelling",
          "Statistical Analysis",
          "Next.js",
          "TypeScript",
          "Responsive Web Development",
          "Vercel",
        ],
      },
      {
        title: "AI & ML",
        items: [
          "Machine Learning",
          "Deep Learning",
          "TensorFlow / Keras",
          "Computer Vision",
          "NLP",
          "Embeddings",
          "Clustering",
          "SHAP",
        ],
      },
    ],
    contact: {
      index: "03 / LET'S TALK",
      headline: ["Have a complex problem?", "Let's turn it into insight."],
      description:
        "Open to opportunities in data, BI, and AI, as well as collaborations on projects with analytical depth and practical impact.",
      links: [
        {
          label: "Phone",
          value: "+972 52-449-3963",
          href: "tel:+972524493963",
          // external: true
        },
        {
          label: "Email",
          value: "naor7749@gmail.com",
          href: "mailto:naor7749@gmail.com",
          // external: true
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/naorshemtov",
          href: "https://www.linkedin.com/in/naorshemtov/",
          // external: true,
        },
      ],
    },
    footer: {
      copyright: "© 2026 Naor Shem-Tov",
      tagline: "DATA · AI · BI",
      top: "Back to top ↑",
    },
  },
};
