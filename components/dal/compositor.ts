import { clamp, rngFor } from "./rng";

export const SIZE = 1080;
export const PITCH = 4.6;
export const PAPER_HEX = "#F2EDE3";
export const DURATION = 32;

export const INK_ORDER = ["yellow", "orange", "green", "indigo"] as const;
export type InkId = (typeof INK_ORDER)[number];

export type Ink = {
  id: InkId;
  hex: string;
  rgb: readonly [number, number, number];
  angle: number;
  ox: number;
  oy: number;
};

export const INKS: Record<InkId, Ink> = {
  yellow: { id: "yellow", hex: "#FFE800", rgb: [255, 232, 0], angle: 0, ox: 0, oy: 2 },
  orange: { id: "orange", hex: "#FF6C2F", rgb: [255, 108, 47], angle: 45, ox: -1, oy: 1 },
  green: { id: "green", hex: "#00A95C", rgb: [0, 169, 92], angle: 75, ox: 2, oy: 0 },
  indigo: { id: "indigo", hex: "#2E3192", rgb: [46, 49, 146], angle: 15, ox: 1, oy: -1 },
};

export type Point = { x: number; y: number };

export type Region = { x: number; y: number; w: number; h: number };

function makeCanvas(size = SIZE): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

function context2d(canvas: HTMLCanvasElement, frequent = false): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: frequent });
  if (!ctx) throw new Error("Canvas 2D is unavailable.");
  return ctx;
}

function tone(alpha: number): string {
  return `rgba(255,255,255,${clamp(alpha)})`;
}

function buildThreshold(angleDeg: number): Uint8Array {
  const map = new Uint8Array(SIZE * SIZE);
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const u = x * cos - y * sin;
      const v = x * sin + y * cos;
      const dx = u / PITCH - Math.floor(u / PITCH + 0.5);
      const dy = v / PITCH - Math.floor(v / PITCH + 0.5);
      const d = Math.min(1, (dx * dx + dy * dy) * 4);
      map[y * SIZE + x] = Math.round(d * 255);
    }
  }
  return map;
}

function buildStarvation(): Uint8Array {
  const rng = rngFor("paper-starve");
  const map = new Uint8Array(SIZE * SIZE);
  for (let i = 0; i < map.length; i += 1) {
    map[i] = rng() < 0.045 ? Math.floor(18 + rng() * 36) : 0;
  }
  return map;
}

export function yieldFrame(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export function catmull(points: readonly Point[], closed = false): Path2D {
  const path = new Path2D();
  if (points.length < 2) return path;
  const pts = closed
    ? [points[points.length - 1], ...points, points[0], points[1]]
    : [points[0], ...points, points[points.length - 1]];
  path.moveTo(points[0].x, points[0].y);
  const last = closed ? points.length : points.length - 1;
  for (let i = 0; i < last; i += 1) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const p2 = pts[i + 2];
    const p3 = pts[i + 3];
    path.bezierCurveTo(
      p1.x + (p2.x - p0.x) / 6,
      p1.y + (p2.y - p0.y) / 6,
      p2.x - (p3.x - p1.x) / 6,
      p2.y - (p3.y - p1.y) / 6,
      p2.x,
      p2.y,
    );
  }
  if (closed) path.closePath();
  return path;
}

export function cut(points: readonly Point[], rng: () => number, amp: number): Path2D {
  const wobble = points.map((point, index) => {
    const edge = index === 0 || index === points.length - 1;
    const jx = edge ? 0 : (rng() - 0.5) * amp;
    const jy = edge ? 0 : (rng() - 0.5) * amp;
    return { x: point.x + jx, y: point.y + jy };
  });
  return catmull(wobble, true);
}

