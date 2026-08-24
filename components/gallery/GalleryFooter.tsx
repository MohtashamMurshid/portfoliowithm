"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

export default function GalleryFooter() {
  return (
    <footer className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-(--gallery-surface) to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Let&apos;s create something{" "}
            <span className="gallery-gradient-text">beautiful</span>
          </h2>
          <p className="text-(--gallery-text-muted) text-lg max-w-xl mx-auto mb-10">
            Interested in collaboration or have a project in mind? Reach out and let&apos;s make it happen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:mohtashammurshid@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors"
            >
              Portfolio
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-(--gallery-text-muted)">
            &copy; {new Date().getFullYear()} Mohtasham Murshid Madani. All visuals and content.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
