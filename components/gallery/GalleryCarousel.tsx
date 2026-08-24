"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { featuredItems, type GalleryItem } from "./galleryData";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CarouselCard({ item, index }: { item: GalleryItem; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="carousel-item relative"
      style={{
        width: item.orientation === "portrait" ? 300 : item.orientation === "square" ? 380 : 520,
        height: item.orientation === "portrait" ? 440 : 340,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: item.color }}
      />
      <Image
        src={item.thumbnail}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 280px, 520px"
        className={`object-cover rounded-2xl transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
        {item.description && (
          <p className="text-white/70 text-sm mt-1">{item.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "left" ? -500 : 500;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="gallery-carousel" className="py-20 sm:py-28">
      <div className="px-6 sm:px-12 md:px-16 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Featured
            </h2>
            <p className="mt-2 text-(--gallery-text-muted) text-base sm:text-lg">
              Handpicked highlights from the collection
            </p>
          </div>

          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:border-white/30"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:border-white/30"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide px-6 sm:px-12 md:px-16"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div ref={trackRef} className="carousel-track pb-4">
          {featuredItems.map((item, index) => (
            <CarouselCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
