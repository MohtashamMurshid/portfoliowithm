import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createHouseMaterials, type HouseMaterials } from "./materials";
import { createHouseModel } from "./model";

export type HouseView = "perspective" | "front" | "back";

export class HouseEngine {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 180);
  private renderer: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private materials?: HouseMaterials;
  private environment?: THREE.WebGLRenderTarget;
  private resizeObserver?: ResizeObserver;
  private frame: number | null = null;
  private disposed = false;
  private contextLost = false;
  private fitDistance = 24;
  private hasSized = false;
  private motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  constructor(private canvas: HTMLCanvasElement, private onError: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
    try {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.scene.background = new THREE.Color("#f3f0e8");
      this.scene.fog = new THREE.Fog("#f3f0e8", 65, 135);

      const pmrem = new THREE.PMREMGenerator(this.renderer);
      const room = new RoomEnvironment();
      this.environment = pmrem.fromScene(room, 0.04);
      this.scene.environment = this.environment.texture;
      this.scene.environmentIntensity = 0.32;
      room.dispose();
      pmrem.dispose();

      this.scene.add(new THREE.HemisphereLight("#e4eef3", "#a18b70", 2.2));
      const sun = new THREE.DirectionalLight("#fff0d5", 3.3);
      sun.position.set(-12, 22, 15);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left: -17, right: 17, top: 18, bottom: -17, near: 0.5, far: 65 });
      sun.shadow.normalBias = 0.045;
      sun.shadow.bias = -0.00015;
      this.scene.add(sun);
      const fill = new THREE.DirectionalLight("#e2e9f0", 0.6);
      fill.position.set(12, 8, -10);
      this.scene.add(fill);

      this.materials = createHouseMaterials();
      this.scene.add(createHouseModel(this.materials));
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 240),
        new THREE.MeshStandardMaterial({ color: "#e3e0d5", roughness: 1 }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.32;
      ground.receiveShadow = true;
      this.scene.add(ground);

      this.controls = new OrbitControls(this.camera, canvas);
      this.controls.target.set(1.4, 3.9, -1.4);
      this.controls.enablePan = false;
      this.controls.enableDamping = !this.motion.matches;
      this.controls.dampingFactor = 0.09;
      this.controls.rotateSpeed = 0.6;
      this.controls.zoomSpeed = 0.8;
      this.controls.minPolarAngle = 0.25;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.045;
      this.controls.minDistance = 13;
      this.controls.maxDistance = 58;
      this.controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
      this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };
      this.controls.addEventListener("change", this.invalidate);
      canvas.addEventListener("keydown", this.onKeyDown);
      canvas.addEventListener("webglcontextlost", this.onContextLost);
      canvas.addEventListener("webglcontextrestored", this.onContextRestored);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.motion.addEventListener("change", this.onMotion);
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(canvas);
      this.resize();
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  private resize = () => {
    if (this.disposed) return;
    const width = Math.max(1, this.canvas.clientWidth);
    const height = Math.max(1, this.canvas.clientHeight);
    const oldFit = this.fitDistance;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    const tangent = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    this.fitDistance = Math.max(7.4 / tangent, 13 / (tangent * this.camera.aspect)) + 4;
    this.controls.maxDistance = Math.max(58, this.fitDistance * 1.7);
    if (!this.hasSized) {
      this.hasSized = true;
      this.setView("perspective");
    } else {
      const offset = this.camera.position.clone().sub(this.controls.target);
      offset.setLength(THREE.MathUtils.clamp(offset.length() * this.fitDistance / oldFit, 13, this.controls.maxDistance));
      this.camera.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }
    this.invalidate();
  };

  setView(view: HouseView) {
    if (this.disposed) return;
    // Flush residual damping before applying an exact, repeatable viewpoint.
    this.controls.enableDamping = false;
    this.controls.update();
    // "Perspective" faces the curved corner bay; "back" faces the opposite corner.
    const theta = view === "front" ? 0 : view === "back" ? Math.PI * 0.75 : -Math.PI / 4;
    const phi = view === "perspective" ? 1.24 : 1.4;
    const offset = new THREE.Vector3().setFromSpherical(new THREE.Spherical(this.fitDistance, phi, theta));
    this.camera.position.copy(this.controls.target).add(offset);
    this.controls.update();
    this.controls.enableDamping = !this.motion.matches;
    this.invalidate();
  }

  zoom(direction: "in" | "out") {
    const offset = this.camera.position.clone().sub(this.controls.target);
    offset.setLength(THREE.MathUtils.clamp(offset.length() * (direction === "in" ? 0.84 : 1.19), this.controls.minDistance, this.controls.maxDistance));
    this.camera.position.copy(this.controls.target).add(offset);
    this.controls.update();
    this.invalidate();
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (["+", "=", "-", "_", "Home", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) event.preventDefault();
    if (event.key === "+" || event.key === "=") return this.zoom("in");
    if (event.key === "-" || event.key === "_") return this.zoom("out");
    if (event.key === "Home") return this.setView("perspective");
    if (!event.key.startsWith("Arrow")) return;
    const spherical = new THREE.Spherical().setFromVector3(this.camera.position.clone().sub(this.controls.target));
    if (event.key === "ArrowLeft") spherical.theta -= 0.1;
    if (event.key === "ArrowRight") spherical.theta += 0.1;
    if (event.key === "ArrowUp") spherical.phi -= 0.08;
    if (event.key === "ArrowDown") spherical.phi += 0.08;
    spherical.phi = THREE.MathUtils.clamp(spherical.phi, this.controls.minPolarAngle, this.controls.maxPolarAngle);
    this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
    this.controls.update();
    this.invalidate();
  };

  private onMotion = () => { this.controls.enableDamping = !this.motion.matches; this.invalidate(); };
  private onVisibility = () => {
    if (document.hidden && this.frame !== null) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    } else this.invalidate();
  };
  private onContextLost = (event: Event) => {
    event.preventDefault();
    this.contextLost = true;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
    this.onError();
  };
  private onContextRestored = () => {
    this.contextLost = false;
    this.renderer.shadowMap.needsUpdate = true;
    this.invalidate();
  };

  // Render only on interaction or resize. Damping schedules its own final frames.
  private invalidate = () => {
    if (this.disposed || this.contextLost || document.hidden || this.frame !== null) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      if (this.disposed || this.contextLost) return;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.renderer.shadowMap.autoUpdate = false;
    });
  };

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.controls?.removeEventListener("change", this.invalidate);
    this.controls?.dispose();
    this.canvas.removeEventListener("keydown", this.onKeyDown);
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.motion.removeEventListener("change", this.onMotion);
    const materials = new Set<THREE.Material>(Object.values(this.materials ?? {}));
    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
      }
      if (object instanceof THREE.DirectionalLight) object.shadow.dispose();
    });
    const textures = new Set<THREE.Texture>();
    for (const material of materials) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
      material.dispose();
    }
    for (const texture of textures) texture.dispose();
    this.environment?.dispose();
    this.renderer.dispose();
    this.scene.clear();
  }
}
