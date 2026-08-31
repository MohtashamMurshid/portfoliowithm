import type { Metadata } from "next";
import { pageAlternates } from "@/lib/site";
import HouseExperience from "./HouseExperience";

const description = "An interactive exterior reconstruction of my home in Kashmir. Rotate and zoom to explore its twin gables, stone walls, balconies, and carved wooden doors.";

export const metadata: Metadata = {
  title: "Home, in Kashmir",
  description,
  alternates: pageAlternates("/house"),
  openGraph: {
    title: "Home, in Kashmir | Mohtasham",
    description,
    url: "/house",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Home, in Kashmir | Mohtasham",
    description,
  },
};

export default function HousePage() {
  return <HouseExperience />;
}
