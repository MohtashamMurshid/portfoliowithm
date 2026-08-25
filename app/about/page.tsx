import type { Metadata } from "next";
import AboutExperience from "./AboutExperience";

export const metadata: Metadata = {
  title: "About Mohtasham",
  description:
    "Mohtasham Murshid Madani is the founder of Oikina, an AI engineer, open-source builder, and researcher based in Kuala Lumpur.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutExperience />;
}
