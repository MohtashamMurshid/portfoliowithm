import type { Metadata } from "next";
import { getOgImage } from "@/lib/ogImage";
import { pageAlternates } from "@/lib/site";
import BoringPage from "../../boring/page";

export const revalidate = 86400;

const description =
  "The conventional portfolio of Mohtasham Murshid Madani: current work, projects, skills, writing, and public repositories.";
const archiveOgImage = getOgImage("Portfolio archive 01 by Mohtasham Murshid Madani");

export const metadata: Metadata = {
  title: "Archive 01 | The plain portfolio",
  description,
  robots: { index: false, follow: true },
  alternates: pageAlternates("/archive/1"),
  openGraph: {
    title: "Archive 01 | The plain portfolio",
    description,
    url: "/archive/1",
    images: [archiveOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive 01 | The plain portfolio",
    description,
    images: [archiveOgImage],
  },
};

export default function PlainArchivePage() {
  return <BoringPage />;
}
