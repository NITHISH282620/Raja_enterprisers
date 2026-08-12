"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categories, type Category } from "@/content/home1/inventory";
import { SectionIndex } from "@/components/primitives/SectionIndex";
import { Rule } from "@/components/primitives/Rule";
import { AssetStage } from "@/components/three/AssetStage";
import { cssEase, duration } from "@/lib/motion";
import { useCoarsePointer, useReducedMotion } from "@/lib/clientState";

/**
 * Spatial inventory exploration (plan §2, Phase 3 of the brief).
 *
 * Not a grid of flat cards. Cards sit on three depth tiers and are sized by
 * significance — Structures is the flagship because 5 Lakh Sft of hangers is
 * the flagship. Selecting one pushes its siblings outward and dims them, so the
 * transition reads as *entering* the category rather than opening a modal.
 *
 * Desktop uses hover depth. Touch replaces it with tap-to-expand — no
 * pointer-tracking, no hover states that need a mouse to escape.
 */
export function InventoryField() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();

  // Escape closes the expanded category.
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const active = categories.find((category) => category.slug === selected) ?? null;

  return (
    <section id="inventory" className="relative bg-off-white">
      <div className="shell py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[34ch]">
            <SectionIndex index="01" name="Inventory" />
            <h2 className="t-display-l mt-8">Owned, not sourced.</h2>
          </div>
          <p className="t-body text-steel-700 md:max-w-[42ch]">
            Nine categories of stock held in-house — structures, decking,
            staging, power and the crew to erect them. Select a category to
            see what is held.
          </p>
        </div>

        <Rule className="mt-14" />

        {/* Perspective on the container is what makes the depth tiers read. */}
        <div
          className="relative mt-14"
          style={{ perspective: reduced ? undefined : "1600px" }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                selected={selected}
                hovered={hovered}
                coarse={coarse}
                reduced={reduced}
                onHover={setHovered}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </div>

      {active && (
        <CategoryPanel
          category={active}
          onClose={() => setSelected(null)}
          reduced={reduced}
        />
      )}
    </section>
  );
}

/** Column spans by significance — Structures reads as the flagship. */
const spanClass: Record<Category["scale"], string> = {
  flagship: "lg:col-span-6 lg:row-span-2",
  major: "lg:col-span-3",
  standard: "lg:col-span-3",
};

const heightClass: Record<Category["scale"], string> = {
  flagship: "min-h-[26rem] lg:min-h-[34rem]",
  major: "min-h-[24rem]",
  standard: "min-h-[24rem]",
};

const tierDepth = { front: 0, mid: -40, back: -80 } as const;

