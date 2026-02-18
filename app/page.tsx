import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import GithubInfo from "@/components/GithubInfo";

export const revalidate = 86400;

const NPM_PACKAGE = "@mohtasham/md-to-docx";

async function getNpmDownloads(): Promise<string> {
  try {
    const start = "2020-01-01";
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `https://api.npmjs.org/downloads/range/${start}:${today}/${NPM_PACKAGE}`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) throw new Error(`npm API ${res.status}`);

    const data = await res.json();
    const total = (data.downloads as { downloads: number }[]).reduce(
      (sum, day) => sum + day.downloads,
      0
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

export default async function Home() {
  const npmText = await getNpmDownloads();

  return (
    <>
      <Landing npmDownloadText={npmText} />
      <Skills />
      <GithubInfo />
    </>
  );
}
