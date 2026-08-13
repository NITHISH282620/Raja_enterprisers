"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/clientState";
import {
  hangarFeet,
  hangarRibs,
  hangarShell,
  mainHangar,
  secondHangar,
} from "./hangarGeometry";

/**
 * The engineering moment: Raja's clear-span hangars, as they stand.
 *
 * Composed from the reference photograph — a long primary hangar with a
 * shorter one alongside, set on a hard pad, seen three-quarter-on from
 * slightly above. That framing is doing specific work: it shows the length of
 * the structure and the gable end in one view, which is how you read both the
 * span and the modularity at once.
 *
 * Restraint rules, per the brief:
 *  · Scroll moves the camera along an arc. It never rotates the model.
 *  · The pointer shifts only the look-at target, by at most 2°, so it reads as
 *    a head turning rather than an object being dragged.
 *  · No auto-spin. A building that revolves is a product on a turntable.
 */

const ARC_START = -0.42;
const ARC_END = 0.24;

/**
 * Camera distance and height.
 *
 * Tuned against the reference photograph, which is shot from a stand — high
 * enough to see the roof plane and read the length, low enough that the eave
 * line and the gable still stand up as elevation. The first pass sat at 78m
 * and 26m high, which put the lens almost over the ridge: the roof filled the
 * frame and the seam ribs read as stripes on a flat surface rather than as a
 * building. Further back and considerably lower fixes it.
 */
const RADIUS = 112;
const EYE_HEIGHT = 17;
const EYE_DROP = 4; // how far the camera settles over the scroll
const MAX_POINTER_SHIFT = (2 * Math.PI) / 180;

/** Membrane. Bright PVC, matte, lit rather than shaded — the photograph's
 *  hangars are almost white against the sky, and a grey membrane instantly
 *  reads as a cheap marquee. */
function useMaterials() {
  return useMemo(() => {
    const membrane = new THREE.MeshStandardMaterial({
      color: "#fbfbfa",
      roughness: 0.82,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
    // Close to the membrane in tone. These are seams catching light, not
    // structural members on display — at high contrast they striped the roof.
    const rib = new THREE.MeshStandardMaterial({
      color: "#dce0e2",
      roughness: 0.6,
      metalness: 0.25,
    });
    const foot = new THREE.MeshStandardMaterial({
      color: "#8d959c",
      roughness: 0.7,
      metalness: 0.3,
    });
    return { membrane, rib, foot };
  }, []);
}

function Hangar({
  spec,
  position,
  rotation = 0,
}: {
  spec: typeof mainHangar;
  position: [number, number, number];
  rotation?: number;
}) {
  const m = useMaterials();
  const shell = useMemo(() => hangarShell(spec), [spec]);
  const ribs = useMemo(() => hangarRibs(spec), [spec]);
  const feet = useMemo(() => hangarFeet(spec), [spec]);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh geometry={shell} material={m.membrane} castShadow receiveShadow />
      <mesh geometry={ribs} material={m.rib} castShadow />
      <mesh geometry={feet} material={m.foot} />
    </group>
  );
}

function Rig({
  progress,
  pointer,
  reduced,
}: {
  progress: React.RefObject<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
  reduced: boolean;
}) {
  const { camera } = useThree();
  const angle = useRef(reduced ? ARC_START + (ARC_END - ARC_START) * 0.45 : ARC_START);
  const look = useRef(new THREE.Vector3(0, 4.5, 0));

  useFrame((_, delta) => {
    const target = reduced
      ? ARC_START + (ARC_END - ARC_START) * 0.45
      : ARC_START + (ARC_END - ARC_START) * progress.current;

    // Frame-rate independent damping — the camera should feel like it has
    // mass, matching a structure that weighs tonnes.
    angle.current = THREE.MathUtils.damp(angle.current, target, 2.6, delta);

    const a = angle.current;
    camera.position.set(
      Math.sin(a) * RADIUS,
      EYE_HEIGHT - progress.current * EYE_DROP,
      Math.cos(a) * RADIUS,
    );

    const px = reduced ? 0 : pointer.current.x * MAX_POINTER_SHIFT * RADIUS;
    const py = reduced ? 0 : pointer.current.y * MAX_POINTER_SHIFT * RADIUS;
    look.current.lerp(
      new THREE.Vector3(px, 5.2 - py, 0),
      1 - Math.exp(-3.5 * delta),
    );
    camera.lookAt(look.current);
  });

  return null;
}

export function StructureCanvas({
  progress,
  pointer,
}: {
  progress: React.RefObject<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      // DPR capped at 1.75: past that the gain is invisible and the fill cost
      // is not, which matters on the mid-range Android this has to survive.
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 32, near: 1, far: 400 }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      {/* Overcast daylight. One sun with a soft shadow, one sky/ground bounce.
          No rim lights, no coloured fills — this is a building at noon. */}
      <hemisphereLight args={["#ffffff", "#d5d9d8", 1.6]} />
      <directionalLight
        position={[46, 62, 34]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-camera-far={220}
        shadow-bias={-0.0006}
      />
      <directionalLight position={[-40, 24, -30]} intensity={0.28} />

      {/*
        Shadow catcher, not a ground plane. An opaque pad put a hard grey slab
        across the lower half of the section; this takes the shadow and lets the
        page's own card colour read through, so the structure sits on the page
        rather than on a rectangle of its own.
      */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <shadowMaterial opacity={0.16} />
      </mesh>

      <Hangar spec={mainHangar} position={[0, 0, 0]} />
      <Hangar spec={secondHangar} position={[-27, 0, -6]} rotation={0.04} />

      <Rig progress={progress} pointer={pointer} reduced={reduced} />
    </Canvas>
  );
}
