"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveUpRight, Plus, Minus, RotateCcw, Rotate3D } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HouseEngine, HouseView } from "@/components/house/HouseEngine";
import styles from "./house.module.css";

export default function HouseExperience() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<HouseEngine | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let cancelled = false;
    let instance: HouseEngine | undefined;
    void import("@/components/house/HouseEngine").then(({ HouseEngine }) => {
      if (cancelled || !canvas.current) return;
      instance = new HouseEngine(canvas.current, () => {
        if (!cancelled) setStatus("error");
      });
      engine.current = instance;
      setStatus("ready");
    }).catch((error: unknown) => {
      console.error("The house viewer could not start.", error);
      if (!cancelled) setStatus("error");
    });
    return () => {
      cancelled = true;
      instance?.dispose();
      engine.current = null;
    };
  }, [attempt]);

  function changeView(view: HouseView) {
    engine.current?.setView(view);
    setAnnouncement(view === "perspective" ? "View reset to the front corner." : `${view === "front" ? "Front" : "Back"} view selected.`);
  }

  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>A place I call home</p>
          <h1>Home, in Kashmir<span>.</span></h1>
        </div>
        <p className={styles.intro}>A little piece of home, brought to the web.<br />Come have a look around.</p>
      </header>

      <section className={styles.viewer} aria-label="Interactive model of my house" aria-busy={status === "loading"}>
        <div className={styles.cornerLabel} aria-hidden="true"><span className={styles.dot} /> Exterior study <span className={styles.labelDivider}>/</span> 01</div>
        <div className={styles.orientation} aria-hidden="true"><MoveUpRight strokeWidth={1.2} /><span>Drag to explore</span></div>
        <canvas
          ref={canvas}
          key={attempt}
          className={`${styles.canvas} ${status === "ready" ? styles.visible : ""}`}
          tabIndex={status === "ready" ? 0 : -1}
          aria-label="3D Kashmiri house. Drag to rotate, scroll or pinch to zoom. Use arrow keys to rotate, plus and minus to zoom, and Home to reset."
          aria-describedby="house-description house-controls-help"
          role="application"
        />
        {status !== "ready" && (
          <div className={styles.status} role="status">
            <Rotate3D size={32} strokeWidth={1} aria-hidden="true" />
            <p>{status === "loading" ? "Building a little piece of home…" : "The 3D view couldn't open."}</p>
            {status === "error" && <>
              <span>This view needs WebGL. Try a browser with hardware acceleration enabled.</span>
              <Button variant="outline" onClick={() => { setStatus("loading"); setAttempt(value => value + 1); }}>Try again</Button>
            </>}
          </div>
        )}

        <div className={styles.viewerFooter}>
          <div className={styles.caption}><span className={styles.captionNumber}>01 /</span><span>Kashmiri residence<br /><small>Stone, brick &amp; walnut</small></span></div>
          <div className={styles.controls} role="group" aria-label="House view controls">
            <Button variant="ghost" className={styles.viewButton} disabled={status !== "ready"} onClick={() => changeView("front")}>Front</Button>
            <Button variant="ghost" className={styles.viewButton} disabled={status !== "ready"} onClick={() => changeView("back")}>Back</Button>
            <span className={styles.controlDivider} aria-hidden="true" />
            <Button variant="ghost" size="icon" className={styles.iconButton} disabled={status !== "ready"} onClick={() => engine.current?.zoom("out")} aria-label="Zoom out"><Minus size={17} /></Button>
            <Button variant="ghost" size="icon" className={styles.iconButton} disabled={status !== "ready"} onClick={() => engine.current?.zoom("in")} aria-label="Zoom in"><Plus size={17} /></Button>
            <span className={styles.controlDivider} aria-hidden="true" />
            <Button variant="ghost" size="icon" className={styles.iconButton} disabled={status !== "ready"} onClick={() => changeView("perspective")} aria-label="Reset view" title="Reset view"><RotateCcw size={16} /></Button>
          </div>
        </div>
      </section>

      <footer className={styles.notes}>
        <p id="house-controls-help"><Rotate3D size={15} strokeWidth={1.3} aria-hidden="true" /> Drag to rotate <span>·</span> Scroll or pinch to zoom</p>
        <details className={styles.details}>
          <summary>About this model <ArrowUpRight size={13} aria-hidden="true" /></summary>
          <p id="house-description">An exterior study of my house, refined from family photographs. Two matching brick gables frame a curved stone entrance and a continuous balcony. A pointed circular roof rises above a band of small windows between the larger gabled roofs. The plain brick rear walls close into a square corner. Cream window frames, lattice screens, red surrounds, and carved wooden doors follow the visible details. Proportions are approximate; the layout follows the photographs and my corrections.</p>
        </details>
      </footer>
      <div className={styles.srOnly} aria-live="polite">{announcement}</div>
    </main>
  );
}
