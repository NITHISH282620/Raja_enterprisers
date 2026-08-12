"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { materials } from "../materials";
import {
  defaultHanger,
  frameFittings,
  gableEnd,
  membraneShell,
  portalFrame,
  type HangerSpec,
} from "../lattice";

/**
 * Imported aluminium German hanger — 5 Lakh Sft in stock (brochure p.4).
 *
 * Portal frames on a fixed bay spacing, purlins running the length, PVC
 * membrane over roof and walls. Proportions follow the brochure photographs:
 * clear span, vertical side walls, shallow-pitch gable.
 *
 * The frame is instanced, so bay count is nearly free — which is what lets the
 * hero run the camera down a long structure at 60fps.
 */
export function Hanger({
  bays = 9,
  baySpacing = 5,
  spec = defaultHanger,
  showMembrane = true,
  showFloor = true,
  ...props
}: {
  bays?: number;
  baySpacing?: number;
  spec?: HangerSpec;
  showMembrane?: boolean;
  showFloor?: boolean;
} & React.ComponentProps<"group">) {
  const length = bays * baySpacing;

  const frameGeometry = useMemo(() => portalFrame(spec), [spec]);
  const membraneGeometry = useMemo(
    () => membraneShell(spec, length, bays),
    [spec, length, bays],
  );
  const gableGeometry = useMemo(() => gableEnd(spec), [spec]);
  const fittingGeometry = useMemo(() => frameFittings(spec), [spec]);

  const frameMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    for (let i = 0; i <= bays; i++) {
      const z = -length / 2 + i * baySpacing;
      matrices.push(new THREE.Matrix4().makeTranslation(0, 0, z));
    }
    return matrices;
  }, [bays, baySpacing, length]);

  // Purlins tie the frames together along the roof slopes and eaves.
  const purlins = useMemo(() => {
    const { span, eaveHeight, ridgeHeight } = spec;
    const halfSpan = span / 2;
    const rows: { position: [number, number, number]; rotation: [number, number, number] }[] = [];
    const rise = ridgeHeight - eaveHeight;
    const pitch = Math.atan2(rise, halfSpan);

    for (const side of [-1, 1]) {
      // Eave purlin.
      rows.push({ position: [side * halfSpan, eaveHeight, 0], rotation: [0, 0, 0] });
      // Two intermediate purlins up each roof slope.
      for (const t of [0.36, 0.72]) {
        rows.push({
          position: [side * halfSpan * (1 - t), eaveHeight + rise * t, 0],
          rotation: [0, 0, side === -1 ? pitch : -pitch],
        });
      }
    }
    // Ridge purlin.
    rows.push({ position: [0, ridgeHeight, 0], rotation: [0, 0, 0] });
    return rows;
  }, [spec]);

  return (
    <group {...props}>
      {/* Portal frames */}
      <instancedMesh
        args={[frameGeometry, materials.aluminium, frameMatrices.length]}
        castShadow
        receiveShadow
        ref={(mesh) => {
          if (!mesh) return;
          frameMatrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />

      {/* Base plates, knee braces and eave brackets — one instanced draw call. */}
      <instancedMesh
        args={[fittingGeometry, materials.fitting, frameMatrices.length]}
        castShadow
        receiveShadow
        ref={(mesh) => {
          if (!mesh) return;
          frameMatrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />

      {/* Purlins */}
      {purlins.map((purlin, i) => (
        <mesh
          key={i}
          position={purlin.position}
          rotation={purlin.rotation}
          castShadow
          material={materials.aluminium}
        >
          <boxGeometry args={[0.1, 0.1, length]} />
        </mesh>
      ))}

      {showMembrane && (
        <>
          <mesh geometry={membraneGeometry} material={materials.membrane} receiveShadow />
          {/* Far end only — the near end stays open for the camera. */}
          <mesh
            geometry={gableGeometry}
            material={materials.membrane}
            position={[0, 0, -length / 2]}
            receiveShadow
          />
        </>
      )}

      {showFloor && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
          material={materials.interiorFloor}
        >
          <planeGeometry args={[spec.span, length]} />
        </mesh>
      )}
    </group>
  );
}
