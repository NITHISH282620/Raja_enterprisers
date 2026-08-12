"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hanger } from "@/components/three/models/Hanger";
import { Seating } from "@/components/three/models/Seating";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCanRenderWebGL, useCoarsePointer, useMediaQuery } from "@/lib/clientState";

/**
 * The hero structure — an imported German hanger, live, composited over a real
 * Raja photograph rather than floating on a blank gradient.
 *
 * The canvas is transparent: the photograph behind it supplies sky, ground and
 * context, and the geometry only has to supply the structure and the camera.
 * That is what makes the two layers read as one scene instead of a render
 * pasted on a picture.
 *
 * Motion is a single continuous drone approach — establish, dolly, descend,
 * enter, settle — landing on the raja_1 resting composition and then handing
 * over to a scroll-linked drift. Any scroll input during the approach cuts it
 * short and eases to the resting frame, because a reviewer who has started
 * reading should never be fighting the camera.
 */

/** The five beats, in camera space. The last is the raja_1 resting frame. */
const BEATS = [
  { pos: new THREE.Vector3(-64, 34, 104), target: new THREE.Vector3(10, 7, -10) }, // establish
  { pos: new THREE.Vector3(-50, 22, 74), target: new THREE.Vector3(11, 6, -12) }, // approach
  { pos: new THREE.Vector3(-38, 12, 52), target: new THREE.Vector3(12, 5.2, -14) }, // descend
  { pos: new THREE.Vector3(-31, 6.4, 40), target: new THREE.Vector3(13, 5.4, -16) }, // enter
  { pos: new THREE.Vector3(-27, 4.6, 34), target: new THREE.Vector3(13, 5.2, -18) }, // rest
];

const REST = BEATS[BEATS.length - 1];
/** Where the scroll-linked drift ends, past the resting frame. */
const SCROLL_END = new THREE.Vector3(-21, 4.0, 25);
const INTRO_SECONDS = 8.4;

/** Cubic ease-out: velocity peaks early and decays, so the move arrives. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function samplePath(t: number, pos: THREE.Vector3, target: THREE.Vector3) {
  const span = BEATS.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * span;
  const i = Math.min(Math.floor(scaled), span - 1);
  const f = scaled - i;
  // Smoothstep within each leg so beat joins are not felt as corners.
  const s = f * f * (3 - 2 * f);
  pos.copy(BEATS[i].pos).lerp(BEATS[i + 1].pos, s);
  target.copy(BEATS[i].target).lerp(BEATS[i + 1].target, s);
}

function Rig({
  scroll,
  onIntroDone,
}: {
  scroll: React.RefObject<number>;
  onIntroDone: () => void;
}) {
  const { camera } = useThree();
  const reduced = useReducedMotion();

  const intro = useRef(0);
  const skipped = useRef(false);
  const settle = useRef(0); // 0..1 blend from intro path to scroll control
  const pos = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const smoothPos = useRef(BEATS[0].pos.clone());
  const smoothTarget = useRef(BEATS[0].target.clone());
  const parked = useRef(false);
  const done = useRef(false);

  // A scroll during the approach means the reviewer is reading — cut it short.
  useEffect(() => {
    const skip = () => {
      if (intro.current < 1) skipped.current = true;
    };
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp so a dropped frame is not a jump

    // Reduced motion parks the camera at the resting frame — no fly-through.
    if (reduced && !parked.current) {
      parked.current = true;
      intro.current = 1;
      settle.current = 1;
      smoothPos.current.copy(REST.pos);
      smoothTarget.current.copy(REST.target);
    }

    if (settle.current < 1) {
      // Skipping accelerates the remaining path rather than cutting to it.
      const rate = skipped.current ? 3.2 : 1 / INTRO_SECONDS;
      intro.current = Math.min(intro.current + d * rate, 1);
      samplePath(easeOut(intro.current), pos.current, target.current);
      if (intro.current >= 1) {
        settle.current = Math.min(settle.current + d * 1.6, 1);
        if (!done.current) {
          done.current = true;
          onIntroDone();
        }
      }
    }

    if (settle.current >= 1) {
      // Scroll-linked drift: a slow push past the resting frame.
      pos.current.copy(REST.pos).lerp(SCROLL_END, scroll.current);
      target.current.copy(REST.target);
      if (!reduced) {
        const t = state.clock.elapsedTime;
        pos.current.x += Math.sin(t * 0.11) * 0.5;
        pos.current.y += Math.sin(t * 0.08) * 0.2;
      }
    }

    // Critically damped follow — removes any residual stepping.
    const lambda = reduced ? 40 : 3.6;
    smoothPos.current.lerp(pos.current, 1 - Math.exp(-lambda * d));
    smoothTarget.current.lerp(target.current, 1 - Math.exp(-lambda * d));
    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothTarget.current);
  });

  return null;
}

function Scene({
  scroll,
  quality,
  onIntroDone,
}: {
  scroll: React.RefObject<number>;
  quality: "high" | "low";
  onIntroDone: () => void;
}) {
  const low = quality === "low";

  return (
    <>
      {/* Overcast key matched to the photograph: bright, soft, high sun. */}
      <hemisphereLight args={["#ffffff", "#b9c6d2", 2.4]} />
      <directionalLight
        position={[30, 42, 22]}
        intensity={2.6}
        color="#fff6e9"
        castShadow={!low}
        shadow-mapSize={low ? [512, 512] : [2048, 2048]}
        shadow-camera-left={-46}
        shadow-camera-right={46}
        shadow-camera-top={46}
        shadow-camera-bottom={-46}
        shadow-camera-far={160}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-26, 14, -30]} intensity={0.75} color="#aebfcd" />

      {/* Grounding shadow only — no ground plane, the photograph is the ground. */}
      {!low && (
        <ContactShadows
          position={[0, 0.02, -6]}
          scale={120}
          resolution={1024}
          blur={2.2}
          opacity={0.38}
          far={22}
          frames={1}
        />
      )}

      <Hanger bays={low ? 6 : 10} baySpacing={5} position={[0, 0, -6]} showFloor={false} />
      <Seating position={[0, 0, -12]} rows={low ? 12 : 22} columns={low ? 12 : 18} />

      {/*
        There is deliberately no second structure. Over a blank gradient a
        distant hanger added depth; over a photograph it has no ground to stand
        on and reads as floating in the sky. The plate supplies the depth now.
      */}

      <Rig scroll={scroll} onIntroDone={onIntroDone} />
    </>
  );
}

export function HeroHangerCanvas() {
  const scroll = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [, setIntroDone] = useState(false);

  // Read as external stores rather than effect-and-setState, so there is no
  // cascading render and the server snapshot is explicit.
  const canRender = useCanRenderWebGL();
  const narrow = useMediaQuery("(max-width: 900px)", false);
  const coarse = useCoarsePointer();
  const quality: "high" | "low" = narrow || coarse ? "low" : "high";

  useEffect(() => {
    const onScroll = () => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      scroll.current = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // No WebGL, or too few cores — the photograph stands alone.
  if (!canRender) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-10" aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        shadows={quality === "high"}
        dpr={quality === "low" ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 38, near: 0.1, far: 400, position: BEATS[0].pos.toArray() }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.setClearAlpha(0);
        }}
      >
        <Scene
          scroll={scroll}
          quality={quality}
          onIntroDone={() => setIntroDone(true)}
        />
      </Canvas>
    </div>
  );
}
