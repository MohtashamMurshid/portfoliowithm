"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "@/app/work/work.module.css";
import { getLastCommittedPathname } from "@/components/navigation/clientRouteHistory";

const projectVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WorkEntrance({
  featured,
  projects,
}: {
  featured: ReactNode;
  projects: ReactNode[];
}) {
  const reduceMotion = Boolean(useReducedMotion());
  const [playEntrance] = useState(() => {
    const previousPathname = getLastCommittedPathname();
    return !previousPathname?.startsWith("/work/");
  });
  const shouldAnimate = playEntrance && !reduceMotion;
  const initial = shouldAnimate ? "hidden" : false;

  return (
    <section className={styles.featured} aria-labelledby="featured-title">
      <motion.h1
        id="featured-title"
        initial={initial}
        animate="visible"
        variants={projectVariants}
      >
        Featured work
      </motion.h1>

      <motion.div
        className={styles.featuredReveal}
        initial={initial}
        animate="visible"
        variants={projectVariants}
        transition={{ delay: shouldAnimate ? 0.22 : 0 }}
      >
        {featured}
      </motion.div>

      <motion.div
        className={styles.grid}
        aria-label="Selected projects"
        initial={initial}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: shouldAnimate ? 0.68 : 0,
              staggerChildren: shouldAnimate ? 0.14 : 0,
            },
          },
        }}
      >
        {projects.map((project, index) => (
          <motion.div className={styles.projectReveal} key={index} variants={projectVariants}>
            {project}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
