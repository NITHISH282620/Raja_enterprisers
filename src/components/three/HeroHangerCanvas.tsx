"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hanger } from "@/components/three/models/Hanger";
import { Seating } from "@/components/three/models/Seating";
import { defaultHanger } from "@/components/three/lattice";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The hero structure: an imported German hanger, live, rather than a stock
 * photograph of somebody else's building.
 *
 * Composition follows the approved board (raja_1.jpeg) — the structure sits
 * right of centre, seen from outside on a three-quarter view so both the long
 * elevation and the open gable read at once, on a pale ground that the copy
 * overlay can sit on at the left.
 *
 * Motion is two things and no more: a very slow lateral drift so the frame is
 * alive at rest, and a scroll-linked dolly so leaving the hero feels like
 * walking away from a structure rather than scrolling past a picture. Both
 * stop under prefers-reduced-motion.
 */

/** Sky. Deep enough that a white PVC membrane has something to read against. */
const SKY = "#dfe7ee";

/**
 * Camera path.
 *
 * The structure is 25m across the span, 7.4m to the ridge and 45m long, sitting
 * centred on z = -6 — so it occupies z ∈ [-28.5, 16.5] and x ∈ [-12.5, 12.5].
 * Every camera position below has to stay outside that box or the shot ends up
 * under the roof looking at bare truss, which reads as scaffolding.
 *
 * The shot is deliberately close and low, the way the approved board frames its
 * structure: the near corner is only about ten metres off the lens, so the
 * flank rakes away hard and the structure is cropped by the frame rather than
 * sitting inside it as an object. Far enough back and it reads as a model.
 */
const START = new THREE.Vector3(-24, 10.8, 27);
const END = new THREE.Vector3(-18, 8.6, 19);
/** Aimed down the length and right of the copy column, so the structure fills
 *  the right of the frame and the left stays clear for type. */
const TARGET = new THREE.Vector3(3, 3.4, -20);

function Rig({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const eased = useRef(0);
  const position = useRef(START.clone());

  useFrame((state, delta) => {
    // Reduced motion parks the camera at a fixed, well-composed frame.
    const target = reduced ? 0.12 : progress.current;
    eased.current = THREE.MathUtils.damp(eased.current, target, 3.4, delta);

    const next = START.clone().lerp(END, eased.current);

    if (!reduced) {
      // Slow lateral breath. Amplitude is under a metre — felt, not watched.
      const t = state.clock.elapsedTime;
      next.x += Math.sin(t * 0.13) * 0.75;
      next.y += Math.sin(t * 0.09) * 0.28;
    }

    position.current.lerp(next, 1 - Math.pow(0.001, delta));
    camera.position.copy(position.current);
    camera.lookAt(TARGET);
  });

  return null;
}

function Scene({ progress }: { progress: React.RefObject<number> }) {
  const { span } = defaultHanger;

  return (
    <>
      {/* Haze pulled in close. It is what separates the near frames from the
          far ones and stops the long elevation reading as a flat white band. */}
      <fog attach="fog" args={[SKY, 26, 118]} />

      {/* Overcast key: bright, soft, directional enough to model the truss. */}
      <hemisphereLight args={["#ffffff", "#c8d4de", 2.6]} />
      <directionalLight
        position={[26, 34, 18]}
        intensity={3.1}
        color="#fffaf3"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-46}
        shadow-camera-right={46}
        shadow-camera-top={46}
        shadow-camera-bottom={-46}
        shadow-camera-far={150}
        shadow-bias={-0.0004}
      />
      {/* Cool bounce from the far side so the shaded elevation is not dead. */}
      <directionalLight position={[-24, 12, -30]} intensity={0.9} color="#aebfcd" />

      {/* Ground. A shade under the sky so a horizon exists — without it the
          structure floats in white and stops reading as something built. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[520, 520]} />
        <meshStandardMaterial color="#c4d0dc" roughness={1} metalness={0} />
      </mesh>

      {/* Occlusion under the structure. This is what actually sets it down on
          the ground; the directional shadow alone is too soft at this angle. */}
      <ContactShadows
        position={[0, 0.02, -6]}
        scale={120}
        resolution={1024}
        blur={1.8}
        opacity={0.78}
        far={22}
        frames={1}
      />

      {/* The hero structure. Nine bays is enough for the frames to read as
          rhythm down the flank without pushing the far end into the fog. */}
      <Hanger bays={9} baySpacing={5} position={[0, 0, -6]} />
      {/* Seating inside, visible through the open near gable. Its job is scale:
          an empty shell reads as a render, chairs give the span a human measure. */}
      <Seating position={[0, 0, -10]} rows={26} columns={20} />

      {/* A second, smaller structure set back and across, for depth. The
          catalogue's aerial shows exactly this pairing on site. */}
      <Hanger
        bays={6}
        baySpacing={4.6}
        position={[span + 20, 0, -40]}
        rotation={[0, Math.PI / 2, 0]}
        showFloor={false}
      />

      <Rig progress={progress} />
    </>
  );
}

export function HeroHangerCanvas() {
  const progress = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = rect.height || 1;
      progress.current = Math.min(Math.max(-rect.top / travel, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Stop rendering entirely once the hero is off screen.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 38, near: 0.1, far: 320, position: START.toArray() }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
          scene.background = new THREE.Color(SKY);
        }}
      >
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
