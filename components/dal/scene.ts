import { catmull, cut, Press, SIZE, type InkId, type Point, type Region } from "./compositor";
import { clamp, lerp, rngFor, TAU } from "./rng";

export const WINDOW = { x: 176, y: 148, w: 728, h: 604 };
export const HORIZON = 424;
export const SILL_TOP = WINDOW.y + WINDOW.h;
export const LIVE_REGION: Region = { x: 150, y: 118, w: 790, h: 820 };

let windowOpening: Path2D;

function ridge(yBase: number, amp: number, seed: string, peaks: readonly number[]): Path2D {
  const rng = rngFor(seed);
  const pts: Point[] = [{ x: WINDOW.x - 8, y: SILL_TOP + 20 }];
  const n = 28;
  for (let i = 0; i <= n; i += 1) {
    const u = i / n;
    const x = WINDOW.x + WINDOW.w * u;
    let lift = 0;
    for (const peak of peaks) {
      const d = Math.abs(u - peak);
      lift += Math.exp(-d * d * 38) * (0.55 + rng() * 0.2);
    }
    const grain = 0.22 * Math.sin(u * 9.2 + rng()) + 0.12 * Math.sin(u * 21 + 1.2);
    pts.push({
      x,
      y: yBase - amp * (0.28 + lift + grain + rng() * 0.08),
    });
  }
  pts.push({ x: WINDOW.x + WINDOW.w + 8, y: SILL_TOP + 20 });
  return cut(pts, rng, 2.4);
}

function roundedWindow(x: number, y: number, w: number, h: number, r: number): Path2D {
  const path = new Path2D();
  path.moveTo(x + r, y);
  path.lineTo(x + w - r, y);
  path.quadraticCurveTo(x + w, y, x + w, y + r);
  path.lineTo(x + w, y + h - r);
  path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  path.lineTo(x + r, y + h);
  path.quadraticCurveTo(x, y + h, x, y + h - r);
  path.lineTo(x, y + r);
  path.quadraticCurveTo(x, y, x + r, y);
  path.closePath();
  return path;
}

function frameMass(): Path2D {
  const path = new Path2D();
  path.rect(0, 0, SIZE, SIZE);
  path.addPath(windowOpening);
  return path;
}

function jaliPanel(x: number, y: number, w: number, h: number, seed: string): Path2D {
  const path = new Path2D();
  const rng = rngFor(seed);
  const step = 22;
  for (let gy = y + 10; gy < y + h - 10; gy += step) {
    for (let gx = x + 8; gx < x + w - 8; gx += step) {
      const s = 7 + rng() * 1.4;
      path.moveTo(gx, gy - s);
      path.lineTo(gx + s, gy);
      path.lineTo(gx, gy + s);
      path.lineTo(gx - s, gy);
      path.closePath();
    }
  }
  return path;
}

function scallops(): Path2D {
  const path = new Path2D();
  const rng = rngFor("scallop");
  const add = (ax: number, ay: number, bx: number, by: number, count: number, inward: Point) => {
    for (let i = 0; i < count; i += 1) {
      const t0 = i / count;
      const t1 = (i + 1) / count;
      const mx = lerp(ax, bx, (t0 + t1) / 2) + inward.x * (7 + rng() * 2);
      const my = lerp(ay, by, (t0 + t1) / 2) + inward.y * (7 + rng() * 2);
      path.moveTo(lerp(ax, bx, t0), lerp(ay, by, t0));
      path.quadraticCurveTo(mx, my, lerp(ax, bx, t1), lerp(ay, by, t1));
    }
  };
  const x0 = WINDOW.x;
  const y0 = WINDOW.y;
  const x1 = WINDOW.x + WINDOW.w;
  const y1 = WINDOW.y + WINDOW.h;
  add(x0, y0, x1, y0, 16, { x: 0, y: 1 });
  add(x1, y0, x1, y1, 13, { x: -1, y: 0 });
  add(x1, y1, x0, y1, 16, { x: 0, y: -1 });
  add(x0, y1, x0, y0, 13, { x: 1, y: 0 });
  return path;
}

