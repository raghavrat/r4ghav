"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

type SceneState = "loading" | "ready" | "error";

export function SpatialTunnel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [sceneState, setSceneState] = useState<SceneState>("loading");

  useEffect(() => {
    const mount = mountRef.current;
    const trigger = document.querySelector<HTMLElement>("#flight");
    if (!mount || !trigger) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: THREE.WebGLRenderer | undefined;
    let frame = 0;
    let statusFrame = 0;
    let disposed = false;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const pointer = new THREE.Vector2();

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x080907, 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x080907);
      scene.fog = new THREE.FogExp2(0x080907, 0.026);

      const camera = new THREE.PerspectiveCamera(58, 1, 0.08, 140);
      camera.position.set(0, 0, 11.5);
      scene.add(camera);

      const tunnel = new THREE.Group();
      scene.add(tunnel);

      const chrome = new THREE.MeshStandardMaterial({
        color: 0xaeb3aa,
        metalness: 0.94,
        roughness: 0.23,
      });
      const darkChrome = new THREE.MeshStandardMaterial({
        color: 0x22251f,
        metalness: 0.88,
        roughness: 0.34,
      });
      const acid = new THREE.MeshStandardMaterial({
        color: 0xa8ff3e,
        emissive: 0x294f00,
        emissiveIntensity: 0.72,
        metalness: 0.48,
        roughness: 0.28,
      });
      materials.push(chrome, darkChrome, acid);

      const rings: THREE.Mesh[] = [];
      for (let index = 0; index < 24; index += 1) {
        const radius = 3.15 + Math.sin(index * 1.73) * 0.28;
        const tube = index % 5 === 0 ? 0.17 : 0.085;
        const geometry = new THREE.TorusGeometry(radius, tube, 10, 72);
        geometries.push(geometry);
        const material = index % 7 === 0 ? acid : index % 2 ? chrome : darkChrome;
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = -index * 2.55;
        ring.rotation.z = Math.sin(index * 2.4) * 0.62;
        ring.userData.baseRotation = ring.rotation.z;
        ring.userData.phase = index * 0.37;
        tunnel.add(ring);
        rings.push(ring);
      }

      const shardGeometry = new THREE.BoxGeometry(0.12, 0.68, 1.55);
      geometries.push(shardGeometry);
      const shards: THREE.Mesh[] = [];
      for (let index = 0; index < 112; index += 1) {
        const shard = new THREE.Mesh(
          shardGeometry,
          index % 19 === 0 ? acid : index % 3 === 0 ? chrome : darkChrome,
        );
        const angle = index * 0.83;
        const radius = 3.75 + Math.sin(index * 1.21) * 0.55;
        shard.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          1.2 - index * 0.57,
        );
        shard.rotation.set(angle * 0.08, angle * 0.03, angle);
        shard.userData.baseX = shard.position.x;
        shard.userData.baseY = shard.position.y;
        shard.userData.angle = angle;
        tunnel.add(shard);
        shards.push(shard);
      }

      const coreGeometry = new THREE.IcosahedronGeometry(2.25, 1);
      geometries.push(coreGeometry);
      const core = new THREE.Mesh(coreGeometry, acid);
      core.position.z = -59.5;
      core.rotation.set(0.4, 0.7, 0.2);
      tunnel.add(core);

      const cageGeometry = new THREE.IcosahedronGeometry(3.15, 2);
      geometries.push(cageGeometry);
      const cageMaterial = new THREE.MeshBasicMaterial({
        color: 0xb6bcb0,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      materials.push(cageMaterial);
      const cage = new THREE.Mesh(cageGeometry, cageMaterial);
      cage.position.copy(core.position);
      tunnel.add(cage);

      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 520;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let index = 0; index < particleCount; index += 1) {
        const angle = index * 2.399;
        const radius = 2.6 + ((index * 47) % 100) / 22;
        particlePositions[index * 3] = Math.cos(angle) * radius;
        particlePositions[index * 3 + 1] = Math.sin(angle) * radius;
        particlePositions[index * 3 + 2] = 6 - ((index * 73) % 660) / 10;
      }
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3),
      );
      geometries.push(particleGeometry);
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xcfd4c9,
        size: 0.025,
        transparent: true,
        opacity: 0.58,
        sizeAttenuation: true,
      });
      materials.push(particleMaterial);
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      tunnel.add(particles);

      scene.add(new THREE.HemisphereLight(0xe8ecdf, 0x0b0d09, 1.15));
      const rim = new THREE.DirectionalLight(0xffffff, 3.8);
      rim.position.set(-4, 6, 8);
      scene.add(rim);
      const cameraLight = new THREE.PointLight(0xa8ff3e, 5.4, 15, 1.65);
      cameraLight.position.set(1.8, -0.5, -1.5);
      camera.add(cameraLight);

      const resize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height, false);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const onPointerMove = (event: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };
      mount.addEventListener("pointermove", onPointerMove, { passive: true });

      gsap.registerPlugin(ScrollTrigger);
      const scrollDriver = reducedMotion
        ? undefined
        : ScrollTrigger.create({
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
            },
          });

      let lastTime = 0;
      const render = (time: number) => {
        if (disposed || !renderer) return;
        const delta = Math.min((time - lastTime) / 1000 || 0, 0.035);
        lastTime = time;
        const progress = reducedMotion ? 0.08 : progressRef.current;
        const easedProgress = THREE.MathUtils.smootherstep(progress, 0, 1);

        const targetZ = 11.5 - easedProgress * 68;
        const targetX =
          Math.sin(progress * Math.PI * 5.2) * 0.46 + pointer.x * 0.16;
        const targetY =
          Math.cos(progress * Math.PI * 4.1) * 0.34 + pointer.y * 0.12;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.075);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.055);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.055);
        camera.rotation.z = THREE.MathUtils.lerp(
          camera.rotation.z,
          Math.sin(progress * Math.PI * 4) * 0.055,
          0.06,
        );

        tunnel.rotation.z += delta * (0.045 + progress * 0.12);
        particles.rotation.z -= delta * 0.025;
        core.rotation.x += delta * 0.36;
        core.rotation.y += delta * 0.52;
        cage.rotation.x -= delta * 0.17;
        cage.rotation.y += delta * 0.23;

        rings.forEach((ring, index) => {
          ring.rotation.z =
            ring.userData.baseRotation +
            Math.sin(time * 0.00034 + ring.userData.phase) * 0.12 +
            progress * (index % 2 ? 0.35 : -0.28);
          const pulse = 1 + Math.sin(time * 0.001 + index) * 0.012;
          ring.scale.setScalar(pulse);
        });

        const breakApart = THREE.MathUtils.smoothstep(progress, 0.54, 0.86);
        shards.forEach((shard, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          shard.position.x =
            shard.userData.baseX +
            Math.cos(shard.userData.angle) * breakApart * direction * 2.8;
          shard.position.y =
            shard.userData.baseY +
            Math.sin(shard.userData.angle) * breakApart * direction * 2.8;
          shard.rotation.x += delta * 0.08 * direction;
        });

        renderer.render(scene, camera);
        if (!reducedMotion) frame = requestAnimationFrame(render);
      };

      render(0);
      statusFrame = requestAnimationFrame(() => setSceneState("ready"));

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        cancelAnimationFrame(statusFrame);
        scrollDriver?.kill();
        resizeObserver.disconnect();
        mount.removeEventListener("pointermove", onPointerMove);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    } catch (error) {
      console.error("Unable to initialize the spatial scene", error);
      statusFrame = requestAnimationFrame(() => setSceneState("error"));
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        cancelAnimationFrame(statusFrame);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    }
  }, []);

  return (
    <div className="spatial-scene" ref={mountRef} aria-hidden="true">
      <div
        className={`scene-loader ${sceneState === "ready" ? "is-ready" : ""}`}
      >
        <span>{sceneState === "error" ? "3D unavailable" : "Building space"}</span>
        <span className="scene-loader-line" />
      </div>
    </div>
  );
}
