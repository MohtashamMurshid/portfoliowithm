import * as THREE from "three";

type TileKind = "stone" | "brick" | "pier" | "wood" | "concrete" | "block" | "roof" | "lattice" | "paving";

/** Deterministic local textures, sized in metres so masonry stays consistent. */
export function createHouseMaterials() {
  let seed = 721;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  function tile(kind: TileKind) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas textures are unavailable.");
    if (["brick", "pier", "stone", "block"].includes(kind)) {
      const brick = kind === "brick" || kind === "pier";
      const pier = kind === "pier";
      ctx.fillStyle = brick ? (pier ? "#9b8b7a" : "#e2d7c4") : kind === "block" ? "#b8b8a9" : "#47463e";
      ctx.fillRect(0, 0, 512, 512);
      const rows = brick ? (pier ? 22 : 18) : kind === "block" ? 7 : 10;
      const height = 512 / rows;
      const width = brick ? (pier ? 91 : 85.3333) : kind === "block" ? 102.4 : 170.6667;
      const joint = brick ? (pier ? 1.8 : 3.1) : 3;
      for (let row = 0; row < rows; row++) {
        for (let column = -1; column < Math.ceil(512 / width) + 1; column++) {
          const x = column * width + (row % 2) * width / 2;
          const y = row * height;
          ctx.fillStyle = brick
            ? `hsl(${pier ? 15 : 13 + random() * 5} ${pier ? 25 : 30 + random() * 8}% ${36 + random() * 14}%)`
            : kind === "block"
              ? `hsl(47 5% ${46 + random() * 13}%)`
              : `hsl(${35 + random() * 6} ${10 + random() * 10}% ${29 + random() * 16}%)`;
          const chip = kind === "block" ? 7 + random() * 8 : 2;
          ctx.beginPath();
          ctx.moveTo(x + joint + chip, y + joint);
          ctx.lineTo(x + width - joint - chip * 0.5, y + joint + random() * 3);
          ctx.lineTo(x + width - joint, y + joint + chip);
          ctx.lineTo(x + width - joint - random() * 3, y + height - joint - chip);
          ctx.lineTo(x + width - joint - chip, y + height - joint);
          ctx.lineTo(x + joint + chip * 0.5, y + height - joint - random() * 2);
          ctx.lineTo(x + joint, y + height - joint - chip);
          ctx.lineTo(x + joint, y + joint + chip);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = brick ? "#f5e0c52a" : "#ede6d040";
          ctx.lineWidth = brick ? 1 : 2;
          ctx.stroke();
          for (let fleck = 0; fleck < (brick ? 35 : 100); fleck++) {
            ctx.fillStyle = random() > 0.5 ? "#f0e3d127" : "#24231f35";
            ctx.fillRect(x + joint + random() * (width - 2 * joint), y + joint + random() * (height - 2 * joint), 1 + random() * 5, 1 + random() * 2);
          }
        }
      }
    } else if (kind === "roof") {
      ctx.fillStyle = "#754c43";
      ctx.fillRect(0, 0, 512, 512);
      const w = 64;
      const h = 85.3333;
      for (let row = -1; row < 7; row++) {
        for (let col = -1; col < 9; col++) {
          const x = col * w + (row % 2) * 12;
          const y = row * h;
          const gradient = ctx.createLinearGradient(x, y, x + w, y);
          const light = 35 + random() * 8;
          gradient.addColorStop(0, `hsl(12 23% ${light - 9}%)`);
          gradient.addColorStop(0.45, `hsl(14 28% ${light + 12}%)`);
          gradient.addColorStop(0.85, `hsl(12 27% ${light}%)`);
          gradient.addColorStop(1, `hsl(12 22% ${light - 12}%)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, w, h);
          ctx.fillStyle = "#392923a0";
          ctx.fillRect(x, y + h - 5, w, 5);
          ctx.fillStyle = "#dbad9065";
          ctx.fillRect(x + 5, y + h - 8, w - 10, 3);
        }
      }
    } else if (kind === "lattice") {
      ctx.fillStyle = "#524a3a";
      ctx.fillRect(0, 0, 512, 512);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#c1ae89";
      for (let x = -512; x <= 1024; x += 32) {
        for (const sign of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + sign * 512, 512);
          ctx.stroke();
        }
      }
    } else if (kind === "wood") {
      ctx.fillStyle = "#987044";
      ctx.fillRect(0, 0, 512, 512);
      for (let line = 0; line < 450; line++) {
        const x = random() * 512;
        ctx.strokeStyle = `rgba(${random() > 0.5 ? "235,193,125" : "48,25,12"},${0.05 + random() * 0.18})`;
        ctx.lineWidth = 0.4 + random() * 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + 12, 160, x - 10, 350, x, 512);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 64) {
        ctx.fillStyle = "#49351b80";
        ctx.fillRect(x, 0, 2, 512);
      }
    } else if (kind === "paving") {
      ctx.fillStyle = "#c6bda9";
      ctx.fillRect(0, 0, 512, 512);
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          ctx.fillStyle = (row + col) % 2 ? "#b28f7b" : "#c0b097";
          ctx.fillRect(col * 128 + 4, row * 128 + 4, 120, 120);
        }
      }
    } else {
      ctx.fillStyle = "#93958e";
      ctx.fillRect(0, 0, 512, 512);
    }
    const pixels = ctx.getImageData(0, 0, 512, 512);
    for (let i = 0; i < pixels.data.length; i += 4) {
      const noise = (random() - 0.5) * (kind === "wood" ? 11 : 22);
      for (let channel = 0; channel < 3; channel++) pixels.data[i + channel] += noise;
    }
    ctx.putImageData(pixels, 0, 0);
    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    const bumpMap = map.clone();
    bumpMap.colorSpace = THREE.NoColorSpace;
    return { map, bumpMap };
  }

  function surface(kind: TileKind, worldTile: number, roughness = 0.94, bumpScale = 0.025) {
    const material = new THREE.MeshStandardMaterial({ ...tile(kind), roughness, bumpScale });
    material.userData.worldTile = worldTile;
    return material;
  }
  const roof = surface("roof", 1.8, 0.88, 0.06);
  roof.side = THREE.DoubleSide;
  return {
    stone: surface("stone", 2),
    brick: surface("brick", 1.5),
    pier: surface("pier", 1.8),
    wood: surface("wood", 2, 0.76, 0.015),
    concrete: surface("concrete", 2),
    block: surface("block", 1.8, 0.98, 0.05),
    lattice: surface("lattice", 0.95, 0.9, 0.006),
    paving: surface("paving", 2.4),
    roof,
    paint: new THREE.MeshStandardMaterial({ color: "#9c5149", roughness: 0.88 }),
    seam: new THREE.MeshStandardMaterial({ color: "#715249", roughness: 0.86 }),
    trim: new THREE.MeshStandardMaterial({ color: "#eee9dc", roughness: 0.73 }),
    recess: new THREE.MeshStandardMaterial({ color: "#292d29", roughness: 0.98 }),
    glass: new THREE.MeshStandardMaterial({ color: "#3a5557", metalness: 0.25, roughness: 0.23, envMapIntensity: 0.8 }),
    steel: new THREE.MeshStandardMaterial({ color: "#c1c3bd", metalness: 0.9, roughness: 0.23 }),
    brass: new THREE.MeshStandardMaterial({ color: "#ad7e3c", metalness: 0.8, roughness: 0.3 }),
    copper: new THREE.MeshStandardMaterial({ color: "#a45c35", metalness: 0.7, roughness: 0.5 }),
    soil: new THREE.MeshStandardMaterial({ color: "#71644f", roughness: 1 }),
    grass: new THREE.MeshStandardMaterial({ color: "#7f8952", roughness: 1 }),
    leaf: new THREE.MeshStandardMaterial({ color: "#46603b", roughness: 0.92, side: THREE.DoubleSide }),
    pot: new THREE.MeshStandardMaterial({ color: "#b58262", roughness: 0.95 }),
    turquoise: new THREE.MeshStandardMaterial({ color: "#569d91", roughness: 0.85 }),
  };
}

export type HouseMaterials = ReturnType<typeof createHouseMaterials>;