function willowStrands(): Path2D {
  const rng = rngFor("willow");
  const path = new Path2D();
  for (let i = 0; i < 11; i += 1) {
    const x = WINDOW.x + 18 + i * 11 + rng() * 4;
    const top = WINDOW.y + 6;
    const len = 118 + rng() * 90;
    const pts: Point[] = [];
    const sway = (rng() - 0.5) * 18;
    for (let k = 0; k <= 6; k += 1) {
      const u = k / 6;
      pts.push({
        x: x + sway * u * u + Math.sin(u * 3 + i) * 4,
        y: top + len * u,
      });
    }
    path.addPath(catmull(pts, false));
  }
  return path;
}

function mullion(): Path2D {
  const x = WINDOW.x + WINDOW.w * 0.5;
  return cut(
    [
      { x: x - 7, y: WINDOW.y },
      { x: x + 7, y: WINDOW.y },
      { x: x + 6, y: SILL_TOP },
      { x: x - 6, y: SILL_TOP },
    ],
    rngFor("mullion"),
    1.4,
  );
}

function sill(): Path2D {
  return cut(
    [
      { x: WINDOW.x - 28, y: SILL_TOP - 6 },
      { x: WINDOW.x + WINDOW.w + 28, y: SILL_TOP - 4 },
      { x: WINDOW.x + WINDOW.w + 46, y: SILL_TOP + 78 },
      { x: WINDOW.x - 44, y: SILL_TOP + 82 },
    ],
    rngFor("sill"),
    2.2,
  );
}

function lintel(): Path2D {
  return cut(
    [
      { x: 48, y: 36 },
      { x: SIZE - 48, y: 40 },
      { x: SIZE - 70, y: WINDOW.y + 8 },
      { x: 68, y: WINDOW.y + 6 },
    ],
    rngFor("lintel"),
    3,
  );
}

let farRidge: Path2D;
let midRidge: Path2D;
let nearRidge: Path2D;
let waterPlane: Path2D;
let skyPlane: Path2D;
let wood: Path2D;
let leftJali: Path2D;
let rightJali: Path2D;
let willow: Path2D;
let bar: Path2D;
let sillPath: Path2D;
let lintelPath: Path2D;
let carving: Path2D;
let built = false;

function buildShapes(): void {
  if (built) return;
  windowOpening = roundedWindow(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h, 18);
  farRidge = ridge(HORIZON + 8, 86, "ridge-far", [0.22, 0.48, 0.71, 0.88]);
  midRidge = ridge(HORIZON + 14, 118, "ridge-mid", [0.18, 0.41, 0.63, 0.82]);
  nearRidge = ridge(HORIZON + 22, 64, "ridge-near", [0.12, 0.35, 0.58, 0.79, 0.93]);
  waterPlane = cut(
    [
      { x: WINDOW.x, y: HORIZON - 4 },
      { x: WINDOW.x + WINDOW.w, y: HORIZON - 2 },
      { x: WINDOW.x + WINDOW.w, y: SILL_TOP },
      { x: WINDOW.x, y: SILL_TOP },
    ],
    rngFor("water-plane"),
    2,
  );
  skyPlane = cut(
    [
      { x: WINDOW.x, y: WINDOW.y },
      { x: WINDOW.x + WINDOW.w, y: WINDOW.y },
      { x: WINDOW.x + WINDOW.w, y: HORIZON + 8 },
      { x: WINDOW.x, y: HORIZON + 10 },
    ],
    rngFor("sky-plane"),
    2,
  );
  wood = frameMass();
  leftJali = jaliPanel(28, WINDOW.y - 10, WINDOW.x - 36, WINDOW.h + 40, "jali-l");
  rightJali = jaliPanel(WINDOW.x + WINDOW.w + 8, WINDOW.y - 10, 108, WINDOW.h + 40, "jali-r");
  willow = willowStrands();
  bar = mullion();
  sillPath = sill();
  lintelPath = lintel();
  carving = scallops();
  built = true;
}

function inkAll(draw: (id: InkId) => void): void {
  draw("yellow");
  draw("orange");
  draw("green");
  draw("indigo");
}

