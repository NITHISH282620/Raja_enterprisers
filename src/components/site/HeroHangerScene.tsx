"use client";

import { useEffect, useRef, useCallback } from "react";
import { company, hero } from "@/content/company";
import { Button } from "./Primitives";
import { HangerScene } from "@/components/three/HangerScene";

/**
 * The 3D-hanger-flythrough hero, held here rather than deleted. The client
 * asked home3's actual hero to go back to the photograph (see Hero.tsx) but
 * wants to keep this version for a possible spot elsewhere — the inventory
 * page was mentioned. Not imported anywhere yet.
 */
export function HeroHangerScene() {
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
      className="relative isolate min-h-[92svh] w-full overflow-hidden bg-graphite"
      style={{ "--parallax": "0" } as React.CSSProperties}
    >
      {/* ---------------------------------------------------------------- */}
      {/* 1 · The scene. Poster frame first, WebGL flythrough once ready.  */}
      {/* ---------------------------------------------------------------- */}
      <HangerScene />

      {/* ---------------------------------------------------------------- */}
      {/* 2 · Legibility wash — heaviest under the copy column, clearing   */}
      {/*     toward the open end so the structure still reads as         */}
      {/*     structure rather than becoming a dark backdrop.              */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,12,14,0.82) 0%, rgba(10,12,14,0.50) 32%, rgba(10,12,14,0.14) 58%, transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,12,14,0.32) 0%, rgba(10,12,14,0.04) 30%, rgba(10,12,14,0.62) 100%)",
        }}
      />
      {/* Phones: the scene sits full-bleed behind every line of text, so the
          wash runs vertical and heavier instead of the desktop side-veil. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(10,12,14,0.5)_0%,rgba(10,12,14,0.28)_36%,rgba(10,12,14,0.7)_100%)] md:hidden"
      />
      {/* The reveal into the page below: graphite resolves to paper. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-56 bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--color-paper)_55%,transparent)_60%,var(--color-paper))]"
      />

      <div
        className="shell relative z-30 flex min-h-[92svh] flex-col justify-center pt-32 pb-20 will-change-transform"
        style={{
          transform: 'translateY(calc(var(--parallax) * 120px))',
          opacity: 'calc(1 - (var(--parallax) * 1.5))',
        }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 hero-entrance hero-entrance--1">
            <span className="eyebrow rounded-sm border border-paper/25 bg-paper/10 px-3 py-1.5 text-paper backdrop-blur-sm">
              Est. {company.established}
            </span>
            <span aria-hidden className="h-px w-16 bg-paper/25" />
          </div>

          <h1 className="t-display-xl mt-9 text-paper hero-entrance hero-entrance--2">
            <span className="block">{hero.lines[0]}</span>
            <span className="block">
              <span className="font-medium italic text-accent">Luxury</span> for
            </span>
            <span className="block">{hero.lines[2]}</span>
          </h1>

          <p className="mt-9 max-w-xl text-lg leading-relaxed text-steel-200 text-pretty md:text-xl hero-entrance hero-entrance--3">
            {hero.subcopy}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3 hero-entrance hero-entrance--4">
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
