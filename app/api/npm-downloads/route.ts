import { NextResponse } from "next/server";
import { methodNotAllowedResponse, problemResponse } from "@/lib/api-problems";

const PACKAGE_NAME = "@mohtasham/md-to-docx";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export async function GET(request: Request) {
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
    return problemResponse(request, {
      title: "npm statistics unavailable",
      status: 502,
      detail: `Download statistics for ${PACKAGE_NAME} could not be read from npm.`,
      code: "NPM_STATS_UNAVAILABLE",
      resolution: "Retry later. Do not treat the unavailable count as zero.",
    });
  }
}

const methodNotAllowed = (request: Request) => methodNotAllowedResponse(request);

export {
  methodNotAllowed as POST,
  methodNotAllowed as PUT,
  methodNotAllowed as PATCH,
  methodNotAllowed as DELETE,
  methodNotAllowed as OPTIONS,
};
