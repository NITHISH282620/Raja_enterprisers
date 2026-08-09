"use client";

import Link from "next/link";
import { useState } from "react";
import { company, headlines, heroSubcopy, type HeadlineId } from "@/content/company";
import { HangerScene } from "@/components/three/HangerScene";

/**
 * Homepage hero (plan §1).
 *
 * The 3D hanger sits behind the type as the visual anchor; the scene renders a
 * static composed frame first and only hydrates the canvas after (plan §F), so
 * the hero is complete without WebGL.
 *
 * The headline toggle ships for the pitch so the client can compare both lines
 * in place instead of arguing about them in the abstract. Remove after sign-off.
 */
export function Hero() {
  const [variant, setVariant] = useState<HeadlineId>("grounded");
  const headline = headlines[variant];

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-graphite">
      <HangerScene />

      {/* Type legibility without crushing the structure. Weighted to the
          bottom, where the headline sits, and left, where the copy runs —
          the roof and far end stay open. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,12,14,0.30) 0%, rgba(10,12,14,0.05) 34%, rgba(10,12,14,0.55) 78%, rgba(10,12,14,0.82) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,12,14,0.74) 0%, rgba(10,12,14,0.34) 42%, rgba(10,12,14,0) 74%)",
        }}
      />

      <div className="shell relative z-20 flex min-h-[92svh] flex-col justify-end pt-32 pb-16">
        <div className="t-label mb-8 flex items-center gap-3 text-steel-100">
          <span className="text-steel-300">EST.</span>
          <span>{company.established}</span>
          <span className="ml-2 h-px w-16 bg-steel-500" />
          <span>{company.city}</span>
        </div>

        <h1 className="t-display-xl max-w-[16ch] text-paper">
          {headline.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="t-body mt-8 max-w-[52ch] text-steel-200">{heroSubcopy}</p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/capabilities"
            className="t-label group inline-flex items-center gap-3 bg-paper px-8 py-5 text-ink transition-colors duration-200 hover:bg-brand hover:text-paper"
          >
            View capabilities
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/work"
            className="t-label inline-flex items-center gap-3 border border-steel-500 px-8 py-5 text-paper transition-colors duration-200 hover:border-paper"
          >
            Our work
          </Link>
        </div>
      </div>

      <HeadlineToggle variant={variant} onChange={setVariant} />
    </section>
  );
}

/** Pitch-only control. Delete once the client picks a line. */
function HeadlineToggle({
  variant,
  onChange,
}: {
  variant: HeadlineId;
  onChange: (id: HeadlineId) => void;
}) {
  return (
    <div className="absolute right-4 bottom-6 z-30 hidden lg:block">
      <div className="border border-steel-700 bg-graphite/80 p-3 backdrop-blur-sm">
        <div className="t-label mb-3 text-steel-500">Headline &mdash; for review</div>
        <div className="flex gap-2">
          {(Object.keys(headlines) as HeadlineId[]).map((id) => {
            const active = id === variant;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                className={`t-label px-4 py-3 transition-colors duration-200 ${
                  active
                    ? "bg-paper text-ink"
                    : "border border-steel-700 text-steel-300 hover:text-paper"
                }`}
                aria-pressed={active}
              >
                {headlines[id].label}
              </button>
            );
          })}
        </div>
        <div className="t-label mt-3 text-steel-500">{headlines[variant].note}</div>
      </div>
    </div>
  );
}
