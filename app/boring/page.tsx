import type { Metadata } from "next";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import GithubInfo from "@/components/GithubInfo";
import { getOgImage } from "@/lib/ogImage";
import { pageAlternates } from "@/lib/site";

export const revalidate = 86400;

const NPM_PACKAGE = "@mohtasham/md-to-docx";
const description =
  "The conventional portfolio of Mohtasham Murshid Madani: current work, projects, skills, writing, and public repositories.";
const boringOgImage = getOgImage("The plain portfolio of Mohtasham Murshid Madani");

export const metadata: Metadata = {
  title: "Plain Portfolio",
  description,
  robots: { index: false, follow: true },
  alternates: pageAlternates("/boring"),
  openGraph: {
    title: "Plain Portfolio",
    description,
    url: "/boring",
    images: [boringOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plain Portfolio",
    description,
    images: [boringOgImage],
  },
};

async function getNpmDownloads(): Promise<string> {
  try {
    const start = "2020-01-01";
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/${start}:${today}/${NPM_PACKAGE}`,
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) throw new Error(`npm API ${response.status}`);

    const data = await response.json();
    const total = (data.downloads as { downloads: number }[]).reduce(
      (sum, day) => sum + day.downloads,
      0,
    );

    const formatted =
      total >= 1_000_000
        ? `${(total / 1_000_000).toFixed(1)}M`
        : total >= 1_000
          ? `${(total / 1_000).toFixed(1)}K`
          : total.toString();

    return `Over ${formatted} downloads on npm.`;
  } catch {
    return "Available on npm.";
  }
}

export default async function BoringPage() {
  const npmText = await getNpmDownloads();

  return (
    <>
      <Landing npmDownloadText={npmText} />
      <Skills />
      <GithubInfo />
    </>
  );
}
