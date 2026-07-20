import { google } from "@ai-sdk/google";
import { generateText, stepCountIs, tool } from "ai";
import { z } from "zod";

export const runtime = "nodejs";

const CONTACT = {
  phone: "+972 52-449-3963",
  email: "naor7749@gmail.com",
  linkedin: "https://www.linkedin.com/in/naorshemtov/",
} as const;

const PROJECTS = {
  icd: {
    title: "ICD-10-GM Embedding Benchmark",
    category: "Healthcare NLP",
    description:
      "A benchmark comparing biomedical and multilingual embedding models for German ICD-10-GM codes, including retrieval evaluation and a reproducible workflow.",
    technologies: ["Python", "NLP", "Embeddings", "Information Retrieval"],
    result:
      "BioLORD achieved 90.9% Patient Hit@10 on a synthetic benchmark of 1,000 patients, retrieving from 16,905 German ICD-10-GM codes.",
    github: "https://github.com/naor7749/icd10gm-embedding-benchmark",
  },
  nba: {
    title: "NBA Functional Archetypes",
    category: "Unsupervised Learning",
    description:
      "Functional NBA player archetypes identified through clustering, followed by an analysis of roster diversity and team success.",
    technologies: ["Python", "K-Means", "Hierarchical Clustering", "UMAP"],
    result:
      "Functional roster diversity correlated 0.83 with team win percentage, compared with 0.31 for traditional positions.",
    github: "https://github.com/naor7749/nba-functional-archetypes",
  },
  life_expectancy: {
    title: "Global Life Expectancy Analysis",
    category: "Data Analysis and Storytelling",
    description:
      "A global analysis of health, education, and development factors associated with life expectancy, supported by interactive visualizations.",
    technologies: ["Python", "Pandas", "Plotly", "Statistics"],
    result:
      "Schooling showed a Pearson correlation of 0.74 with life expectancy across 2,938 country-year observations.",
    github: "https://github.com/naor7749/global-life-expectancy-analysis",
  },
  metadata: {
    title: "Scientific Article Metadata Pipeline",
    category: "Data Engineering",
    description:
      "A pipeline for collecting, cleaning, standardizing, and validating scientific article metadata.",
    technologies: ["Python", "APIs", "ETL", "Data Validation"],
    result:
      "Processed 3,305 unique scientific articles into a consistent 44-column dataset with automatic checkpoints and CI-backed tests.",
    github: "https://github.com/naor7749/scientific-article-metadata-pipeline",
  },
  glasses: {
    title: "Glasses Classification - CNN",
    category: "Deep Learning and Computer Vision",
    description:
      "An image-classification project comparing custom CNN and transfer-learning models for identifying whether a person is wearing glasses.",
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "Computer Vision"],
    result:
      "EfficientNetV2B0 and MobileNetV3Small both achieved 85.11% validation accuracy; EfficientNetV2B0 reached 0.9322 ROC-AUC.",
  },
  car_price: {
    title: "Car Price ML Benchmark",
    category: "Supervised Learning",
    description:
      "An end-to-end benchmark for predicting vehicle listing prices with leakage-safe preprocessing, feature engineering, cross-validation, and model comparison.",
    technologies: ["Python", "XGBoost", "scikit-learn", "Feature Engineering"],
    result:
      "XGBoost achieved an R² of 0.9627 with a mean absolute error of approximately $1,328.",
    github: "https://github.com/naor7749/car-price-ml-benchmark",
  },
  portfolio: {
    title: "Bilingual Data and AI Portfolio",
    category: "Web Development and Agentic AI",
    description:
      "A bilingual responsive portfolio built with Next.js and deployed on Vercel, including interactive project previews and an AI portfolio guide.",
    technologies: ["Next.js", "React", "TypeScript", "Vercel", "Gemini"],
    result:
      "A deployed professional portfolio combining bilingual content, interactive visualizations, project modals, and an AI assistant.",
    github: "https://github.com/naor7749/naor-data-ai-portfolio",
  },
} as const;

