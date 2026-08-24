import type { Metadata } from "next";
import HeroExperience from "@/components/home/HeroExperience";

export const metadata: Metadata = {
  title: "Mohtasham Murshid Madani | Founder and AI Engineer",
  description:
    "Mohtasham Murshid Madani is a founder and AI engineer in Kuala Lumpur exploring how artificial intelligence can change the way we live.",
};

export default function Home() {
  return <HeroExperience />;
}
