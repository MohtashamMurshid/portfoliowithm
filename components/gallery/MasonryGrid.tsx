"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryItems, categories, type GalleryItem, type Category } from "./galleryData";
import { X, ZoomIn } from "lucide-react";

function MasonryItem({
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="masonry-item group cursor-pointer"
      onClick={() => onOpen(item)}
    >
      <div className="relative" style={{ aspectRatio }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: item.color }}
        />
        <Image
          src={item.thumbnail}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="masonry-overlay">
          <div className="w-full">
            <h3 className="text-white font-semibold text-base">{item.title}</h3>
            {item.description && (
              <p className="text-white/60 text-sm mt-1 line-clamp-2">{item.description}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs uppercase tracking-wider text-(--gallery-accent-4) font-medium">
                {item.category}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
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
      transition={{ duration: 0.3 }}
      className="lightbox-backdrop"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: item.orientation === "portrait" ? "min(600px, 80vw)" : "min(1000px, 90vw)",
            aspectRatio: `${item.width}/${item.height}`,
            maxHeight: "85vh",
            backgroundColor: item.color,
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={`object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute -bottom-16 left-0 right-0 text-center"
        >
          <h3 className="text-white font-semibold text-lg">{item.title}</h3>
          {item.description && (
            <p className="text-white/50 text-sm mt-1">{item.description}</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function MasonryGrid() {
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
    <section className="py-16 sm:py-24">
      <div className="px-6 sm:px-12 md:px-16 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Collection
          </h2>
          <p className="text-(--gallery-text-muted) text-base sm:text-lg mb-8 sm:mb-10">
            Browse the full gallery by category
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`category-pill ${activeCategory === cat.value ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div layout className="masonry-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <MasonryItem
              key={item.id}
              item={item}
              index={index}
              onOpen={openLightbox}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </section>
  );
}