const PROFILE = {
  summary:
    "Naor Shem-Tov is a Data & AI project lead and data analyst who connects research, analytics, technology, and practical delivery.",
  skills: [
    "Python",
    "SQL",
    "Power BI",
    "Excel",
    "Pandas",
    "Plotly",
    "Statistical Analysis",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "Keras",
    "Computer Vision",
    "NLP",
    "Embeddings",
    "Clustering",
    "Next.js",
    "TypeScript",
    "Vercel",
  ],
  experience: [
    "End-to-end Data & AI project leadership",
    "Dashboard development and automated Excel tools",
    "Power BI and Monday.com implementation",
    "Research, analytics, data pipelines, and interactive visualization",
    "Leadership, planning, coordination, and decision-making under uncertainty",
  ],
  education: [
    "M.A. in Data Science & Applied AI from Bar-Ilan University, completed with honors",
    "B.A. in Economics & Political Science from Tel Aviv University",
  ],
} as const;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function parseMessages(body: unknown): ChatMessage[] {
  if (typeof body !== "object" || body === null) {
    return [];
  }

  if ("messages" in body && Array.isArray(body.messages)) {
    return body.messages
      .filter(
        (item): item is ChatMessage =>
          typeof item === "object" &&
          item !== null &&
          "role" in item &&
          (item.role === "user" || item.role === "assistant") &&
          "content" in item &&
          typeof item.content === "string",
      )
      .map((item) => ({
        role: item.role,
        content: item.content.trim().slice(0, 500),
      }))
      .filter((item) => item.content.length > 0)
      .slice(-10);
  }

  if (
    "message" in body &&
    typeof body.message === "string" &&
    body.message.trim()
  ) {
    return [
      {
        role: "user",
        content: body.message.trim().slice(0, 500),
      },
    ];
  }

  return [];
}

function isHebrew(text: string): boolean {
  return /[\u0590-\u05FF]/.test(text);
}

function isContactRequest(text: string): boolean {
  const normalized = text.toLowerCase();

  const terms = [
    "איך יוצרים קשר",
    "איך ליצור קשר",
    "יצירת קשר",
    "ליצור קשר",
    "טלפון",
    "מספר טלפון",
    "מייל",
    "אימייל",
    "דואר אלקטרוני",
    "לינקדאין",
    "contact",
    "contact naor",
    "reach naor",
    "email",
    "phone",
    "linkedin",
    "how to make contact",
    "how can i contact",
  ];

  return terms.some((term) => normalized.includes(term));
}

function contactReply(text: string): string {
  if (isHebrew(text)) {
    return [
      "ניתן ליצור קשר עם נאור באחת מהדרכים הבאות:",
      "",
      `טלפון: ${CONTACT.phone}`,
      `דואר אלקטרוני: ${CONTACT.email}`,
      `LinkedIn: ${CONTACT.linkedin}`,
      "",
      "מומלץ לצרף כמה פרטים על ההזדמנות, הפרויקט או הצורך המקצועי.",
    ].join("\n");
  }

  return [
    "You can contact Naor through any of the following:",
    "",
    `Phone: ${CONTACT.phone}`,
    `Email: ${CONTACT.email}`,
    `LinkedIn: ${CONTACT.linkedin}`,
    "",
    "It is helpful to include a few details about the opportunity, project, or professional need.",
  ].join("\n");
}

const projectKeySchema = z.enum([
  "icd",
  "nba",
  "life_expectancy",
  "metadata",
  "glasses",
  "car_price",
  "portfolio",
]);

const listProjects = tool({
  description:
    "Returns the verified list of projects in Naor's portfolio. Use it for comparisons and recommendations.",
  inputSchema: z.object({}),
  execute: async () =>
    Object.entries(PROJECTS).map(([key, project]) => ({
      key,
      title: project.title,
      category: project.category,
      technologies: project.technologies,
    })),
});

const getProjectDetails = tool({
  description:
    "Returns verified information about one project in Naor's portfolio.",
  inputSchema: z.object({
    project: projectKeySchema,
  }),
  execute: async ({ project }) => PROJECTS[project],
});

