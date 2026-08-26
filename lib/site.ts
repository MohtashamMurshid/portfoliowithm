import type { Metadata } from "next";

export const siteUrl = "https://www.mohtasham.dev";
export const siteName = "Mohtasham Murshid Madani";
export const defaultTitle = `${siteName} | Founder and AI Engineer`;
export const defaultDescription =
  "Mohtasham Murshid Madani is a founder and AI engineer in Kuala Lumpur exploring how artificial intelligence can change the way we live.";
export const rssPath = "/rss.xml";

export function pageAlternates(canonical: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical,
    types: {
      "application/rss+xml": rssPath,
    },
  };
}
