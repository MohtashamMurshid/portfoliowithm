"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import ContactCta from "./ContactCta";
import FutureLetter from "./FutureLetter";
import ProjectCollage from "./ProjectCollage";
import styles from "./HeroExperience.module.css";

type DraggableObjectProps = {
  children: React.ReactNode;
  className: string;
  entrance: { x: string; y: string; delay: number };
  href?: string;
  label: string;
  reducedMotion: boolean;
};

function DraggableObject({
  children,
  className,
  entrance,
  href,
  label,
  reducedMotion,
}: DraggableObjectProps) {
  const entranceMotion: MotionProps = reducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, scale: 0.78, x: entrance.x, y: entrance.y },
        animate: { opacity: 1, scale: 1, x: 0, y: 0 },
        transition: {
          type: "spring",
          stiffness: 44,
          damping: 18,
          mass: 1.05,
          delay: entrance.delay * 1.35,
        },
      };

  const interactionMotion: MotionProps = {
    drag: true,
    dragMomentum: false,
    dragElastic: 0.12,
    whileHover: reducedMotion
      ? undefined
      : { scale: 1.025, transition: { duration: 0.18, ease: "easeOut" } },
    whileTap: { scale: 0.98, cursor: "grabbing", transition: { duration: 0.08 } },
    transition: { scale: { duration: 0.18, ease: "easeOut" } },
  };

  if (href) {
    return (
      <motion.div
        className={`${styles.object} ${className}`}
        {...entranceMotion}
      >
        <motion.a
          className={styles.dragTarget}
          {...interactionMotion}
          href={href}
          draggable={false}
          aria-label={`${label}, draggable link`}
        >
          {children}
        </motion.a>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${styles.object} ${className}`}
      {...entranceMotion}
    >
      <motion.div
        className={styles.dragTarget}
        {...interactionMotion}
        aria-label={`${label}, draggable decoration`}
        role="img"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function HeroExperience() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <main className={styles.home} id="top">
      <section className={styles.hero} aria-labelledby="hero-title">
        <DraggableObject className={styles.macbook} entrance={{ x: "-48vw", y: "-30vh", delay: 0.04 }} label="A closed MacBook" reducedMotion={reduceMotion}>
          <Image src="/hero/macbook-midnight-m3.png" alt="" fill priority sizes="(max-width: 720px) 42vw, 27vw" />
        </DraggableObject>

        <DraggableObject className={styles.watch} entrance={{ x: "34vw", y: "-34vh", delay: 0.16 }} label="A blue Arabic-dial Seiko watch" reducedMotion={reduceMotion}>
          <Image src="/hero/seiko-arabic-blue.png" alt="" fill priority sizes="(max-width: 720px) 22vw, 11vw" />
        </DraggableObject>

        <DraggableObject className={styles.monitor} entrance={{ x: "48vw", y: "32vh", delay: 0.22 }} label="A monitor playing Valorant" reducedMotion={reduceMotion}>
          <div className={styles.monitorScreen} aria-hidden="true">
            <Image src="/hero/valorant-icebox.gif" alt="" fill unoptimized sizes="20vw" />
            <span>VALORANT</span>
          </div>
          <Image src="/hero/monitor.png" alt="" fill priority sizes="(max-width: 720px) 52vw, 30vw" />
        </DraggableObject>

        <DraggableObject className={styles.skis} entrance={{ x: "-42vw", y: "34vh", delay: 0.4 }} label="A pair of alpine skis" reducedMotion={reduceMotion}>
          <Image src="/hero/alpine-skis.png" alt="" fill priority sizes="(max-width: 720px) 34vw, 15vw" />
        </DraggableObject>

        <DraggableObject className={styles.pen} entrance={{ x: "-22vw", y: "40vh", delay: 0.34 }} label="A translucent blue pen" reducedMotion={reduceMotion}>
          <Image src="/hero/pen.png" alt="" fill priority sizes="(max-width: 720px) 18vw, 10vw" />
        </DraggableObject>

        <DraggableObject className={styles.camera} entrance={{ x: "-38vw", y: "-12vh", delay: 0.46 }} label="A Fujifilm camera facing forward" reducedMotion={reduceMotion}>
          <Image src="/hero/fujifilm-camera-front.png" alt="" fill sizes="(max-width: 720px) 32vw, 14vw" />
        </DraggableObject>

        <DraggableObject className={styles.oikina} entrance={{ x: "4vw", y: "44vh", delay: 0.28 }} href="https://oikina.com" label="Visit Oikina" reducedMotion={reduceMotion}>
          <Image src="/hero/oikina-badge.png" alt="" fill priority sizes="(max-width: 720px) 38vw, 15vw" />
        </DraggableObject>

        <DraggableObject className={styles.nameTag} entrance={{ x: "18vw", y: "-38vh", delay: 0.1 }} label="Hello, my name is Mohtasham" reducedMotion={reduceMotion}>
          <Image src="/hero/name-tag.png" alt="" fill priority sizes="(max-width: 720px) 36vw, 15vw" />
        </DraggableObject>

        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>

        <motion.p
          className={styles.dragHint}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 1.05 }}
        >
          Drag the objects around
        </motion.p>
      </section>

      <FutureLetter />
      <ProjectCollage />
      <ContactCta />

      <span id="about" className={styles.anchor} aria-hidden="true" />
    </main>
  );
}
