import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Geometry for the stadium bowl.
 *
 * The reference is the photograph the client supplied
 * (public/media/projects/home4-hero-stadium.webp): a clear-span hanger erected
 * on the pitch of a covered stadium, seen from high in the stand with the roof
 * truss cutting across the top of frame. Everything in this file exists to
 * rebuild that frame as geometry rather than as a picture.
 *
 * The bowl is lofted, not assembled. Building a stand out of boxes at this
 * scale means tens of thousands of them; emitting the tread and riser quads
 * straight into one buffer gives the same silhouette in a few thousand
 * triangles and one draw call.
 */

export type Ring = {
  /** Ellipse radius along X. */
  a: number;
  /** Ellipse radius along Z. */
  b: number;
  y: number;
};

export function ellipsePoint(a: number, b: number, theta: number): [number, number] {
  return [a * Math.cos(theta), b * Math.sin(theta)];
}

/**
 * A raked seating deck: for every pair of adjacent rings, a horizontal tread
 * at the lower ring's height and a vertical riser up to the next.
 *
 * Rings are given inner-to-outer, which is also low-to-high — that is what a
 * stand is.
 */
export function rakedDeck(rings: Ring[], segments: number): THREE.BufferGeometry {
  const positions: number[] = [];

  const quad = (p: number[], q: number[], r: number[], s: number[]) =>
    positions.push(...p, ...q, ...r, ...p, ...r, ...s);

  for (let i = 0; i < rings.length - 1; i++) {
    const inner = rings[i];
    const outer = rings[i + 1];

    for (let j = 0; j < segments; j++) {
      const t0 = (j / segments) * Math.PI * 2;
      const t1 = ((j + 1) / segments) * Math.PI * 2;

      const [ax0, az0] = ellipsePoint(inner.a, inner.b, t0);
      const [ax1, az1] = ellipsePoint(inner.a, inner.b, t1);
      const [bx0, bz0] = ellipsePoint(outer.a, outer.b, t0);
      const [bx1, bz1] = ellipsePoint(outer.a, outer.b, t1);

      // Tread — walked on, at the inner ring's height.
      quad(
        [ax0, inner.y, az0],
        [bx0, inner.y, bz0],
        [bx1, inner.y, bz1],
        [ax1, inner.y, az1],
      );

      // Riser — the step up to the next row.
      quad(
        [bx0, inner.y, bz0],
        [bx0, outer.y, bz0],
        [bx1, outer.y, bz1],
        [bx1, inner.y, bz1],
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Ring of rows generated from a starting ellipse, a rake and a row count.
 * `going` is the tread depth, `rise` the step height — the two numbers that
 * decide whether a stand reads as steep or shallow.
 */
export function buildRows(
  a0: number,
  b0: number,
  y0: number,
  rows: number,
  going: number,
  rise: number,
): Ring[] {
  return Array.from({ length: rows + 1 }, (_, i) => ({
    a: a0 + i * going,
    b: b0 + i * going,
    y: y0 + i * rise,
  }));
}

/**
 * A closed surface between two rings — the roof membrane, and the flat apron
 * that closes the bottom of the bowl down to pitch level.
 */
export function ringSurface(
  inner: Ring,
  outer: Ring,
  segments: number,
): THREE.BufferGeometry {
  const positions: number[] = [];

  for (let j = 0; j < segments; j++) {
    const t0 = (j / segments) * Math.PI * 2;
    const t1 = ((j + 1) / segments) * Math.PI * 2;

    const [ax0, az0] = ellipsePoint(inner.a, inner.b, t0);
    const [ax1, az1] = ellipsePoint(inner.a, inner.b, t1);
    const [bx0, bz0] = ellipsePoint(outer.a, outer.b, t0);
    const [bx1, bz1] = ellipsePoint(outer.a, outer.b, t1);

    positions.push(
      ax0, inner.y, az0, bx0, outer.y, bz0, bx1, outer.y, bz1,
      ax0, inner.y, az0, bx1, outer.y, bz1, ax1, inner.y, az1,
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * One radial roof truss, lying along +X and centred on the origin, ready to be
 * rotated into place around the bowl. Two chords with zigzag webbing — the same
 * language as the hanger's own lattice, at stadium scale.
 */
export function roofTruss(length: number, depth: number): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const chord = 0.5;
  const half = depth / 2;

  for (const y of [-half, half]) {
    const bar = new THREE.BoxGeometry(length, chord, chord * 1.6);
    bar.translate(0, y, 0);
    parts.push(bar);
  }

  const panels = Math.max(4, Math.round(length / (depth * 1.4)));
  const step = length / panels;
  const webLength = Math.hypot(step, depth);
  const angle = Math.atan2(depth, step);

  for (let i = 0; i < panels; i++) {
    const x = -length / 2 + step * (i + 0.5);
    const web = new THREE.BoxGeometry(webLength, chord * 0.7, chord * 1.1);
    web.rotateZ(i % 2 === 0 ? angle : -angle);
    web.translate(x, 0, 0);
    parts.push(web);

    const post = new THREE.BoxGeometry(chord * 0.7, depth, chord * 1.1);
    post.translate(-length / 2 + step * i, 0, 0);
    parts.push(post);
  }

  return mergeGeometries(parts, false)!;
}

/**
 * Seat positions across a raked deck.
 *
 * Returned as matrices for a single instanced mesh. Seats are what give the
 * bowl its scale — an empty stand reads as a bare terrace, and the moment the
 * rows are populated the hanger on the pitch snaps into proportion.
 */
export function seatMatrices(
  rings: Ring[],
  seatsPerSegment: number,
  segments: number,
): THREE.Matrix4[] {
  const matrices: THREE.Matrix4[] = [];
  const dummy = new THREE.Object3D();
  const total = segments * seatsPerSegment;

  for (let i = 0; i < rings.length - 1; i++) {
    const ring = rings[i];
    const next = rings[i + 1];
    // Seat sits on the tread, back against the riser behind it.
    const a = ring.a + (next.a - ring.a) * 0.62;
    const b = ring.b + (next.b - ring.b) * 0.62;

    for (let j = 0; j < total; j++) {
      const theta = (j / total) * Math.PI * 2;
      const [x, z] = ellipsePoint(a, b, theta);
      dummy.position.set(x, ring.y, z);
      // Face the pitch. The ellipse's normal is not the radius, but at these
      // proportions the difference is under two degrees and invisible.
      dummy.rotation.set(0, Math.atan2(x, z) + Math.PI, 0);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());
    }
  }

  return matrices;
}

/** A stadium seat: tip-up shell on a bracket, merged to one geometry. */
export function stadiumSeatGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  const pan = new THREE.BoxGeometry(0.44, 0.06, 0.4);
  pan.translate(0, 0.42, 0);
  parts.push(pan);

  const back = new THREE.BoxGeometry(0.44, 0.44, 0.06);
  back.rotateX(-0.12);
  back.translate(0, 0.64, -0.19);
  parts.push(back);

  const bracket = new THREE.BoxGeometry(0.08, 0.42, 0.08);
  bracket.translate(0, 0.21, -0.16);
  parts.push(bracket);

  return mergeGeometries(parts, false)!;
}
