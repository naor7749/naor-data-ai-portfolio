import { google } from "@ai-sdk/google";
import { generateText, stepCountIs, tool } from "ai";
import { z } from "zod";

export const runtime = "nodejs";

const contactDetails = {
  phone: { label: "Phone", value: "+972 52-449-3963", href: "tel:+972524493963" },
  email: { label: "Email", value: "naor7749@gmail.com", href: "mailto:naor7749@gmail.com" },
  linkedin: {
    label: "LinkedIn",
    value: "linkedin.com/in/naor-shem-tov",
    href: "https://www.linkedin.com/in/naor-shem-tov-949bb9174/",
  },
};

const professionalProfile = {
  summary:
    "Naor Shem-Tov is a Data & AI project lead and data analyst who connects research, analytics, technology, and practical delivery.",
  focusAreas: [
    "Data analysis and statistical analysis",
    "Business intelligence and dashboard development",
    "Power BI, Excel, SQL, Python, Pandas, and Plotly",
    "Machine learning and deep learning",
    "Healthcare NLP, embeddings, and information retrieval",
    "Computer vision",
    "Data pipelines, APIs, ETL, automation, and data quality",
    "Next.js, React, TypeScript, responsive web development, and Vercel",
    "Analytical storytelling, research, and problem framing",
  ],
  experience: [
    {
      role: "Data & AI Project Lead",
      details:
        "Leads end-to-end projects across healthcare NLP, deep learning, sports analytics, data pipelines, interactive visualization, and deployment.",
    },
    {
      role: "Data Analyst",
      details:
        "Builds dashboards, automated Excel tools, and analyses for operational research and planning.",
    },
    {
      role: "Technology & Data Implementation Manager",
      details:
        "Implemented Power BI and Monday.com, developed KPI dashboards, and supported organizational processes through quantitative analysis.",
    },
    {
      role: "Reserve Company Commander | Major",
      details:
        "Commands approximately 100 soldiers and has extensive experience in leadership, planning, coordination, and decision-making under uncertainty.",
    },
  ],
  education: [
    "M.A. in Data Science & Applied AI from Bar-Ilan University, completed with honors.",
    "B.A. in Economics & Political Science from Tel Aviv University.",
  ],
};

const projects = {
  icd: {
    title: "ICD-10-GM Embedding Benchmark",
    category: "Healthcare NLP",
    description:
      "A benchmark comparing biomedical and multilingual embedding models for German ICD-10-GM codes, including retrieval evaluation, validation, and a reproducible workflow.",
    technologies: ["Python", "NLP", "Embeddings", "Information Retrieval", "Machine Learning"],
    result:
      "BioLORD achieved 90.9% Patient Hit@10 on a synthetic benchmark of 1,000 patients, retrieving from 16,905 German ICD-10-GM codes.",
    github: "https://github.com/naor7749/icd10gm-embedding-benchmark",
  },
  nba: {
    title: "NBA Functional Archetypes",
    category: "Unsupervised Learning",
    description:
      "A clustering project that identifies functional NBA player archetypes and examines the relationship between roster diversity and team success.",
    technologies: ["Python", "K-Means", "Hierarchical Clustering", "UMAP", "Pandas"],
    result:
      "In 2023-24, functional roster diversity correlated 0.83 with team win percentage, compared with 0.31 for traditional positions.",
    github: "https://github.com/naor7749/nba-functional-archetypes",
  },
  life_expectancy: {
    title: "Global Life Expectancy Analysis",
    category: "Data Analysis and Storytelling",
    description:
      "A global analysis of health, education, and development factors associated with life expectancy, supported by interactive visualizations.",
    technologies: ["Python", "Pandas", "Plotly", "Statistics", "Data Visualization"],
    result:
      "Schooling showed a Pearson correlation of 0.74 with life expectancy across 2,938 country-year observations.",
    github: "https://github.com/naor7749/global-life-expectancy-analysis",
  },
  metadata: {
    title: "Scientific Article Metadata Pipeline",
    category: "Data Engineering",
    description:
      "A pipeline for collecting, cleaning, standardizing, and validating scientific article metadata.",
    technologies: ["Python", "APIs", "ETL", "Data Validation", "Data Quality"],
    result:
      "Processed 3,305 unique scientific articles into a consistent 44-column dataset with automatic checkpoints and CI-backed tests.",
    github: "https://github.com/naor7749/scientific-article-metadata-pipeline",
  },
  glasses: {
    title: "Glasses Classification – CNN",
    category: "Deep Learning and Computer Vision",
    description:
      "An image-classification project comparing custom and transfer-learning models for identifying whether a person is wearing glasses.",
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "Computer Vision", "Transfer Learning"],
    result:
      "EfficientNetV2B0 and MobileNetV3Small both achieved 85.11% validation accuracy; EfficientNetV2B0 reached 0.9322 ROC-AUC.",
  },
  car_price: {
    title: "Car Price ML Benchmark",
    category: "Supervised Learning",
    description:
      "An end-to-end benchmark for predicting vehicle listing prices with leakage-safe preprocessing, feature engineering, cross-validation, and model comparison.",
    technologies: ["Python", "XGBoost", "scikit-learn", "Feature Engineering", "Cross Validation"],
    result:
      "XGBoost achieved an R² of 0.9627 with a mean absolute error of approximately $1,328.",
    github: "https://github.com/naor7749/car-price-ml-benchmark",
  },
  portfolio: {
    title: "Bilingual Data and AI Portfolio",
    category: "Web Development and Agentic AI",
    description:
      "A bilingual responsive portfolio built with Next.js and deployed on Vercel, featuring interactive project previews and an AI portfolio agent.",
    technologies: ["Next.js", "React", "TypeScript", "Responsive Web Development", "Vercel", "Gemini", "Tool Calling"],
    result:
      "A deployed professional website combining bilingual content, interactive visualizations, project modals, and an AI assistant.",
    github: "https://github.com/naor7749/naor-data-ai-portfolio",
  },
} as const;

