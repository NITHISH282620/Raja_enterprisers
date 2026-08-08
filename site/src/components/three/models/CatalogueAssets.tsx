"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { materials } from "../materials";
import { latticeBeam } from "../lattice";
import { chairGeometry } from "./Seating";
import type { AssetKind } from "@/content/inventory";

/**
 * The inventory catalogue models (plan §3, §E).
 *
 * Every asset is a child of the shared AssetStage rig — same camera, same
 * lighting, same ground, same unit scale — so the catalogue reads as one family.
 *
 * Each represents documented stock only. No invented products, no branding, no
 * fabricated specifications. Note in particular that Lighting carries general
 * fixtures alone: the brochure documents no AV inventory (source-of-truth §4).
 */

/** 02 — Octonorm / Maxima stall bays with fascia. */
function Stalls() {
  const bays = 3;
  const width = 2;
  const height = 2.5;
  const depth = 2;

  return (
    <group position={[0, 0, 0]}>
      {Array.from({ length: bays }).map((_, i) => {
        const x = (i - (bays - 1) / 2) * (width + 0.06);
        return (
          <group key={i} position={[x, 0, 0]}>
            {/* Extruded aluminium uprights at the bay corners */}
            {[-width / 2, width / 2].map((ox) =>
              [-depth / 2, depth / 2].map((oz) => (
                <mesh
                  key={`${ox}-${oz}`}
                  position={[ox, height / 2, oz]}
                  material={materials.aluminium}
                  castShadow
                >
                  <boxGeometry args={[0.08, height, 0.08]} />
                </mesh>
              )),
            )}
            {/* Back and side infill panels */}
            <mesh
              position={[0, height / 2, -depth / 2]}
              material={materials.panel}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[width, height, 0.05]} />
            </mesh>
            <mesh
              position={[-width / 2, height / 2, 0]}
              material={materials.panel}
              castShadow
            >
              <boxGeometry args={[0.05, height, depth]} />
            </mesh>
            {/* LED fascia band across the top */}
            <mesh position={[0, height + 0.16, 0]} material={materials.darkSteel} castShadow>
              <boxGeometry args={[width, 0.32, depth]} />
            </mesh>
            {/* Carpeted bay floor */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.02, 0]}
              material={materials.carpet}
              receiveShadow
            >
              <planeGeometry args={[width, depth]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/** 03 — Wooden floor platform, part-laid so the build-up reads. */
function Flooring() {
  const size = 6;
  const boards = 8;

  return (
    <group>
      {/* Bearer frame beneath */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.09, -size / 2 + (i * size) / 4]}
          material={materials.steel}
          castShadow
        >
          <boxGeometry args={[size, 0.18, 0.12]} />
        </mesh>
      ))}

      {/* Ply deck boards */}
      {Array.from({ length: boards }).map((_, i) => {
        // Leave the last two off to expose the substructure.
        const laid = i < boards - 2;
        return (
          <mesh
            key={i}
            position={[
              -size / 2 + (i + 0.5) * (size / boards),
              laid ? 0.22 : 0.22,
              laid ? 0 : 0,
            ]}
            visible={laid}
            material={materials.ply}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[size / boards - 0.02, 0.06, size]} />
          </mesh>
        );
      })}

      {/* Carpet finish over part of the deck */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-size / 4, 0.26, 0]}
        material={materials.carpet}
        receiveShadow
      >
        <planeGeometry args={[size / 2.2, size * 0.9]} />
      </mesh>
    </group>
  );
}

