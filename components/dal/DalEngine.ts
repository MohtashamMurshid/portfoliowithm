import { DURATION, Press } from "./compositor";
import { drawLive, drawStatic, LIVE_REGION } from "./scene";

export type RisoHandle = {
  duration: number;
  ready: boolean;
  seek: (t: number) => void;
};

declare global {
  interface Window {
    __riso?: RisoHandle;
  }
}

export class DalEngine {
  readonly duration = DURATION;
  ready = false;
  private press: Press;
  private time = 0;
  private playing = false;
  private frame: number | null = null;
  private origin = 0;
  private disposed = false;
  private readonly reduced: MediaQueryList;

  constructor(canvas: HTMLCanvasElement) {
    this.press = new Press(canvas);
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.press.bakePaper();
    drawStatic(this.press);
    this.press.bakeStatic();
    this.ready = true;
    this.expose();
    const start = this.initialTime();
    this.seek(start);
    if (!this.reduced.matches) this.play();
  }

  get currentTime(): number {
    return this.time;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  seek = (t: number): void => {
    if (this.disposed) return;
    const wrapped = ((t % this.duration) + this.duration) % this.duration;
    this.time = wrapped;
    this.press.clearLive();
    drawLive(this.press, wrapped);
    this.press.compositeLive(LIVE_REGION);
    if (this.playing) this.origin = performance.now() / 1000 - wrapped;
    this.expose();
  };

  play(): void {
    if (this.disposed || this.playing) return;
    this.playing = true;
    this.origin = performance.now() / 1000 - this.time;
    this.tick();
    this.expose();
  }

  pause(): void {
    this.playing = false;
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
    this.expose();
  }

  toggle(): void {
    if (this.playing) this.pause();
    else this.play();
  }

  dispose(): void {
    this.pause();
    this.disposed = true;
    if (window.__riso?.seek === this.seek) delete window.__riso;
  }

  private tick = (): void => {
    if (!this.playing || this.disposed) return;
    const now = performance.now() / 1000;
    this.seek((now - this.origin) % this.duration);
    this.frame = requestAnimationFrame(this.tick);
  };

  private initialTime(): number {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("t");
    if (raw !== null) {
      const value = Number(raw);
      if (Number.isFinite(value)) return value;
    }
    return this.reduced.matches ? 8 : 0;
  }

  private expose(): void {
    window.__riso = {
      duration: this.duration,
      ready: this.ready,
      seek: this.seek,
    };
  }
}
