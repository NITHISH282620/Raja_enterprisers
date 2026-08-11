"use client";

import dynamic from "next/dynamic";
import { company, hero } from "@/content/company";
import { Button } from "./Primitives";

/**
 * The approved hero. Composition, copy and colour follow the signed-off board
 * (raja_1.jpeg): copy left over a light-to-clear wash, structure right.
 *
 * The structure behind it is the live German hanger, code-split and client-only
 * — a WebGL canvas cannot be server-rendered, and holding it out of the initial
 * bundle keeps the copy paintable before three.js has parsed.
 */
const HeroHangerCanvas = dynamic(
  () => import("@/components/three/HeroHangerCanvas").then((m) => m.HeroHangerCanvas),
  { ssr: false },
);

export function Hero() {
  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-[#eef2f6]">
      <HeroHangerCanvas />

      {/* Legibility wash. Strong at the left where the copy sits, gone by the
          time it reaches the structure. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[linear-gradient(100deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_92%,transparent)_26%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_46%,transparent_62%)]"
      />
      {/*
        Narrow screens only. The wash above runs left-to-right, which works when
        the copy occupies a column — but on a phone the structure fills the full
        width and sits directly behind the type. This lays a vertical veil under
        the text block instead.
      */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_86%,transparent)_46%,color-mix(in_srgb,var(--color-paper)_30%,transparent)_72%,transparent_100%)] lg:hidden"
      />
      {/* Hand-off into the section below, so the canvas does not end on a seam. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-24 bg-[linear-gradient(to_bottom,transparent,var(--color-paper))]"
      />

      <div className="shell relative z-20 flex min-h-[92svh] flex-col justify-center pt-32 pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="eyebrow rounded-sm border border-steel-300 px-3 py-1.5 text-ink">
              Est. {company.established}
            </span>
            <span aria-hidden className="h-px w-12 bg-steel-300" />
            <span className="eyebrow hidden sm:inline">Bengaluru · India</span>
          </div>

          <h1 className="t-display-xl mt-9 text-ink">
            <span className="block">{hero.lines[0]}</span>
            <span className="block">
              <span className="font-medium italic text-accent">Luxury</span>{" "}
              for
            </span>
            <span className="block">{hero.lines[2]}</span>
          </h1>

          <p className="mt-9 max-w-xl text-lg leading-relaxed text-steel-700 text-pretty md:text-xl">
            {hero.subcopy}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3">
            <Button href="/home3/inventory">View capabilities</Button>
            <Button href="/home3/legacy" variant="secondary">
              Our legacy
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