export function drawStatic(press: Press): void {
  buildShapes();
  press.linearShade("yellow", skyPlane, 0, WINDOW.y, 0, HORIZON, [
    [0, 0.06],
    [0.55, 0.22],
    [1, 0.42],
  ]);
  press.linearShade("orange", skyPlane, 0, WINDOW.y, 0, HORIZON, [
    [0, 0.04],
    [0.4, 0.16],
    [1, 0.38],
  ]);
  press.linearShade("indigo", skyPlane, 0, WINDOW.y, 0, HORIZON, [
    [0, 0.2],
    [0.45, 0.08],
    [1, 0.02],
  ]);
  press.radialShade("yellow", skyPlane, WINDOW.x + WINDOW.w * 0.72, HORIZON - 20, 260, 0.38, 0.02);
  press.radialShade("orange", skyPlane, WINDOW.x + WINDOW.w * 0.7, HORIZON - 8, 210, 0.22, 0);

  press.plane("indigo", farRidge, 0.16);
  press.print("green", farRidge, 0.05);
  press.plane("indigo", midRidge, 0.34);
  press.print("green", midRidge, 0.1);
  press.plane("indigo", nearRidge, 0.52);
  press.print("green", nearRidge, 0.2);
  press.print("orange", nearRidge, 0.06);

  const treeRng = rngFor("shore-trees");
  for (let i = 0; i < 26; i += 1) {
    const x = WINDOW.x + 20 + treeRng() * (WINDOW.w - 40);
    const h = 10 + treeRng() * 18;
    const tree = cut(
      [
        { x: x - 5 - treeRng() * 4, y: HORIZON + 6 },
        { x, y: HORIZON + 4 - h },
        { x: x + 5 + treeRng() * 4, y: HORIZON + 6 },
      ],
      treeRng,
      1.2,
    );
    press.print("indigo", tree, 0.4);
    press.print("green", tree, 0.22);
  }

  press.linearShade("indigo", waterPlane, 0, HORIZON, 0, SILL_TOP, [
    [0, 0.12],
    [0.45, 0.22],
    [1, 0.4],
  ]);
  press.linearShade("green", waterPlane, 0, HORIZON, 0, SILL_TOP, [
    [0, 0.08],
    [0.5, 0.16],
    [1, 0.1],
  ]);
  press.linearShade("orange", waterPlane, 0, HORIZON, 0, SILL_TOP, [
    [0, 0.18],
    [0.28, 0.08],
    [1, 0.02],
  ]);
  press.linearShade("yellow", waterPlane, 0, HORIZON, 0, HORIZON + 90, [
    [0, 0.16],
    [1, 0],
  ]);
  const reflectPts: Point[] = [{ x: WINDOW.x, y: HORIZON + 4 }];
  const reflectRng = rngFor("ridge-reflect");
  for (let i = 0; i <= 28; i += 1) {
    const u = i / 28;
    let lift = 0;
    for (const peak of [0.18, 0.41, 0.63, 0.82]) {
      const d = Math.abs(u - peak);
      lift += Math.exp(-d * d * 38) * 0.55;
    }
    reflectPts.push({
      x: WINDOW.x + WINDOW.w * u,
      y: HORIZON + 10 + 48 * (0.3 + lift + reflectRng() * 0.08),
    });
  }
  reflectPts.push({ x: WINDOW.x + WINDOW.w, y: HORIZON + 4 });
  const reflection = cut(reflectPts, reflectRng, 2);
  press.print("indigo", reflection, 0.14);
  press.print("green", reflection, 0.07);

  press.print("indigo", wood, 0.94, false, "evenodd");
  press.print("orange", wood, 0.78, false, "evenodd");
  press.print("yellow", wood, 0.12, false, "evenodd");
  const jamb = new Path2D();
  jamb.addPath(roundedWindow(WINDOW.x - 26, WINDOW.y - 24, WINDOW.w + 52, WINDOW.h + 40, 22));
  jamb.addPath(windowOpening);
  press.print("indigo", jamb, 0.4, false, "evenodd");
  press.print("orange", jamb, 0.28, false, "evenodd");

  press.print("indigo", lintelPath, 0.28);
  press.print("orange", lintelPath, 0.2);
  press.stroke("indigo", carving, 1.6, 0.28);
  press.stroke("orange", carving, 1.1, 0.16);

  press.carve("indigo", leftJali);
  press.carve("orange", leftJali);
  press.carve("indigo", rightJali);
  press.carve("orange", rightJali);
  press.print("yellow", leftJali, 0.08);
  press.print("yellow", rightJali, 0.08);

  press.stroke("green", willow, 2.6, 0.55);
  press.stroke("indigo", willow, 1.6, 0.4);

  press.plane("indigo", bar, 0.55);
  press.print("orange", bar, 0.22);

  press.plane("indigo", sillPath, 0.7);
  press.print("orange", sillPath, 0.55);
  press.print("yellow", sillPath, 0.16);
  const sillLight = cut(
    [
      { x: WINDOW.x + 40, y: SILL_TOP + 8 },
      { x: WINDOW.x + WINDOW.w - 40, y: SILL_TOP + 10 },
      { x: WINDOW.x + WINDOW.w - 80, y: SILL_TOP + 28 },
      { x: WINDOW.x + 90, y: SILL_TOP + 26 },
    ],
    rngFor("sill-light"),
    2,
  );
  press.carve("indigo", sillLight);
  press.print("yellow", sillLight, 0.12);
  press.print("orange", sillLight, 0.1);
  const glassSeat = cut(
    [
      { x: 328, y: SILL_TOP + 8 },
      { x: 392, y: SILL_TOP + 6 },
      { x: 400, y: SILL_TOP + 78 },
      { x: 322, y: SILL_TOP + 80 },
    ],
    rngFor("glass-seat"),
    1.2,
  );
  press.carve("indigo", glassSeat);
  press.carve("orange", glassSeat);
  press.carve("yellow", glassSeat);

  for (const id of ["indigo", "orange"] as const) {
    const grain = rngFor(`wood-grain-${id}`);
    press.clipped(id, wood, false, "evenodd", () => {
      for (let i = 0; i < 36; i += 1) {
        const y = 50 + grain() * (SIZE - 100);
        const line = new Path2D();
        line.moveTo(20, y);
        line.bezierCurveTo(280, y + (grain() - 0.5) * 16, 700, y + (grain() - 0.5) * 12, 1060, y);
        press.stroke(id, line, id === "indigo" ? 1 : 0.8, id === "indigo" ? 0.08 : 0.05);
      }
    });
  }
}