export function rectPoints(x: number, y: number, w: number, h: number, n = 5): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < n; i += 1) pts.push({ x: x + (w * i) / n, y });
  for (let i = 0; i < n; i += 1) pts.push({ x: x + w, y: y + (h * i) / n });
  for (let i = 0; i < n; i += 1) pts.push({ x: x + w - (w * i) / n, y: y + h });
  for (let i = 0; i < n; i += 1) pts.push({ x, y: y + h - (h * i) / n });
  return pts;
}

export class Press {
  readonly paper = makeCanvas();
  readonly backdrop = makeCanvas();
  readonly output: HTMLCanvasElement;
  readonly out: CanvasRenderingContext2D;
  readonly live: Record<InkId, HTMLCanvasElement>;
  readonly liveCtx: Record<InkId, CanvasRenderingContext2D>;
  readonly staticPlate: Record<InkId, HTMLCanvasElement>;
  readonly staticCtx: Record<InkId, CanvasRenderingContext2D>;
  private readonly threshold: Record<InkId, Uint8Array>;
  private readonly starve: Uint8Array;
  private readonly stamp: HTMLCanvasElement;
  private readonly stampCtx: CanvasRenderingContext2D;

  constructor(output: HTMLCanvasElement) {
    this.output = output;
    output.width = SIZE;
    output.height = SIZE;
    this.out = context2d(output);
    this.live = {} as Record<InkId, HTMLCanvasElement>;
    this.liveCtx = {} as Record<InkId, CanvasRenderingContext2D>;
    this.staticPlate = {} as Record<InkId, HTMLCanvasElement>;
    this.staticCtx = {} as Record<InkId, CanvasRenderingContext2D>;
    this.threshold = {} as Record<InkId, Uint8Array>;
    this.starve = buildStarvation();
    this.stamp = makeCanvas();
    this.stampCtx = context2d(this.stamp, true);

    for (const id of INK_ORDER) {
      this.live[id] = makeCanvas();
      this.liveCtx[id] = context2d(this.live[id], true);
      this.staticPlate[id] = makeCanvas();
      this.staticCtx[id] = context2d(this.staticPlate[id], true);
    }
  }

  async prepare(): Promise<void> {
    for (const id of INK_ORDER) {
      this.threshold[id] = buildThreshold(INKS[id].angle);
      await yieldFrame();
    }
  }

  bakePaper(): void {
    const ctx = context2d(this.paper);
    ctx.fillStyle = PAPER_HEX;
    ctx.fillRect(0, 0, SIZE, SIZE);
    const rng = rngFor("paper-mottle");
    for (let i = 0; i < 48; i += 1) {
      const x = rng() * SIZE;
      const y = rng() * SIZE;
      const r = 40 + rng() * 160;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const shade = 0.018 + rng() * 0.03;
      g.addColorStop(0, `rgba(88,70,48,${shade})`);
      g.addColorStop(1, "rgba(88,70,48,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    for (let i = 0; i < 1400; i += 1) {
      const x = rng() * SIZE;
      const y = rng() * SIZE;
      ctx.fillStyle = `rgba(92,74,52,${0.035 + rng() * 0.05})`;
      ctx.fillRect(x, y, 1 + (rng() > 0.7 ? 1 : 0), rng() > 0.5 ? 2 : 1);
    }
  }

  plate(id: InkId, live: boolean): CanvasRenderingContext2D {
    return live ? this.liveCtx[id] : this.staticCtx[id];
  }

  print(id: InkId, path: Path2D, alpha: number, live = false, rule: CanvasFillRule = "nonzero"): void {
    const g = this.plate(id, live);
    g.fillStyle = tone(alpha);
    g.fill(path, rule);
  }

  stroke(id: InkId, path: Path2D, width: number, alpha: number, live = false): void {
    const g = this.plate(id, live);
    g.strokeStyle = tone(alpha);
    g.lineWidth = width;
    g.lineJoin = "round";
    g.lineCap = "round";
    g.stroke(path);
  }

  carve(id: InkId, path: Path2D, live = false, rule: CanvasFillRule = "nonzero"): void {
    const g = this.plate(id, live);
    g.save();
    g.globalCompositeOperation = "destination-out";
    g.fillStyle = "#fff";
    g.fill(path, rule);
    g.restore();
  }

  clipped(
    id: InkId,
    path: Path2D,
    live: boolean,
    rule: CanvasFillRule,
    draw: () => void,
  ): void {
    const g = this.plate(id, live);
    g.save();
    g.clip(path, rule);
    draw();
    g.restore();
  }

  plane(id: InkId, path: Path2D, alpha: number, live = false): void {
    this.carve(id, path, live);
    this.print(id, path, alpha, live);
  }

  shade(id: InkId, path: Path2D, gradient: CanvasGradient, live = false): void {
    const g = this.plate(id, live);
    g.save();
    g.clip(path);
    g.fillStyle = gradient;
    g.fillRect(0, 0, SIZE, SIZE);
    g.restore();
  }

  linearShade(
    id: InkId,
    path: Path2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    stops: readonly [number, number][],
    live = false,
  ): void {
    const g = this.plate(id, live);
    const gradient = g.createLinearGradient(x0, y0, x1, y1);
    for (const [at, alpha] of stops) gradient.addColorStop(at, tone(alpha));
    this.shade(id, path, gradient, live);
  }

  radialShade(
    id: InkId,
    path: Path2D,
    x: number,
    y: number,
    r: number,
    inner: number,
    outer: number,
    live = false,
  ): void {
    const g = this.plate(id, live);
    const gradient = g.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, tone(inner));
    gradient.addColorStop(1, tone(outer));
    this.shade(id, path, gradient, live);
  }

