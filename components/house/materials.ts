import * as THREE from "three";

/** Small, deterministic, seamless material tiles. No remote asset requests. */
export function createHouseMaterials() {
  let seed = 721;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  function tile(kind: "stone" | "brick" | "wood" | "concrete" | "block") {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas textures are unavailable.");
    if (kind === "stone" || kind === "brick" || kind === "block") {
      const brick = kind === "brick";
      ctx.fillStyle = brick ? "#b09a83" : kind === "block" ? "#54574f" : "#5a4634";
      ctx.fillRect(0, 0, 512, 512);
      const rows = brick ? 12 : 8;
      const height = 512 / rows;
      const width = brick ? 128 : 170.6667;
      for (let row = 0; row < rows; row++) {
        for (let column = -1; column < 5; column++) {
          const x = column * width + (row % 2) * width / 2;
          const y = row * height;
          const light = random() * 14;
          ctx.fillStyle = brick
            ? `hsl(${9 + random() * 8} ${52 + random() * 10}% ${34 + light}%)`
            : kind === "block"
              ? `hsl(${130 + random() * 70} ${4 + random() * 7}% ${31 + light}%)`
              : `hsl(${24 + random() * 8} ${30 + random() * 10}% ${31 + light}%)`;
          ctx.fillRect(x + 2, y + 2, width - 4, height - 4);
          ctx.fillStyle = "#ffffff18";
          ctx.fillRect(x + 3, y + 3, width - 7, 2);
          ctx.fillStyle = "#00000024";
          ctx.fillRect(x + 2, y + height - 5, width - 4, 3);
          if (!brick) {
            for (let line = 0; line < 9; line++) {
              ctx.strokeStyle = random() > 0.5 ? "#d4c5a529" : "#201b172b";
              ctx.lineWidth = 1 + random() * 4;
              ctx.beginPath();
              const sy = y + 7 + random() * (height - 14);
              ctx.moveTo(x + 6, sy);
              ctx.bezierCurveTo(x + width * 0.3, sy - 8, x + width * 0.6, sy + 8, x + width - 7, sy - 2);
              ctx.stroke();
            }
          }
        }
      }
    } else if (kind === "wood") {
      ctx.fillStyle = "#5e3c26";
      ctx.fillRect(0, 0, 512, 512);
      for (let line = 0; line < 450; line++) {
        const x = random() * 512;
        ctx.strokeStyle = `rgba(${random() > 0.5 ? "213,161,100" : "35,18,9"},${0.05 + random() * 0.19})`;
        ctx.lineWidth = 0.4 + random() * 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + 12, 160, x - 10, 350, x, 512);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 128) {
        ctx.fillStyle = "#2c190c66";
        ctx.fillRect(x, 0, 2, 512);
      }
    } else {
      ctx.fillStyle = "#b2ada0";
      ctx.fillRect(0, 0, 512, 512);
    }
    // Fine grain also supplies a subtle relief map at close viewing distances.
    const pixels = ctx.getImageData(0, 0, 512, 512);
    for (let i = 0; i < pixels.data.length; i += 4) {
      const noise = (random() - 0.5) * (kind === "wood" ? 11 : 23);
      for (let channel = 0; channel < 3; channel++) pixels.data[i + channel] += noise;
    }
    ctx.putImageData(pixels, 0, 0);
    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    const bumpMap = map.clone();
    bumpMap.colorSpace = THREE.NoColorSpace;
    return { map, bumpMap };
  }

  const stone = new THREE.MeshStandardMaterial({ ...tile("stone"), roughness: 0.96, bumpScale: 0.09 });
  const brick = new THREE.MeshStandardMaterial({ ...tile("brick"), roughness: 0.93, bumpScale: 0.045 });
  const wood = new THREE.MeshStandardMaterial({ ...tile("wood"), roughness: 0.65, bumpScale: 0.018 });
  const concrete = new THREE.MeshStandardMaterial({ ...tile("concrete"), roughness: 0.98, bumpScale: 0.035 });
  const block = new THREE.MeshStandardMaterial({ ...tile("block"), roughness: 0.95, bumpScale: 0.07 });
  for (const material of [stone, brick, wood, concrete, block]) material.userData.worldTile = 2;
  return {
    stone, brick, wood, concrete, block,
    paint: new THREE.MeshStandardMaterial({ color: "#7e2f22", roughness: 0.78 }),
    roof: new THREE.MeshStandardMaterial({ color: "#6a4a33", metalness: 0.5, roughness: 0.56, side: THREE.DoubleSide }),
    seam: new THREE.MeshStandardMaterial({ color: "#523827", metalness: 0.55, roughness: 0.5 }),
    trim: new THREE.MeshStandardMaterial({ color: "#f4f1ea", roughness: 0.67 }),
    recess: new THREE.MeshStandardMaterial({ color: "#292721", roughness: 0.98 }),
    glass: new THREE.MeshStandardMaterial({ color: "#4c5d5b", metalness: 0.45, roughness: 0.16, envMapIntensity: 1.4 }),
    steel: new THREE.MeshStandardMaterial({ color: "#a3a59a", metalness: 0.85, roughness: 0.27 }),
    brass: new THREE.MeshStandardMaterial({ color: "#ad7e3c", metalness: 0.8, roughness: 0.3 }),
    copper: new THREE.MeshStandardMaterial({ color: "#a45c35", metalness: 0.85, roughness: 0.42 }),
    soil: new THREE.MeshStandardMaterial({ color: "#767564", roughness: 1 }),
  };
}

export type HouseMaterials = ReturnType<typeof createHouseMaterials>;
