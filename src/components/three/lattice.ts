import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Geometry helpers for the German hanger.
 *
 * The real structures are lattice box-truss: parallel chords joined by zigzag
 * web bracing. Reference: brochure p.5 interior (o80) and the aerial on p.13
 * (o73), which show both the opaque and clear-span variants side by side.
 *
 * Everything is merged into a single BufferGeometry per frame so a whole
 * hanger is a handful of draw calls rather than several hundred.
 */

const CHORD = 0.07;

/**
 * A lattice beam running along +X, centred on the origin.
 * Four chords at the corners of a `depth` square section, with zigzag webs on
 * the two vertical faces.
 */
export function latticeBeam(length: number, depth = 0.34): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const half = depth / 2;

  // Four longitudinal chords.
  for (const y of [-half, half]) {
    for (const z of [-half, half]) {
      const chord = new THREE.BoxGeometry(length, CHORD, CHORD);
      chord.translate(0, y, z);
      parts.push(chord);
    }
  }

  // Zigzag web bracing on both vertical faces.
  const panel = depth * 1.15;
  const count = Math.max(2, Math.round(length / panel));
  const step = length / count;
  const webLength = Math.hypot(step, depth);
  const angle = Math.atan2(depth, step);

  for (let i = 0; i < count; i++) {
    const x = -length / 2 + step * (i + 0.5);
    const up = i % 2 === 0;
    for (const z of [-half, half]) {
      const web = new THREE.BoxGeometry(webLength, CHORD * 0.8, CHORD * 0.8);
      web.rotateZ(up ? angle : -angle);
      web.translate(x, 0, z);
      parts.push(web);
    }
  }

  // Vertical posts at each panel point, tying the chords together.
  for (let i = 0; i <= count; i++) {
    const x = -length / 2 + step * i;
    for (const z of [-half, half]) {
      const post = new THREE.BoxGeometry(CHORD * 0.8, depth, CHORD * 0.8);
      post.translate(x, 0, z);
      parts.push(post);
    }
  }

  return mergeGeometries(parts, false)!;
}

export type HangerSpec = {
  /** Clear span, metres. */
  span: number;
  /** Height to the eave. */
  eaveHeight: number;
  /** Height to the ridge. */
  ridgeHeight: number;
  depth: number;
};

export const defaultHanger: HangerSpec = {
  span: 25,
  eaveHeight: 4.2,
  ridgeHeight: 7.4,
  depth: 0.34,
};

/**
 * One portal frame — two legs and two rafters meeting at the ridge — lying in
 * the XY plane at z = 0, ready to be instanced along the hanger's length.
 */
export function portalFrame(spec: HangerSpec = defaultHanger): THREE.BufferGeometry {
  const { span, eaveHeight, ridgeHeight, depth } = spec;
  const halfSpan = span / 2;
  const parts: THREE.BufferGeometry[] = [];

  // Legs.
  for (const side of [-1, 1]) {
    const leg = latticeBeam(eaveHeight, depth);
    leg.rotateZ(Math.PI / 2);
    leg.translate(side * halfSpan, eaveHeight / 2, 0);
    parts.push(leg);
  }

  // Rafters, eave up to ridge.
  const rise = ridgeHeight - eaveHeight;
  const rafterLength = Math.hypot(halfSpan, rise);
  const pitch = Math.atan2(rise, halfSpan);

  for (const side of [-1, 1]) {
    const rafter = latticeBeam(rafterLength, depth);
    rafter.rotateZ(side === -1 ? pitch : -pitch);
    rafter.translate((side * halfSpan) / 2, eaveHeight + rise / 2, 0);
    parts.push(rafter);
  }

  return mergeGeometries(parts, false)!;
}

/**
 * The membrane skin: two roof planes and two side walls, as a single geometry.
 * Built from raw triangles so roof and wall share one draw call.
 */
export function membraneShell(
  spec: HangerSpec = defaultHanger,
  length: number,
): THREE.BufferGeometry {
  const { span, eaveHeight, ridgeHeight } = spec;
  const halfSpan = span / 2;
  const z0 = -length / 2;
  const z1 = length / 2;

  const quads: [number[], number[], number[], number[]][] = [
    // Roof, left slope.
    [
      [-halfSpan, eaveHeight, z0],
      [0, ridgeHeight, z0],
      [0, ridgeHeight, z1],
      [-halfSpan, eaveHeight, z1],
    ],
    // Roof, right slope.
    [
      [0, ridgeHeight, z0],
      [halfSpan, eaveHeight, z0],
      [halfSpan, eaveHeight, z1],
      [0, ridgeHeight, z1],
    ],
    // Left wall.
    [
      [-halfSpan, 0, z0],
      [-halfSpan, eaveHeight, z0],
      [-halfSpan, eaveHeight, z1],
      [-halfSpan, 0, z1],
    ],
    // Right wall.
    [
      [halfSpan, eaveHeight, z0],
      [halfSpan, 0, z0],
      [halfSpan, 0, z1],
      [halfSpan, eaveHeight, z1],
    ],
  ];

  const positions: number[] = [];
  for (const [a, b, c, d] of quads) {
    positions.push(...a, ...b, ...c, ...a, ...c, ...d);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * The gable end wall — rectangle up to the eave, gable triangle above.
 *
 * Only the far end is closed. Leaving both ends open read as a hole in the
 * scene rather than as a structure; closing the far end gives the interior a
 * terminus and makes the volume read as enclosed.
 */
export function gableEnd(spec: HangerSpec = defaultHanger): THREE.BufferGeometry {
  const { span, eaveHeight, ridgeHeight } = spec;
  const halfSpan = span / 2;

  const shape = new THREE.Shape();
  shape.moveTo(-halfSpan, 0);
  shape.lineTo(halfSpan, 0);
  shape.lineTo(halfSpan, eaveHeight);
  shape.lineTo(0, ridgeHeight);
  shape.lineTo(-halfSpan, eaveHeight);
  shape.closePath();

  return new THREE.ShapeGeometry(shape);
}
