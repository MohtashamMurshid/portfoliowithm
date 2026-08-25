"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import styles from "./about.module.css";

const journeyPath =
  "M70 110 C170 70 250 150 335 160 C430 172 430 55 545 75 C660 92 790 135 760 220 C730 295 620 315 535 270 C440 220 360 170 270 225 C185 275 210 340 315 315 C390 295 390 365 485 350 C580 335 640 350 720 350";

const milestones = [
  { label: "Computer science", x: 145, y: 103 },
  { label: "AI + research", x: 335, y: 160 },
  { label: "CitySage", x: 545, y: 75 },
  { label: "getdesign", x: 760, y: 220 },
  { label: "Oikina", x: 535, y: 270 },
  { label: "Open source", x: 315, y: 315 },
];

const entranceDelay = {
  mat: 0.06,
  notebook: 0.46,
  pen: 0.85,
  article: 1.49,
} as const;

function DraggableAsset({
  children,
  className,
  delay = 0,
  label,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
  label: string;
}) {
  const reduceMotion = Boolean(useReducedMotion());
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cleanupDrag = useRef<(() => void) | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => () => cleanupDrag.current?.(), []);

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    cleanupDrag.current?.();
    const origin = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: x.get(),
      y: y.get(),
    };

    function handlePointerMove(moveEvent: globalThis.PointerEvent) {
      x.set(origin.x + moveEvent.clientX - origin.pointerX);
      y.set(origin.y + moveEvent.clientY - origin.pointerY);
    }

    function finishDrag() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
      cleanupDrag.current = null;
      setIsDragging(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);
    cleanupDrag.current = finishDrag;
    setIsDragging(true);
  }

  return (
    <motion.figure
      aria-label={`${label}, draggable`}
      className={`${styles.draggable} ${isDragging ? styles.dragging : ""} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      onPointerDown={handlePointerDown}
      style={{ x, y }}
      transition={{
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0 : 0.44,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.figure>
  );
}

function JourneyGraph({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.section
      className={styles.journey}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reducedMotion ? 0 : 0.7 }}
      aria-labelledby="journey-title"
    >
      <div className={styles.journeyHeading}>
        <p>Still in motion</p>
        <span>There was never a straight line.</span>
      </div>
      <svg viewBox="0 0 850 420" role="img" aria-labelledby="journey-title journey-description">
        <title id="journey-title">My journey so far</title>
        <desc id="journey-description">
          A winding animated path through computer science, AI research, CitySage,
          getdesign, Oikina, and open-source work.
        </desc>
        <motion.path
          className={styles.journeyPath}
          d={journeyPath}
          initial={reducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reducedMotion ? 0 : 2.2, ease: "easeInOut" }}
        />
        {milestones.map((milestone, index) => (
          <motion.g
            className={styles.milestone}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
            key={milestone.label}
            style={{ transformOrigin: `${milestone.x}px ${milestone.y}px` }}
            transition={{ delay: reducedMotion ? 0 : 0.35 + index * 0.22, duration: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <line x1={milestone.x - 5} y1={milestone.y - 5} x2={milestone.x + 5} y2={milestone.y + 5} />
            <line x1={milestone.x + 5} y1={milestone.y - 5} x2={milestone.x - 5} y2={milestone.y + 5} />
            <text x={milestone.x + 10} y={milestone.y - 12}>{milestone.label}</text>
          </motion.g>
        ))}
        <g className={styles.nowMarker}>
          <line x1="720" y1="350" x2="720" y2="319" />
          <path d="M720 319 L746 328 L720 337 Z" />
          <text x="700" y="382">Now, still tinkering</text>
        </g>
        {reducedMotion ? null : (
          <circle className={styles.traveller} cx="0" cy="0" r="5">
            <animateMotion dur="11s" path={journeyPath} repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </motion.section>
  );
}

export default function AboutExperience() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.main
      className={styles.page}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: reduceMotion ? 0 : 0.29, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className={styles.desk} aria-label="A draggable desk assembled from generated objects">
        <DraggableAsset className={styles.mat} delay={entranceDelay.mat} label="A worn green cutting mat">
          <Image src="/about/cutting-mat.png" alt="" fill priority sizes="(max-width: 720px) 110vw, 76vw" />
        </DraggableAsset>
        <DraggableAsset className={styles.notebook} delay={entranceDelay.notebook} label="An open grid-paper notebook">
          <Image
            src="/about/open-notebook-mohtasham-transparent.png"
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 92vw, 55vw"
          />
          <div className={styles.notebookNote} aria-hidden="true">
            <time dateTime="2026-08-25">25 / 08 / 2026</time>
            <p>Follow the interesting question.</p>
            <span>Mohtasham</span>
          </div>
        </DraggableAsset>
        <DraggableAsset className={styles.pen} delay={entranceDelay.pen} label="An orange fountain pen">
          <span className={styles.penArt}>
            <Image src="/about/orange-pen.png" alt="" fill loading="eager" sizes="(max-width: 720px) 38vw, 14rem" unoptimized />
          </span>
        </DraggableAsset>
      </section>

      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className={styles.article}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        transition={{
          delay: reduceMotion ? 0 : entranceDelay.article,
          duration: reduceMotion ? 0 : 0.48,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <header className={styles.intro}>
          <h1>Exploring curiously...</h1>
          <p className={styles.updated}>Updated Aug 25, 2026</p>
          <blockquote>
            <span aria-hidden="true">&quot;</span>
            What changes when AI can help <em>shape the work</em>, instead of waiting
            at the end of it?
            <span aria-hidden="true">&quot;</span>
          </blockquote>
        </header>

        <section className={styles.prose} aria-label="About Mohtasham">
          <p className={styles.dropCap}>
            Everything I&apos;ve built started with the same impulse: make something
            useful, then let the work tell me what it needs.
          </p>
          <p>
            I studied computer science with a focus on artificial intelligence. The
            degree gave me the theory, but shipping projects taught me how ideas behave
            once people can actually touch them. A document converter, a camera tool,
            and an AI product all ask different questions. The only reliable way I&apos;ve
            found to answer them is to build.
          </p>
        </section>

        <DraggableAsset className={styles.sketches} label="A collage of technical sketches">
          <Image
            src="/about/sketch-collage.png"
            alt=""
            fill
            sizes="(max-width: 720px) calc(100vw - 32px), 42rem"
          />
        </DraggableAsset>

        <section className={styles.prose} aria-label="Current work">
          <p>
            I&apos;m based in Kuala Lumpur and work as an AI Engineer at CitySage. I&apos;m
            also building Oikina and founded getdesign, a tool that turns live interfaces
            into reusable design systems. Open-source work sits between all of it. That
            is usually where a private annoyance becomes a useful public tool.
          </p>
          <h2>Looking ahead</h2>
          <p>
            I care about software that gives people a new ability, not another screen to
            manage. Right now I&apos;m interested in agents, creative tools, and products
            that make their intelligence legible enough to trust.
          </p>
        </section>

        <JourneyGraph reducedMotion={reduceMotion} />

        <section className={`${styles.prose} ${styles.closing}`} aria-label="Closing note">
          <p>
            The thread through all of this is simple. I follow the question that refuses
            to leave, make the smallest real version of it, and pay attention to what
            happens next.
          </p>
          <p className={styles.underlined}>Keep following the interesting question.</p>
          <p className={styles.signature}>Mohtasham</p>
          <p className={styles.signatureDate}>August 2026</p>
        </section>

        <footer className={styles.footer}>
          <p>
            <Link href="/books">Check my favorite books</Link>.
          </p>
          <p>
            You can <a href="mailto:mohtashammurshid@gmail.com">email me</a>, find me on{" "}
            <a href="https://x.com/mohtashamdotdev">X</a> and{" "}
            <a href="https://www.linkedin.com/in/mohtashammurshid/">LinkedIn</a>, or look
            through <Link href="/work">my work</Link>.
          </p>
        </footer>
      </motion.article>
    </motion.main>
  );
}
