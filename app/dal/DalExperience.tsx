"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DalEngine } from "@/components/dal/DalEngine";
import { DURATION } from "@/components/dal/compositor";
import styles from "./dal.module.css";

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function DalExperience() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<DalEngine | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let cancelled = false;
    let instance: DalEngine | undefined;
    let poll: number | undefined;
    void import("@/components/dal/DalEngine").then(({ DalEngine }) => {
      if (cancelled || !canvas.current) return;
      instance = new DalEngine(canvas.current);
      engine.current = instance;
      setStatus("ready");
      setPlaying(instance.isPlaying);
      setTime(instance.currentTime);
      const sync = () => {
        if (!engine.current) return;
        setPlaying(engine.current.isPlaying);
        setTime(engine.current.currentTime);
        poll = requestAnimationFrame(sync);
      };
      poll = requestAnimationFrame(sync);
    }).catch((error: unknown) => {
      console.error("The Dal Lake print could not start.", error);
      if (!cancelled) setStatus("error");
    });
    return () => {
      cancelled = true;
      if (poll !== undefined) cancelAnimationFrame(poll);
      instance?.dispose();
      engine.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (status !== "ready" || !engine.current) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (event.key === " " || event.key === "k") {
        event.preventDefault();
        engine.current.toggle();
        setPlaying(engine.current.isPlaying);
        setAnnouncement(engine.current.isPlaying ? "Playing." : "Paused.");
      } else if (event.key === "ArrowRight") {
        engine.current.seek(engine.current.currentTime + 1);
        setTime(engine.current.currentTime);
      } else if (event.key === "ArrowLeft") {
        engine.current.seek(engine.current.currentTime - 1);
        setTime(engine.current.currentTime);
      } else if (event.key === "Home") {
        engine.current.seek(0);
        setTime(0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  function togglePlayback() {
    engine.current?.toggle();
    if (!engine.current) return;
    setPlaying(engine.current.isPlaying);
    setAnnouncement(engine.current.isPlaying ? "Playing." : "Paused.");
  }

  function scrub(value: number) {
    engine.current?.seek(value);
    setTime(value);
  }

  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>A window I keep</p>
          <h1>Dal Lake, from a houseboat<span>.</span></h1>
        </div>
        <p className={styles.intro}>
          A procedural risograph short.<br />
          Late afternoon on the water, Zabarwan beyond.
        </p>
      </header>

      <section className={styles.viewer} aria-label="Procedural risograph of Dal Lake" aria-busy={status === "loading"}>
        <div className={styles.cornerLabel} aria-hidden="true">
          <span className={styles.dot} /> Houseboat window <span className={styles.labelDivider}>/</span> 02
        </div>
        <div className={styles.orientation} aria-hidden="true">
          <span>{clock(time)} / {clock(DURATION)}</span>
        </div>
        <div className={styles.stage}>
          <canvas
            ref={canvas}
            key={attempt}
            className={`${styles.canvas} ${status === "ready" ? styles.visible : ""}`}
            width={1080}
            height={1080}
            tabIndex={status === "ready" ? 0 : -1}
            aria-label="Printed view from a Kashmiri houseboat onto Dal Lake, with the Zabarwan range beyond. Space plays or pauses. Arrow keys seek."
            aria-describedby="dal-description dal-controls-help"
          />
        </div>
        {status !== "ready" && (
          <div className={styles.status} role="status">
            <p>{status === "loading" ? "Inking the plate…" : "This print needs Canvas 2D."}</p>
            {status === "error" && (
              <>
                <span>Try another browser, or reload the page.</span>
                <Button variant="outline" onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}>
                  Try again
                </Button>
              </>
            )}
          </div>
        )}

        <div className={styles.viewerFooter}>
          <div className={styles.caption}>
            <span className={styles.captionNumber}>02 /</span>
            <span>Dal Lake<br /><small>Indigo, orange, green, yellow</small></span>
          </div>
          <div className={styles.controls} role="group" aria-label="Film controls">
            <Button
              variant="ghost"
              size="icon"
              className={styles.iconButton}
              disabled={status !== "ready"}
              onClick={togglePlayback}
              aria-label={playing ? "Pause" : "Play"}
              aria-pressed={playing}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <label className={styles.scrub}>
              <span className={styles.srOnly}>Seek</span>
              <input
                type="range"
                min={0}
                max={DURATION}
                step={0.05}
                value={time}
                disabled={status !== "ready"}
                onChange={(event) => scrub(Number(event.target.value))}
                aria-valuetext={`${clock(time)} of ${clock(DURATION)}`}
              />
            </label>
            <span className={styles.timecode} aria-hidden="true">{clock(time)}</span>
          </div>
        </div>
      </section>

      <footer className={styles.notes}>
        <p id="dal-controls-help">
          Space plays or pauses <span>·</span> Arrows seek
        </p>
        <details className={styles.details}>
          <summary>About this print <ArrowUpRight size={13} aria-hidden="true" /></summary>
          <p id="dal-description">
            Looking out from a houseboat on Dal Lake toward the Zabarwan range. Four risograph inks,
            halftone screens, and a 32-second loop. Every frame is a function of time — the same
            seek always reprints the same sheet. A quieter companion to the{" "}
            <Link href="/house">house in Kashmir</Link>.
          </p>
        </details>
      </footer>
      <div className={styles.srOnly} aria-live="polite">{announcement}</div>
    </main>
  );
}
