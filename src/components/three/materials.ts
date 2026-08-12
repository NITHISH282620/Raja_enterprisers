import * as THREE from "three";

/**
 * The shared material set. Every 3D asset draws from here so the catalogue
 * reads as one family (plan §3).
 *
 * Roughness is kept high throughout and metalness is honest — no chrome, no
 * mirror floors. These are working structures, not showroom props.
 */

export const materials = {
  /**
   * Mill-finish aluminium truss.
   *
   * Tuned against the Raja photographs (HMS4180-1, german_tent_raja): erected
   * hanger frames are dull site aluminium, not polished chrome. Metalness is
   * held well below 1 and roughness kept high, otherwise the frames go dark
   * against a bright sky and the whole structure reads as a black wireframe.
   */
  aluminium: new THREE.MeshStandardMaterial({
    color: "#cfd4d8",
    metalness: 0.45,
    roughness: 0.52,
  }),

  /** Anodised connector blocks, base plates and bolt collars — a shade darker. */
  fitting: new THREE.MeshStandardMaterial({
    color: "#9aa3ab",
    metalness: 0.55,
    roughness: 0.44,
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
    color: "#efedea",
    metalness: 0,
    roughness: 0.86,
    side: THREE.DoubleSide,
    emissive: new THREE.Color("#b9c9d4"),
    // Kept low deliberately. Higher values glow the roof planes up to the same
    // value as the sky behind them, and the structure stops reading as a solid
    // shell — it looks like a wireframe. The fabric needs to take shading.
    emissiveIntensity: 0.16,
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
    color: "#472623",
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

  /** Near-black structural steel — forklift pockets, deep recesses. */
  graphiteMat: new THREE.MeshStandardMaterial({
    color: "#1d2126",
    metalness: 0.35,
    roughness: 0.7,
  }),

  /** Tyres, mudflaps. Deep and matte — no sheen. */
  rubber: new THREE.MeshStandardMaterial({
    color: "#23262a",
    metalness: 0,
    roughness: 0.95,
  }),

  /**
   * Vehicle bodywork. Automotive paint is smoother than the industrial stock
   * around it, so it reads as a different class of object at a glance.
   */
  paintedBody: new THREE.MeshStandardMaterial({
    color: "#e9eaea",
    metalness: 0.15,
    roughness: 0.42,
  }),

  /** Glazing. Tinted rather than clear, so it holds form without refraction. */
  glass: new THREE.MeshStandardMaterial({
    color: "#3f4a53",
    metalness: 0.6,
    roughness: 0.12,
    transparent: true,
    opacity: 0.72,
  }),

  /** Lamp lenses. Unlit — nothing here claims to be switched on. */
  lens: new THREE.MeshStandardMaterial({
    color: "#c8d2d8",
    metalness: 0.25,
    roughness: 0.18,
  }),
} as const;

export type MaterialKey = keyof typeof materials;