const projectKeySchema = z.enum([
  "icd",
  "nba",
  "life_expectancy",
  "metadata",
  "glasses",
  "car_price",
  "portfolio",
]);

const listProjectsTool = tool({
  description:
    "Returns all verified projects in Naor Shem-Tov's portfolio. Use it for comparisons, recommendations, or identifying the project most relevant to a user's need.",
  inputSchema: z.object({}),
  execute: async () =>
    Object.entries(projects).map(([key, project]) => ({
      key,
      title: project.title,
      category: project.category,
      technologies: project.technologies,
    })),
});

const getProjectDetailsTool = tool({
  description:
    "Returns verified details about one specific project in Naor Shem-Tov's portfolio.",
  inputSchema: z.object({ project: projectKeySchema.describe("The requested project identifier") }),
  execute: async ({ project }) => projects[project],
});

const getProfessionalProfileTool = tool({
  description:
    "Returns verified information about Naor's professional profile, capabilities, experience, leadership, and education.",
  inputSchema: z.object({}),
  execute: async () => professionalProfile,
});

const getContactDetailsTool = tool({
  description:
    "Returns the verified ways to contact Naor. Use whenever the user asks how to contact him or expresses interest in a role, project, collaboration, service, or professional conversation.",
  inputSchema: z.object({}),
  execute: async () => contactDetails,
});

const capabilityGroups = [
  {
    area: "Data analysis and BI",
    keywords: [
      "data", "analytics", "analysis", "dashboard", "power bi", "excel", "sql", "report", "kpi",
      "דאטה", "נתונים", "ניתוח", "דשבורד", "דוחות", "אקסל", "בינה עסקית",
    ],
    evidence: [
      "Data Analyst experience",
      "Power BI and KPI dashboard implementation",
      "Python, SQL, Excel, Pandas, Plotly, and statistical analysis",
    ],
  },
  {
    area: "AI and machine learning",
    keywords: [
      "ai", "machine learning", "ml", "deep learning", "model", "prediction", "classification", "nlp", "embedding", "computer vision", "cnn",
      "בינה מלאכותית", "למידת מכונה", "למידה עמוקה", "מודל", "חיזוי", "סיווג", "עיבוד שפה", "ראייה ממוחשבת",
    ],
    evidence: [
      "Healthcare NLP and embedding benchmark",
      "Computer vision and deep-learning project",
      "Supervised and unsupervised machine-learning benchmarks",
    ],
  },
  {
    area: "Data engineering and automation",
    keywords: [
      "pipeline", "etl", "api", "automation", "data quality", "integration", "scraping", "workflow",
      "אוטומציה", "פייפליין", "ממשק", "אינטגרציה", "איסוף נתונים", "איכות נתונים", "תהליך",
    ],
    evidence: [
      "Scientific metadata ETL pipeline",
      "API-based data collection and validation",
      "Automated Excel tools and reproducible workflows",
    ],
  },
  {
    area: "Web development and AI products",
    keywords: [
      "website", "web", "next.js", "react", "typescript", "vercel", "frontend", "site", "agent", "chatbot",
      "אתר", "פיתוח ווב", "צ'אטבוט", "סוכן", "ממשק", "מוצר ai",
    ],
    evidence: [
      "Bilingual responsive Next.js portfolio",
      "TypeScript, React, and Vercel deployment",
      "AI assistant with Gemini and tool calling",
    ],
  },
  {
    area: "Research, strategy, and analytical problem solving",
    keywords: [
      "research", "strategy", "problem", "decision", "insight", "consulting", "product", "planning",
      "מחקר", "אסטרטגיה", "בעיה", "החלטות", "תובנות", "ייעוץ", "מוצר", "תכנון",
    ],
    evidence: [
      "Research-driven end-to-end project leadership",
      "Economics, political science, and applied AI background",
      "Leadership, planning, and decision-making under uncertainty",
    ],
  },
];

