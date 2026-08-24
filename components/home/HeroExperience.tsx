"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import FutureLetter from "./FutureLetter";
import ProjectCollage from "./ProjectCollage";
import styles from "./HeroExperience.module.css";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Archive", href: "/archive" },
];

type DraggableObjectProps = {
  children: React.ReactNode;
  className: string;
  href?: string;
  label: string;
  reducedMotion: boolean;
};

function DraggableObject({
  children,
  className,
  href,
  label,
  reducedMotion,
}: DraggableObjectProps) {
  if (href) {
    return (
      <motion.a
        className={`${styles.object} ${className}`}
        href={href}
        draggable={false}
        drag
        dragMomentum={false}
        dragElastic={0.12}
        whileHover={reducedMotion ? undefined : { scale: 1.025, rotate: 0 }}
        whileTap={{ scale: 0.98, cursor: "grabbing" }}
        aria-label={`${label}, draggable link`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={`${styles.object} ${className}`}
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileHover={reducedMotion ? undefined : { scale: 1.025, rotate: 0 }}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      aria-label={`${label}, draggable decoration`}
      role="img"
    >
      {children}
    </motion.div>
  );
}

export default function HeroExperience() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <main className={styles.home} id="top">
      <header className={styles.header}>
        <Link className={styles.mark} href="#top" aria-label="Mohtasham, home">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="2" y="2" width="44" height="44" rx="13" />
            <path d="M10 34V14l7 10 7-10 7 10 7-10v20" />
          </svg>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              className={index === 0 ? styles.activeNav : undefined}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.socials} aria-label="Social links">
          <a href="https://github.com/mohtashammurshid" aria-label="GitHub">
            <FaGithub aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/mohtashammurshid/" aria-label="LinkedIn">
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <DraggableObject className={styles.macbook} label="A closed MacBook" reducedMotion={reduceMotion}>
          <Image src="/hero/macbook-midnight-m3.png" alt="" fill priority sizes="(max-width: 720px) 42vw, 27vw" />
        </DraggableObject>

        <DraggableObject className={styles.watch} label="A blue Arabic-dial Seiko watch" reducedMotion={reduceMotion}>
          <Image src="/hero/seiko-arabic-blue.png" alt="" fill priority sizes="(max-width: 720px) 22vw, 11vw" />
        </DraggableObject>

        <DraggableObject className={styles.monitor} label="A monitor playing Valorant" reducedMotion={reduceMotion}>
          <div className={styles.monitorScreen} aria-hidden="true">
            <Image src="/hero/valorant-icebox.gif" alt="" fill unoptimized sizes="20vw" />
            <span>VALORANT</span>
          </div>
          <Image src="/hero/monitor.png" alt="" fill priority sizes="(max-width: 720px) 52vw, 30vw" />
        </DraggableObject>

        <DraggableObject className={styles.skis} label="A pair of alpine skis" reducedMotion={reduceMotion}>
          <Image src="/hero/alpine-skis.png" alt="" fill priority sizes="(max-width: 720px) 34vw, 15vw" />
        </DraggableObject>

        <DraggableObject className={styles.pen} label="A translucent blue pen" reducedMotion={reduceMotion}>
          <Image src="/hero/pen.png" alt="" fill priority sizes="(max-width: 720px) 18vw, 10vw" />
        </DraggableObject>

        <DraggableObject className={styles.camera} label="A Fujifilm camera facing forward" reducedMotion={reduceMotion}>
          <Image src="/hero/fujifilm-camera-front.png" alt="" fill sizes="(max-width: 720px) 32vw, 14vw" />
        </DraggableObject>

        <DraggableObject className={styles.oikina} href="https://oikina.com" label="Visit Oikina" reducedMotion={reduceMotion}>
          <Image src="/hero/oikina-badge.png" alt="" fill priority sizes="(max-width: 720px) 38vw, 15vw" />
        </DraggableObject>

        <DraggableObject className={styles.nameTag} label="Hello, my name is Mohtasham" reducedMotion={reduceMotion}>
          <Image src="/hero/name-tag.png" alt="" fill priority sizes="(max-width: 720px) 36vw, 15vw" />
        </DraggableObject>

        <div className={styles.copy}>
          <h1 id="hero-title">
            <span>I&apos;m a <em>founder</em> and AI engineer,</span>
            <span>exploring how AI can change the way we live.</span>
          </h1>
          <p className={styles.status}>
            Currently based in <span>📍 Kuala Lumpur</span>. AI Engineer at{" "}
            <a href="https://citysage.my">CitySage</a>.
          </p>
          <a className={styles.email} href="mailto:mohtashammurshid@gmail.com">
            Email me
          </a>
        </div>

        <p className={styles.dragHint}>Drag the objects around</p>
      </section>

      <FutureLetter />
      <ProjectCollage />

      <span id="about" className={styles.anchor} aria-hidden="true" />
    </main>
  );
}
