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

/** Per-asset framing: camera distance and the height it looks at. */
const framing: Record<AssetKind, { distance: number; target: number }> = {
  hanger: { distance: 20, target: 1.9 },
  stalls: { distance: 15, target: 1.4 },
  flooring: { distance: 14, target: 0.5 },
  stage: { distance: 20, target: 1.5 },
  power: { distance: 14, target: 1.1 },
  lighting: { distance: 15, target: 1.7 },
  logistics: { distance: 19, target: 1.4 },
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
              <Lightformer
                intensity={2.6}
                position={[6, 8, 4]}
                scale={[10, 10, 1]}
                color="#ffffff"
              />
              <Lightformer
                intensity={0.9}
                position={[-8, 4, -4]}
                scale={[10, 6, 1]}
                color="#cddbe6"
              />
              <Lightformer
                intensity={0.55}
                form="ring"
                position={[0, 10, 0]}
                scale={[12, 12, 1]}
                color="#ffffff"
              />
            </Environment>

            {/* Single soft key at 40°, matching the rig spec. */}
            <directionalLight position={[7, 9, 5]} intensity={1.5} color="#fffaf2" />
            <ambientLight intensity={0.45} />

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
