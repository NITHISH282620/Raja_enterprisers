"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CatalogueAsset } from "./models/CatalogueAssets";
import type { AssetKind } from "@/content/inventory";

/**
 * The shared rig every catalogue asset renders into (plan §3).
 *
 * Consistency comes from the rig, not from per-asset art direction: identical
 * camera angle, identical lighting, identical ground and shadow treatment.
 * Restyling the catalogue means editing this one file.
 *
 * Elevation and azimuth are fixed across all assets. Only distance varies, so a
 * truck and a stall bay are both framed without either being unreadable — the
 * standard product-catalogue compromise, applied consistently.
 */

const ELEVATION = (22 * Math.PI) / 180;
const AZIMUTH = (35 * Math.PI) / 180;

/**
 * Per-asset framing: camera distance and the height it looks at.
 *
 * At fov 28 the visible height is ~0.5 × distance, so each distance is set from
 * the asset's real extent plus margin. Elevation and azimuth never change —
 * only how far back the camera stands.
 */
const framing: Record<AssetKind, { distance: number; target: number }> = {
  hanger: { distance: 26, target: 1.8 },
  stalls: { distance: 12, target: 1.4 },
  flooring: { distance: 12, target: 0.3 },
  stage: { distance: 18, target: 1.5 },
  power: { distance: 12.5, target: 1.1 },
  lighting: { distance: 12, target: 1.6 },
  logistics: { distance: 16, target: 1.4 },
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
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy]);

  const { distance, target } = framing[kind];

  return (
    <div ref={ref} className={className}>
      {visible && (
        <Canvas
          shadows={false}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true }}
          camera={{
            fov: 28,
            near: 0.5,
            far: 120,
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

            {/* Single soft key at 40°, matching the rig spec, plus a low fill
                so the shadow sides stay readable rather than going to black. */}
            <directionalLight position={[7, 9, 5]} intensity={2.4} color="#fffaf2" />
            <directionalLight position={[-6, 3, -5]} intensity={0.7} color="#cfdde8" />
            <ambientLight intensity={1.1} />

            <CatalogueAsset kind={kind} />

            {/* Contact shadow only — no reflective floor. */}
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.42}
              scale={38}
              blur={2.6}
              far={14}
              resolution={512}
              color="#2a3037"
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
