import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryCarousel from "@/components/gallery/GalleryCarousel";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import GalleryFooter from "@/components/gallery/GalleryFooter";
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
      <div className="gallery-noise" />
      <GalleryHero />
      <GalleryCarousel />
      <MasonryGrid />
      <GalleryFooter />
    </div>
  );
}
