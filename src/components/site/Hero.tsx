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
      {/*
        The plate is oversized 20% top and bottom so it has somewhere to travel.
        At 92svh that is ~165px of slack each way, which comfortably covers the
        150px of drift below without ever exposing an edge inside the section's
        overflow-hidden.
      */}
      <div
        aria-hidden
        className="absolute inset-x-0 -inset-y-[20%] hero-image-layer will-change-transform"
        style={{ transform: 'scale(1.05) translateY(calc(var(--parallax) * 150px))' }}
      >
        {/* Landscape plate — hidden on phones, which get the portrait crop. */}
        <Image
          src="/media/raja/home.1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-plate-in hidden object-cover object-[58%_center] md:block"
        />
        <Image
          src="/media/raja/hero-vidhana-soudha-portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-plate-in object-cover object-center md:hidden"
        />
        {/* Grade: Gentle vignette for text legibility without washing out the image.
            Rides with the plate — the fade to page ground does not, and lives
            anchored to the section further down, or it would drift off-screen. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.15)_100%)]" />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2 · Geometric parallax layer — CSS motion-based "3D" structure.   */}
      {/* ---------------------------------------------------------------- */}
      <HeroParallax />

      {/* ---------------------------------------------------------------- */}
      {/* 3 · Legibility wash. Sits under the copy column only, and clears  */}
      {/*     early — the photograph is the evidence, so it stays readable  */}
      {/*     as a photograph rather than becoming a pale ground. Peaks at  */}
      {/*     80% rather than fully opaque paper; the headline is near-black */}
      {/*     over a bright sky, which carries the contrast on its own.     */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(100deg,color-mix(in_srgb,var(--color-paper)_84%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_58%,transparent)_24%,color-mix(in_srgb,var(--color-paper)_20%,transparent)_44%,transparent_62%)]"
      />
      {/*
        Phones only. Below 768px the photograph fills the full width, so
        the veil runs vertically instead. Kept off tablets deliberately.
      */}
      <div
        aria-hidden
        /*
          Heavier than the desktop veil, deliberately. On desktop the copy sits
          in a column with open photograph beside it; below 768px the plate is
          behind every line of text, and this crop — ceremonial crowd, bunting,
          full colour — is the busiest ground on the site. 88% falling to 30%
          keeps the standfirst and the caption readable without flattening the
          image back into the pale ground we just took it out of.
        */
        className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-paper)_88%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_66%,transparent)_38%,color-mix(in_srgb,var(--color-paper)_30%,transparent)_72%,color-mix(in_srgb,var(--color-paper)_10%,transparent)_100%)] md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-56 bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--color-paper)_55%,transparent)_45%,var(--color-paper))]"
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
