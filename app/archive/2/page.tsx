import type { Metadata } from "next";
import ReportExperience from "@/components/report/ReportExperience";

export const revalidate = 86400;

const NPM_PACKAGE = "@mohtasham/md-to-docx";

export const metadata: Metadata = {
  title: "The Office of Imaginary Infrastructure",
  description:
    "Field Report No. 01: software, artificial intelligence, design systems, open-source tools, writing, and visual work by Mohtasham Murshid Madani.",
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
    const formatted = total >= 1_000_000
      ? `${(total / 1_000_000).toFixed(1)}M`
      : total >= 1_000
        ? `${(total / 1_000).toFixed(1)}K`
        : total.toString();
    return `${formatted} recorded downloads`;
  } catch {
    return "Publicly available on npm";
  }
}

export default async function ArchivedReportPage() {
  return (
    <>
      <ReportExperience npmDownloadText={await getNpmDownloads()} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "The Office of Imaginary Infrastructure — Field Report No. 01",
            author: {
              "@type": "Person",
              name: "Mohtasham Murshid Madani",
              url: "https://mohtasham.dev",
            },
            datePublished: "2026",
            description:
              "A portfolio presented as an archival field report about software, artificial intelligence, design, open-source tools, writing, and visual work.",
          }),
        }}
      />
    </>
  );
}
