import type { Metadata } from "next";
import BoringPage from "../../boring/page";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Archive 01 | The plain portfolio",
  description:
    "The conventional portfolio of Mohtasham Murshid Madani: current work, projects, skills, writing, and public repositories.",
};

export default function PlainArchivePage() {
  return <BoringPage />;
}
