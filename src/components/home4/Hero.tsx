"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { hero } from "@/content/home4";
import { useReducedMotion } from "@/lib/clientState";
import { subscribeScroll } from "@/lib/scrollDriver";

/**
 * The hero.
 *
 * The photograph is the argument — a hanger standing on a stadium ground says
 * "physical scale" faster than any sentence — so it is treated as the subject
 * and not as a texture to put a panel on top of.
 *
 * On the plate: the source is 1506×1045, which is under-resolution for a
 * full-bleed hero and cannot be fixed here; no larger copy of this frame
 * exists in the repository or in the client's media library. Two things make
 * that survivable. It is served as WebP (2.6MB → 0.31MB, identical pixels), and
 * the copy column sits over the softest part of the frame while the structure
 * itself stays in the sharp right two-thirds. It should still be re-shot or
 * re-sourced at 3000px+ before this goes to production.
 *
 * On the wash: it peaks at 82% under the first column and is gone by 58%. A
 * flat scrim over the whole plate would have been easier and would have thrown
 * away the photograph, which is the one thing this section cannot afford.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll parallax, written straight to a custom property. The plate is
  // oversized below so it has room to travel without exposing an edge.
  useEffect(() => {
    if (reduced) return;
    const node = sectionRef.current;
    if (!node) return;

    return subscribeScroll(() => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0) return;
      const progress = Math.min(Math.max(-rect.top / (window.innerHeight || 1), 0), 1);
      node.style.setProperty("--parallax", progress.toFixed(4));
    });
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[92svh] w-full flex-col overflow-hidden bg-graphite"
      style={{ "--parallax": "0" } as React.CSSProperties}
    >
      {/* -------- Plate -------------------------------------------------- */}
      <div
        aria-hidden
        className="absolute inset-x-0 -inset-y-[14%] will-change-transform"
        style={{ transform: "translateY(calc(var(--parallax) * 120px))" }}
      >
        <Image
          src="/media/projects/home4-hero-stadium.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="h4-plate-in object-cover object-[62%_center]"
        />
      </div>

      {/*
        Legibility. Horizontal on desktop so the structure on the right stays
        open; vertical below md, where the plate sits behind every line.
      */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 hidden bg-[linear-gradient(100deg,rgba(10,12,14,0.82)_0%,rgba(10,12,14,0.55)_28%,rgba(10,12,14,0.18)_46%,transparent_58%)] md:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(10,12,14,0.78)_0%,rgba(10,12,14,0.5)_40%,rgba(10,12,14,0.62)_100%)] md:hidden"
      />

      {/* -------- Copy --------------------------------------------------- */}
      <div className="h4-shell relative z-20 flex flex-1 flex-col justify-center pt-36 pb-16 md:pt-40">
        <div className="max-w-2xl">
          <p className="h4-label h4-rise h4-rise--1 flex items-center gap-3 text-paper/70">
            <span>{hero.eyebrow}</span>
            <span aria-hidden className="h-px w-8 bg-paper/30" />
            <span>{hero.location}</span>
          </p>

          {/*
            Each line masks up independently. The clip sits on an inner span so
            the outer block keeps its layout box — animating the line itself
            would reflow the headline on every frame.
          */}
          <h1 className="h4-display-1 mt-8 text-paper">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="h4-line-in block"
                  style={{ animationDelay: `${0.18 + i * 0.11}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="h4-lead h4-rise h4-rise--3 mt-8 max-w-xl text-paper/80 text-pretty">
            {hero.standfirst}
          </p>

          <div className="h4-rise h4-rise--4 mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={hero.actions.primary.href}
              className="cta-arrow inline-flex items-center gap-2 rounded-sm bg-paper px-7 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-paper"
            >
              {hero.actions.primary.label}
              <span aria-hidden className="cta-arrow__glyph">
                →
              </span>
            </Link>
            <Link
              href={hero.actions.secondary.href}
              className="inline-flex items-center rounded-sm border border-paper/35 px-7 py-4 text-sm font-medium text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/10"
            >
              {hero.actions.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* -------- Foot: two figures and the scroll cue ------------------- */}
      <div className="h4-shell relative z-20 pb-8">
        <div className="h4-rise h4-rise--5 flex flex-wrap items-end justify-between gap-6 border-t border-paper/15 pt-6">
          <dl className="flex flex-wrap gap-x-12 gap-y-4">
            {hero.metadata.map((m) => (
              <div key={m.label}>
                <dt className="h4-label text-paper/55">{m.label}</dt>
                <dd className="mt-2 text-lg font-medium text-paper tabular-nums">{m.figure}</dd>
              </div>
            ))}
          </dl>

          <p className="h4-label flex items-center gap-3 text-paper/55">
            {hero.scrollCue}
            <span aria-hidden className="h4-scroll-cue block h-8 w-px bg-paper/35" />
          </p>
        </div>
      </div>
    </section>
  );
}
