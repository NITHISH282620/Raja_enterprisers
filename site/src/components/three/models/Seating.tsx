"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { materials } from "../materials";

/** One chair, merged to a single geometry so the block is one draw call. */
export function chairGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  const seat = new THREE.BoxGeometry(0.46, 0.05, 0.44);
  seat.translate(0, 0.45, 0);
  parts.push(seat);

  const back = new THREE.BoxGeometry(0.46, 0.5, 0.05);
  back.translate(0, 0.7, -0.2);
  parts.push(back);

  for (const x of [-0.19, 0.19]) {
    for (const z of [-0.17, 0.17]) {
      const leg = new THREE.BoxGeometry(0.035, 0.45, 0.035);
      leg.translate(x, 0.225, z);
      parts.push(leg);
    }
  }

  return mergeGeometries(parts, false)!;
}

/**
 * Seated audience block — 50,000 plastic and 5,000 cushioned chairs are real
 * stock (brochure p.4). Instanced: the whole block is one draw call.
 *
 * Its job in the hero is scale. An empty structure reads as a render; rows of
 * chairs give the span a human measure, the way the brochure photographs do.
 */
export function Seating({
  rows = 22,
  columns = 16,
  rowPitch = 0.85,
  columnPitch = 0.62,
  aisle = 1.6,
  ...props
}: {
  rows?: number;
  columns?: number;
  rowPitch?: number;
  columnPitch?: number;
  aisle?: number;
} & React.ComponentProps<"group">) {
  const geometry = useMemo(() => chairGeometry(), []);

  const matrices = useMemo(() => {
    const result: THREE.Matrix4[] = [];
    const halfColumns = columns / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        // Split the block either side of a central aisle.
        const side = c < halfColumns ? -1 : 1;
        const indexInSide = c < halfColumns ? halfColumns - 1 - c : c - halfColumns;
        const x = side * (aisle / 2 + (indexInSide + 0.5) * columnPitch);
        const z = -rows * rowPitch * 0.5 + r * rowPitch;

        result.push(new THREE.Matrix4().makeTranslation(x, 0, z));
      }
    }
    return result;
  }, [rows, columns, rowPitch, columnPitch, aisle]);

  return (
    <group {...props}>
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
    </group>
  );
}
