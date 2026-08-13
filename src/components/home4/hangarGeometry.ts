import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Clear-span hangar geometry, built to the reference photograph
 * (`public/media/projects/home3-stadium.png` — Raja hangers erected on a
 * stadium pitch).
 *
 * The important correction over the earlier model: **from outside, you do not
 * see the truss.** The membrane is the building. What reads in the photograph
 * is a clean white volume, a crisp eave line, a shallow gable, and a rhythm of
 * seams where the membrane panels meet at each bay. The earlier hangar showed
 * an exposed aluminium lattice, which is what the inside of the structure looks
 * like — correct engineering, wrong view.
 *
 * So this builds the envelope, and expresses the frame only where the frame is
 * genuinely visible: as the seam ribs standing slightly proud of the membrane,
 * and as the extrusion running along eave and ridge.
 *
 * Dimensions follow the catalogue's own product rather than a generic marquee:
 * a 30m clear span at 5m to the eave, 8.6m to the ridge, in 5m bays.
 */

export type HangarSpec = {
  /** Clear span, metres — wall to wall, no internal columns. */
  span: number;
  /** Number of 5m bays along the length. */
  bays: number;
  baySpacing: number;
  /** Height to the eave, where the wall meets the roof. */
  eave: number;
  /** Height to the ridge. */
  ridge: number;
};

export const mainHangar: HangarSpec = {
  span: 30,
  bays: 12,
  baySpacing: 5,
  eave: 5,
  ridge: 8.6,
};

export const secondHangar: HangarSpec = {
  span: 20,
  bays: 8,
  baySpacing: 5,
  eave: 4.4,
  ridge: 7.2,
};

const length = (s: HangarSpec) => s.bays * s.baySpacing;

/**
 * The membrane envelope: two roof planes, two side walls, two gable ends.
 *
 * Built as flat panels rather than an extruded solid because the membrane is
 * exactly that — sheet stretched over a frame, with no thickness worth
 * modelling at this camera distance.
 */
export function hangarShell(spec: HangarSpec): THREE.BufferGeometry {
  const { span, eave, ridge } = spec;
  const len = length(spec);
  const half = span / 2;
  const halfLen = len / 2;
  const rise = ridge - eave;
  const slope = Math.hypot(half, rise);
  const pitch = Math.atan2(rise, half);

  const parts: THREE.BufferGeometry[] = [];

  // ---- Roof: two planes meeting at the ridge --------------------------
  for (const side of [-1, 1]) {
    const plane = new THREE.PlaneGeometry(slope, len);
    plane.rotateX(-Math.PI / 2);
    plane.rotateZ(side * pitch);
    plane.translate((side * half) / 2, eave + rise / 2, 0);
    parts.push(plane);
  }

  // ---- Side walls: vertical, full length ------------------------------
  for (const side of [-1, 1]) {
    const wall = new THREE.PlaneGeometry(len, eave);
    wall.rotateY(side * (Math.PI / 2));
    wall.translate(side * half, eave / 2, 0);
    parts.push(wall);
  }

  // ---- Gable ends -----------------------------------------------------
  // Far end is closed. Near end carries the door opening, so it is built as a
  // shape with a hole rather than a plane — the opening is what gives the
  // structure a sense of enterable scale.
  const gable = (withDoor: boolean) => {
    const shape = new THREE.Shape();
    shape.moveTo(-half, 0);
    shape.lineTo(half, 0);
    shape.lineTo(half, eave);
    shape.lineTo(0, ridge);
    shape.lineTo(-half, eave);
    shape.closePath();

    if (withDoor) {
      const dw = 5.5;
      const dh = 4.2;
      const hole = new THREE.Path();
      hole.moveTo(-dw, 0);
      hole.lineTo(dw, 0);
      hole.lineTo(dw, dh);
      hole.lineTo(-dw, dh);
      hole.closePath();
      shape.holes.push(hole);
    }
    return new THREE.ShapeGeometry(shape);
  };

  const near = gable(true);
  near.translate(0, 0, halfLen);
  parts.push(near);

  const far = gable(false);
  far.rotateY(Math.PI);
  far.translate(0, 0, -halfLen);
  parts.push(far);

  return mergeGeometries(parts, false)!;
}

/**
 * Seam ribs.
 *
 * Where each bay's membrane panel meets the next, the frame beneath stands
 * slightly proud and casts a fine line. In the reference photograph this rhythm
 * is the single strongest cue that the structure is *modular and large* rather
 * than a smooth white shed — so it is worth the geometry.
 */
export function hangarRibs(spec: HangarSpec): THREE.BufferGeometry {
  const { span, eave, ridge, bays, baySpacing } = spec;
  const half = span / 2;
  const rise = ridge - eave;
  const slope = Math.hypot(half, rise);
  const pitch = Math.atan2(rise, half);
  const len = length(spec);
  const R = 0.05; // rib half-thickness — a seam line, not a beam

  const parts: THREE.BufferGeometry[] = [];

  for (let i = 0; i <= bays; i++) {
    const z = -len / 2 + i * baySpacing;

    // Over the roof, both slopes.
    for (const side of [-1, 1]) {
      const rib = new THREE.BoxGeometry(slope, R * 2, R * 2);
      rib.rotateZ(side * pitch);
      rib.translate((side * half) / 2, eave + rise / 2 + R, z);
      parts.push(rib);
    }
    // Down each wall.
    for (const side of [-1, 1]) {
      const rib = new THREE.BoxGeometry(R * 2, eave, R * 2);
      rib.translate(side * (half + R), eave / 2, z);
      parts.push(rib);
    }
  }

  // Eave extrusion — the horizontal line where wall meets roof. This is the
  // edge the eye actually reads the building's length along.
  for (const side of [-1, 1]) {
    const eaveBeam = new THREE.BoxGeometry(R * 2.6, R * 2.6, len);
    eaveBeam.translate(side * half, eave, 0);
    parts.push(eaveBeam);
  }

  // Ridge.
  const ridgeBeam = new THREE.BoxGeometry(R * 2.6, R * 2.6, len);
  ridgeBeam.translate(0, ridge, 0);
  parts.push(ridgeBeam);

  return mergeGeometries(parts, false)!;
}

/** Base plates where each frame leg meets the ground. Small, but they stop the
 *  structure from looking like it is resting on nothing. */
export function hangarFeet(spec: HangarSpec): THREE.BufferGeometry {
  const { span, bays, baySpacing } = spec;
  const half = span / 2;
  const len = length(spec);
  const parts: THREE.BufferGeometry[] = [];

  for (let i = 0; i <= bays; i++) {
    const z = -len / 2 + i * baySpacing;
    for (const side of [-1, 1]) {
      const plate = new THREE.BoxGeometry(0.5, 0.12, 0.5);
      plate.translate(side * half, 0.06, z);
      parts.push(plate);
    }
  }
  return mergeGeometries(parts, false)!;
}
