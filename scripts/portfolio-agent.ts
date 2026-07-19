import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

type ProjectKey =
  | "icd"
  | "nba"
  | "life-expectancy"
  | "metadata"
  | "glasses"
  | "portfolio";

type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  result: string;
  github?: string;
};

const projects: Record<ProjectKey, Project> = {
  icd: {
    title: "ICD-10-GM Embedding Benchmark",
    category: "Healthcare NLP",
    description:
      "A benchmark comparing multilingual and biomedical embedding models for German ICD-10-GM medical codes, including retrieval evaluation and reproducible validation.",
    technologies: [
      "Python",
      "NLP",
      "Embeddings",
      "Information Retrieval",
      "Machine Learning",
    ],
    result:
      "Produced a reproducible comparison between multilingual and biomedical embedding approaches for German medical terminology.",
    github:
      "https://github.com/naor7749/icd10gm-embedding-benchmark",
  },

  nba: {
    title: "NBA Functional Archetypes",
    category: "Unsupervised Learning",
    description:
      "A clustering project that identifies functional NBA player archetypes and examines whether team diversity is associated with regular-season and playoff success.",
    technologies: [
      "Python",
      "K-Means",
      "Hierarchical Clustering",
      "UMAP",
      "Pandas",
    ],
    result:
      "Found performance-based player groups that provided a more useful analytical representation than traditional basketball positions.",
    github: "https://github.com/naor7749/nba-functional-archetypes",
  },

  "life-expectancy": {
    title: "Global Life Expectancy Analysis",
    category: "Data Analysis and Storytelling",
    description:
      "An exploratory global analysis of health, education and development factors associated with life expectancy, including interactive visualizations.",
    technologies: [
      "Python",
      "Pandas",
      "Plotly",
      "Statistics",
      "Data Visualization",
    ],
    result:
      "Converted complex relationships between health and socioeconomic variables into a clear interactive data story.",
    github:
      "https://github.com/naor7749/global-life-expectancy-analysis",
  },

  metadata: {
    title: "Scientific Article Metadata Pipeline",
    category: "Data Engineering",
    description:
      "A pipeline for collecting, cleaning, standardizing and validating metadata from scientific articles.",
    technologies: [
      "Python",
      "APIs",
      "ETL",
      "Data Validation",
      "Data Quality",
    ],
    result:
      "Created a documented and extensible workflow that produces analysis-ready scientific metadata.",
    github:
      "https://github.com/naor7749/scientific-article-metadata-pipeline",
  },

  glasses: {
    title: "Glasses Classification – CNN",
    category: "Deep Learning and Computer Vision",
    description:
      "An image-classification project comparing a custom CNN with transfer-learning architectures for identifying whether a person is wearing glasses.",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "CNN",
      "Computer Vision",
      "Transfer Learning",
    ],
    result:
      "Implemented a complete deep-learning workflow including preprocessing, augmentation, training, checkpoints and classification metrics.",
  },

  portfolio: {
    title: "Bilingual Data and AI Portfolio",
    category: "Web Development",
    description:
      "A bilingual and responsive portfolio website presenting Data, AI and BI projects through interactive project previews.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Responsive Web Development",
      "Vercel",
    ],
    result:
      "Built and deployed a bilingual professional website with interactive project modals and embedded Plotly visualizations.",
    github: "https://github.com/naor7749/naor-data-ai-portfolio",
  },
};

const listProjectsTool = tool({
  name: "list_portfolio_projects",

  description:
    "Return a list of all projects in Naor Shem-Tov's portfolio. Use this when the user asks what projects exist, requests recommendations, or asks which project matches a field.",

  parameters: z.object({}),

  execute: async () => {
    return Object.entries(projects).map(([key, project]) => ({
      key,
      title: project.title,
      category: project.category,
      technologies: project.technologies,
    }));
  },
});

const getProjectDetailsTool = tool({
  name: "get_project_details",

  description:
    "Return verified details about one specific project in Naor Shem-Tov's portfolio.",

  parameters: z.object({
    project: z
      .enum([
        "icd",
        "nba",
        "life-expectancy",
        "metadata",
        "glasses",
        "portfolio",
      ])
      .describe("The unique project key"),
  }),

  execute: async ({ project }) => {
    return projects[project];
  },
});

const portfolioAgent = new Agent({
  name: "Naor Portfolio Guide",

  model: "gpt-5.4-mini",

  instructions: `
You are the AI portfolio guide for Naor Shem-Tov.

Your purpose is to help recruiters, hiring managers and other visitors
understand Naor's projects and technical capabilities.

Rules:
1. Use the available tools whenever the question concerns projects.
2. Base project claims only on information returned by the tools.
3. Never invent metrics, employers, technologies or project results.
4. Answer in Hebrew when the user writes in Hebrew.
5. Answer in English when the user writes in English.
6. Be concise, professional and useful.
7. When relevant, recommend the strongest matching project and explain why.
8. Include the GitHub link when one is available.
`,

  tools: [listProjectsTool, getProjectDetailsTool],
});

async function main(): Promise<void> {
  const question = process.argv.slice(2).join(" ").trim();

  if (!question) {
    console.error(
      'Please provide a question.\nExample: npm run agent -- "Which project uses NLP?"',
    );
    process.exitCode = 1;
    return;
  }

  try {
    console.log("\nQuestion:");
    console.log(question);
    console.log("\nAgent response:\n");

    const result = await run(portfolioAgent, question);

    console.log(result.finalOutput);
  } catch (error) {
    console.error("\nThe agent failed:");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  }
}

void main();