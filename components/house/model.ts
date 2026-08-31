import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { HouseMaterials } from "./materials";

type Point = [number, number, number];

/** Approximate exterior proportions, not a measured architectural survey.
 * Following the floor plan: two identical gabled wings meet at a right angle,
 * one facing front (+Z) and one facing left (-X), and a curved two-storey
 * entrance bay with the colonnade sweeps 90 degrees between their facades.
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

  function polygon(points: Point[], material: THREE.Material, parent = root) {
    const vertices: number[] = [];
    const uvs: number[] = [];
    for (let i = 1; i < points.length - 1; i++) {
      for (const point of [points[0], points[i], points[i + 1]]) {
        vertices.push(...point);
        uvs.push(point[0] / 2, (point[1] + point[2]) / 2);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.computeVertexNormals();
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
      arch(width + 0.55, height + 0.32, 0, -0.12, 0.01, m.brick, group);
      arch(width + 0.12, height + 0.06, 0, 0, 0.07, m.recess, group);
      arch(width, height, 0, 0.04, 0.13, m.glass, group);
      archBorder(width, height, 0.075, 0, 0.04, 0.23, m.trim, group);
      const spring = height - width / 2;
      box(0.06, height - 0.03, 0.085, 0, height / 2 + 0.04, 0.23, m.trim, group);
      box(width, 0.06, 0.09, 0, spring + 0.04, 0.23, m.trim, group);
      box(width, 0.055, 0.09, 0, spring * 0.46 + 0.04, 0.23, m.trim, group);
      for (const side of [-1, 1]) {
        box(0.05, spring, 0.08, side * width * 0.28, spring / 2 + 0.04, 0.23, m.trim, group);
      }
    } else {
      box(width + 0.4, height + 0.28, 0.09, 0, height / 2, 0.03, m.brick, group);
      box(width + 0.12, height + 0.12, 0.1, 0, height / 2, 0.09, m.recess, group);
      box(width, height, 0.07, 0, height / 2, 0.16, m.glass, group);
      for (const side of [-1, 1]) {
        box(0.075, height + 0.08, 0.1, side * width / 2, height / 2, 0.23, m.trim, group);
        box(width + 0.15, 0.075, 0.1, 0, side < 0 ? 0 : height, 0.23, m.trim, group);
        box(0.06, height, 0.1, side * width * 0.25, height / 2, 0.23, m.trim, group);
      }
      box(width, 0.06, 0.1, 0, height * 0.6, 0.23, m.trim, group);
      for (const sx of [-0.38, 0.38]) {
        for (const sy of [0.22, 0.42, 0.8]) {
          box(width * 0.24, 0.035, 0.09, sx * width, sy * height, 0.23, m.trim, group);
        }
      }
    }
    box(width + 0.3, 0.11, 0.4, 0, -0.07, 0.14, m.trim, group);
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

  function roofFace(a: Point, b: Point, c: Point, d: Point, parent = root) {
    polygon([a, b, c, d], m.roof, parent);
    // Standing seams run down the fall of the roof, rather than being painted on.
    const count = Math.ceil(new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b)) / 0.27);
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      beam(
        [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t + 0.015, a[2] + (b[2] - a[2]) * t],
        [d[0] + (c[0] - d[0]) * t, d[1] + (c[1] - d[1]) * t + 0.015, d[2] + (c[2] - d[2]) * t],
        0.016, m.seam, parent,
      );
    }
    beam(a, b, 0.045, m.seam, parent);
    beam(d, c, 0.045, m.seam, parent);
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
    const uv = geometry.getAttribute("uv");
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 2, uv.getY(i) / 2);
    const object = mesh(geometry, material);
    object.rotation.x = Math.PI / 2;
    object.position.y = y;
    return object;
  }

  // A restrained, shallow ground pad. Landscaping is not part of the reference.
  box(20, 0.22, 20, 1.2, -0.2, -1.2, m.soil);
  box(17.8, 0.13, 17.8, 1.2, -0.035, -1.2, m.concrete);

  // One gabled wing, identical and reversible; sideSign picks the exposed long side.
  function buildWing(px: number, pz: number, ry: number, sideSign: 1 | -1) {
    const wing = new THREE.Group();
    root.add(wing);
    wing.position.set(px, 0, pz);
    wing.rotation.y = ry;
    box(4.9, 0.62, 10.2, 0, 0.3, 0, m.concrete, wing);
    box(4.5, 6.65, 9.8, 0, 3.925, 0, m.stone, wing);
    box(4.52, 0.18, 9.84, 0, 3.82, 0, m.brick, wing);
    box(4.6, 0.12, 9.92, 0, 0.66, 0, m.trim, wing);
    for (const edge of [-1, 1]) {
      box(0.34, 6.5, 0.15, edge * 2.07, 3.97, 4.94, m.brick, wing);
      box(0.34, 6.5, 0.15, edge * 2.07, 3.97, -4.94, m.brick, wing);
    }
    box(4.5, 0.19, 10.05, 0, 7.2, 0, m.wood, wing);
    for (const front of [-1, 1]) {
      const z = front * 4.91;
      const gable = new THREE.Group();
      wing.add(gable);
      gable.position.set(0, 0, z);
      gable.rotation.y = front === 1 ? 0 : Math.PI;
      polygon([[-2.25, 7.24, 0], [2.25, 7.24, 0], [0, 9.13, 0]], m.brick, gable);
      polygon([[-1.24, 7.51, 0.08], [1.24, 7.51, 0.08], [1.24, 7.9, 0.08], [0, 8.91, 0.08], [-1.24, 7.9, 0.08]], m.trim, gable);
      polygon([[-1.1, 7.64, 0.1], [1.1, 7.64, 0.1], [1.1, 7.85, 0.1], [0, 8.73, 0.1], [-1.1, 7.85, 0.1]], m.glass, gable);
      for (let bar = -3; bar <= 3; bar++) {
        const bx = bar * 0.29;
        const h = 1.03 - Math.abs(bx) * 0.8;
        box(0.045, h, 0.065, bx, 7.67 + h / 2, 0.16, m.trim, gable);
      }
      box(2.24, 0.045, 0.07, 0, 7.95, 0.17, m.trim, gable);
      // Arched three-part windows on both floors, per the elevation.
      windowAt(0, 1.32, z, front === 1 ? 0 : Math.PI, true, 1.32, 2.05, wing);
      windowAt(0, 4.55, z, front === 1 ? 0 : Math.PI, true, 1.32, 2.05, wing);
      for (const edge of [-1, 1]) {
        windowAt(edge * 1.0, 1.32, z, front === 1 ? 0 : Math.PI, true, 0.45, 1.62, wing);
        windowAt(edge * 1.0, 4.55, z, front === 1 ? 0 : Math.PI, true, 0.45, 1.62, wing);
      }
    }
    const frontZ = 5.35;
    const rearZ = -5.35;
    const ridge = 9.45;
    for (const slope of [-1, 1]) {
      const edge = slope * 2.67;
      roofFace([edge, 7.2, frontZ], [edge, 7.2, rearZ], [0, ridge, rearZ], [0, ridge, frontZ], wing);
      for (const z of [frontZ, rearZ]) {
        const fascia = box(Math.hypot(2.67, ridge - 7.2), 0.14, 0.15, edge / 2, (7.2 + ridge) / 2, z, m.trim, wing);
        fascia.rotation.z = -slope * Math.atan2(ridge - 7.2, 2.67);
      }
      box(0.15, 0.16, 10.7, edge, 7.15, 0, m.seam, wing);
    }
    beam([0, ridge + 0.025, rearZ], [0, ridge + 0.025, frontZ], 0.065, m.seam, wing);
    // The exposed long elevation repeats the same window vocabulary; layout inferred.
    for (const z of [0.9, 3.4]) {
      windowAt(sideSign * 2.26, 1.42, z, sideSign * Math.PI / 2, false, 1.6, 1.6, wing);
      windowAt(sideSign * 2.26, 4.75, z, sideSign * Math.PI / 2, false, 1.6, 1.65, wing);
    }
    beam([sideSign * 2.31, 0.48, 4.69], [sideSign * 2.31, 7.12, 4.69], 0.055, m.seam, wing);
  }

  buildWing(6.0, 0, 0, 1);
  buildWing(0, -6.0, -Math.PI / 2, -1);

  // A straight two-storey run joins each gabled wing to the curved bay, so each
  // elevation reads: gable, long straight wall, then the curve to the other face.
  function buildConnector(px: number, pz: number, ry: number) {
    const section = new THREE.Group();
    root.add(section);
    section.position.set(px, 0, pz);
    section.rotation.y = ry;
    box(4.2, 0.62, 4.8, 0, 0.3, 0.05, m.concrete, section);
    box(3.9, 6.65, 4.4, 0, 3.925, 0, m.stone, section);
    box(3.92, 0.18, 4.44, 0, 3.82, 0, m.brick, section);
    box(3.98, 0.12, 4.5, 0, 0.66, 0, m.trim, section);
    box(3.9, 0.19, 4.5, 0, 7.2, 0, m.wood, section);
    windowAt(0, 1.42, 2.2, 0, false, 1.6, 1.6, section);
    windowAt(0, 4.75, 2.2, 0, false, 1.6, 1.65, section);
    // A flat seam roof tucked under the veranda band, the cone and the wing slope.
    box(3.9, 0.08, 4.5, 0, 7.66, 0.05, m.seam, section);
  }
  buildConnector(2.0, 2.55, 0);
  buildConnector(-2.55, -2.0, -Math.PI / 2);

  // Curved bay wall, tangent to both facades, with brick and trim bands.
  ringSector(WALL - 0.4, WALL, A0 - 0.015, A1 + 0.015, 8.2, 8.2, m.block);
  ringSector(WALL - 0.05, WALL + 0.04, A0 - 0.01, A1 + 0.01, 3.91, 0.18, m.brick);
  ringSector(WALL - 0.05, WALL + 0.05, A0 - 0.01, A1 + 0.01, 0.78, 0.12, m.trim);
  const plinth = new THREE.Shape();
  plinth.moveTo(CX, CZ);
  plinth.absarc(CX, CZ, 5.4, A0 - 0.05, A1 + 0.05, false);
  plinth.closePath();
  const plinthMesh = mesh(new THREE.ExtrudeGeometry(plinth, { depth: 0.62, bevelEnabled: false, curveSegments: 24 }), m.concrete);
  plinthMesh.rotation.x = Math.PI / 2;
  plinthMesh.position.y = 0.61;

  // Windows on the curve: an arched window over the door and two flankers.
  {
    const p = at(AM, 5.15);
    windowAt(p[0], 4.63, p[1], facing(AM), true, 1.75, 2.02);
  }
  // Door-height windows open onto the balcony either side of the arched window.
  for (const angle of [AM - Math.PI / 8, AM + Math.PI / 8]) {
    const p = at(angle, 5.07);
    windowAt(p[0], 3.97, p[1], facing(angle), false, 1.1, 2.05);
  }

  // Carved double entrance doors on the curve, raised panels and brass hardware.
  const doorGroup = new THREE.Group();
  root.add(doorGroup);
  const doorPos = at(AM, 2.33);
  doorGroup.position.set(doorPos[0], 0, doorPos[1]);
  doorGroup.rotation.y = facing(AM);
  box(2.24, 2.83, 0.15, 0, 1.99, 2.79, m.trim, doorGroup);
  box(2.03, 2.65, 0.2, 0, 1.95, 2.9, m.recess, doorGroup);
  for (const side of [-1, 1]) {
    box(0.94, 2.54, 0.16, side * 0.49, 1.94, 3.015, m.wood, doorGroup);
    for (const y of [1.22, 2.36]) {
      box(0.72, 0.98, 0.055, side * 0.49, y, 3.12, m.wood, doorGroup);
      for (const edge of [-1, 1]) {
        box(0.035, 0.87, 0.035, side * 0.49 + edge * 0.3, y, 3.16, m.brass, doorGroup);
        box(0.63, 0.035, 0.035, side * 0.49, y + edge * 0.435, 3.16, m.wood, doorGroup);
      }
      // Small repeated rosettes give the door a carved rather than flat surface.
      for (const cy of [-0.24, 0, 0.24]) {
        const ornament = mesh(new THREE.TorusGeometry(0.095, 0.016, 5, 12), m.wood, doorGroup);
        ornament.position.set(side * 0.49, y + cy, 3.18);
        for (const angle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
          const petal = mesh(new THREE.SphereGeometry(0.035, 6, 4), m.wood, doorGroup);
          petal.position.set(side * 0.49 + Math.cos(angle) * 0.057, y + cy + Math.sin(angle) * 0.057, 3.185);
          petal.scale.z = 0.5;
        }
      }
    }
    beam([side * 0.12, 1.65, 3.22], [side * 0.12, 1.98, 3.22], 0.025, m.brass, doorGroup);
    // Hammered copper sconces flank the entrance.
    beam([side * 1.55, 3.32, 2.72], [side * 1.55, 3.16, 2.9], 0.016, m.copper, doorGroup);
    const cap = mesh(new THREE.SphereGeometry(0.11, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), m.copper, doorGroup);
    cap.position.set(side * 1.55, 3.12, 2.9);
  }

  // Porch and balcony sweep the quarter circle between the two wings.
  ringSector(4.7, 7.35, A0, A1, 0.66, 0.22, m.concrete);
  ringSector(4.7, 7.35, A0, A1, 3.91, 0.22, m.concrete);

  // A painted fascia wraps the balcony slab edge, as in the photograph.
  ringSector(7.02, 7.37, A0, A1, 3.94, 0.29, m.paint);

  // The veranda continues straight along each connector, past its window,
  // stopping just before the gabled wing.
  function boxByCorners(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, material: THREE.Material) {
    return box(x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, material);
  }
  // Front side, in front of the connector facade (z = 4.75).
  boxByCorners(0.25, 3.55, 0.44, 0.66, 4.75, 7.10, m.concrete);
  boxByCorners(0.25, 3.55, 3.69, 3.91, 4.75, 7.10, m.concrete);
  boxByCorners(0.25, 3.55, 3.65, 3.94, 6.76, 7.12, m.paint);
  boxByCorners(0.25, 3.7, 7.05, 7.12, 4.75, 7.10, m.wood);
  railing([0.25, 3.96, 6.87], [3.55, 3.96, 6.87]);
  railing([3.55, 3.96, 6.87], [3.55, 3.96, 4.95]);
  railing([0.25, 0.7, 6.87], [3.55, 0.7, 6.87]);
  railing([3.55, 0.7, 6.87], [3.55, 0.7, 4.95]);
  for (let x = 0.7; x < 3.3; x += 0.6) beam([x, 7.0, 4.85], [x, 7.0, 7.2], 0.035, m.wood);
  // Left side, in front of the connector facade (x = -4.75), mirrored.
  boxByCorners(-7.10, -4.75, 0.44, 0.66, -3.55, -0.25, m.concrete);
  boxByCorners(-7.10, -4.75, 3.69, 3.91, -3.55, -0.25, m.concrete);
  boxByCorners(-7.12, -6.76, 3.65, 3.94, -3.55, -0.25, m.paint);
  boxByCorners(-7.10, -4.75, 7.05, 7.12, -3.7, -0.25, m.wood);
  railing([-6.87, 3.96, -0.25], [-6.87, 3.96, -3.55]);
  railing([-6.87, 3.96, -3.55], [-4.95, 3.96, -3.55]);
  railing([-6.87, 0.7, -0.25], [-6.87, 0.7, -3.55]);
  railing([-6.87, 0.7, -3.55], [-4.95, 0.7, -3.55]);
  for (let z = -0.7; z > -3.3; z -= 0.6) beam([-4.85, 7.0, z], [-7.2, 7.0, z], 0.035, m.wood);

  // Massive banded masonry piers carry the veranda roof through both storeys:
  // brick shafts with grey block bands and white caps, per the photograph.
  const pierAngles = [AM - 0.55, AM - 0.17, AM + 0.17, AM + 0.55];
  for (const angle of pierAngles) {
    const [px, pz] = at(angle, 7.0);
    const ry = facing(angle);
    box(0.56, 0.16, 0.56, px, 0.74, pz, m.concrete).rotation.y = ry;
    let y = 0.82;
    let brickBand = true;
    while (y < 6.72) {
      const h = Math.min(brickBand ? 0.72 : 0.24, 6.72 - y);
      const band = box(brickBand ? 0.42 : 0.48, h, brickBand ? 0.42 : 0.48, px, y + h / 2, pz, brickBand ? m.brick : m.block);
      band.rotation.y = ry;
      y += h;
      brickBand = !brickBand;
    }
    box(0.58, 0.18, 0.58, px, 6.81, pz, m.trim).rotation.y = ry;
    box(0.46, 0.26, 0.46, px, 6.99, pz, m.trim).rotation.y = ry;
  }

  // Railings follow the curve; the ground level opens where the stair lands.
  const stairOpen: [number, number] = [AM - 0.16, AM + 0.16];
  for (let i = 0; i < 12; i++) {
    const a = A0 + i * Math.PI / 24;
    const b = A0 + (i + 1) * Math.PI / 24;
    railing(at3(a, 7.12, 3.96), at3(b, 7.12, 3.96));
    const mid = (a + b) / 2;
    if (mid < stairOpen[0] || mid > stairOpen[1]) railing(at3(a, 7.12, 0.7), at3(b, 7.12, 0.7));
  }

  // A fanned concrete stair descends radially from the centre bay.
  for (let i = 0; i < 5; i++) {
    const height = (5 - i) * 0.125;
    const [sx, sz] = at(AM, 7.54 + i * 0.38);
    const step = box(1.9 + i * 0.5, height, 0.39, sx, height / 2, sz, m.concrete);
    step.rotation.y = facing(AM);
    const nose = box(1.96 + i * 0.5, 0.045, 0.43, sx, height, sz, m.trim);
    nose.rotation.y = facing(AM);
  }
  for (const s of [-1, 1]) {
    railing(
      [CX + Math.cos(AM) * 7.5 - Math.sin(AM) * s * 1.2, 0.68, CZ + Math.sin(AM) * 7.5 + Math.cos(AM) * s * 1.2],
      [CX + Math.cos(AM) * 9.4 - Math.sin(AM) * s * 2.25, 0.15, CZ + Math.sin(AM) * 9.4 + Math.cos(AM) * s * 2.25],
    );
  }

  // Curved canopy band ends against the wings; the faceted corner roof rises
  // above it, like the round roof in the sheet's isometric view.
  for (let i = 0; i < 12; i++) {
    const a = A0 - 0.005 + (i / 12) * (A1 - A0 + 0.01);
    const b = A0 - 0.005 + ((i + 1) / 12) * (A1 - A0 + 0.01);
    roofFace(at3(a, 7.9, 7.2), at3(b, 7.9, 7.2), at3(b, 5.6, 8.0), at3(a, 5.6, 8.0));
    beam(at3(a, 7.9, 7.15), at3(b, 7.9, 7.15), 0.073, m.trim);
  }
  // The band continues straight over each porch extension, ending against the
  // gabled wings with fascia returns.
  roofFace([0.25, 7.2, 7.65], [3.75, 7.2, 7.65], [3.75, 8.0, 5.35], [0.25, 8.0, 5.35]);
  beam([0.25, 7.15, 7.65], [3.75, 7.15, 7.65], 0.073, m.trim);
  polygon([[3.75, 7.2, 7.65], [3.75, 7.2, 5.35], [3.75, 8.0, 5.35]], m.trim);
  roofFace([-7.65, 7.2, -0.25], [-7.65, 7.2, -3.75], [-5.35, 8.0, -3.75], [-5.35, 8.0, -0.25]);
  beam([-7.65, 7.15, -0.25], [-7.65, 7.15, -3.75], 0.073, m.trim);
  polygon([[-7.65, 7.2, -3.75], [-5.35, 8.0, -3.75], [-5.35, 7.2, -3.75]], m.trim);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const b = ((i + 1) / 20) * Math.PI * 2;
    roofFace(at3(a, 5.6, 8.0), at3(b, 5.6, 8.0), at3(b, 0.28, 9.5), at3(a, 0.28, 9.5));
  }
  // A curved clerestory drum with a row of small windows rises over the bay,
  // capped by its own swept roof, as in the photograph.
  ringSector(3.5, 3.78, A0 - 0.05, A1 + 0.05, 9.35, 1.1, m.wood);
  for (let i = -3; i <= 3; i++) {
    const angle = AM + i * 0.155;
    const [wx, wz] = at(angle, 3.79);
    windowAt(wx, 8.52, wz, facing(angle), false, 0.4, 0.55);
  }
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const b = ((i + 1) / 20) * Math.PI * 2;
    roofFace(at3(a, 4.15, 9.25), at3(b, 4.15, 9.25), at3(b, 0.3, 10.15), at3(a, 0.3, 10.15));
    if (a > A0 - 0.2 && a < A1 + 0.2) beam(at3(a, 4.15, 9.22), at3(b, 4.15, 9.22), 0.06, m.trim);
  }
  const capMesh = mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 20), m.seam);
  capMesh.position.set(CX, 10.16, CZ);

  // Timber ceiling boards and radial joists under the balcony canopy.
  ringSector(4.7, 7.35, A0, A1, 7.12, 0.07, m.wood);
  for (let i = 0; i <= 16; i++) {
    const angle = A0 + 0.05 + (i / 16) * (A1 - A0 - 0.1);
    beam(at3(angle, 4.8, 7.0), at3(angle, 7.25, 7.0), 0.035, m.wood);
  }

  // Hammered copper pendants hang under the canopy.
  for (const angle of [AM - Math.PI / 8, AM, AM + Math.PI / 8]) {
    const [px, pz] = at(angle, 6.15);
    beam([px, 7.1, pz], [px, 6.62, pz], 0.014, m.copper);
    const shade = mesh(new THREE.SphereGeometry(0.17, 14, 7, 0, Math.PI * 2, 0, Math.PI / 2), m.copper);
    shade.position.set(px, 6.55, pz);
    const bulb = mesh(new THREE.SphereGeometry(0.055, 8, 6), m.brass);
    bulb.position.set(px, 6.52, pz);
  }

  // Static geometry is batched by material to keep orbiting inexpensive on phones.
  root.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
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
