import type { Metadata } from "next";
import HeroExperience from "@/components/home/HeroExperience";
import { blogPosts } from "@/lib/blogPosts";
import { pageAlternates, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: pageAlternates(siteUrl),
};

export default function Home() {
  const latestPost = [...blogPosts].sort((left, right) => right.date.localeCompare(left.date))[0];

  return (
    <HeroExperience
      latestPost={{
        slug: latestPost.slug,
        title: latestPost.shortTitle,
      }}
    />
  );
}
