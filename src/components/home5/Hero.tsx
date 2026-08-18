"use client";

import dynamic from "next/dynamic";
import { HeroCopy } from "@/components/proto/HeroCopy";
import { useHeroProgress } from "@/components/proto/heroRuntime";
import { useCanRenderWebGL } from "@/lib/clientState";

/**
 * /home5 — hero study 01: the stadium bowl.
 *
 * The canvas is loaded client-side behind a composed poster frame, so the hero
 * is a finished thing before WebGL arrives and stays finished on a device that
 * cannot run it. That is the same contract every hero on this site keeps.
 */

const StadiumCanvas = dynamic(
  () => import("./StadiumCanvas").then((m) => m.StadiumCanvas),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const { containerRef, progress, active } = useHeroProgress();
  const canRender = useCanRenderWebGL();

  return (
    <section className="relative isolate min-h-[94svh] w-full overflow-hidden bg-[#9dc0dc]">
      {/* Poster frame: sky over stand, in the scene's own values. Paints
          immediately, and is what a no-WebGL device keeps. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#2f6ea8_0%,#6ba3d4_32%,#c3daea_58%,#9aa1a8_59%,#6f767d_100%)]"
      />

      <div ref={containerRef} className="absolute inset-0">
        {canRender && <StadiumCanvas progress={progress} active={active} />}
      </div>

      {/* Legibility wash under the copy column. Clears by mid-frame so the
          bowl stays the subject rather than becoming a pale ground. */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(100deg,color-mix(in_srgb,var(--color-paper)_88%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_62%,transparent)_26%,color-mix(in_srgb,var(--color-paper)_18%,transparent)_46%,transparent_64%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-paper)_86%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_60%,transparent)_40%,color-mix(in_srgb,var(--color-paper)_22%,transparent)_74%,transparent_100%)] md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-56 bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--color-paper)_55%,transparent)_45%,var(--color-paper))]"
      />

      <div className="shell relative z-30 flex min-h-[94svh] flex-col justify-center pt-32 pb-24">
        <HeroCopy
          tone="light"
          caption="A Raja clear-span hanger erected across a stadium pitch — modelled live, from the plate supplied by the client."
        />
      </div>
    </section>
  );
}
