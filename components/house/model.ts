import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { HouseMaterials } from "./materials";

type Point = [number, number, number];

/** Approximate exterior proportions, not a measured architectural survey.
 * Matching front gables frame a curved entrance and a continuous veranda.
 * The rear wings close into a square corner with plain brick elevations.
 * Photographs and the owner's corrections guide the approximate exterior.
 * All units are nominal metres.
 */
export function createHouseModel(m: HouseMaterials) {
  const root = new THREE.Group();
  root.name = "Kashmiri residence, approximate exterior";

  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Group = root) {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }

  function box(w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material, parent = root) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const tileSize = material.userData.worldTile as number | undefined;
    if (tileSize) {
      const uv = geometry.getAttribute("uv");
      const position = geometry.getAttribute("position");
      const normal = geometry.getAttribute("normal");
      for (let i = 0; i < uv.count; i++) {
        const nx = Math.abs(normal.getX(i));
        const ny = Math.abs(normal.getY(i));
        uv.setXY(i, (nx > 0.5 ? position.getZ(i) : position.getX(i)) / tileSize,
          (ny > 0.5 ? position.getZ(i) : position.getY(i)) / tileSize);
      }
    }
    const object = mesh(geometry, material, parent);
    object.position.set(x, y, z);
    return object;
  }

  function beam(a: Point, b: Point, radius: number, material: THREE.Material, parent = root) {
    const from = new THREE.Vector3(...a);
    const to = new THREE.Vector3(...b);
    const direction = to.clone().sub(from);
    const object = mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 6), material, parent);
    object.position.copy(from.add(to).multiplyScalar(0.5));
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return object;
  }

  function planarUV(geometry: THREE.BufferGeometry, material: THREE.Material) {
    const scale = material.userData.worldTile as number | undefined;
    if (!scale) return;
    const uv = geometry.getAttribute("uv");
    const pos = geometry.getAttribute("position");
    const normal = geometry.getAttribute("normal");
    for (let i = 0; i < uv.count; i++) {
      const nx = Math.abs(normal.getX(i));
      const ny = Math.abs(normal.getY(i));
      const nz = Math.abs(normal.getZ(i));
      uv.setXY(i, (nx > nz && nx > ny ? pos.getZ(i) : pos.getX(i)) / scale,
        (ny > nx && ny > nz ? pos.getZ(i) : pos.getY(i)) / scale);
    }
  }

  function polygon(points: Point[], material: THREE.Material, parent = root) {
    const vertices: number[] = [];
    for (let i = 1; i < points.length - 1; i++) {
      for (const point of [points[0], points[i], points[i + 1]]) vertices.push(...point);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(vertices.length / 3 * 2).fill(0), 2));
    geometry.computeVertexNormals();
    planarUV(geometry, material);
    return mesh(geometry, material, parent);
  }

  function archedShape(width: number, height: number) {
    const shape = new THREE.Shape();
    const radius = width / 2;
    const spring = height - radius;
    shape.moveTo(-radius, 0);
    shape.lineTo(radius, 0);
    shape.lineTo(radius, spring);
    shape.absarc(0, spring, radius, 0, Math.PI, false);
    shape.closePath();
    return shape;
  }

  function arch(width: number, height: number, x: number, y: number, z: number, material: THREE.Material, parent: THREE.Group) {
    const object = mesh(new THREE.ExtrudeGeometry(archedShape(width, height), {
      depth: 0.045, bevelEnabled: false, curveSegments: 20,
    }), material, parent);
    planarUV(object.geometry, material);
    object.position.set(x, y, z);
    return object;
  }

  function archBorder(width: number, height: number, thickness: number, x: number, y: number, z: number, material: THREE.Material, parent: THREE.Group) {
    box(thickness, height - width / 2, 0.09, x - width / 2, y + (height - width / 2) / 2, z, material, parent);
    box(thickness, height - width / 2, 0.09, x + width / 2, y + (height - width / 2) / 2, z, material, parent);
    const curve = new THREE.EllipseCurve(0, 0, width / 2, width / 2, 0, Math.PI, false, 0);
    const path = new THREE.CatmullRomCurve3(curve.getPoints(32).map(p => new THREE.Vector3(p.x + x, p.y + y + height - width / 2, z)));
    mesh(new THREE.TubeGeometry(path, 32, thickness / 2, 6, false), material, parent);
    box(width + thickness, thickness, 0.12, x, y, z, material, parent);
  }

  function windowAt(x: number, y: number, z: number, rotation = 0, arched = false, width = 1.75, height = 1.65, parent = root) {
    const group = new THREE.Group();
    parent.add(group);
    group.position.set(x, y, z);
    group.rotation.y = rotation;
    if (arched) {
      arch(width + 0.16, height + 0.1, 0, -0.04, 0.02, m.trim, group);
      arch(width, height, 0, 0, 0.09, m.lattice, group);
      archBorder(width, height, 0.065, 0, 0, 0.19, m.trim, group);
      const paneH = height - width / 2 - 0.25;
      box(width * 0.43, paneH, 0.055, 0, paneH / 2 + 0.22, 0.17, m.glass, group);
      for (const side of [-1, 1]) box(0.055, height - width / 2, 0.07, side * width * 0.25, (height - width / 2) / 2, 0.23, m.trim, group);
      box(width, 0.06, 0.07, 0, height - width / 2, 0.23, m.trim, group);
      box(width, 0.06, 0.07, 0, 0.2, 0.23, m.trim, group);
      for (let row = 1; row < 5; row++) box(width * 0.5, 0.04, 0.07, 0, 0.2 + paneH * row / 5, 0.23, m.trim, group);
      box(0.04, paneH, 0.07, 0, paneH / 2 + 0.22, 0.23, m.trim, group);
    } else {
      box(width + 0.16, height + 0.16, 0.09, 0, height / 2, 0.03, m.trim, group);
      box(width, height, 0.07, 0, height / 2, 0.1, m.lattice, group);
      box(width * 0.64, height * 0.7, 0.035, 0, height * 0.48, 0.15, m.glass, group);
      for (const side of [-1, 1]) {
        box(0.065, height + 0.08, 0.09, side * width / 2, height / 2, 0.2, m.trim, group);
        box(width + 0.12, 0.065, 0.09, 0, side < 0 ? 0 : height, 0.2, m.trim, group);
        box(0.055, height, 0.09, side * width * 0.33, height / 2, 0.2, m.trim, group);
      }
      box(0.045, height, 0.09, 0, height / 2, 0.2, m.trim, group);
      for (const row of [0.14, 0.36, 0.59, 0.83]) box(width * (row === 0.14 || row === 0.83 ? 1 : 0.66), 0.045, 0.09, 0, height * row, 0.2, m.trim, group);
    }
    box(width + 0.22, 0.09, 0.32, 0, -0.06, 0.12, m.trim, group);
  }

  // Open side casements retain their own frame and small panes.
  function casement(x: number, y: number, width: number, height: number, arched: boolean, side: number, parent: THREE.Group) {
    const leaf = new THREE.Group();
    parent.add(leaf);
    leaf.position.set(x - side * width / 2, y, 0.29);
    leaf.rotation.y = -side * 0.95;
    const centre = side * width / 2;
    if (arched) {
      arch(width, height, centre, 0, 0, m.glass, leaf);
      archBorder(width, height, 0.05, centre, 0, 0.07, m.trim, leaf);
    } else {
      box(width, height, 0.035, centre, height / 2, 0, m.glass, leaf);
      for (const edge of [-1, 1]) {
        box(0.05, height, 0.065, centre + edge * width / 2, height / 2, 0.04, m.trim, leaf);
        box(width, 0.05, 0.065, centre, edge < 0 ? 0 : height, 0.04, m.trim, leaf);
      }
    }
    box(0.035, height - (arched ? width / 2 : 0), 0.07, centre, (height - (arched ? width / 2 : 0)) / 2, 0.07, m.trim, leaf);
    for (let row = 1; row < 5; row++) box(width - 0.03, 0.035, 0.065, centre, (height - (arched ? width / 2 : 0)) * row / 5, 0.07, m.trim, leaf);
  }

  function wingWindows(parent: THREE.Group, open: boolean) {
    // One continuous painted surround, with a taller central arch and two shoulders.
    arch(2.28, 2.7, 0, 4.34, 0.035, m.paint, parent);
    for (const side of [-1, 1]) {
      arch(0.99, 2.02, side * 1.28, 4.34, 0.035, m.paint, parent);
      box(0.25, 4.9, 0.17, side * 1.79, 3.68, 0.095, m.paint, parent);
    }
    box(3.3, 0.98, 0.085, 0, 3.86, 0.1, m.block, parent);
    for (const y of [3.34, 4.38]) {
      box(3.36, 0.095, 0.17, 0, y, 0.19, m.paint, parent);
      box(3.36, 0.055, 0.21, 0, y + 0.065, 0.19, m.trim, parent);
    }
    arch(1.87, 2.3, 0, 4.49, 0.17, m.lattice, parent);
    archBorder(1.87, 2.3, 0.075, 0, 4.49, 0.26, m.trim, parent);
    archBorder(1.52, 2.05, 0.045, 0, 4.52, 0.28, m.trim, parent);
    box(1.86, 0.06, 0.08, 0, 4.89, 0.29, m.trim, parent);
    for (const side of [-1, 1]) {
      arch(0.59, 1.75, side * 1.27, 4.49, 0.18, m.glass, parent);
      archBorder(0.59, 1.75, 0.065, side * 1.27, 4.49, 0.27, m.trim, parent);
      box(0.035, 1.44, 0.06, side * 1.27, 5.21, 0.28, m.trim, parent);
      for (let row = 1; row < 5; row++) box(0.59, 0.035, 0.06, side * 1.27, 4.49 + row * 0.29, 0.28, m.trim, parent);
    }
    box(3.27, 0.1, 0.36, 0, 4.45, 0.2, m.trim, parent);
    // The lower opening is rectangular, with screened centre and narrow casements.
    box(3.27, 1.96, 0.07, 0, 2.28, 0.12, m.lattice, parent);
    for (const side of [-1, 1]) {
      box(0.07, 2.05, 0.1, side * 1.66, 2.28, 0.23, m.trim, parent);
      box(3.38, 0.085, 0.15, 0, 2.28 + side * 1.01, 0.23, m.trim, parent);
      box(0.065, 1.96, 0.09, side * 0.96, 2.28, 0.23, m.trim, parent);
      box(0.59, 1.53, 0.045, side * 1.29, 2.15, 0.19, m.glass, parent);
      box(0.035, 1.53, 0.07, side * 1.29, 2.15, 0.25, m.trim, parent);
      for (let row = 1; row < 5; row++) box(0.6, 0.035, 0.07, side * 1.29, 1.39 + row * 0.3, 0.25, m.trim, parent);
    }
    box(3.27, 0.06, 0.09, 0, 2.96, 0.25, m.trim, parent);
    box(1.88, 0.06, 0.09, 0, 1.83, 0.25, m.trim, parent);
    box(3.5, 0.12, 0.4, 0, 1.23, 0.21, m.trim, parent);
    if (open) {
      casement(-1.27, 4.49, 0.59, 1.75, true, -1, parent);
      casement(1.29, 1.39, 0.59, 1.53, false, 1, parent);
    }
    box(0.16, 0.1, 0.1, 0, 4.03, 0.21, m.recess, parent);
  }

  function railing(a: Point, b: Point, height = 0.95) {
    const distance = new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b));
    const count = Math.max(1, Math.ceil(distance / 0.75));
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const p: Point = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      beam(p, [p[0], p[1] + height, p[2]], 0.024, m.steel);
      box(0.12, 0.045, 0.12, p[0], p[1] + 0.025, p[2], m.steel);
    }
    for (const level of [0.2, 0.43, 0.66, height]) {
      beam([a[0], a[1] + level, a[2]], [b[0], b[1] + level, b[2]], level === height ? 0.035 : 0.015, m.steel);
    }
  }

  function mix(a: Point, b: Point, t: number): Point {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  function roofFace(a: Point, b: Point, c: Point, d: Point, parent = root) {
    const width = new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b));
    const depth = new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...d));
    const courses = Math.max(1, Math.ceil(depth / 0.3));
    for (let row = 0; row < courses; row++) {
      const lo = row / courses;
      const hi = Math.min(1, (row + 1.09) / courses);
      const points = [mix(a, d, lo), mix(b, c, lo), mix(b, c, hi), mix(a, d, hi)];
      points[0][1] += 0.025;
      points[1][1] += 0.025;
      const tile = polygon(points, m.roof, parent);
      // Each course is one row of tiles; U follows the eave, V the slope.
      const uv = tile.geometry.getAttribute("uv");
      const topWidth = new THREE.Vector3(...points[2]).distanceTo(new THREE.Vector3(...points[3]));
      const coords = [[0, 0], [width / 1.8, 0], [topWidth / 1.8, 1 / 6], [0, 0], [topWidth / 1.8, 1 / 6], [0, 1 / 6]];
      coords.forEach(([u, v], i) => uv.setXY(i, u, v + (row % 6) / 6));
    }
    beam(d, c, 0.045, m.seam, parent);
  }

  function fretwork(a: Point, b: Point, parent = root) {
    beam(a, b, 0.055, m.trim, parent);
    const count = Math.ceil(new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b)) / 0.16);
    for (let i = 0; i < count; i++) {
      const left = mix(a, b, i / count);
      const right = mix(a, b, (i + 1) / count);
      const tip = mix(left, right, 0.5);
      tip[1] -= 0.13;
      const tooth = polygon([left, right, tip], m.trim, parent);
      // Include the reverse face without making every painted surface double-sided.
      polygon([tip, right, left], m.trim, parent);
      tooth.castShadow = false;
    }
  }

  // The curved corner bay: a quarter circle tangent to both wing facades.
  const CX = 0.25;
  const CZ = -0.25;
  const WALL = 5.0;
  const A0 = Math.PI / 2;
  const A1 = Math.PI;
  const AM = Math.PI * 0.75;
  const at = (angle: number, radius: number): [number, number] => [CX + radius * Math.cos(angle), CZ + radius * Math.sin(angle)];
  const at3 = (angle: number, radius: number, y: number): Point => [CX + radius * Math.cos(angle), y, CZ + radius * Math.sin(angle)];
  const facing = (angle: number) => Math.atan2(Math.cos(angle), Math.sin(angle));

  function ringSector(r0: number, r1: number, a0: number, a1: number, y: number, thickness: number, material: THREE.Material) {
    const shape = new THREE.Shape();
    shape.absarc(CX, CZ, r1, a0, a1, false);
    shape.absarc(CX, CZ, r0, a1, a0, true);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 32 });
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, y, 0);
    const uv = geometry.getAttribute("uv");
    const pos = geometry.getAttribute("position");
    const normal = geometry.getAttribute("normal");
    const scale = (material.userData.worldTile as number | undefined) ?? 2;
    for (let i = 0; i < uv.count; i++) {
      if (Math.abs(normal.getY(i)) > 0.5) uv.setXY(i, pos.getX(i) / scale, pos.getZ(i) / scale);
      else {
        const angle = Math.atan2(pos.getZ(i) - CZ, pos.getX(i) - CX);
        uv.setXY(i, angle * r1 / scale, pos.getY(i) / scale);
      }
    }
    const object = mesh(geometry, material);
    return object;
  }

  // A shallow garden pad and tiled paths echo the reference courtyard.
  box(22, 0.22, 22, 0.7, -0.2, -0.7, m.soil);
  box(21.8, 0.08, 21.8, 0.7, -0.07, -0.7, m.grass);
  box(18.4, 0.08, 18.4, 1.2, -0.025, -1.2, m.paving);

  // Matching front gables; the two roof ridges meet over the square rear corner.
  function buildWing(px: number, pz: number, ry: number, sideSign: 1 | -1) {
    const wing = new THREE.Group();
    root.add(wing);
    wing.position.set(px, 0, pz);
    wing.rotation.y = ry;
    box(4.9, 0.72, 10.2, 0, 0.3, 0, m.block, wing);
    box(4.5, 6.65, 9.8, 0, 3.925, 0, m.brick, wing);
    for (const front of [-1, 1]) box(4.5, 6.55, 0.1, 0, 3.94, front * 4.92, m.brick, wing);
    box(4.62, 0.11, 9.98, 0, 0.77, 0, m.paint, wing);
    box(4.6, 0.12, 9.92, 0, 0.66, 0, m.trim, wing);
    for (const edge of [-1, 1]) {
      box(0.075, 6.5, 0.16, edge * 2.18, 3.97, 4.99, m.paint, wing);
    }
    box(4.5, 0.19, 10.05, 0, 7.2, 0, m.wood, wing);
    // Only the two front-facing elevations have decorative gables.
    {
      const z = 4.99;
      const gable = new THREE.Group();
      wing.add(gable);
      gable.position.set(0, 0, z);
      gable.rotation.y = 0;
      polygon([[-2.25, 7.24, 0], [2.25, 7.24, 0], [0, 9.67, 0]], m.brick, gable);
      polygon([[-1.46, 7.35, 0.03], [1.46, 7.35, 0.03], [1.46, 7.97, 0.03], [0, 9.09, 0.03], [-1.46, 7.97, 0.03]], m.paint, gable);
      polygon([[-1.24, 7.51, 0.08], [1.24, 7.51, 0.08], [1.24, 7.9, 0.08], [0, 8.91, 0.08], [-1.24, 7.9, 0.08]], m.trim, gable);
      polygon([[-1.1, 7.64, 0.1], [1.1, 7.64, 0.1], [1.1, 7.85, 0.1], [0, 8.73, 0.1], [-1.1, 7.85, 0.1]], m.glass, gable);
      for (let bar = -3; bar <= 3; bar++) {
        const bx = bar * 0.29;
        const h = 1.03 - Math.abs(bx) * 0.8;
        box(0.045, h, 0.065, bx, 7.67 + h / 2, 0.16, m.trim, gable);
      }
      box(2.24, 0.045, 0.07, 0, 7.95, 0.17, m.trim, gable);
      wingWindows(gable, true);
    }
    const frontZ = 6.08;
    const ridgeRearZ = -7.15;
    const ridge = 9.92;
    for (const slope of [-1, 1]) {
      const edge = slope * 3.12;
      // Outer slopes reach the rear hip, inner slopes meet at the shared valley.
      const rearZ = slope === sideSign ? -10.27 : -4.03;
      roofFace([edge, 7.2, frontZ], [edge, 7.2, rearZ], [0, ridge, ridgeRearZ], [0, ridge, frontZ], wing);
      const soffit = polygon([[edge, 7.13, frontZ], [0, ridge - 0.07, frontZ], [0, ridge - 0.07, ridgeRearZ], [edge, 7.13, rearZ]], m.wood, wing);
      // Winding follows the slope; the underside must face the ground.
      const indices = soffit.geometry.getAttribute("position");
      if (soffit.geometry.getAttribute("normal").getY(0) > 0) {
        for (let i = 0; i < indices.count; i += 3) {
          const a = new THREE.Vector3().fromBufferAttribute(indices, i);
          const b = new THREE.Vector3().fromBufferAttribute(indices, i + 2);
          indices.setXYZ(i, b.x, b.y, b.z);
          indices.setXYZ(i + 2, a.x, a.y, a.z);
        }
        soffit.geometry.computeVertexNormals();
        planarUV(soffit.geometry, m.wood);
      }
      fretwork([edge, 7.18, frontZ], [0, ridge, frontZ], wing);
      fretwork([edge, 7.15, frontZ], [edge, 7.15, rearZ], wing);
    }
    beam([0, ridge + 0.025, ridgeRearZ], [0, ridge + 0.025, frontZ], 0.065, m.seam, wing);
    beam([sideSign * 2.31, 0.48, 4.69], [sideSign * 2.31, 7.12, 4.69], 0.055, m.seam, wing);
  }

  buildWing(6.0, 1.15, 0, 1);
  buildWing(-1.15, -6.0, -Math.PI / 2, -1);

  // Fill the former rear notch. Both back walls now meet at (8.25, -8.25),
  // with the same small brick and mortar as the front gables.
  box(4.5, 6.65, 4.5, 6, 3.925, -6, m.brick);
  box(4.9, 0.72, 4.9, 6, 0.3, -6, m.block);
  box(4.6, 0.12, 4.6, 6, 0.66, -6, m.trim);
  box(4.62, 0.11, 4.62, 6, 0.77, -6, m.paint);
  // Two simple openings per storey on each long rear elevation.
  for (const y of [1.42, 4.75]) {
    for (const offset of [-4.5, 2.5]) {
      windowAt(8.27, y, offset, Math.PI / 2, false, 1.6, 1.65);
      windowAt(-offset, y, -8.27, Math.PI, false, 1.6, 1.65);
    }
  }

  // A straight two-storey run joins each gabled wing to the curved bay, so each
  // elevation reads: gable, long straight wall, then the curve to the other face.
  function buildConnector(px: number, pz: number, ry: number) {
    const section = new THREE.Group();
    root.add(section);
    section.position.set(px, 0, pz);
    section.rotation.y = ry;
    box(4.2, 0.62, 4.8, 0, 0.3, 0.05, m.concrete, section);
    box(3.9, 6.65, 4.4, 0, 3.925, 0, m.stone, section);
    box(3.92, 0.1, 4.44, 0, 0.78, 0, m.paint, section);
    box(3.98, 0.12, 4.5, 0, 0.66, 0, m.trim, section);
    box(3.9, 0.19, 4.5, 0, 7.2, 0, m.wood, section);
    windowAt(0, 1.42, 2.2, 0, false, 1.6, 1.6, section);
    windowAt(0, 4.75, 2.2, 0, false, 1.6, 1.65, section);
    // A concealed roof closes the connector below the canopy and wing slope.
    box(3.9, 0.08, 4.5, 0, 7.66, 0.05, m.seam, section);
  }
  buildConnector(2.0, 2.55, 0);
  buildConnector(-2.55, -2.0, -Math.PI / 2);

  // One continuous curved stone wall behind the wraparound veranda.
  ringSector(WALL - 0.4, WALL, A0 - 0.015, A1 + 0.015, 7.5, 6.85, m.stone);
  ringSector(WALL - 0.35, WALL + 0.08, A0, A1, 0.69, 0.69, m.block);
  for (const angle of [AM - 0.48, AM + 0.48]) {
    const p = at(angle, 5.08);
    windowAt(p[0], 1.1, p[1], facing(angle), false, 1.2, 2.12);
    windowAt(p[0], 4.08, p[1], facing(angle), false, 1.2, 2.35);
  }

  // Keep the entrance detailing, mounted directly on the curved wall. There
  // is no projecting box behind it; the flat door is tangent to the stone arc.
  const entrance = new THREE.Group();
  root.add(entrance);
  const entrancePos = at(AM, WALL - 1.02);
  entrance.position.set(entrancePos[0], 0, entrancePos[1]);
  entrance.rotation.y = facing(AM);
  box(2.25, 0.82, 0.05, 0, 3.78, 1.03, m.trim, entrance);
  box(2.12, 0.69, 0.065, 0, 3.78, 1.07, m.block, entrance);
  windowAt(0, 4.57, 1.05, 0, true, 1.86, 2.2, entrance);
  box(2.12, 2.78, 0.12, 0, 2.02, 1.07, m.trim, entrance);
  box(1.95, 2.66, 0.1, 0, 1.99, 1.15, m.recess, entrance);
  for (const side of [-1, 1]) {
    box(0.94, 2.56, 0.12, side * 0.48, 1.99, 1.24, m.wood, entrance);
    for (const y of [1.33, 2.57]) {
      box(0.73, 1.04, 0.06, side * 0.48, y, 1.33, m.wood, entrance);
      for (const edge of [-1, 1]) {
        box(0.03, 0.94, 0.04, side * 0.48 + edge * 0.32, y, 1.38, m.wood, entrance);
        box(0.65, 0.03, 0.04, side * 0.48, y + edge * 0.47, 1.38, m.wood, entrance);
      }
      for (const cy of [-0.29, 0, 0.29]) {
        const ornament = mesh(new THREE.TorusGeometry(0.095, 0.016, 5, 12), m.wood, entrance);
        ornament.position.set(side * 0.48, y + cy, 1.39);
        for (let i = 0; i < 5; i++) {
          const petal = mesh(new THREE.SphereGeometry(0.034, 6, 4), m.wood, entrance);
          petal.position.set(side * 0.48 + Math.cos(i * Math.PI * 0.4) * 0.06, y + cy + Math.sin(i * Math.PI * 0.4) * 0.06, 1.4);
          petal.scale.z = 0.5;
        }
      }
    }
    beam([side * 0.12, 1.78, 1.44], [side * 0.12, 2.08, 1.44], 0.025, m.brass, entrance);
  }

  const OUTER = 7.6;
  ringSector(4.7, OUTER, A0, A1, 0.66, 0.22, m.concrete);
  ringSector(OUTER - 0.08, OUTER + 0.03, A0, A1, 0.55, 0.55, m.block);
  ringSector(OUTER - 0.04, OUTER + 0.045, A0, A1, 0.68, 0.08, m.paint);
  // The upper slab, fascia, ceiling and rail continue all the way around.
  ringSector(4.7, OUTER, A0, A1, 3.97, 0.23, m.concrete);
  ringSector(4.7, OUTER - 0.03, A0, A1, 3.73, 0.055, m.wood);
  ringSector(OUTER - 0.08, OUTER + 0.03, A0, A1, 3.93, 0.25, m.paint);
  const segments = 16;
  for (let i = 0; i < segments; i++) {
    const a = A0 + (A1 - A0) * i / segments;
    const b = A0 + (A1 - A0) * (i + 1) / segments;
    roofFace(at3(a, OUTER + 0.12, 3.87), at3(b, OUTER + 0.12, 3.87), at3(b, OUTER - 0.18, 3.99), at3(a, OUTER - 0.18, 3.99));
    railing(at3(a, OUTER - 0.17, 4.0), at3(b, OUTER - 0.17, 4.0));
  }
  // Only the ground-floor rail opens for the stairs.
  const stairHalfAngle = Math.asin(1.72 / (OUTER - 0.17));
  for (const [a, b] of [[A0, AM - stairHalfAngle], [AM + stairHalfAngle, A1]]) {
    for (let i = 0; i < 6; i++) {
      railing(at3(a + (b - a) * i / 6, OUTER - 0.17, 0.72), at3(a + (b - a) * (i + 1) / 6, OUTER - 0.17, 0.72));
    }
  }

  // Straight veranda sections reach the inner edges of the projecting wings.
  function straightVeranda(mirrored = false) {
    const porch = new THREE.Group();
    root.add(porch);
    // Reflect across x = -z. A quarter-turn alone puts the left extension
    // toward the entrance instead of along the connector to the left gable.
    porch.rotation.y = mirrored ? -Math.PI / 2 : 0;
    porch.scale.x = mirrored ? -1 : 1;
    box(3.5, 0.55, 2.95, 2, 0.275, 6.15, m.block, porch);
    box(3.5, 0.11, 2.95, 2, 0.605, 6.15, m.concrete, porch);
    box(3.5, 0.22, 2.95, 2, 3.86, 6.15, m.concrete, porch);
    box(3.5, 0.055, 2.95, 2, 3.72, 6.15, m.wood, porch);
    box(3.5, 0.25, 0.12, 2, 3.81, 7.63, m.paint, porch);
    box(3.5, 0.08, 0.1, 2, 0.68, 7.63, m.paint, porch);
    roofFace([0.25, 3.87, 7.75], [3.75, 3.87, 7.75], [3.75, 3.99, 7.44], [0.25, 3.99, 7.44], porch);
    box(3.55, 0.09, 3.4, 2, 7.34, 6.3, m.wood, porch);
    roofFace([0.25, 7.45, 8.1], [3.75, 7.45, 8.1], [3.75, 8.36, 4.65], [0.25, 8.36, 4.65], porch);
    fretwork([0.25, 7.4, 8.1], [3.75, 7.4, 8.1], porch);
    // Transform endpoints once so the shared railing helper can batch them.
    const point = (x: number, y: number, z: number): Point => {
      return mirrored ? [-z, y, -x] : [x, y, z];
    };
    for (const y of [0.72, 4.0]) {
      railing(point(0.25, y, 7.45), point(3.65, y, 7.45));
      railing(point(3.65, y, 7.45), point(3.65, y, 6.2));
    }
  }
  straightVeranda();
  straightVeranda(true);

  // Two continuous brick piers flank the entrance, with brick collars at
  // intervals instead of the former alternating gray blocks and white capitals.
  for (const angle of [AM - 0.33, AM + 0.33]) {
    const [px, pz] = at(angle, OUTER - 0.21);
    const ry = facing(angle);
    box(0.57, 0.18, 0.57, px, 0.75, pz, m.concrete).rotation.y = ry;
    box(0.43, 6.45, 0.43, px, 4.02, pz, m.pier).rotation.y = ry;
    for (let y = 1.25; y < 7.1; y += 0.88) {
      box(0.52, 0.12, 0.52, px, y, pz, m.pier).rotation.y = ry;
      box(0.48, 0.055, 0.48, px, y + 0.085, pz, m.pier).rotation.y = ry;
    }
    box(0.59, 0.17, 0.59, px, 7.23, pz, m.pier).rotation.y = ry;
    const bracket = new THREE.Group();
    root.add(bracket);
    bracket.position.set(px, 5.58, pz);
    bracket.rotation.y = ry;
    beam([0, 0.32, 0.23], [0, 0.14, 0.36], 0.018, m.copper, bracket);
    const sconce = mesh(new THREE.SphereGeometry(0.085, 10, 8), m.brass, bracket);
    sconce.position.set(0, 0.08, 0.36);
    sconce.scale.y = 1.55;
  }

  // Broad parallel treads and a landing, aligned with the entrance door.
  const stairs = new THREE.Group();
  root.add(stairs);
  const stairPos = at(AM, 7.28);
  stairs.position.set(stairPos[0], 0, stairPos[1]);
  stairs.rotation.y = facing(AM);
  box(3.48, 0.66, 1.26, 0, 0.33, -0.25, m.concrete, stairs);
  for (let i = 0; i < 5; i++) {
    const height = (5 - i) * 0.125;
    box(3.48, height, 0.4, 0, height / 2, 0.54 + i * 0.37, m.concrete, stairs);
    box(3.5, 0.035, 0.43, 0, height, 0.54 + i * 0.37, m.concrete, stairs);
  }
  for (const side of [-1, 1]) {
    const a = new THREE.Vector3(side * 1.72, 0.67, 0.15).applyAxisAngle(new THREE.Vector3(0, 1, 0), facing(AM)).add(stairs.position);
    const b = new THREE.Vector3(side * 1.72, 0.13, 2.13).applyAxisAngle(new THREE.Vector3(0, 1, 0), facing(AM)).add(stairs.position);
    railing([a.x, a.y, a.z], [b.x, b.y, b.z]);
  }

  // A raised window drum separates the curved canopy from its pointed cap.
  // The cap sits between the enlarged gables, above the lower canopy.
  const CANOPY = 8.1;
  const roofInset = 0.3;
  const roofAt = (angle: number, radius: number, y: number): Point => [
    CX + roofInset + radius * Math.cos(angle), y,
    CZ - roofInset + radius * Math.sin(angle),
  ];
  for (let i = 0; i < 18; i++) {
    const a = A0 + i / 18 * (A1 - A0);
    const b = A0 + (i + 1) / 18 * (A1 - A0);
    roofFace(at3(a, CANOPY, 7.45), at3(b, CANOPY, 7.45), roofAt(b, 3.6, 8.5), roofAt(a, 3.6, 8.5));
    fretwork(at3(a, CANOPY, 7.4), at3(b, CANOPY, 7.4));
  }
  ringSector(4.7, CANOPY - 0.05, A0, A1, 7.36, 0.08, m.wood);
  const drum = ringSector(3.3, 3.6, A0 - 0.06, A1 + 0.06, 9.47, 1.02, m.wood);
  drum.position.set(roofInset, 0, -roofInset);
  function smallRoofWindow(position: Point, rotation: number, parent = root) {
    const clerestory = new THREE.Group();
    parent.add(clerestory);
    clerestory.position.set(...position);
    clerestory.rotation.y = rotation;
    box(0.5, 0.57, 0.07, 0, 0.285, 0, m.trim, clerestory);
    box(0.37, 0.44, 0.04, 0, 0.285, 0.06, m.glass, clerestory);
    box(0.035, 0.44, 0.06, 0, 0.285, 0.09, m.trim, clerestory);
    box(0.37, 0.035, 0.06, 0, 0.285, 0.09, m.trim, clerestory);
  }
  for (let i = -3; i <= 3; i++) {
    const angle = AM + i * 0.19;
    smallRoofWindow(roofAt(angle, 3.63, 8.68), facing(angle));
  }
  const peak: Point = [CX + roofInset, 10.95, CZ - roofInset];
  for (let i = 0; i < 40; i++) {
    const a = i / 40 * Math.PI * 2;
    const b = (i + 1) / 40 * Math.PI * 2;
    roofFace(roofAt(a, 3.93, 9.45), roofAt(b, 3.93, 9.45), peak, peak);
    if (a >= A0 - 0.16 && b <= A1 + 0.16) fretwork(roofAt(a, 3.93, 9.4), roofAt(b, 3.93, 9.4));
  }
  // Mirror the same window band, roof cap and fascia into both gabled roofs.
  // Each endpoint overlaps its gable slope so neither side has an exposed gap.
  function extendRoofBand(mirrored = false) {
    const extension = new THREE.Group();
    root.add(extension);
    extension.rotation.y = mirrored ? -Math.PI / 2 : 0;
    extension.scale.x = mirrored ? -1 : 1;
    const bandStart = CX + roofInset;
    const bandEnd = 5.52;
    const bandFront = CZ - roofInset + 3.6;
    box(bandEnd - bandStart, 1.02, 0.3, (bandStart + bandEnd) / 2, 8.96, bandFront - 0.15, m.wood, extension);
    smallRoofWindow(roofAt(A0 + 0.035, 3.63, 8.68), facing(A0 + 0.035), extension);
    for (let i = 0; i < 6; i++) smallRoofWindow([bandStart + 0.57 + i * 0.7, 8.68, bandFront + 0.03], 0, extension);
    const capFront = bandFront + 0.33;
    const capBack = CZ - roofInset - 3.93;
    const roofJoin: Point = [6, 9.92, CZ - roofInset];
    roofFace([bandStart, 9.45, capFront], [bandEnd, 9.45, capFront], roofJoin, peak, extension);
    roofFace([bandEnd, 9.45, capBack], [bandStart, 9.45, capBack], peak, roofJoin, extension);
    fretwork([bandStart, 9.4, capFront], [bandEnd, 9.4, capFront], extension);
    box(bandEnd - bandStart, 0.06, 0.64, (bandStart + bandEnd) / 2, 9.39, bandFront, m.wood, extension);
  }
  extendRoofBand();
  extendRoofBand(true);
  const ridgeCap = mesh(new THREE.SphereGeometry(0.075, 8, 6), m.seam);
  ridgeCap.position.set(...peak);

  // Small flush ceiling lights, visible from the low reference-photo angles.
  for (const angle of [AM - 0.48, AM, AM + 0.48]) {
    const [x, z] = at(angle, 6.65);
    const light = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.025, 12), m.trim);
    light.position.set(x, 7.265, z);
  }

  // A few pots and one fan palm give scale without obscuring the elevations.
  function planter(x: number, z: number, index: number) {
    const h = 0.25 + index % 3 * 0.055;
    const pot = mesh(new THREE.CylinderGeometry(0.18, 0.125, h, 12), index % 4 === 0 ? m.turquoise : m.pot);
    pot.position.set(x, h / 2 + 0.03, z);
    const rim = mesh(new THREE.TorusGeometry(0.18, 0.022, 5, 12), index % 4 === 0 ? m.turquoise : m.pot);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(x, h + 0.03, z);
    const earth = mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.025, 12), m.soil);
    earth.position.set(x, h + 0.01, z);
    for (let i = 0; i < 6; i++) {
      const angle = i * 2.4 + index;
      const tip: Point = [x + Math.cos(angle) * 0.19, h + 0.24 + i % 3 * 0.07, z + Math.sin(angle) * 0.19];
      beam([x, h, z], tip, 0.009, m.leaf);
      const leaf = mesh(new THREE.SphereGeometry(0.09, 6, 4), m.leaf);
      leaf.position.set(...tip);
      leaf.scale.set(0.55, 1, 0.35);
      leaf.rotation.z = angle;
    }
  }
  for (let i = 0; i < 6; i++) {
    planter(3.9 + i * 0.68, 6.67, i);
    planter(-6.67, -3.9 - i * 0.68, i + 2);
  }
  for (const side of [-1, 1]) {
    const p = at(AM + side * 0.28, 8.4);
    planter(p[0], p[1], side + 3);
  }
  const palmX = 7.6;
  const palmZ = 8.8;
  beam([palmX, 0, palmZ], [palmX - 0.12, 1.65, palmZ], 0.12, m.wood);
  for (let i = 0; i < 11; i++) {
    const angle = i * Math.PI * 2 / 11;
    const origin: Point = [palmX - 0.12, 1.6, palmZ];
    const mid: Point = [origin[0] + Math.cos(angle) * 0.75, 1.95 + i % 2 * 0.14, origin[2] + Math.sin(angle) * 0.75];
    beam(origin, mid, 0.012, m.leaf);
    for (let finger = -4; finger <= 4; finger++) {
      const direction = angle + finger * 0.115;
      const tip: Point = [mid[0] + Math.cos(direction) * 0.63, 1.66 - Math.abs(finger) * 0.025, mid[2] + Math.sin(direction) * 0.63];
      polygon([mid, [tip[0] - Math.sin(direction) * 0.035, tip[1], tip[2] + Math.cos(direction) * 0.035], [tip[0] + Math.sin(direction) * 0.035, tip[1], tip[2] - Math.cos(direction) * 0.035]], m.leaf);
    }
  }

  // Static geometry is batched by material to keep orbiting inexpensive on phones.
  root.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    // Baking a reflection into a batch also requires reversing triangle winding.
    // Otherwise the mirrored veranda's walls and ceilings render inside out.
    if (object.matrixWorld.determinant() < 0) {
      for (const name of Object.keys(geometry.attributes)) {
        const attribute = geometry.getAttribute(name);
        for (let i = 0; i < attribute.count; i += 3) {
          for (let component = 0; component < attribute.itemSize; component++) {
            const first = attribute.getComponent(i, component);
            attribute.setComponent(i, component, attribute.getComponent(i + 2, component));
            attribute.setComponent(i + 2, component, first);
          }
        }
      }
    }
    // All source geometry has position, normal and UV; remove optional attributes.
    for (const key of Object.keys(geometry.attributes)) {
      if (!["position", "normal", "uv"].includes(key)) geometry.deleteAttribute(key);
    }
    const material = object.material as THREE.Material;
    const list = batches.get(material) ?? [];
    list.push(geometry);
    batches.set(material, list);
    object.geometry.dispose();
  });
  root.clear();
  for (const [material, geometries] of batches) {
    const combined = mergeGeometries(geometries);
    if (!combined) throw new Error("Could not combine house geometry.");
    combined.computeBoundingSphere();
    mesh(combined, material).name = Object.entries(m).find(([, value]) => value === material)?.[0] ?? "house";
    for (const geometry of geometries) geometry.dispose();
  }
  return root;
}