function cloud(press: Press, x: number, y: number, s: number, seed: string, t: number): void {
  const rng = rngFor(seed);
  const drift = Math.sin(t * TAU / 32 + rng() * 4) * 18;
  const pts: Point[] = [];
  const n = 8;
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * TAU;
    pts.push({
      x: x + drift + Math.cos(a) * s * (1.8 + rng() * 0.5),
      y: y + Math.sin(a) * s * (0.55 + rng() * 0.25),
    });
  }
  const body = cut(pts, rng, 3);
  press.print("orange", body, 0.1, true);
  press.print("yellow", body, 0.07, true);
  press.print("indigo", body, 0.03, true);
}

function shikara(press: Press, t: number): void {
  const u = 0.5 + 0.38 * Math.sin(t * TAU / 32);
  const x = WINDOW.x + WINDOW.w * u;
  const y = HORIZON + 58 + Math.sin(t * TAU / 16) * 3;
  const lean = Math.sin(t * TAU / 32) * 0.08;
  const hull: Point[] = [
    { x: x - 48, y },
    { x: x - 24, y: y - 7 },
    { x: x + 22, y: y - 6 },
    { x: x + 50, y: y + 2 },
    { x: x + 20, y: y + 8 },
    { x: x - 22, y: y + 8 },
  ].map((p) => ({
    x: x + (p.x - x) * Math.cos(lean) - (p.y - y) * Math.sin(lean),
    y: y + (p.x - x) * Math.sin(lean) + (p.y - y) * Math.cos(lean),
  }));
  const boat = cut(hull, rngFor("shikara"), 1.1);
  const canopy = cut(
    [
      { x: x - 10, y: y - 4 },
      { x: x + 12, y: y - 3 },
      { x: x + 9, y: y - 16 },
      { x: x - 8, y: y - 17 },
    ],
    rngFor("canopy"),
    1,
  );
  press.plane("indigo", boat, 0.7, true);
  press.print("orange", boat, 0.18, true);
  press.plane("orange", canopy, 0.45, true);
  press.print("indigo", canopy, 0.2, true);
  const pole = new Path2D();
  pole.moveTo(x + 22, y - 2);
  pole.lineTo(x + 28, y - 22);
  press.stroke("indigo", pole, 1.4, 0.55, true);

  const reflect = cut(
    hull.map((p) => ({ x: p.x + Math.sin(t * 1.4 + p.x * 0.04) * 3, y: y + (y - p.y) * 0.7 + 10 })),
    rngFor("shikara-r"),
    1.4,
  );
  press.print("indigo", reflect, 0.16, true);
  press.print("orange", reflect, 0.06, true);
}

