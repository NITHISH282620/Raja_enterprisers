"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hanger } from "./models/Hanger";
import { Seating } from "./models/Seating";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The hero camera moves *down the length of the hanger* as the user scrolls
 * (plan §1). The point is to convey enclosed volume — the one thing a
 * photograph of a tent cannot do. It is not a camera move for its own sake.
 *
 * Reduced motion and small screens get a fixed, composed frame instead.
 */

const START_Z = 17;
const END_Z = -13;

/** Pointer position in [-1, 1], updated by the DOM listener in HangerCanvas. */
type Pointer = { x: number; y: number };

function Rig({
  progress,
  pointer,
}: {
  progress: React.RefObject<number>;
  pointer: React.RefObject<Pointer>;
}) {
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const current = useRef(START_Z);
  // A small look-around offset driven by the pointer — the one piece of the
  // scene that answers the cursor rather than the scroll, so the hero reads
  // as an actual volume the visitor can glance around rather than a fixed
  // camera move happening to them.
  const drift = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const target = reduced
      ? // Composed still: partway in, so the structure reads as enclosing.
        START_Z - (START_Z - END_Z) * 0.28
      : START_Z - (START_Z - END_Z) * progress.current;

    // Frame-rate independent damping, so the dolly feels weighted rather than
    // snapping to the scroll position.
    const lambda = reduced ? 40 : 4.2;
    current.current = THREE.MathUtils.damp(current.current, target, lambda, delta);

    const targetDriftX = reduced ? 0 : pointer.current.x * 0.6;
    const targetDriftY = reduced ? 0 : pointer.current.y * -0.32;
    drift.current.x = THREE.MathUtils.damp(drift.current.x, targetDriftX, 3.4, delta);
    drift.current.y = THREE.MathUtils.damp(drift.current.y, targetDriftY, 3.4, delta);

    // Eye height, tilted very slightly down the length. Looking up filled the
    // frame with roof; this gives the floor, the seating and the far gable
    // their share, which is how the reference photographs read.
    camera.position.set(drift.current.x, 3.1 + drift.current.y, current.current);
    camera.lookAt(drift.current.x, 2.2 + drift.current.y, current.current - 14);
  });

  return null;
}

function Scene({
  progress,
  pointer,
}: {
  progress: React.RefObject<number>;
  pointer: React.RefObject<Pointer>;
}) {
  return (
    <>
      {/* Depth down the length. Does more for spatial feel than any effect.
          Held back far enough that the near bays stay crisp. */}
      <fog attach="fog" args={["#1b2026", 22, 88]} />

      {/* Daylight through the membrane: sky/ground hemisphere carries the
          ambient, one sun gives direction and the shadow. */}
      <hemisphereLight args={["#e6eef5", "#2a3037", 2.4]} />
      <directionalLight
        position={[14, 26, 10]}
        intensity={2.1}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-camera-far={80}
        shadow-bias={-0.0004}
      />
      {/* Cool bounce off the far end, separating the trusses from the fog. */}
      <directionalLight position={[-10, 8, -20]} intensity={0.5} color="#8fb2cc" />

      <Hanger bays={11} baySpacing={5} />
      <Seating position={[0, 0, -4]} rows={24} columns={16} />

      <Rig progress={progress} pointer={pointer} />
    </>
  );
}

export function HangerCanvas() {
  const progress = useRef(0);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Scroll progress across the hero's own height.
  useEffect(() => {
    const onScroll = () => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = rect.height || 1;
      progress.current = Math.min(Math.max(-rect.top / travel, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pointer position across the whole viewport, normalised to [-1, 1] —
  // tracked at window level rather than the canvas so the look-around still
  // answers the cursor while it's over the headline or the buttons.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Stop rendering entirely once the hero leaves the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 44, near: 0.1, far: 200, position: [0, 2.35, START_Z] }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.25;
          scene.background = new THREE.Color("#1b2026");
        }}
      >
        <Scene progress={progress} pointer={pointer} />
      </Canvas>
    </div>
  );
}
