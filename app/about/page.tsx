import type { Metadata } from "next";
import { getOgImage } from "@/lib/ogImage";
import { pageAlternates } from "@/lib/site";
import AboutExperience from "./AboutExperience";

const siteUrl = "https://www.mohtasham.dev";
const description =
  "Mohtasham Murshid Madani is the founder of Oikina, an AI engineer, open-source builder, and researcher based in Kuala Lumpur.";
const aboutOgImage = getOgImage("page", "About Mohtasham Murshid Madani", "about");

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/about#profile-page`,
  url: `${siteUrl}/about`,
  name: "About Mohtasham Murshid Madani",
  dateModified: "2026-08-27",
  mainEntity: {
    "@id": `${siteUrl}/#person`,
  },
};

export const metadata: Metadata = {
  title: "About Mohtasham",
  description,
  alternates: pageAlternates("/about"),
  openGraph: {
    title: "About Mohtasham",
    description,
    url: "/about",
    images: [aboutOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mohtasham",
    description,
    images: [aboutOgImage],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
