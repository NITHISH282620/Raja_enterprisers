"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { structure } from "@/content/home4";
import { useCanRenderWebGL, useMediaQuery, useReducedMotion } from "@/lib/clientState";
import { subscribeScroll } from "@/lib/scrollDriver";

/**
 * The 3D section, and everything that keeps it from costing anything.
 *
 * Three gates sit between a visitor and the WebGL bundle:
 *
 *  1. `next/dynamic` with `ssr: false` — three.js and @react-three/fiber are
 *     their own chunk, never in the initial payload.
 *  2. An IntersectionObserver with a one-viewport rootMargin — the chunk is not
 *     even requested until the section is approaching. Someone who reads the
 *     hero and leaves downloads none of it.
 *  3. Capability and preference checks — no WebGL context, a phone, or
 *     `prefers-reduced-motion` and the poster is the section, permanently.
 *
 * The poster is a real Raja photograph, not a screenshot of the scene, so the
 * fallback is not a degraded version of anything — it is simply the other way
 * of showing the same structure.
 */

const StructureCanvas = dynamic(
  () => import("./StructureCanvas").then((m) => m.StructureCanvas),
  { ssr: false, loading: () => null },
);

export function Structure() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [near, setNear] = useState(false);

  const reduced = useReducedMotion();
  const webgl = useCanRenderWebGL();
  const isPhone = useMediaQuery("(max-width: 767px)", true);

  // Mount the canvas only when it is genuinely worth mounting.
  const enabled = near && webgl && !reduced && !isPhone;

  // Gate 2: request the chunk when the section is one viewport away.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Scroll → camera arc. Written to a ref, never to state: this updates every
  // frame and a re-render per frame would defeat the point of the damping.
  useEffect(() => {
    if (!enabled) return;
    const node = sectionRef.current;
    if (!node) return;

    return subscribeScroll(() => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh - rect.top) / (vh + rect.height);
      progress.current = Math.min(Math.max(raw, 0), 1);
    });
  }, [enabled]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-steel-100 bg-card"
      onPointerMove={(e) => {
        if (!enabled) return;
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      {/* Poster. Sits under everything and is simply covered when the canvas
          mounts, so there is never an empty box or a layout shift. */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/media/events/ambedkar-jayanti/HMS4165-scaled.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-card),color-mix(in_srgb,var(--color-card)_72%,transparent)_45%,var(--color-card))]" />
      </div>

      {/*
        The canvas is confined to the right of the measure on desktop. Spanning
        the full width put the structure directly behind the copy, where the
        membrane and the body text were competing for the same pixels at almost
        the same value. Below lg it takes the full width, because there the copy
        sits above it rather than beside it.
      */}
      {enabled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 lg:left-[34%]"
        >
          <StructureCanvas progress={progress} pointer={pointer} />
        </div>
      )}

      <div className="h4-shell relative z-10 h4-band-tight">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="h4-label text-accent">{structure.label}</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h4-display-2 mt-6 text-ink text-balance">{structure.title}</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="h4-body mt-7 max-w-lg text-steel-700 text-pretty">
                {structure.body}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <dl className="mt-10 divide-y divide-steel-200 border-y border-steel-200">
                {structure.specs.map((s) => (
                  <div key={s.term} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="h4-label text-steel-500">{s.term}</dt>
                    <dd className="text-[0.9375rem] font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* The right column is deliberately empty on desktop: it is the
              window the structure is seen through. Reserving the height here
              rather than inside the canvas means the section occupies its
              final size before any 3D exists, so mounting shifts nothing.

              Height is held close to the composition. At 64vh the section was
              half a screen taller than the structure needed and the hangar
              floated in the top third of a mostly empty panel. */}
          <div className="lg:col-span-7">
            <div className="h-[40vh] min-h-[260px] lg:h-[50vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
