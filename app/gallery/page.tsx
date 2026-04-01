import type { Metadata } from "next";
import GalleryBoard from "@/components/gallery/GalleryBoard";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A curated visual gallery of photography, landscapes, portraits, and creative work by Mohtasham Murshid Madani.",
  openGraph: {
    title: "Gallery | Mohtasham Murshid Madani",
    description:
      "A curated visual gallery of photography, landscapes, portraits, and creative work.",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <GalleryBoard />
    </div>
  );
}
