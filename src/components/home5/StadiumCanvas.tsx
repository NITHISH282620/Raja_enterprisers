"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Hanger } from "@/components/three/models/Hanger";
import { materials } from "@/components/three/materials";
import type { HangerSpec } from "@/components/three/lattice";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCoarsePointer, useMediaQuery } from "@/lib/clientState";
import { cloudField, cloudTexture, skyTexture } from "@/components/proto/sky";
import {
  buildRows,
  ellipsePoint,
  rakedDeck,
  ringSurface,
  roofTruss,
  seatMatrices,
  stadiumSeatGeometry,
  type Ring,
} from "./stadiumGeometry";

/**
 * /home5 — the stadium bowl.
 *
 * This is the client's own photograph rebuilt as a scene: a covered stadium,
 * empty tiers, and a Raja clear-span hanger erected across the pitch. The
 * camera sits where the photographer sat — high in the near stand, under the
 * roof, so the truss cuts across the top of frame and the structure below is
 * read against forty thousand empty seats.
 *
 * The argument the frame is making is scale. A hanger photographed on open
 * ground has nothing to be measured against; put it inside a stadium and the
 * span states itself.
 */

/** The bowl, in metres. Proportioned off a 105 × 68 pitch. */
const LOWER_START: Ring = { a: 62, b: 45, y: 1.4 };
const UPPER_START: Ring = { a: 82, b: 65, y: 10.2 };

const ROOF_INNER: Ring = { a: 68, b: 50, y: 31 };
const ROOF_OUTER: Ring = { a: 108, b: 92, y: 36.5 };

/** Camera. Start high in the near stand; scroll walks it down toward the rail. */
const CAM_START = new THREE.Vector3(30, 28, 78);
const CAM_END = new THREE.Vector3(16, 17, 58);
const LOOK_START = new THREE.Vector3(0, 3, -10);
const LOOK_END = new THREE.Vector3(-2, 2, -14);

/** The hanger on the pitch — a genuinely large one, at catalogue proportions. */
const pitchHanger: HangerSpec = {
  span: 30,
  eaveHeight: 5.4,
  ridgeHeight: 9.6,
  depth: 0.5,
};

