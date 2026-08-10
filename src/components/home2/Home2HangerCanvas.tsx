"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hanger } from "@/components/three/models/Hanger";
import { Seating } from "@/components/three/models/Seating";
import { useReducedMotion } from "@/lib/useReducedMotion";

const START_Z = 22;
const END_Z = 5;

function Rig({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const current = useRef(START_Z);

  useFrame((_, delta) => {
    const target = reduced
      ? START_Z - (START_Z - END_Z) * 0.15
      : START_Z - (START_Z - END_Z) * progress.current;

    const lambda = reduced ? 40 : 4.2;
    current.current = THREE.MathUtils.damp(current.current, target, lambda, delta);

    // Adjusted camera to match the reference composition: viewing the structure from outside/edge
    camera.position.set(-6, 4.5, current.current);
    camera.lookAt(2, 3, current.current - 18);
  });

  return null;
}

function Scene({ progress }: { progress: React.RefObject<number> }) {
  return (
    <>
      <fog attach="fog" args={["#f0f4f8", 30, 110]} />

      {/* Bright daytime lighting */}
      <hemisphereLight args={["#ffffff", "#d0d8e0", 3.0]} />
      <directionalLight
        position={[20, 30, 15]}
        intensity={3.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-far={120}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-15, 10, -25]} intensity={1.2} color="#a0b0c0" />

      <Hanger bays={14} baySpacing={5} />
      <Seating position={[0, 0, -4]} rows={30} columns={18} />

      <Rig progress={progress} />
    </>
  );
}

export function Home2HangerCanvas() {
  const progress = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

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
        camera={{ fov: 40, near: 0.1, far: 250, position: [-6, 4.5, START_Z] }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          scene.background = new THREE.Color("#f0f4f8");
        }}
      >
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
