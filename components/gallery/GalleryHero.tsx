"use client";

import { motion } from "framer-motion";
import { ChevronDown, Camera } from "lucide-react";

export default function GalleryHero() {
  return (
    <section className="gallery-hero">
      <div className="gallery-hero-bg">
        <div className="gallery-orb gallery-orb-1" />
        <div className="gallery-orb gallery-orb-2" />
        <div className="gallery-orb gallery-orb-3" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xs"
        >
          <Camera className="w-4 h-4 text-(--gallery-accent-4)" />
          <span className="text-sm font-medium tracking-wider uppercase text-(--gallery-text-muted)">
            Visual Stories
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6"
        >
          <span className="gallery-gradient-text">Gallery</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl text-(--gallery-text-muted) max-w-2xl mx-auto font-light leading-relaxed"
        >
          A curated collection of moments, perspectives, and visual experiments
          captured through the lens.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          {[
            { label: "Photos", count: "24+" },
            { label: "Categories", count: "5" },
            { label: "Featured", count: "7" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">{stat.count}</div>
              <div className="text-xs uppercase tracking-widest text-(--gallery-text-muted)">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => document.getElementById("gallery-carousel")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-(--gallery-text-muted) hover:text-white transition-colors group"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-5 h-5 gallery-scroll-hint group-hover:text-(--gallery-accent-4)" />
        </button>
      </motion.div>
    </section>
  );
}