function Bowl({ quality }: { quality: "high" | "low" }) {
  const low = quality === "low";
  const segments = low ? 64 : 128;
  const seatsPerSegment = low ? 2 : 4;

  const { lowerRings, upperRings, concourse, apron } = useMemo(() => {
    const lower = buildRows(LOWER_START.a, LOWER_START.b, LOWER_START.y, low ? 10 : 16, 0.92, 0.46);
    const upper = buildRows(UPPER_START.a, UPPER_START.b, UPPER_START.y, low ? 12 : 20, 0.95, 0.62);
    const last = lower[lower.length - 1];
    return {
      lowerRings: lower,
      upperRings: upper,
      // The walkway between the two tiers, and the flat apron running from the
      // front row down to pitch level.
      concourse: [last, { a: UPPER_START.a, b: UPPER_START.b, y: UPPER_START.y }] as [Ring, Ring],
      apron: [
        { a: 52, b: 37, y: 0 },
        { a: LOWER_START.a, b: LOWER_START.b, y: LOWER_START.y },
      ] as [Ring, Ring],
    };
  }, [low]);

  const lowerDeck = useMemo(() => rakedDeck(lowerRings, segments), [lowerRings, segments]);
  const upperDeck = useMemo(() => rakedDeck(upperRings, segments), [upperRings, segments]);
  const concourseDeck = useMemo(
    () => ringSurface(concourse[0], concourse[1], segments),
    [concourse, segments],
  );
  const apronDeck = useMemo(() => ringSurface(apron[0], apron[1], segments), [apron, segments]);

  const seatGeometry = useMemo(() => stadiumSeatGeometry(), []);
  const lowerSeats = useMemo(
    () => seatMatrices(lowerRings, seatsPerSegment, segments),
    [lowerRings, seatsPerSegment, segments],
  );
  const upperSeats = useMemo(
    () => seatMatrices(upperRings, seatsPerSegment, segments),
    [upperRings, seatsPerSegment, segments],
  );

  return (
    <group>
      <mesh geometry={apronDeck} material={materials.darkSteel} />
      <mesh geometry={lowerDeck} material={materials.steel} />
      <mesh geometry={concourseDeck} material={materials.darkSteel} />
      <mesh geometry={upperDeck} material={materials.steel} />

      <instancedMesh
        args={[seatGeometry, materials.seat, lowerSeats.length]}
        ref={(mesh) => {
          if (!mesh) return;
          lowerSeats.forEach((m, i) => mesh.setMatrixAt(i, m));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />
      <instancedMesh
        args={[seatGeometry, materials.seat, upperSeats.length]}
        ref={(mesh) => {
          if (!mesh) return;
          upperSeats.forEach((m, i) => mesh.setMatrixAt(i, m));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />
    </group>
  );
}

/**
 * The roof: radial trusses spanning the stand, and a translucent deck over
 * them. In the reference the roof is the darkest thing in frame and the sky
 * the brightest, and that contrast is most of what gives the photograph its
 * depth — so the trusses stay in dark steel rather than the bowl's grey.
 */
function Roof({ quality }: { quality: "high" | "low" }) {
  const count = quality === "low" ? 28 : 56;

  const trussGeometry = useMemo(() => roofTruss(1, 2.2), []);
  const deck = useMemo(() => ringSurface(ROOF_INNER, ROOF_OUTER, quality === "low" ? 64 : 128), [quality]);

  const matrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    return Array.from({ length: count }, (_, i) => {
      const theta = (i / count) * Math.PI * 2;
      const [ix, iz] = ellipsePoint(ROOF_INNER.a, ROOF_INNER.b, theta);
      const [ox, oz] = ellipsePoint(ROOF_OUTER.a, ROOF_OUTER.b, theta);

      const inner = new THREE.Vector3(ix, ROOF_INNER.y, iz);
      const outer = new THREE.Vector3(ox, ROOF_OUTER.y, oz);
      const span = inner.distanceTo(outer);

      dummy.position.copy(inner).lerp(outer, 0.5);
      // The truss is authored along +X, so aiming it is one lookAt plus a
      // quarter turn to bring its length axis onto the line.
      dummy.lookAt(outer);
      dummy.rotateY(Math.PI / 2);
      dummy.scale.set(span, 1, 1);
      dummy.updateMatrix();
      return dummy.matrix.clone();
    });
  }, [count]);

  return (
    <group>
      <instancedMesh
        args={[trussGeometry, materials.darkSteel, matrices.length]}
        ref={(mesh) => {
          if (!mesh) return;
          matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />
      <mesh geometry={deck} position={[0, 2.6, 0]}>
        <meshStandardMaterial
          color="#c9d3da"
          roughness={0.72}
          metalness={0.1}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

/** Floodlight masts along the far rim, above the roofline. */
function Masts() {
  const positions = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const theta = (i / 14) * Math.PI * 2;
      const [x, z] = ellipsePoint(ROOF_OUTER.a * 0.98, ROOF_OUTER.b * 0.98, theta);
      return [x, z] as const;
    });
  }, []);

  return (
    <group>
      {positions.map(([x, z], i) => (
        <group key={i} position={[x, ROOF_OUTER.y, z]} rotation={[0, Math.atan2(x, z), 0]}>
          <mesh position={[0, 4, 0]} material={materials.steel}>
            <cylinderGeometry args={[0.22, 0.3, 8, 8]} />
          </mesh>
          <mesh position={[0, 8.6, 0.4]} rotation={[0.3, 0, 0]} material={materials.fitting}>
            <boxGeometry args={[3.4, 1.1, 0.35]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Sky() {
  const sky = useMemo(() => skyTexture(), []);
  const cloud = useMemo(() => cloudTexture(), []);
  const clouds = useMemo(() => cloudField(16, 420, 120), []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[900, 32, 20]} />
        <meshBasicMaterial map={sky} side={THREE.BackSide} fog={false} depthWrite={false} />
      </mesh>

      {clouds.map((c, i) => (
        <mesh
          key={i}
          position={c.position}
          rotation={[0, Math.atan2(c.position[0], c.position[2]), 0]}
          scale={[c.scale, c.scale * 0.55, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={cloud}
            transparent
            opacity={0.85}
            depthWrite={false}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const position = useRef(CAM_START.clone());
  const look = useRef(LOOK_START.clone());

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = reduced ? 0.12 : progress.current;

    const target = CAM_START.clone().lerp(CAM_END, t);
    if (!reduced) {
      // A slow hand-held drift, so a still frame is never quite still.
      const clock = state.clock.elapsedTime;
      target.x += Math.sin(clock * 0.13) * 0.9;
      target.y += Math.sin(clock * 0.09) * 0.4;
    }

    const lookTarget = LOOK_START.clone().lerp(LOOK_END, t);

    const lambda = reduced ? 40 : 3.2;
    const k = 1 - Math.exp(-lambda * d);
    position.current.lerp(target, k);
    look.current.lerp(lookTarget, k);

    camera.position.copy(position.current);
    camera.lookAt(look.current);
  });

  return null;
}

function Scene({
  progress,
  quality,
}: {
  progress: React.RefObject<number>;
  quality: "high" | "low";
}) {
  return (
    <>
      <Sky />

      {/* Overcast-bright key, matching the reference plate: high sun, strong
          sky fill, and a cool bounce off the concrete. */}
      <hemisphereLight args={["#dceaf6", "#6c777f", 2.2]} />
      <directionalLight position={[120, 180, 90]} intensity={2.4} color="#fff4e4" />
      <directionalLight position={[-140, 90, -60]} intensity={0.6} color="#a9c3d8" />

      {/* Pitch and the hard deck the structure is erected on. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[128, 92]} />
        <meshStandardMaterial color="#4f6b43" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -6]}>
        <planeGeometry args={[104, 66]} />
        <meshStandardMaterial color="#8d9199" roughness={0.96} />
      </mesh>

      <Bowl quality={quality} />
      <Roof quality={quality} />
      <Masts />

      {/* Two hangers set side by side across the pitch, sharing a valley —
          the arrangement in the client's photograph. */}
      <group rotation={[0, Math.PI / 2, 0]} position={[0, 0, -6]}>
        <Hanger
          spec={pitchHanger}
          bays={quality === "low" ? 8 : 14}
          baySpacing={5}
          position={[-15, 0, 0]}
          showFloor={false}
        />
        <Hanger
          spec={pitchHanger}
          bays={quality === "low" ? 8 : 14}
          baySpacing={5}
          position={[15, 0, 0]}
          showFloor={false}
        />
      </group>

      {quality === "high" && (
        <ContactShadows
          position={[0, 0.08, -6]}
          scale={140}
          resolution={1024}
          blur={2.4}
          opacity={0.42}
          far={16}
          frames={1}
        />
      )}

      <Rig progress={progress} />
    </>
  );
}

export function StadiumCanvas({ progress, active }: {
  progress: React.RefObject<number>;
  active: boolean;
}) {
  const narrow = useMediaQuery("(max-width: 900px)", false);
  const coarse = useCoarsePointer();
  const quality: "high" | "low" = narrow || coarse ? "low" : "high";

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={quality === "low" ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, near: 0.5, far: 2000, position: CAM_START.toArray() }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
    >
      <Scene progress={progress} quality={quality} />
    </Canvas>
  );
}