const getProfessionalProfile = tool({
  description:
    "Returns verified information about Naor's skills, professional profile, experience, and education.",
  inputSchema: z.object({}),
  execute: async () => PROFILE,
});

const getContactDetails = tool({
  description:
    "Returns Naor's exact verified phone number, email address, and LinkedIn URL. Use this whenever contact details are needed.",
  inputSchema: z.object({}),
  execute: async () => CONTACT,
});

const assessFitForRequest = tool({
  description:
    "Use whenever a visitor asks whether Naor may be able to help with a project, task, role, business problem, or collaboration.",
  inputSchema: z.object({
    request: z.string().min(3).max(500),
  }),
  execute: async ({ request }) => ({
    request,
    profile: PROFILE,
    projects: Object.values(PROJECTS).map((project) => ({
      title: project.title,
      category: project.category,
      technologies: project.technologies,
    })),
    guidance:
      "Identify demonstrated or adjacent skills. Do not guarantee exact expertise, availability, price, or delivery. Even when the fit is uncertain, encourage the visitor to contact Naor directly and describe the request.",
    contact: CONTACT,
  }),
});

export async function POST(request: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        { error: "Gemini API key is not configured." },
        { status: 500 },
      );
    }

    const body: unknown = await request.json();
    const messages = parseMessages(body);
    const latestMessage = messages.at(-1);

    if (!latestMessage || latestMessage.role !== "user") {
      return Response.json(
        { error: "A message is required." },
        { status: 400 },
      );
    }

    // Contact details are returned directly from code, not generated by AI.
    if (isContactRequest(latestMessage.content)) {
      return new Response(
        JSON.stringify({
          reply: contactReply(latestMessage.content),
          toolsUsed: ["verified_contact_details"],
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const transcript = messages
      .map(
        (message) =>
          `${message.role === "user" ? "Visitor" : "Portfolio guide"}: ${
            message.content
          }`,
      )
      .join("\n\n");

    const result = await generateText({
      model: google("gemini-3.1-flash-lite"),
      system: `
You are the AI portfolio guide for Naor Shem-Tov.

Rules:
1. Use tools whenever a question concerns Naor's projects, skills, experience, professional fit, or contact details.
2. Make factual claims about Naor only from tool results.
3. Never invent or alter an email address, phone number, LinkedIn URL, employer, technology, metric, availability, price, or timeline.
4. Contact details must be copied exactly from get_contact_details.
5. Answer in Hebrew when the visitor writes in Hebrew and in English when the visitor writes in English.
6. Keep answers concise, warm, professional, and useful.
7. When a visitor describes a project, role, task, idea, or business need, use assess_fit_for_request.
8. Never reject a legitimate professional inquiry solely because the public information is incomplete.
9. When the fit is uncertain, say so honestly, mention relevant transferable skills, and encourage the visitor to contact Naor directly.
10. Do not promise that Naor can complete the request. A direct conversation is needed to determine exact fit.
11. For professional or business inquiries, end with a relevant invitation to contact Naor.
12. For unrelated, unsafe, medical, legal, or highly personal requests, explain that you specialize in Naor's professional portfolio.
`,
      prompt: `Continue this portfolio conversation:\n\n${transcript}`,
      tools: {
        list_projects: listProjects,
        get_project_details: getProjectDetails,
        get_professional_profile: getProfessionalProfile,
        get_contact_details: getContactDetails,
        assess_fit_for_request: assessFitForRequest,
      },
      stopWhen: stepCountIs(5),
      maxOutputTokens: 550,
      temperature: 0.2,
    });

    const toolsUsed = [
      ...new Set(
        result.steps.flatMap((step) =>
          step.toolCalls.map((toolCall) => toolCall.toolName),
        ),
      ),
    ];

    return new Response(
      JSON.stringify({
        reply: result.text,
        toolsUsed,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Portfolio agent error:", error);

    return Response.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "The AI request failed.",
      },
      { status: 500 },
    );
  }
}
