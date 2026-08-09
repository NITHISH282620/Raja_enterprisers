"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useCanRenderWebGL } from "@/lib/clientState";

/**
 * Hero scene wrapper (plan §1, §F).
 *
 * The canvas is client-only and loads behind a composed poster frame, so the
 * hero is complete before — and without — WebGL. If the device can't or
 * shouldn't run it, the poster *is* the hero.
 */

const HangerCanvas = dynamic(
  () => import("./HangerCanvas").then((m) => m.HangerCanvas),
  { ssr: false, loading: () => null },
);

export function HangerScene() {
  // Only mounts the canvas where WebGL is available and the device has some
  // headroom. Elsewhere the poster frame stands as the finished hero.
  const enabled = useCanRenderWebGL();

  return (
    <div className="absolute inset-0">
      <PosterFrame />
      {enabled && <HangerCanvas />}
    </div>
  );
}

/**
 * Static composed frame: a perspective lattice echoing the truss rhythm and the
 * logo's line-scoring. Pure CSS, so it paints immediately and costs nothing.
 */
function PosterFrame() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-graphite">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(193,206,214,0.9) 0px, rgba(193,206,214,0.9) 1px, transparent 1px, transparent 34px)",
          maskImage:
            "radial-gradient(120% 90% at 50% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 40%, #000 20%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(193,206,214,0.9) 0px, rgba(193,206,214,0.9) 1px, transparent 1px, transparent 96px)",
          maskImage:
            "radial-gradient(100% 80% at 50% 45%, #000 10%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(100% 80% at 50% 45%, #000 10%, transparent 72%)",
        }}
      />
    </div>
  );
}
