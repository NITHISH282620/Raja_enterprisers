"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { materials } from "../materials";
import {
  gableEnd,
  latticeBeam,
  membraneShell,
  portalFrame,
  type HangerSpec,
} from "../lattice";
import { chairGeometry } from "./Seating";
import type { AssetKind } from "@/content/home1/inventory";

/**
 * The inventory catalogue models (plan §3, §E).
 *
 * Art direction: each asset is a *composed cluster* — a principal object plus
 * the supporting kit that actually travels with it — presented as a physical
 * thing on a soft ground shadow, not a flat product icon. Edges are chamfered
 * throughout, because a caught highlight along an edge is most of what
 * separates a premium render from a box.
 *
 * Every asset represents documented stock only. No invented products, no
 * branding, no fabricated specifications. Note in particular that Lighting
 * carries general fixtures alone: the brochure documents no AV inventory
 * (source-of-truth §4).
 */

/** Chamfered box. The default radius reads correctly at catalogue scale. */
function Box({
  size,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  material,
  radius,
}: {
  size: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  material: THREE.Material;
  radius?: number;
}) {
  // Radius must never exceed half the smallest dimension or the solid inverts.
  const r = Math.min(radius ?? 0.02, Math.min(...size) * 0.32);
  return (
    <RoundedBox
      args={size}
      radius={r}
      smoothness={3}
      position={position}
      rotation={rotation}
      material={material}
    />
  );
}

/* ------------------------------------------------------------------ 01 */

const cardHangerSpec: HangerSpec = {
  span: 9,
  eaveHeight: 2.4,
  ridgeHeight: 4.1,
  depth: 0.26,
};

/**
 * 01 — Imported aluminium German hanger.
 *
 * Built from the same helpers as the hero, at a smaller spec. Sharing the
 * geometry source is what keeps the card and the hero recognisably the same
 * structure rather than two tents that happen to sit on one site.
 */
