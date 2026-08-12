"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CatalogueAsset } from "./models/CatalogueAssets";
import type { AssetKind } from "@/content/home1/inventory";

/**
 * The shared rig every catalogue asset renders into (plan §3).
 *
 * Consistency comes from the rig, not from per-asset art direction: identical
 * camera angle, identical lighting, identical ground and shadow treatment.
 * Restyling the catalogue means editing this one file.
 *
 * Assets are presented lifted slightly clear of a soft, wide contact shadow, so
 * each reads as a physical object set down for inspection rather than a flat
 * icon pasted onto a card.
 *
 * Elevation and azimuth are fixed across all assets. Only distance varies, so a
 * lorry and a stall bay are both framed without either being unreadable — the
 * standard product-catalogue compromise, applied consistently.
 */

const ELEVATION = (22 * Math.PI) / 180;
const AZIMUTH = (35 * Math.PI) / 180;

/** How far every asset sits clear of its shadow. */
const LIFT = 0.18;

/**
 * Per-asset framing. At fov 28 the visible height is ~0.5 × distance, so each
 * distance is set from the asset's real extent plus margin.
 */
const framing: Record<AssetKind, { distance: number; target: number }> = {
  hanger: { distance: 28, target: 2.0 },
  stalls: { distance: 16.5, target: 1.4 },
  flooring: { distance: 15.5, target: 0.5 },
  stage: { distance: 25, target: 1.8 },
  power: { distance: 17.5, target: 1.2 },
  lighting: { distance: 20, target: 1.9 },
  logistics: { distance: 24, target: 1.5 },
};

function cameraPosition(distance: number, target: number): [number, number, number] {
  return [
    distance * Math.cos(ELEVATION) * Math.sin(AZIMUTH),
    distance * Math.sin(ELEVATION) + target,
    distance * Math.cos(ELEVATION) * Math.cos(AZIMUTH),
  ];
}

export function AssetStage({
  kind,
  className = "",
  /** Renders only when in view, so a page of cards doesn't run every canvas. */
  lazy = true,
}: {
  kind: AssetKind;
  className?: string;
  lazy?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;
    const node = ref.current;
    if (!node) return;
    // Unmounting off-screen canvases keeps the live WebGL context count well
    // under the browser's cap on the full-catalogue page.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy]);

  const { distance, target } = framing[kind];

  return (
    <div ref={ref} className={className}>
      {visible && (
        <Canvas
          shadows="soft"
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{
            fov: 28,
            near: 0.5,
            far: 160,
            position: cameraPosition(distance, target),
          }}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1;
            camera.lookAt(0, target, 0);
          }}
        >
          <Suspense fallback={null}>
            {/* Studio environment built from in-scene lightformers — no
                external HDRI fetch, so the rig works offline and on Vercel
                without a CDN dependency. */}
            <Environment resolution={256}>
              {/* Overhead softbox — the dominant source, and what the
                  aluminium actually reflects. */}
              <Lightformer
                intensity={7}
                form="rect"
                position={[0, 12, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[22, 22, 1]}
                color="#ffffff"
              />
              <Lightformer
                intensity={4}
                position={[10, 8, 6]}
                scale={[14, 14, 1]}
                color="#ffffff"
              />
              <Lightformer
                intensity={2.2}
                position={[-12, 5, -6]}
                scale={[14, 10, 1]}
                color="#d6e3ec"
              />
            </Environment>

            {/* Single soft key at 40°, matching the rig spec. This is the only
                shadow-caster: one clean direction reads as a studio, several
                read as a mess. */}
            <directionalLight
              position={[9, 12, 7]}
              intensity={2.4}
              color="#fffaf2"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-left={-distance / 2}
              shadow-camera-right={distance / 2}
              shadow-camera-top={distance / 2}
              shadow-camera-bottom={-distance / 2}
              shadow-camera-far={distance * 3}
              shadow-bias={-0.0012}
              shadow-normalBias={0.02}
            />
            {/* Low fill, so shadow sides stay readable rather than going black. */}
            <directionalLight position={[-6, 3, -5]} intensity={0.7} color="#cfdde8" />
            <ambientLight intensity={0.9} />

            <group position={[0, LIFT, 0]}>
              <Shadowed>
                <CatalogueAsset kind={kind} />
              </Shadowed>
            </group>

            {/* Soft grounding beneath the lifted asset. Contact shadow only —
                no reflective floor. */}
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.5}
              scale={distance * 1.5}
              blur={2.4}
              far={distance / 2}
              resolution={512}
              color="#1d2530"
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

/**
 * Turns on cast/receive shadows for every mesh in the subtree.
 *
 * Setting the flags here rather than on each of several hundred primitives
 * keeps the asset files about form and material, which is what they should be
 * about.
 */
function Shadowed({ children }: { children: React.ReactNode }) {
  return (
    <group
      ref={(group) => {
        group?.traverse((object) => {
          if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
      }}
    >
      {children}
    </group>
  );
}
