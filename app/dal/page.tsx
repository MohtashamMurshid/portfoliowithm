import type { Metadata } from "next";
import { pageAlternates } from "@/lib/site";
import DalExperience from "./DalExperience";

const description = "Dal Lake from a houseboat — a procedural risograph short. Late afternoon light, Zabarwan beyond the water.";

export const metadata: Metadata = {
  title: "Dal Lake, from a houseboat",
  description,
  alternates: pageAlternates("/dal"),
  openGraph: {
    title: "Dal Lake, from a houseboat | Mohtasham",
    description,
    url: "/dal",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dal Lake, from a houseboat | Mohtasham",
    description,
  },
};

export default function DalPage() {
  return <DalExperience />;
}
