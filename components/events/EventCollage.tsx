"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import styles from "@/app/events/events.module.css";
import PortfolioImage from "@/components/PortfolioImage";
import { getLastCommittedPathname } from "@/components/navigation/clientRouteHistory";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export type EventCollageItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  href: string;
  external?: boolean;
  image: string;
  imageAlt: string;
};

const MotionLink = motion.create(Link);

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] },
  },
};

function EventPoster({ event }: { event: EventCollageItem }) {
  return (
    <div className={styles.poster}>
      <PortfolioImage
        src={event.image}
        alt={event.imageAlt}
        fill
        sizes="(max-width: 760px) 190px, 210px"
      />
    </div>
  );
}

export default function EventCollage({ events }: { events: readonly EventCollageItem[] }) {
  const reduceMotion = usePrefersReducedMotion();
  const [playEntrance] = useState(() => {
    const previousPathname = getLastCommittedPathname();
    return !previousPathname?.startsWith("/events");
  });
  const shouldAnimate = playEntrance && !reduceMotion;
  const initial = shouldAnimate ? "hidden" : false;

  return (
    <motion.div
      className={styles.collage}
      aria-label="Four events hosted or co-hosted by Mohtasham"
      initial={initial}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: shouldAnimate ? 0.22 : 0,
            staggerChildren: shouldAnimate ? 0.14 : 0,
          },
        },
      }}
    >
      {events.map((event, index) => (
        <MotionLink
          className={styles.collageCard}
          href={event.href}
          key={event.id}
          target={event.external ? "_blank" : undefined}
          rel={event.external ? "noreferrer" : undefined}
          variants={cardVariants}
          aria-label={`Open ${event.title}, ${event.date}, ${event.place}`}
        >
          <EventPoster event={event} />
          <span>{event.title}</span>
          <small>{event.place}</small>
          <i aria-hidden="true">0{index + 1}</i>
        </MotionLink>
      ))}
    </motion.div>
  );
}
