import type { Metadata } from "next";
import { PortfolioPage } from "../portfolio-page";

export const metadata: Metadata = {
  title: "נאור שם-טוב | Data, AI & BI",
  description:
    "תיק העבודות של נאור שם-טוב - פרויקטים עצמאיים בדאטה, בינה מלאכותית ו-BI, ניסיון מקצועי ומחקר יישומי.",
};

export default function HebrewPortfolio() {
  return <PortfolioPage locale="he" />;
}