function CategoryCard({
  category,
  selected,
  hovered,
  coarse,
  reduced,
  onHover,
  onSelect,
}: {
  category: Category;
  selected: string | null;
  hovered: string | null;
  coarse: boolean;
  reduced: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string | null) => void;
}) {
  const isSelected = selected === category.slug;
  const isHovered = hovered === category.slug && !coarse && !reduced;
  const someoneElseSelected = selected !== null && !isSelected;

  // Resting depth from the tier, lifted toward the viewer on hover.
  const baseZ = reduced ? 0 : tierDepth[category.tier];
  const z = isHovered ? baseZ + 18 : baseZ;

  return (
    <article
      className={`group relative border border-steel-200 bg-paper ${spanClass[category.scale]} ${heightClass[category.scale]}`}
      style={{
        transform: reduced ? undefined : `translateZ(${z}px)`,
        opacity: someoneElseSelected ? 0.12 : 1,
        transition: `transform ${duration.quick}ms ${cssEase.out}, opacity ${duration.expand}ms ${cssEase.inOut}, box-shadow ${duration.quick}ms ${cssEase.out}`,
        boxShadow: isHovered
          ? "0 26px 60px -28px rgba(10,12,14,0.34)"
          : "0 10px 30px -24px rgba(10,12,14,0.22)",
        pointerEvents: someoneElseSelected ? "none" : undefined,
      }}
      onMouseEnter={() => onHover(category.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {/* The 3D asset, or a photo placeholder for the two categories we
          deliberately do not model (workforce, catering).
          Inset from the bottom so the render sits in the card's upper field
          and never collides with the type. */}
      <div className="absolute inset-x-0 top-0 bottom-[8.5rem] overflow-hidden">
        {category.media.kind === "3d" ? (
          <AssetStage kind={category.media.asset} className="h-full w-full" />
        ) : (
          <PhotoPending />
        )}
      </div>

      {/* Scrim, so type stays legible if a render runs long. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,0.92) 38%, rgba(250,250,248,1) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
        <div className="t-label flex items-baseline gap-2">
          <span className="text-brand">{category.index}</span>
          <span className="text-steel-300">{"//"}</span>
          <span className="text-steel-700">{category.name.toUpperCase()}</span>
        </div>

        <div>
          <h3 className="t-heading max-w-[18ch]">{category.name}</h3>

          {/* Secondary information appears on hover, per the brief. */}
          <p
            className="t-body mt-3 max-w-[34ch] text-sm text-steel-700"
            style={{
              opacity: isHovered || coarse ? 1 : 0,
              transform: isHovered || coarse ? "none" : "translateY(6px)",
              transition: `opacity ${duration.quick}ms ${cssEase.out}, transform ${duration.quick}ms ${cssEase.out}`,
            }}
          >
            {category.summary}
          </p>

          <button
            type="button"
            onClick={() => onSelect(category.slug)}
            className="t-label mt-5 inline-flex items-center gap-2 text-brand"
            aria-expanded={isSelected}
          >
            Explore
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * Honest placeholder for the two categories that must be photographed rather
 * than modelled — modelling people or food produces exactly the uncanny look
 * the brief rules out (plan §E).
 */
export function PhotoPending() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-off-white">
      {/* The logo's line-scoring, used as a holding pattern. Reads as an
          intentional slot awaiting a photograph, not as a broken image.
          Kept light so these sit in the same family as the rendered cards. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, #c1ced6 0px, #c1ced6 1px, transparent 1px, transparent 11px)",
          maskImage: "radial-gradient(120% 100% at 50% 45%, #000 5%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 50% 45%, #000 5%, transparent 78%)",
        }}
      />
      <span className="t-label relative text-steel-300">Photography to follow</span>
    </div>
  );
}

/**
 * The expanded category. Siblings have already dimmed and are inert; this
 * arrives as a shared-surface expansion rather than a crossfaded modal.
 */
function CategoryPanel({
  category,
  onClose,
  reduced,
}: {
  category: Category;
  onClose: () => void;
  reduced: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={category.name}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
        style={{
          animation: reduced ? undefined : `panel-veil ${duration.expand}ms ${cssEase.inOut} both`,
        }}
      />

      <div
        className="relative grid max-h-[88svh] w-full max-w-6xl grid-cols-1 overflow-auto border border-steel-200 bg-paper md:grid-cols-2"
        style={{
          animation: reduced ? undefined : `panel-in ${duration.expand}ms ${cssEase.out} both`,
        }}
      >
        <div className="relative min-h-[16rem] border-b border-steel-200 bg-off-white md:min-h-[32rem] md:border-r md:border-b-0">
          {category.media.kind === "3d" ? (
            <AssetStage kind={category.media.asset} className="h-full w-full" lazy={false} />
          ) : (
            <PhotoPending />
          )}
        </div>

        <div className="flex flex-col p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <SectionIndex index={category.index} name={category.name} className="flex-1" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="t-label text-steel-500 hover:text-ink"
            >
              Close
            </button>
          </div>

          <h3 className="t-display-l mt-8">{category.name}</h3>
          <p className="t-body mt-6 text-steel-700">{category.detail}</p>

          <div className="mt-10">
            <div className="t-label text-steel-500">Held in stock</div>
            <dl className="mt-5">
              {category.stock.map((entry) => (
                <div
                  key={entry.item}
                  className="flex items-baseline justify-between gap-6 border-b border-steel-200 py-4"
                >
                  <dt className="t-body text-steel-700">{entry.item}</dt>
                  <dd className="t-label whitespace-nowrap text-ink">
                    {entry.quantity}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Link
            href="/contact"
            className="t-label mt-auto inline-flex w-fit items-center gap-3 border border-ink px-7 py-4 pt-8 transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            Enquire about {category.name.toLowerCase()} &rarr;
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes panel-in {
          from { opacity: 0; transform: scale(0.965) translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes panel-veil {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