const assessFitForRequestTool = tool({
  description:
    "Assesses how Naor's demonstrated skills may relate to a professional or business request. Use whenever a visitor asks whether Naor can help with a task, project, role, challenge, or idea. The tool must not be treated as a guarantee of availability or exact expertise.",
  inputSchema: z.object({
    request: z.string().min(3).max(500).describe("The visitor's professional need or project description"),
  }),
  execute: async ({ request }) => {
    const normalized = request.toLowerCase();
    const matches = capabilityGroups
      .filter((group) => group.keywords.some((keyword) => normalized.includes(keyword)))
      .map((group) => ({ area: group.area, evidence: group.evidence }));

    return {
      request,
      assessment:
        matches.length > 0
          ? "There is demonstrated or adjacent experience that may be relevant."
          : "The public portfolio does not provide enough information to determine the exact fit.",
      relevantAreas: matches,
      importantLimit:
        "This assessment is not a promise of availability, price, timeline, or direct experience in every requested technology.",
      recommendation:
        "Encourage the visitor to contact Naor directly, describe the need, and explore whether he can lead, build, advise on, or contribute to the project.",
      contact: contactDetails,
    };
  },
});

type RateRecord = { count: number; resetAt: number };
const globalRateStore = globalThis as typeof globalThis & {
  portfolioAgentRateStore?: Map<string, RateRecord>;
};
const rateStore =
  globalRateStore.portfolioAgentRateStore ??
  (globalRateStore.portfolioAgentRateStore = new Map<string, RateRecord>());

function checkRateLimit(request: Request): boolean {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const limit = 20;
  const current = rateStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  rateStore.set(ip, current);
  return true;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): IncomingMessage[] {
  if (typeof body !== "object" || body === null) return [];

  if ("messages" in body && Array.isArray(body.messages)) {
    return body.messages
      .filter(
        (item): item is IncomingMessage =>
          typeof item === "object" &&
          item !== null &&
          "role" in item &&
          (item.role === "user" || item.role === "assistant") &&
          "content" in item &&
          typeof item.content === "string",
      )
      .map((item) => ({ role: item.role, content: item.content.trim().slice(0, 500) }))
      .filter((item) => item.content.length > 0)
      .slice(-10);
  }

  if ("message" in body && typeof body.message === "string" && body.message.trim()) {
    return [{ role: "user", content: body.message.trim().slice(0, 500) }];
  }
  return [];
}

export async function POST(request: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    if (!checkRateLimit(request)) {
      return Response.json(
        { error: "Too many requests. Please wait a few minutes or contact Naor directly." },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const messages = parseMessages(body);

    if (messages.length === 0 || messages.at(-1)?.role !== "user") {
      return Response.json({ error: "A valid user message is required." }, { status: 400 });
    }

    const transcript = messages
      .map((message) => `${message.role === "user" ? "Visitor" : "Portfolio guide"}: ${message.content}`)
      .join("\n\n");

    const result = await generateText({
      model: google("gemini-3.1-flash-lite"),
      system: `
You are the AI portfolio guide for Naor Shem-Tov.

Your goals:
- Help recruiters, hiring managers, clients, collaborators, and visitors understand Naor's work.
- Identify relevant skills and projects.
- Turn legitimate professional interest into a direct conversation with Naor.

Mandatory rules:
1. Use the available tools whenever the question concerns projects, skills, experience, fit, or contact.
2. Base factual claims about Naor only on tool results.
3. Never invent employers, technologies, metrics, availability, pricing, timelines, or experience.
4. Answer in Hebrew when the visitor writes in Hebrew and in English when the visitor writes in English.
5. Keep answers concise, warm, professional, and useful.
6. When recommending a project, explain the connection and include its GitHub link when available.
7. When the visitor asks how to contact Naor, use get_contact_details and provide clear contact options.
8. When the visitor describes a need, project, role, business problem, or collaboration idea, use assess_fit_for_request.
9. Never reject a professional inquiry solely because the public information is incomplete.
10. If the fit is uncertain, say so honestly, identify any relevant transferable skills, and encourage the visitor to contact Naor directly to explore the request.
11. Do not promise that Naor can complete a request. Say that a direct conversation is the best way to determine the exact fit.
12. For any legitimate professional or business inquiry, end with a relevant invitation to contact Naor.
13. For unrelated, unsafe, medical, legal, or highly personal requests, politely explain that you specialize in Naor's professional portfolio.
`,
      prompt: `Continue the following portfolio conversation.\n\n${transcript}`,
      tools: {
        list_projects: listProjectsTool,
        get_project_details: getProjectDetailsTool,
        get_professional_profile: getProfessionalProfileTool,
        get_contact_details: getContactDetailsTool,
        assess_fit_for_request: assessFitForRequestTool,
      },
      stopWhen: stepCountIs(5),
      maxOutputTokens: 550,
      temperature: 0.2,
    });

    const toolsUsed = [
      ...new Set(
        result.steps.flatMap((step) => step.toolCalls.map((toolCall) => toolCall.toolName)),
      ),
    ];

    return new Response(JSON.stringify({ reply: result.text, toolsUsed }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Portfolio agent error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown AI error";
    return Response.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? errorMessage
            : "The AI request failed.",
      },
      { status: 500 },
    );
  }
}
