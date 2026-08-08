import * as THREE from "three";

/**
 * The shared material set. Every 3D asset draws from here so the catalogue
 * reads as one family (plan §3).
 *
 * Roughness is kept high throughout and metalness is honest — no chrome, no
 * mirror floors. These are working structures, not showroom props.
 */

export const materials = {
  /** Mill-finish aluminium truss. */
  aluminium: new THREE.MeshStandardMaterial({
    color: "#b9c0c6",
    metalness: 0.82,
    roughness: 0.38,
  }),

  /** PVC membrane. Slightly translucent so daylight reads through the roof. */
  membrane: new THREE.MeshStandardMaterial({
    color: "#eef0ef",
    metalness: 0,
    roughness: 0.92,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.94,
  }),

  /** Powder-coated steel — barricading, frames, plant. */
  steel: new THREE.MeshStandardMaterial({
    color: "#6d757c",
    metalness: 0.55,
    roughness: 0.55,
  }),

  /** Dark steel — stage skirts, flight cases, decking edges. */
  darkSteel: new THREE.MeshStandardMaterial({
    color: "#2a3037",
    metalness: 0.4,
    roughness: 0.62,
  }),

  /** Plywood platform decking. */
  ply: new THREE.MeshStandardMaterial({
    color: "#c2a781",
    metalness: 0,
    roughness: 0.85,
  }),

  /** Synthetic carpet. */
  carpet: new THREE.MeshStandardMaterial({
    color: "#8d2f33",
    metalness: 0,
    roughness: 0.98,
  }),

  /** Stall panel infill. */
  panel: new THREE.MeshStandardMaterial({
    color: "#e8e8e4",
    metalness: 0,
    roughness: 0.8,
  }),

  /** Neutral ground sweep for catalogue assets. */
  ground: new THREE.MeshStandardMaterial({
    color: "#f1f1ee",
    metalness: 0,
    roughness: 1,
  }),

  /** Interior floor under the hero hanger. */
  interiorFloor: new THREE.MeshStandardMaterial({
    color: "#3a4046",
    metalness: 0,
    roughness: 0.95,
  }),

  /** Seating shell. */
  seat: new THREE.MeshStandardMaterial({
    color: "#dedbd4",
    metalness: 0,
    roughness: 0.75,
  }),
} as const;

export type MaterialKey = keyof typeof materials;
