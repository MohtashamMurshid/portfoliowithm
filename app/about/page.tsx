import type { Metadata } from "next";
import AboutExperience from "./AboutExperience";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Mohtasham Murshid Madani, a founder and AI engineer based in Kuala Lumpur.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutExperience />;
}