function ripples(press: Press, t: number): void {
  const rng = rngFor("ripple-guides");
  for (let i = 0; i < 18; i += 1) {
    const y = HORIZON + 16 + i * 9.4;
    const amp = 2.2 + i * 0.18;
    const phase = t * TAU / (8 + (i % 4)) + i * 0.7;
    const path = new Path2D();
    let first = true;
    for (let x = WINDOW.x + 8; x < WINDOW.x + WINDOW.w - 8; x += 10) {
      const yy = y + Math.sin(x * 0.018 + phase) * amp + Math.sin(x * 0.05 + phase * 1.3) * 1.1;
      if (first) {
        path.moveTo(x, yy);
        first = false;
      } else path.lineTo(x, yy);
    }
    const fade = clamp(0.28 - i * 0.008);
    press.stroke("indigo", path, 1.6, fade, true);
    if (i % 3 === 0) press.stroke("green", path, 1.1, fade * 0.5, true);
    if (i < 5) press.stroke("orange", path, 1, fade * 0.4, true);
  }

  for (let k = 0; k < 7; k += 1) {
    const y = HORIZON + 8 + rng() * 14;
    const path = new Path2D();
    const x0 = WINDOW.x + 40 + rng() * 200;
    path.moveTo(x0, y);
    path.quadraticCurveTo(x0 + 80, y + Math.sin(t + k) * 3, x0 + 160, y);
    press.stroke("yellow", path, 1.2, 0.08, true);
  }
}

function mountainGlow(press: Press, t: number): void {
  const dusk = 0.5 + 0.5 * Math.sin(t * TAU / 32);
  const wash = cut(
    [
      { x: WINDOW.x, y: WINDOW.y },
      { x: WINDOW.x + WINDOW.w, y: WINDOW.y },
      { x: WINDOW.x + WINDOW.w, y: HORIZON + 12 },
      { x: WINDOW.x, y: HORIZON + 14 },
    ],
    rngFor("light-wash"),
    1.5,
  );
  press.linearShade(
    "orange",
    wash,
    0,
    WINDOW.y,
    0,
    HORIZON,
    [
      [0, 0.02 + dusk * 0.04],
      [1, 0.04 + dusk * 0.1],
    ],
    true,
  );
  press.linearShade(
    "indigo",
    wash,
    0,
    WINDOW.y,
    0,
    HORIZON,
    [
      [0, 0.02 + (1 - dusk) * 0.06],
      [1, 0],
    ],
    true,
  );
}

function curtain(press: Press, t: number): void {
  const breathe = Math.sin(t * TAU / 8) * 10;
  const rng = rngFor("curtain");
  for (let i = 0; i < 5; i += 1) {
    const x = WINDOW.x + WINDOW.w - 18 - i * 13;
    const pts: Point[] = [];
    for (let k = 0; k <= 8; k += 1) {
      const u = k / 8;
      pts.push({
        x: x + breathe * Math.sin(u * Math.PI) * (0.4 + i * 0.08) + Math.sin(u * 4 + i) * 2,
        y: WINDOW.y + 4 + (WINDOW.h - 10) * u,
      });
    }
    const fold = catmull(pts, false);
    press.stroke("orange", fold, 9 - i * 0.7, 0.28 + rng() * 0.05, true);
    press.stroke("indigo", fold, 5.5, 0.2, true);
  }
}