function HangerAsset() {
  const bays = 5;
  const baySpacing = 2.4;
  const length = bays * baySpacing;

  const frameGeometry = useMemo(() => portalFrame(cardHangerSpec), []);
  const shellGeometry = useMemo(
    () => membraneShell(cardHangerSpec, length),
    [length],
  );
  const gableGeometry = useMemo(() => gableEnd(cardHangerSpec), []);

  const matrices = useMemo(
    () =>
      Array.from({ length: bays + 1 }, (_, i) =>
        new THREE.Matrix4().makeTranslation(0, 0, -length / 2 + i * baySpacing),
      ),
    [length],
  );

  return (
    <group>
      <instancedMesh
        args={[frameGeometry, materials.aluminium, matrices.length]}
        ref={(mesh) => {
          if (!mesh) return;
          matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />
      <mesh geometry={shellGeometry} material={materials.membrane} />
      <mesh
        geometry={gableGeometry}
        material={materials.membrane}
        position={[0, 0, -length / 2]}
      />

      {/* Ballast blocks at the feet — how these are actually held down. */}
      {[-1, 1].map((side) =>
        Array.from({ length: bays + 1 }).map((_, i) => (
          <Box
            key={`${side}-${i}`}
            size={[0.5, 0.22, 0.5]}
            position={[
              (side * cardHangerSpec.span) / 2,
              0.11,
              -length / 2 + i * baySpacing,
            ]}
            material={materials.darkSteel}
          />
        )),
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ 02 */

/**
 * 02 — Octonorm / Maxima stall bays.
 *
 * The uprights are eight-sided: Octonorm is named for its octagonal extrusion,
 * and getting that right is the difference between "an exhibition stall" and
 * "a generic white box".
 */
function Stalls() {
  const bays = 3;
  const bay = 2.05;
  const height = 2.5;
  const depth = 2.1;
  const width = bays * bay;

  return (
    <group position={[0, 0, 0]}>
      {/* Carpeted deck */}
      <Box
        size={[width + 0.1, 0.06, depth + 0.1]}
        position={[0, 0.03, 0]}
        material={materials.carpet}
      />

      {/* Octagonal uprights on the bay grid */}
      {Array.from({ length: bays + 1 }).map((_, i) =>
        [-depth / 2, depth / 2].map((z) => (
          <mesh
            key={`${i}-${z}`}
            position={[-width / 2 + i * bay, height / 2 + 0.06, z]}
            material={materials.aluminium}
          >
            <cylinderGeometry args={[0.045, 0.045, height, 8]} />
          </mesh>
        )),
      )}

      {/* Infill panels, inset within the frame */}
      {Array.from({ length: bays }).map((_, i) => (
        <Box
          key={i}
          size={[bay - 0.12, height - 0.12, 0.035]}
          position={[-width / 2 + (i + 0.5) * bay, height / 2 + 0.06, -depth / 2]}
          material={materials.panel}
        />
      ))}
      {/* Return wall on the closed side */}
      <Box
        size={[0.035, height - 0.12, depth - 0.12]}
        position={[-width / 2, height / 2 + 0.06, 0]}
        material={materials.panel}
      />

      {/* Header beams */}
      {[-depth / 2, depth / 2].map((z) => (
        <Box
          key={z}
          size={[width, 0.07, 0.07]}
          position={[0, height + 0.06, z]}
          material={materials.aluminium}
        />
      ))}

      {/* Fascia band. Deliberately blank — no fake branding. */}
      <Box
        size={[width + 0.12, 0.34, depth + 0.16]}
        position={[0, height + 0.28, 0]}
        material={materials.panel}
        radius={0.03}
      />
      <Box
        size={[width + 0.14, 0.05, depth + 0.18]}
        position={[0, height + 0.46, 0]}
        material={materials.aluminium}
      />

      {/* Arm spotlights on the fascia */}
      {[-1, 0, 1].map((i) => (
        <group key={i} position={[i * 1.9, height + 0.2, depth / 2 + 0.1]}>
          <Box size={[0.04, 0.04, 0.26]} position={[0, 0, 0.13]} material={materials.darkSteel} />
          <mesh position={[0, -0.06, 0.28]} rotation={[0.6, 0, 0]} material={materials.darkSteel}>
            <cylinderGeometry args={[0.075, 0.09, 0.2, 16]} />
          </mesh>
        </group>
      ))}

      {/* Reception counter and stool */}
      <Box
        size={[1.3, 0.95, 0.55]}
        position={[width / 2 - 1.1, 0.53, depth / 2 - 0.45]}
        material={materials.panel}
        radius={0.03}
      />
      <Box
        size={[1.36, 0.05, 0.61]}
        position={[width / 2 - 1.1, 1.02, depth / 2 - 0.45]}
        material={materials.darkSteel}
      />
      <group position={[width / 2 - 2.1, 0, depth / 2 - 0.5]}>
        <mesh position={[0, 0.62, 0]} material={materials.darkSteel}>
          <cylinderGeometry args={[0.17, 0.17, 0.06, 20]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={materials.steel}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} material={materials.steel}>
          <cylinderGeometry args={[0.19, 0.19, 0.04, 20]} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ 03 */

/**
 * 03 — Wooden floor platform, drawn as an exploded build-up.
 *
 * Separating the layers is the clearest way to explain what the stock actually
 * is: bearers, ply deck, carpet finish. A finished floor photographs as nothing.
 */
function Flooring() {
  const size = 5.4;
  const panels = 3;

  return (
    <group>
      {/* Adjustable base jacks */}
      {[-1, 1].map((sx) =>
        [-1, 0, 1].map((sz) => (
          <group key={`${sx}-${sz}`} position={[sx * (size / 2 - 0.4), 0, sz * (size / 2 - 0.5)]}>
            <mesh position={[0, 0.03, 0]} material={materials.darkSteel}>
              <cylinderGeometry args={[0.13, 0.13, 0.06, 14]} />
            </mesh>
            <mesh position={[0, 0.16, 0]} material={materials.steel}>
              <cylinderGeometry args={[0.035, 0.035, 0.26, 12]} />
            </mesh>
          </group>
        )),
      )}

      {/* Steel bearer grid */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={`b${i}`}
          size={[size, 0.14, 0.1]}
          position={[0, 0.36, -size / 2 + (i * size) / 4]}
          material={materials.steel}
        />
      ))}
      {[-1, 1].map((sx) => (
        <Box
          key={`l${sx}`}
          size={[0.1, 0.14, size]}
          position={[sx * (size / 2 - 0.05), 0.36, 0]}
          material={materials.steel}
        />
      ))}

      {/* Ply deck, one panel lifted clear to expose the layer beneath */}
      {Array.from({ length: panels }).map((_, i) => {
        const lifted = i === panels - 1;
        return (
          <Box
            key={`p${i}`}
            size={[size / panels - 0.03, 0.07, size]}
            position={[
              -size / 2 + (i + 0.5) * (size / panels),
              lifted ? 0.92 : 0.47,
              0,
            ]}
            material={materials.ply}
            radius={0.012}
          />
        );
      })}

      {/* Carpet finish over the laid section */}
      <Box
        size={[(size / panels) * 2 - 0.05, 0.025, size - 0.06]}
        position={[-size / 2 + (size / panels), 0.52, 0]}
        material={materials.carpet}
        radius={0.008}
      />

      {/* Carpet roll waiting to be laid */}
      <mesh
        position={[size / 2 + 0.55, 0.24, -size / 4]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.carpet}
      >
        <cylinderGeometry args={[0.24, 0.24, 2.2, 22]} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ 04 */

/** A lattice truss span, reused by Stage and Lighting. */
function TrussSpan({
  length,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  depth = 0.36,
}: {
  length: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  depth?: number;
}) {
  const geometry = useMemo(() => latticeBeam(length, depth), [length, depth]);
  return (
    <mesh
      geometry={geometry}
      material={materials.aluminium}
      position={position}
      rotation={rotation}
    />
  );
}

/** A vertical lattice tower. */
function TrussTower({
  height,
  position,
  depth = 0.36,
}: {
  height: number;
  position: [number, number, number];
  depth?: number;
}) {
  return (
    <>
      <TrussSpan
        length={height}
        depth={depth}
        position={[position[0], position[1] + height / 2, position[2]]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Box
        size={[0.7, 0.06, 0.7]}
        position={[position[0], position[1] + 0.03, position[2]]}
        material={materials.darkSteel}
      />
    </>
  );
}

/** 04 — Staging, audience seating and barricade line. */
function Stage() {
  const width = 6.4;
  const depth = 3.4;
  const height = 1;
  const deckPanels = 4;

  const geometry = useMemo(() => chairGeometry(), []);
  const matrices = useMemo(() => {
    const result: THREE.Matrix4[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 10; c++) {
        result.push(
          new THREE.Matrix4().makeTranslation(
            -2.9 + c * 0.64,
            0,
            depth / 2 + 1.9 + r * 0.85,
          ),
        );
      }
    }
    return result;
  }, [depth]);

  return (
    <group>
      {/* Deck, built from discrete panels so the seams read */}
      {Array.from({ length: deckPanels }).map((_, i) => (
        <Box
          key={i}
          size={[width / deckPanels - 0.02, 0.1, depth]}
          position={[-width / 2 + (i + 0.5) * (width / deckPanels), height, 0]}
          material={materials.ply}
          radius={0.012}
        />
      ))}
      {/* Skirt */}
      <Box
        size={[width - 0.04, height - 0.06, depth - 0.04]}
        position={[0, (height - 0.06) / 2, 0]}
        material={materials.darkSteel}
        radius={0.01}
      />
      {/* Scaffold legs, visible past the skirt line */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`${sx}-${sz}`}
            position={[sx * (width / 2 - 0.18), height / 2, sz * (depth / 2 - 0.18)]}
            material={materials.steel}
          >
            <cylinderGeometry args={[0.045, 0.045, height, 12]} />
          </mesh>
        )),
      )}

      {/* Steps with handrail */}
      <group position={[width / 2 + 0.55, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            size={[0.36, height * ((i + 1) / 3), 1.5]}
            position={[
              0.36 * (1 - i),
              (height * ((i + 1) / 3)) / 2,
              0,
            ]}
            material={materials.darkSteel}
            radius={0.012}
          />
        ))}
        {[-1, 1].map((sz) => (
          <mesh
            key={sz}
            position={[0.2, height + 0.5, sz * 0.75]}
            rotation={[0, 0, Math.PI / 2 - 0.5]}
            material={materials.steel}
          >
            <cylinderGeometry args={[0.028, 0.028, 1.7, 10]} />
          </mesh>
        ))}
      </group>

      {/* Overhead truss goalpost */}
      <TrussTower height={4.2} position={[-(width / 2 + 0.7), 0, 0]} />
      <TrussTower height={4.2} position={[width / 2 + 0.7, 0, 0]} />
      <TrussSpan length={width + 1.4 + 0.36} position={[0, 4.2, 0]} />

      {/* Generic fixtures hung off the span */}
      {[-2, -0.7, 0.7, 2].map((x) => (
        <group key={x} position={[x, 3.92, 0]}>
          <Box size={[0.05, 0.16, 0.05]} position={[0, 0.1, 0]} material={materials.darkSteel} />
          <Box size={[0.3, 0.3, 0.2]} material={materials.darkSteel} radius={0.03} />
        </group>
      ))}

      {/* Audience */}
      <instancedMesh
        args={[geometry, materials.seat, matrices.length]}
        ref={(mesh) => {
          if (!mesh) return;
          matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />

      {/* Iron barricade line */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = -3.1 + i * 1.06;
        return (
          <group key={i} position={[x, 0, depth / 2 + 1.15]}>
            <Box size={[1, 0.05, 0.05]} position={[0, 1.05, 0]} material={materials.steel} />
            <Box size={[1, 0.04, 0.04]} position={[0, 0.62, 0]} material={materials.steel} />
            <Box size={[1, 0.04, 0.04]} position={[0, 0.24, 0]} material={materials.steel} />
            {[-0.48, 0.48].map((ox) => (
              <mesh key={ox} position={[ox, 0.55, 0]} material={materials.steel}>
                <cylinderGeometry args={[0.028, 0.028, 1.1, 10]} />
              </mesh>
            ))}
            <Box size={[0.06, 0.04, 0.5]} position={[0.48, 0.02, 0]} material={materials.steel} />
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ 05 */

/** 05 — Containerised generator, air handling and cable stock. */
function Power() {
  const genW = 3.6;
  const genH = 1.9;
  const genD = 1.6;

  return (
    <group>
      {/* Generator canopy */}
      <group position={[-1.5, 0, 0]}>
        <Box
          size={[genW, genH, genD]}
          position={[0, genH / 2 + 0.18, 0]}
          material={materials.steel}
          radius={0.05}
        />
        {/* Corrugation ribs */}
        {Array.from({ length: 7 }).map((_, i) => (
          <Box
            key={i}
            size={[0.05, genH - 0.24, genD + 0.03]}
            position={[-genW / 2 + 0.32 + i * 0.48, genH / 2 + 0.18, 0]}
            material={materials.steel}
            radius={0.015}
          />
        ))}
        {/* Skid base with forklift pockets */}
        <Box size={[genW + 0.08, 0.18, genD + 0.08]} position={[0, 0.09, 0]} material={materials.darkSteel} />
        {[-0.7, 0.7].map((x) => (
          <Box key={x} size={[0.5, 0.1, genD + 0.12]} position={[x, 0.09, 0]} material={materials.graphiteMat} />
        ))}
        {/* Louvre bank */}
        <group position={[genW / 2 + 0.01, genH / 2 + 0.18, 0]}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box
              key={i}
              size={[0.04, 0.11, genD - 0.4]}
              position={[0, -0.45 + i * 0.19, 0]}
              rotation={[0.3, 0, 0]}
              material={materials.darkSteel}
            />
          ))}
        </group>
        {/* Control panel door */}
        <Box
          size={[1, 0.85, 0.04]}
          position={[-0.6, genH / 2 + 0.28, genD / 2 + 0.01]}
          material={materials.darkSteel}
          radius={0.02}
        />
        {/* Exhaust stack */}
        <mesh position={[-genW / 2 + 0.4, genH + 0.75, -genD / 4]} material={materials.darkSteel}>
          <cylinderGeometry args={[0.1, 0.1, 1.1, 16]} />
        </mesh>
        {/* Lifting lugs */}
        {[-1, 1].map((sx) => (
          <Box
            key={sx}
            size={[0.16, 0.16, 0.05]}
            position={[sx * (genW / 2 - 0.3), genH + 0.2, 0]}
            material={materials.darkSteel}
          />
        ))}
      </group>

      {/* Air-handling units */}
      {[0, 1].map((i) => (
        <group key={i} position={[1.9 + i * 1.35, 0, i * 0.85 - 0.4]}>
          <Box
            size={[1.15, 1.9, 1.15]}
            position={[0, 0.95, 0]}
            material={materials.panel}
            radius={0.04}
          />
          <Box
            size={[1.19, 0.06, 1.19]}
            position={[0, 1.62, 0]}
            material={materials.darkSteel}
          />
          <mesh position={[0, 2.05, 0]} material={materials.darkSteel}>
            <cylinderGeometry args={[0.42, 0.42, 0.16, 20]} />
          </mesh>
          {/* Flexible duct */}
          <mesh position={[0, 2.42, 0]} material={materials.steel}>
            <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
          </mesh>
        </group>
      ))}

      {/* Cable drum */}
      <group position={[-0.2, 0.42, 1.9]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={materials.darkSteel}>
          <cylinderGeometry args={[0.42, 0.42, 0.5, 22]} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0, s * 0.28, 0]} material={materials.ply}>
            <cylinderGeometry args={[0.46, 0.46, 0.05, 22]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ 06 */

/**
 * 06 — General lighting.
 *
 * Deliberately generic fixture bodies on a truss goalpost. The brochure
 * documents no AV inventory, so nothing here implies owned audio, LED wall or
 * moving lights, whatever the concept boards showed.
 */
function Lighting() {
  const span = 6.4;
  const height = 3.8;

  return (
    <group>
      <TrussTower height={height} position={[-span / 2, 0, 0]} />
      <TrussTower height={height} position={[span / 2, 0, 0]} />
      <TrussSpan length={span + 0.36} position={[0, height, 0]} />

      {/* Floodlight bodies on yokes */}
      {[-2.3, -0.78, 0.78, 2.3].map((x) => (
        <group key={x} position={[x, height - 0.32, 0]}>
          <Box size={[0.045, 0.2, 0.045]} position={[0, 0.16, 0]} material={materials.darkSteel} />
          {/* Yoke */}
          {[-0.17, 0.17].map((oz) => (
            <Box key={oz} size={[0.035, 0.24, 0.035]} position={[0, 0.02, oz]} material={materials.darkSteel} />
          ))}
          <Box size={[0.3, 0.3, 0.28]} position={[0, -0.08, 0]} material={materials.darkSteel} radius={0.035} />
          {/* Lens */}
          <mesh position={[0, -0.24, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.lens}>
            <cylinderGeometry args={[0.11, 0.11, 0.02, 18]} />
          </mesh>
        </group>
      ))}

      {/* Distribution box and cable run */}
      <Box size={[0.5, 0.62, 0.3]} position={[span / 2 - 0.9, 0.31, 0.7]} material={materials.steel} radius={0.03} />
      <Box size={[span - 1.4, 0.07, 0.14]} position={[0, 0.035, 1.25]} material={materials.darkSteel} radius={0.03} />

      {/* Cable drum */}
      <group position={[-span / 2 + 0.9, 0.34, 1.1]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={materials.darkSteel}>
          <cylinderGeometry args={[0.34, 0.34, 0.42, 20]} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0, s * 0.24, 0]} material={materials.ply}>
            <cylinderGeometry args={[0.38, 0.38, 0.04, 20]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ 07 */

/** A road wheel with hub detail. */
function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh material={materials.rubber}>
        <cylinderGeometry args={[0.52, 0.52, 0.3, 24]} />
      </mesh>
      <mesh position={[0, 0.16, 0]} material={materials.steel}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 20]} />
      </mesh>
      <mesh position={[0, 0.185, 0]} material={materials.darkSteel}>
        <cylinderGeometry args={[0.09, 0.09, 0.03, 12]} />
      </mesh>
    </group>
  );
}

/**
 * 07 — Owned goods vehicle with palletised stock.
 *
 * A rigid box-body lorry, which is what actually moves this kind of inventory.
 * Unbranded and unmarked, per source-of-truth §8 — the fleet is real, the
 * livery is not ours to invent.
 */
function Logistics() {
  const bodyLength = 5.6;
  const bodyHeight = 2.5;
  const bodyWidth = 2.4;

  return (
    <group position={[0, 0, 0]}>
      {/* Chassis rails */}
      {[-0.62, 0.62].map((z) => (
        <Box
          key={z}
          size={[8.4, 0.22, 0.16]}
          position={[0.3, 0.78, z]}
          material={materials.darkSteel}
        />
      ))}

      {/* Cab */}
      <group position={[-3.1, 0, 0]}>
        <Box
          size={[1.95, 1.75, bodyWidth]}
          position={[0, 1.85, 0]}
          material={materials.paintedBody}
          radius={0.16}
        />
        {/* Raked windscreen */}
        <Box
          size={[0.12, 0.92, bodyWidth - 0.26]}
          position={[-0.92, 2.18, 0]}
          rotation={[0, 0, 0.16]}
          material={materials.glass}
          radius={0.03}
        />
        {/* Side glass */}
        {[-1, 1].map((sz) => (
          <Box
            key={sz}
            size={[0.85, 0.6, 0.05]}
            position={[0.15, 2.16, sz * (bodyWidth / 2 - 0.01)]}
            material={materials.glass}
            radius={0.02}
          />
        ))}
        {/* Bumper and grille */}
        <Box size={[0.24, 0.42, bodyWidth - 0.1]} position={[-1.02, 1.12, 0]} material={materials.darkSteel} radius={0.05} />
        <Box size={[0.1, 0.44, bodyWidth - 0.5]} position={[-0.99, 1.62, 0]} material={materials.darkSteel} radius={0.03} />
        {/* Headlamps */}
        {[-1, 1].map((sz) => (
          <Box
            key={sz}
            size={[0.08, 0.22, 0.34]}
            position={[-1.0, 1.36, sz * (bodyWidth / 2 - 0.34)]}
            material={materials.lens}
            radius={0.03}
          />
        ))}
        {/* Mirrors */}
        {[-1, 1].map((sz) => (
          <group key={sz} position={[-0.72, 2.32, sz * (bodyWidth / 2 + 0.12)]}>
            <Box size={[0.05, 0.42, 0.05]} material={materials.darkSteel} />
            <Box size={[0.06, 0.36, 0.16]} position={[0.02, -0.02, 0]} material={materials.darkSteel} radius={0.025} />
          </group>
        ))}
        {/* Steps */}
        <Box size={[0.4, 0.05, 0.5]} position={[-0.5, 0.86, bodyWidth / 2 - 0.2]} material={materials.steel} />
      </group>

      {/* Box body */}
      <group position={[1.3, 0, 0]}>
        <Box
          size={[bodyLength, bodyHeight, bodyWidth]}
          position={[0, 2.16, 0]}
          material={materials.paintedBody}
          radius={0.05}
        />
        {/* Body frame ribs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            size={[0.06, bodyHeight - 0.1, bodyWidth + 0.03]}
            position={[-bodyLength / 2 + 0.6 + i * 1.1, 2.16, 0]}
            material={materials.panel}
            radius={0.02}
          />
        ))}
        {/* Roller shutter at the rear */}
        <Box
          size={[0.06, bodyHeight - 0.24, bodyWidth - 0.14]}
          position={[bodyLength / 2 + 0.01, 2.16, 0]}
          material={materials.steel}
          radius={0.02}
        />
        {/* Underrun bar */}
        <Box size={[0.12, 0.16, bodyWidth - 0.3]} position={[bodyLength / 2 + 0.16, 0.62, 0]} material={materials.darkSteel} />
        {/* Mudflaps */}
        {[-1, 1].map((sz) => (
          <Box
            key={sz}
            size={[0.04, 0.36, 0.42]}
            position={[bodyLength / 2 - 0.9, 0.32, sz * (bodyWidth / 2 - 0.32)]}
            material={materials.rubber}
          />
        ))}
      </group>

      {/* Fuel tank */}
      <mesh position={[-1.5, 0.72, -bodyWidth / 2 + 0.06]} rotation={[0, 0, Math.PI / 2]} material={materials.steel}>
        <cylinderGeometry args={[0.3, 0.3, 1.1, 20]} />
      </mesh>

      {/* Wheels */}
      {[
        [-3.0, -1.24],
        [-3.0, 1.24],
        [1.05, -1.24],
        [1.05, 1.24],
        [2.35, -1.24],
        [2.35, 1.24],
      ].map(([x, z], i) => (
        <Wheel key={i} position={[x, 0.52, z]} />
      ))}

      {/* Palletised stock alongside */}
      {[0, 1].map((i) => (
        <group key={i} position={[-1.4 + i * 1.45, 0, 3.1]}>
          {/* Pallet */}
          <Box size={[1.2, 0.14, 1.0]} position={[0, 0.07, 0]} material={materials.ply} />
          {/* Stacked panels */}
          <Box size={[1.1, 0.75, 0.9]} position={[0, 0.52, 0]} material={materials.panel} radius={0.02} />
          {/* Strapping */}
          {[-0.3, 0.3].map((ox) => (
            <Box key={ox} size={[0.04, 0.79, 0.94]} position={[ox, 0.52, 0]} material={materials.darkSteel} />
          ))}
        </group>
      ))}

      {/* Stacked barricade sections */}
      <group position={[2.4, 0, 3.2]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Box
            key={i}
            size={[1.6, 0.07, 0.9]}
            position={[0, 0.12 + i * 0.1, 0]}
            rotation={[0, 0.06 * i, 0]}
            material={materials.steel}
            radius={0.02}
          />
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */

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