  clearLive(): void {
    for (const id of INK_ORDER) {
      this.liveCtx[id].clearRect(0, 0, SIZE, SIZE);
    }
  }

  private screenToStamp(source: HTMLCanvasElement, ink: Ink, region?: Region): void {
    const x = region?.x ?? 0;
    const y = region?.y ?? 0;
    const w = region?.w ?? SIZE;
    const h = region?.h ?? SIZE;
    const src = context2d(source, true).getImageData(x, y, w, h).data;
    const dest = this.stampCtx.createImageData(w, h);
    const dst = dest.data;
    const thr = this.threshold[ink.id];
    const [r, g, b] = ink.rgb;
    for (let row = 0; row < h; row += 1) {
      const py = y + row;
      for (let col = 0; col < w; col += 1) {
        const px = x + col;
        const i = (row * w + col) * 4;
        const coverage = src[i + 3];
        if (coverage === 0) continue;
        const t = thr[py * SIZE + px] + this.starve[py * SIZE + px];
        if (coverage > t) {
          dst[i] = r;
          dst[i + 1] = g;
          dst[i + 2] = b;
          dst[i + 3] = 255;
        }
      }
    }
    this.stampCtx.clearRect(0, 0, SIZE, SIZE);
    this.stampCtx.putImageData(dest, x, y);
  }

  async bakeStatic(): Promise<void> {
    const g = context2d(this.backdrop);
    g.globalCompositeOperation = "source-over";
    g.drawImage(this.paper, 0, 0);
    g.globalCompositeOperation = "multiply";
    for (const id of INK_ORDER) {
      const ink = INKS[id];
      this.screenToStamp(this.staticPlate[id], ink);
      g.drawImage(this.stamp, ink.ox, ink.oy);
      await yieldFrame();
    }
    g.globalCompositeOperation = "source-over";
  }

  compositeLive(region: Region): void {
    const g = this.out;
    g.globalCompositeOperation = "source-over";
    g.drawImage(this.backdrop, 0, 0);
    g.globalCompositeOperation = "multiply";
    for (const id of INK_ORDER) {
      const ink = INKS[id];
      this.screenToStamp(this.live[id], ink, region);
      g.drawImage(this.stamp, ink.ox, ink.oy);
    }
    g.globalCompositeOperation = "source-over";
  }
}
