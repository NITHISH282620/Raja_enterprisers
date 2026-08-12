"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { company, hero } from "@/content/company";
import { Button } from "./Primitives";

/**
 * The hero.
 *
 * Composition follows the signed-off board (raja_1.jpeg): copy left over a
 * light-to-clear wash, architectural mass right. What changed is the substance
 * behind it — the plate is now a real Raja photograph rather than an empty
 * gradient, so the structure the camera flies through is standing in front of
 * the Vidhana Soudha rather than floating in white.
 *
 * Layer order, back to front:
 *   1. HMS4180-1, graded         — the factual evidence
 *   2. atmospheric separation    — sits the 3D into the plate's depth
 *   3. procedural hanger (WebGL) — the same portal-frame type in the photograph
 *   4. legibility wash + copy    — always painted, never waits for the canvas
 *
 * The copy is deliberately outside the canvas's control: it renders at full
 * opacity on first paint. A reviewer must never watch an empty frame.
 */
const HeroHangerCanvas = dynamic(
  () => import("@/components/three/HeroHangerCanvas").then((m) => m.HeroHangerCanvas),
  { ssr: false },
);

export function Hero() {
  // The canvas mounts only after the photograph has had a chance to paint, so a
  // slow connection sees a real hero rather than a blank plate.
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setCanvasReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-[#dfe7ee]">
      {/* ---------------------------------------------------------------- */}
      {/* 1 · The photograph. Raja-owned, native 5808x3872.                 */}
      {/* ---------------------------------------------------------------- */}
      <div aria-hidden className="absolute inset-0">
        {/* Landscape plate — hidden on phones, which get the portrait crop. */}
        <Image
          src="/media/raja/hero-vidhana-soudha.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-[58%_center] md:block"
        />
        <Image
          src="/media/raja/hero-vidhana-soudha-portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        {/*
          Grade. High-key and slightly desaturated so the display type sits on
          it — but deliberately gentle: the Vidhana Soudha dome, the hanger and
          the crowd all have to stay legible. This is evidence, not wallpaper.
        */}
        <div className="absolute inset-0 bg-paper/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/45 via-transparent to-paper/25" />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2–3 · Atmospheric separation + the procedural structure.          */}
      {/* ---------------------------------------------------------------- */}
      {canvasReady && <HeroHangerCanvas />}

      {/* ---------------------------------------------------------------- */}
      {/* 4 · Legibility wash. Strong under the copy column, gone by the    */}
      {/*     time it reaches the structure on the right.                   */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(100deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_88%,transparent)_28%,color-mix(in_srgb,var(--color-paper)_40%,transparent)_50%,transparent_70%)]"
      />
      {/*
        Phones only. Below 768px the structure fills the full width and sits
        directly behind the type, so the veil runs vertically instead. Kept off
        tablets deliberately — stacking it on the horizontal wash there washed
        the photograph out to near-white.
      */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_78%,transparent)_40%,color-mix(in_srgb,var(--color-paper)_18%,transparent)_68%,transparent_100%)] md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-28 bg-[linear-gradient(to_bottom,transparent,var(--color-paper))]"
      />

      <div className="shell relative z-30 flex min-h-[92svh] flex-col justify-center pt-32 pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="eyebrow rounded-sm border border-steel-400/70 bg-paper/50 px-3 py-1.5 text-ink backdrop-blur-sm">
              Est. {company.established}
            </span>
            <span aria-hidden className="h-px w-12 bg-steel-400/70" />
            <span className="eyebrow hidden text-steel-600 sm:inline">Bengaluru · India</span>
          </div>

          <h1 className="t-display-xl mt-9 text-ink">
            <span className="block">{hero.lines[0]}</span>
            <span className="block">
              <span className="font-medium italic text-accent">Luxury</span> for
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

          {/* What the plate actually is. Quiet, but it turns decoration into evidence. */}
          <p className="mt-12 max-w-md text-[0.8125rem] leading-relaxed text-steel-600">
            <span className="font-medium text-steel-700">Above:</span> Raja clear-span hanger at
            the Vidhana Soudha, Bengaluru — 134th Ambedkar Jayanti, April 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
