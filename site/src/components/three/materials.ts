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

  /**
   * PVC membrane.
   *
   * The sun is outside; we are looking at the inner face. A purely reflective
   * white would render the roof near-black from within, which is not how these
   * structures read in the reference photographs — the fabric transmits light
   * and glows. The emissive term stands in for that transmission.
   */
  membrane: new THREE.MeshStandardMaterial({
    color: "#eef0ef",
    metalness: 0,
    roughness: 0.92,
    side: THREE.DoubleSide,
    emissive: new THREE.Color("#b9c9d4"),
    emissiveIntensity: 0.55,
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

  /**
   * Synthetic carpet. Exhibition carpet genuinely is red — the reference
   * photographs confirm it — but muted here so it sits inside the restrained
   * palette instead of fighting the brand accent.
   */
  carpet: new THREE.MeshStandardMaterial({
    // Deliberately dark: the catalogue rig is bright, and anything lighter
    // tone-maps up into a pink that fights the neutral palette.
    color: "#5c2f2b",
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
