import type { Metadata } from "next";
import { PortfolioPage } from "../portfolio-page";

export const metadata: Metadata = {
  title: "Naor Shem-Tov | Data, AI & BI",
  description:
    "Naor Shem-Tov's portfolio - independent data, AI, and BI projects, professional experience, and applied research.",
};

export default function EnglishPortfolio() {
  return <PortfolioPage locale="en" />;
}
