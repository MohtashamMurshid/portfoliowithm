"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className={styles.page}
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{
          opacity: 0,
          transition: { duration: reduceMotion ? 0 : 0.14, ease: [0.4, 0, 1, 1] },
        }}
      >
        <SiteHeader />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
