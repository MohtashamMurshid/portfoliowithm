"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./about.module.css";

const journeyPath =
  "M70 110 C170 70 250 150 335 160 C430 172 430 55 545 75 C660 92 790 135 760 220 C730 295 620 315 535 270 C440 220 360 170 270 225 C185 275 210 340 315 315 C390 295 390 365 485 350 C580 335 640 350 720 350";

const milestones = [
  { label: "2023 Computer science", x: 145, y: 103 },
  { label: "2024 AI research", x: 335, y: 160 },
  { label: "2025 CitySage internship", x: 545, y: 75 },
  { label: "2025 Open source", x: 760, y: 220 },
  { label: "2026 getdesign", x: 535, y: 270 },
  { label: "2026 Oikina", x: 315, y: 315 },
];

const entranceDelay = {
  mat: 0.06,
  notebook: 0.46,
  pen: 0.85,
  article: 1.49,
} as const;

const personalPhotos = [
  {
    src: "/about/mountain-lake.jpg",
    alt: "A blue lake below a range of snow-capped mountains",
  },
  {
    src: "/about/mountain-portrait.jpg",
    alt: "Mohtasham standing alone in front of a mountain slope",
  },
  {
    src: "/about/mountain-river.jpg",
    alt: "A river running below a forest and snow-covered mountains",
  },
] as const;

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
        <p>How I got here</p>
        <span>Kashmir to Kuala Lumpur.</span>
      </div>
      <svg viewBox="0 0 850 420" role="img" aria-labelledby="journey-title journey-description">
        <title id="journey-title">My journey so far</title>
        <desc id="journey-description">
          A winding animated path through computer science, AI research, a CitySage
          internship, open-source work, getdesign, and Oikina.
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

function PersonalPhotoStack() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const selectedPhoto = activePhoto === null ? null : personalPhotos[activePhoto];

  useEffect(() => {
    if (activePhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActivePhoto(null);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto]);

  const lightbox = selectedPhoto ? (
    <div
      aria-label="Enlarged personal photograph"
      aria-modal="true"
      className={styles.lightbox}
      onClick={() => setActivePhoto(null)}
      role="dialog"
    >
      <button
        aria-label="Close enlarged photograph"
        autoFocus
        className={styles.lightboxClose}
        onClick={() => setActivePhoto(null)}
        type="button"
      >
        Close
      </button>
      <div className={styles.lightboxFrame} onClick={(event) => event.stopPropagation()}>
        <Image alt={selectedPhoto.alt} fill sizes="100vw" src={selectedPhoto.src} />
      </div>
    </div>
  ) : null;

  return (
    <>
      <figure className={styles.photoStack}>
        {personalPhotos.map((photo, index) => (
          <button
            aria-label={`Enlarge photograph ${index + 1} of ${personalPhotos.length}`}
            className={styles.photoCard}
            key={photo.src}
            onClick={() => setActivePhoto(index)}
            type="button"
          >
            <Image alt={photo.alt} fill sizes="(max-width: 720px) 68vw, 25rem" src={photo.src} />
          </button>
        ))}
        <figcaption>A few photographs from home and my trips.</figcaption>
      </figure>
      {lightbox && typeof document !== "undefined"
        ? createPortal(lightbox, document.body)
        : null}
    </>
  );
}

export default function AboutExperience() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <main className={styles.page}>
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
            <time dateTime="2026-08-26">26 / 08 / 2026</time>
            <p>Kashmir to Kuala Lumpur.</p>
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
          <h1>Hi, I&apos;m Mohtasham.</h1>
          <p className={styles.updated}>Updated Aug 26, 2026</p>
          <blockquote>
            <span aria-hidden="true">&quot;</span>
            My first memory of computers is <em>Microsoft Paint</em> on my dad&apos;s PC.
            <span aria-hidden="true">&quot;</span>
          </blockquote>
        </header>

        <section className={styles.prose} aria-label="About Mohtasham">
          <h2>About me</h2>
          <p className={styles.dropCap}>
            I&apos;m Mohtasham Murshid Madani, an engineer from Kashmir now based in Kuala
            Lumpur. I tend to describe myself in four parts: founder of Oikina, AI
            engineer, open-source builder, and researcher.
          </p>
          <p>
            Day to day, I&apos;m an engineer. Outside work, I&apos;m usually building Oikina or
            one of my open-source projects. I&apos;ve always been nerdy about computers and
            AI. My first Python program added two numbers. I later made a simple HTML
            website. Neither did much, but writing something that controlled the computer
            was enough to pull me into programming.
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

        <section className={styles.prose} aria-label="Background and current work">
          <h2>From Kashmir to Kuala Lumpur</h2>
          <p>
            I was born in 2004 and grew up in Kashmir. I moved to Kuala Lumpur in
            February to study computer science at Taylor&apos;s University. AI was booming,
            and I wanted to do something technical, so I specialised in artificial
            intelligence. I graduated in 2026 with first-class honours.
          </p>
          <p>
            I started doing research in my second year, including an early piece about
            security. In my third year, I joined CitySage as an intern. I returned after
            graduating and started working there as an AI engineer in March 2026.
          </p>
          <p>
            <Link href="/work/archive/bounty">Bounty</Link>, my final-year project, was
            the first time I felt like a real engineer. It was an Expo and Convex mobile
            prototype for posting small paid errands and finding nearby people willing
            to do them. My open-source work became serious soon after. I started
            md-to-docx on 29 March 2025 because I needed editable Word files for my own
            workflow. I began getdesign shortly before graduating, then started Oikina
            in July 2026.
          </p>
          <h2>What I&apos;m doing now</h2>
          <p>
            At CitySage, I build AI agents for government and city councils, along with
            geospatial AI software. Most of my own time goes into Oikina, my startup. I
            also maintain open-source projects, work on getdesign, and research language
            models and AI systems.
          </p>
          <h2>Looking ahead</h2>
          <p>
            Right now I&apos;m obsessed with learning how language models work. I do not
            understand them as deeply as I want to yet. That gap is what I&apos;m focused on.
          </p>
        </section>

        <JourneyGraph reducedMotion={reduceMotion} />

        <section className={styles.prose} aria-label="Life away from work">
          <h2>Away from work</h2>
          <p>
            When I&apos;m away from my computer, I sleep. A lot. I play Valorant—mostly
            Viper, Omen, and Jett—and watch scripted Minecraft videos.
          </p>
          <p>
            I ski in Gulmarg almost every year. It is my retreat and one of the few
            things that gets my full attention away from work.
          </p>
          <p>
            Kashmir still feels like home. Every time I go back, I&apos;m still mesmerized by
            how beautiful it is. The people closest to me see me as direct and honest.
          </p>
        </section>

        <PersonalPhotoStack />

        <section className={`${styles.prose} ${styles.closing}`} aria-label="Closing note">
          <p>
            I love computers, I care about AI, and I want to spend my time building
            things that put both to work.
          </p>
          <p className={styles.underlined}>Still building.</p>
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
    </main>
  );
}