/** 04 — Staging with skirt, steps and seating rows. */
function Stage() {
  const width = 6;
  const depth = 3.2;
  const height = 0.9;
  const geometry = useMemo(() => chairGeometry(), []);

  const matrices = useMemo(() => {
    const result: THREE.Matrix4[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 9; c++) {
        result.push(
          new THREE.Matrix4().makeTranslation(
            -2.5 + c * 0.64,
            0,
            depth / 2 + 1.4 + r * 0.85,
          ),
        );
      }
    }
    return result;
  }, [depth]);

  return (
    <group>
      {/* Deck */}
      <mesh position={[0, height, 0]} material={materials.ply} castShadow receiveShadow>
        <boxGeometry args={[width, 0.12, depth]} />
      </mesh>
      {/* Skirt */}
      <mesh position={[0, height / 2, 0]} material={materials.darkSteel} castShadow>
        <boxGeometry args={[width - 0.02, height, depth - 0.02]} />
      </mesh>
      {/* Steps */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[width / 2 + 0.35, (height / 3) * (i + 0.5), 0]}
          material={materials.darkSteel}
          castShadow
        >
          <boxGeometry args={[0.7 - i * 0.02, height / 3, 1.4]} />
        </mesh>
      ))}
      {/* Overhead truss spanning the stage */}
      <TrussSpan length={width + 1.2} y={3.6} />
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[(side * (width + 1.2)) / 2, 1.8, 0]}
          material={materials.aluminium}
          castShadow
        >
          <boxGeometry args={[0.26, 3.6, 0.26]} />
        </mesh>
      ))}
      {/* Audience */}
      <instancedMesh
        args={[geometry, materials.seat, matrices.length]}
        castShadow
        receiveShadow
        ref={(mesh) => {
          if (!mesh) return;
          matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />
      {/* Barricade line */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[-2.5 + i * 1.02, 0.55, depth / 2 + 0.8]}
          material={materials.steel}
          castShadow
        >
          <boxGeometry args={[0.98, 1.1, 0.06]} />
        </mesh>
      ))}
    </group>
  );
}

/** A horizontal lattice truss span, reused by Stage and Lighting. */
function TrussSpan({ length, y }: { length: number; y: number }) {
  const geometry = useMemo(() => latticeBeam(length, 0.4), [length]);
  return <mesh geometry={geometry} material={materials.aluminium} position={[0, y, 0]} castShadow />;
}

/** 05 — Generator set and temporary air-handling units. */
function Power() {
  return (
    <group>
      {/* Containerised generator */}
      <group position={[-1.6, 0, 0]}>
        <mesh position={[0, 1.05, 0]} material={materials.steel} castShadow receiveShadow>
          <boxGeometry args={[3.4, 1.7, 1.5]} />
        </mesh>
        {/* Skid */}
        <mesh position={[0, 0.12, 0]} material={materials.darkSteel} castShadow>
          <boxGeometry args={[3.5, 0.24, 1.6]} />
        </mesh>
        {/* Exhaust stack */}
        <mesh position={[-1.4, 2.35, -0.5]} material={materials.darkSteel} castShadow>
          <cylinderGeometry args={[0.11, 0.11, 1.2, 16]} />
        </mesh>
        {/* Louvre banks */}
        {[-0.9, 0, 0.9].map((x) => (
          <mesh key={x} position={[x, 1.05, 0.76]} material={materials.darkSteel}>
            <boxGeometry args={[0.7, 1.1, 0.04]} />
          </mesh>
        ))}
      </group>

      {/* Air-handling units */}
      {[1.6, 2.9].map((x, i) => (
        <group key={x} position={[x, 0, i * 0.9 - 0.45]}>
          <mesh position={[0, 0.95, 0]} material={materials.panel} castShadow receiveShadow>
            <boxGeometry args={[1.1, 1.9, 1.1]} />
          </mesh>
          <mesh position={[0, 1.95, 0]} material={materials.darkSteel} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.12, 20]} />
          </mesh>
          {/* Flexible duct run */}
          <mesh position={[0, 2.35, 0]} material={materials.steel} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.7, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * 06 — General lighting only.
 * Deliberately generic fixtures on a truss. The brochure documents no AV
 * inventory, so nothing here implies owned audio, LED wall or moving lights.
 */
function Lighting() {
  return (
    <group>
      <TrussSpan length={6.4} y={3.4} />
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 3.2, 1.7, 0]}
          material={materials.aluminium}
          castShadow
        >
          <boxGeometry args={[0.24, 3.4, 0.24]} />
        </mesh>
      ))}
      {/* Base plates */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 3.2, 0.05, 0]} material={materials.darkSteel} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
        </mesh>
      ))}
      {/* Generic floodlight bodies hung off the truss */}
      {[-2.2, -0.75, 0.75, 2.2].map((x) => (
        <group key={x} position={[x, 3.1, 0]}>
          <mesh material={materials.darkSteel} castShadow>
            <boxGeometry args={[0.34, 0.34, 0.22]} />
          </mesh>
          <mesh position={[0, -0.22, 0]} material={materials.darkSteel} castShadow>
            <boxGeometry args={[0.06, 0.16, 0.06]} />
          </mesh>
        </group>
      ))}
      {/* Cable run along the ground */}
      <mesh position={[0, 0.04, 1.1]} material={materials.darkSteel}>
        <boxGeometry args={[5.6, 0.08, 0.16]} />
      </mesh>
    </group>
  );
}