function teaGlass(press: Press, t: number): void {
  const lean = Math.sin(t * TAU / 6.4) * 0.035;
  const cx = 360;
  const baseY = SILL_TOP + 62;
  const rot = (p: Point): Point => ({
    x: cx + (p.x - cx) * Math.cos(lean) - (p.y - baseY) * Math.sin(lean),
    y: baseY + (p.x - cx) * Math.sin(lean) + (p.y - baseY) * Math.cos(lean),
  });
  const glass = cut(
    [
      rot({ x: cx - 22, y: baseY }),
      rot({ x: cx - 18, y: baseY - 30 }),
      rot({ x: cx - 28, y: baseY - 62 }),
      rot({ x: cx + 28, y: baseY - 62 }),
      rot({ x: cx + 18, y: baseY - 30 }),
      rot({ x: cx + 22, y: baseY }),
    ],
    rngFor("glass"),
    0.8,
  );
  const tea = cut(
    [
      rot({ x: cx - 18, y: baseY - 10 }),
      rot({ x: cx - 16, y: baseY - 38 }),
      rot({ x: cx + 16, y: baseY - 38 }),
      rot({ x: cx + 18, y: baseY - 10 }),
    ],
    rngFor("tea"),
    0.6,
  );
  const rim = cut(
    [
      rot({ x: cx - 29, y: baseY - 64 }),
      rot({ x: cx, y: baseY - 68 }),
      rot({ x: cx + 29, y: baseY - 64 }),
      rot({ x: cx, y: baseY - 60 }),
    ],
    rngFor("rim"),
    0.5,
  );
  const shadow = cut(
    [
      { x: cx - 22, y: baseY + 4 },
      { x: cx + 28, y: baseY + 6 },
      { x: cx + 16, y: baseY + 14 },
      { x: cx - 10, y: baseY + 12 },
    ],
    rngFor("glass-shadow"),
    1,
  );
  press.print("indigo", shadow, 0.22, true);
  press.plane("indigo", glass, 0.2, true);
  press.stroke("indigo", glass, 2.2, 0.7, true);
  press.stroke("orange", glass, 1.4, 0.35, true);
  press.plane("yellow", tea, 0.72, true);
  press.print("orange", tea, 0.4, true);
  press.print("orange", rim, 0.4, true);
  press.stroke("indigo", rim, 1.8, 0.55, true);

  const steam = new Path2D();
  const sx = rot({ x: cx, y: baseY - 50 }).x;
  const sy = rot({ x: cx, y: baseY - 50 }).y;
  steam.moveTo(sx, sy);
  steam.bezierCurveTo(
    sx + Math.sin(t * 1.2) * 6,
    sy - 14,
    sx - Math.sin(t * 0.9 + 1) * 7,
    sy - 26,
    sx + Math.sin(t * 0.7) * 4,
    sy - 38,
  );
  press.stroke("orange", steam, 1.1, 0.12, true);
}

export function drawLive(press: Press, t: number): void {
  buildShapes();
  const time = ((t % 32) + 32) % 32;
  inkAll((id) => {
    press.liveCtx[id].save();
    press.liveCtx[id].clip(windowOpening);
  });
  mountainGlow(press, time);
  cloud(press, WINDOW.x + 180, WINDOW.y + 58, 28, "c1", time);
  cloud(press, WINDOW.x + 420, WINDOW.y + 42, 22, "c2", time + 4);
  cloud(press, WINDOW.x + 610, WINDOW.y + 70, 18, "c3", time + 9);
  ripples(press, time);
  shikara(press, time);
  curtain(press, time);
  inkAll((id) => {
    press.liveCtx[id].restore();
  });
  teaGlass(press, time);
}
