import type { Metadata } from "next";

export const siteUrl = "https://www.mohtasham.dev";
export const siteName = "Mohtasham Murshid Madani";
export const portfolioName = "Mohtasham's Portfolio";
export const contactEmail = "mohtashammurshid@gmail.com";
export const defaultTitle = `${portfolioName} | ${siteName}, Founder and AI Engineer`;
export const defaultDescription =
  "Mohtasham Murshid Madani is a founder and AI engineer in Kuala Lumpur exploring how artificial intelligence can change the way we live.";
export const rssPath = "/rss.xml";

export function markdownPath(pathname: string) {
  const path = new URL(pathname, siteUrl).pathname.replace(/\/$/, "");
  return `${path}/index.md`;
}

export function pageAlternates(canonical: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical,
    types: {
      "application/rss+xml": rssPath,
      "text/markdown": markdownPath(canonical),
    },
  };
}