/** 07 — Owned goods vehicle. Unbranded, per source-of-truth §8. */
function Logistics() {
  return (
    <group position={[0, 0, 0]}>
      {/* Cab */}
      <mesh position={[-2.5, 1.5, 0]} material={materials.panel} castShadow receiveShadow>
        <boxGeometry args={[1.9, 2.1, 2.35]} />
      </mesh>
      {/* Windscreen */}
      <mesh position={[-3.3, 1.95, 0]} material={materials.darkSteel} castShadow>
        <boxGeometry args={[0.32, 0.9, 2.1]} />
      </mesh>
      {/* Chassis */}
      <mesh position={[0.4, 0.72, 0]} material={materials.darkSteel} castShadow>
        <boxGeometry args={[7.4, 0.28, 2.1]} />
      </mesh>
      {/* Load body */}
      <mesh position={[1.1, 2.05, 0]} material={materials.panel} castShadow receiveShadow>
        <boxGeometry args={[5.6, 2.4, 2.35]} />
      </mesh>
      {/* Wheels */}
      {[
        [-2.7, -0.95],
        [-2.7, 0.95],
        [1.4, -0.95],
        [1.4, 0.95],
        [2.6, -0.95],
        [2.6, 0.95],
      ].map(([x, z], i) => (
        <mesh
          key={i}
          position={[x, 0.52, z]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.darkSteel}
          castShadow
        >
          <cylinderGeometry args={[0.52, 0.52, 0.34, 20]} />
        </mesh>
      ))}
      {/* Palletised stock alongside */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[-1 + i * 1.3, 0.4, 2.6]}
          material={materials.ply}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.1, 0.8, 1.1]} />
        </mesh>
      ))}
    </group>
  );
}

/** Compact hanger for the catalogue card — exterior three-quarter view. */
function HangerAsset() {
  const bays = 5;
  const baySpacing = 2.4;
  const span = 9;
  const eave = 2.4;
  const ridge = 4.1;
  const length = bays * baySpacing;

  return (
    <group>
      {/* Membrane roof slopes */}
      {[-1, 1].map((side) => {
        const halfSpan = span / 2;
        const rise = ridge - eave;
        const slope = Math.hypot(halfSpan, rise);
        const pitch = Math.atan2(rise, halfSpan);
        return (
          <mesh
            key={side}
            position={[(side * halfSpan) / 2, eave + rise / 2, 0]}
            rotation={[Math.PI / 2, 0, side === -1 ? -pitch : pitch]}
            material={materials.membrane}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[slope, length]} />
          </mesh>
        );
      })}
      {/* Side walls */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[(side * span) / 2, eave / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.membrane}
          castShadow
        >
          <planeGeometry args={[length, eave]} />
        </mesh>
      ))}
      {/* Exposed frames at the open end */}
      {Array.from({ length: bays + 1 }).map((_, i) => {
        const z = -length / 2 + i * baySpacing;
        return (
          <group key={i} position={[0, 0, z]}>
            {[-1, 1].map((side) => (
              <mesh
                key={side}
                position={[(side * span) / 2, eave / 2, 0]}
                material={materials.aluminium}
                castShadow
              >
                <boxGeometry args={[0.16, eave, 0.16]} />
              </mesh>
            ))}
            {[-1, 1].map((side) => {
              const halfSpan = span / 2;
              const rise = ridge - eave;
              const slope = Math.hypot(halfSpan, rise);
              const pitch = Math.atan2(rise, halfSpan);
              return (
                <mesh
                  key={`r${side}`}
                  position={[(side * halfSpan) / 2, eave + rise / 2, 0]}
                  rotation={[0, 0, side === -1 ? pitch : -pitch]}
                  material={materials.aluminium}
                  castShadow
                >
                  <boxGeometry args={[slope, 0.16, 0.16]} />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

const registry: Record<AssetKind, () => React.ReactElement> = {
  hanger: HangerAsset,
  stalls: Stalls,
  flooring: Flooring,
  stage: Stage,
  power: Power,
  lighting: Lighting,
  logistics: Logistics,
};

export function CatalogueAsset({ kind }: { kind: AssetKind }) {
  const Component = registry[kind];
  return <Component />;
}
