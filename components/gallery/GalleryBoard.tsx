"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryItems, categories, type GalleryItem, type Category } from "./galleryData";
import { X, Play } from "lucide-react";

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  const aspectRatio =
    item.orientation === "portrait"
      ? "3/4"
      : item.orientation === "square"
        ? "1/1"
        : "4/3";

  return (
    <div className="gallery-card" onClick={() => onOpen(item)}>
      <div className="relative" style={{ aspectRatio }}>
        <div className="absolute inset-0 bg-secondary" />
        <Image
          src={item.thumbnail}
          alt={item.alt}
          fill
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
        <div className="gallery-card-caption">
          {item.title}
          {item.description && <span className="opacity-70"> — {item.description}</span>}
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="lightbox-backdrop"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            width: item.orientation === "portrait" ? "min(550px, 80vw)" : "min(900px, 90vw)",
            aspectRatio: `${item.width}/${item.height}`,
            maxHeight: "85vh",
            backgroundColor: "hsl(var(--secondary))",
          }}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className={`object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
              priority
            />
          )}
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-white font-medium text-base">{item.title}</h3>
          {item.description && (
            <p className="text-white/50 text-sm mt-1">{item.description}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryBoard() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxItem(item);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <header className="gallery-header">
        <p className="gallery-title">Gallery</p>
        <p className="gallery-subtitle">A collection of moments.</p>

        <div className="gallery-tags">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`gallery-tag ${activeCategory === cat.value ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="gallery-masonry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpen={openLightbox}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <footer className="gallery-footer">
        &copy; {new Date().getFullYear()} Mohtasham Murshid Madani
      </footer>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}
