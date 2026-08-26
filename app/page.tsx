import type { Metadata } from "next";
import HeroExperience from "@/components/home/HeroExperience";
import { pageAlternates, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: pageAlternates(siteUrl),
};

export default function Home() {
  return <HeroExperience />;
}
