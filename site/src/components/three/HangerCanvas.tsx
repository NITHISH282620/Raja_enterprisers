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

function Rig({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const current = useRef(START_Z);

  useFrame((_, delta) => {
    const target = reduced
      ? // Composed still: partway in, so the structure reads as enclosing.
        START_Z - (START_Z - END_Z) * 0.28
      : START_Z - (START_Z - END_Z) * progress.current;

    // Frame-rate independent damping, so the dolly feels weighted rather than
    // snapping to the scroll position.
    const lambda = reduced ? 40 : 4.2;
    current.current = THREE.MathUtils.damp(current.current, target, lambda, delta);

    camera.position.set(0, 2.35, current.current);
    camera.lookAt(0, 2.9, current.current - 12);
  });

  return null;
}

function Scene({ progress }: { progress: React.RefObject<number> }) {
  return (
    <>
      {/* Depth down the length. Does more for spatial feel than any effect. */}
      <fog attach="fog" args={["#16191c", 12, 62]} />

      {/* Daylight through the membrane: sky/ground hemisphere carries the
          ambient, one sun gives direction and the shadow. */}
      <hemisphereLight args={["#dfe7ee", "#20262b", 1.15]} />
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

      <Rig progress={progress} />
    </>
  );
}

export function HangerCanvas() {
  const progress = useRef(0);
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
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color("#16191c");
        }}
      >
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
