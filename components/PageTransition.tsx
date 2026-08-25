"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      className={styles.page}
      key={pathname}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <SiteHeader />
      {children}
    </motion.div>
  );
}
