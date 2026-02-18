import { NextResponse } from "next/server";

const PACKAGE_NAME = "@mohtasham/md-to-docx";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export async function GET() {
  try {
    const start = "2020-01-01";
    const today = new Date().toISOString().split("T")[0];
    const url = `https://api.npmjs.org/downloads/range/${start}:${today}/${PACKAGE_NAME}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      throw new Error(`npm API responded with ${res.status}`);
    }

    const data = await res.json();
    const total = (data.downloads as { downloads: number }[]).reduce(
      (sum, day) => sum + day.downloads,
      0
    );

    return NextResponse.json({
      total,
      formatted: formatNumber(total),
      package: PACKAGE_NAME,
    });
  } catch {
    return NextResponse.json(
      { total: null, formatted: null, package: PACKAGE_NAME, error: "Failed to fetch npm stats" },
      { status: 502 }
    );
  }
}
