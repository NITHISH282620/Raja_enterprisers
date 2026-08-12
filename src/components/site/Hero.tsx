"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { company, hero } from "@/content/company";
import { Button } from "./Primitives";
import { HeroParallax } from "./HeroParallax";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  const tick = useCallback(function tick() {
    const node = sectionRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when hero top is at viewport top, 1 when hero is fully scrolled away
    const progress = Math.min(Math.max(-rect.top / (vh || 1), 0), 1);

    // Apply parallax via CSS custom property — GPU-composited transforms only
    node.style.setProperty("--parallax", `${progress}`);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <section 
      ref={sectionRef} 
      className="relative isolate min-h-[92svh] w-full overflow-hidden bg-[#dfe7ee]"
      style={{ "--parallax": "0" } as React.CSSProperties}
    >
      {/* ---------------------------------------------------------------- */}
      {/* 1 · The photograph. Raja-owned, native 5808x3872.                 */}
      {/* ---------------------------------------------------------------- */}
      <div aria-hidden className="absolute inset-0 hero-image-layer">
        {/* Landscape plate — hidden on phones, which get the portrait crop. */}
        <Image
          src="/media/raja/home.1.png"
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
      {/* 2 · Geometric parallax layer — CSS motion-based "3D" structure.   */}
      {/* ---------------------------------------------------------------- */}
      <HeroParallax />

      {/* ---------------------------------------------------------------- */}
      {/* 3 · Legibility wash. Strong under the copy column, gone by the    */}
      {/*     time it reaches the structure on the right.                   */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(100deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_90%,transparent)_30%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_50%,transparent_70%)]"
      />
      {/*
        Phones only. Below 768px the photograph fills the full width, so
        the veil runs vertically instead. Kept off tablets deliberately.
      */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_82%,transparent)_40%,color-mix(in_srgb,var(--color-paper)_22%,transparent)_68%,transparent_100%)] md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-28 bg-[linear-gradient(to_bottom,transparent,var(--color-paper))]"
      />

      <div 
        className="shell relative z-30 flex min-h-[92svh] flex-col justify-center pt-32 pb-20 will-change-transform"
        style={{ 
          transform: 'translateY(calc(var(--parallax) * 120px))',
          opacity: 'calc(1 - (var(--parallax) * 1.5))' 
        }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 hero-entrance hero-entrance--1">
            <span className="eyebrow rounded-sm border border-steel-400/70 bg-paper/50 px-3 py-1.5 text-ink backdrop-blur-sm">
              Est. {company.established}
            </span>
            <span aria-hidden className="h-px w-16 bg-steel-400/50" />
          </div>

          <h1 className="t-display-xl mt-9 text-ink hero-entrance hero-entrance--2">
            <span className="block">{hero.lines[0]}</span>
            <span className="block">
              <span className="font-medium italic text-accent">Luxury</span> for
            </span>
            <span className="block">{hero.lines[2]}</span>
          </h1>

          <p className="mt-9 max-w-xl text-lg leading-relaxed text-steel-700 text-pretty md:text-xl hero-entrance hero-entrance--3">
            {hero.subcopy}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3 hero-entrance hero-entrance--4">
            <Button href="/home3/inventory">View capabilities</Button>
            <Button href="/home3/legacy" variant="secondary">
              Our legacy
            </Button>
          </div>

          {/* What the plate actually is. Quiet, but it turns decoration into evidence. */}
          <p className="mt-12 max-w-md text-[0.8125rem] leading-relaxed text-steel-600 hero-entrance hero-entrance--5">
            <span className="font-medium text-steel-700">Above:</span> Raja clear-span hanger at
            the Vidhana Soudha, Bengaluru — 134th Ambedkar Jayanti, April 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
