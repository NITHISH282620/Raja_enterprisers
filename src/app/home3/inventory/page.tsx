import type { Metadata } from "next";
import Image from "next/image";
import { Masthead, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { AssetStage } from "@/components/three/AssetStage";
import { ParallaxMedia } from "@/components/site/motion/ParallaxMedia";
import { CountUp } from "@/components/site/motion/CountUp";
import { ArrowLink, Eyebrow, Rule, SectionHead } from "@/components/site/Primitives";
import {
  categories,
  headlineStock,
  inventorySchedule,
  serviceLines,
} from "@/content/inventory";

export const metadata: Metadata = {
  title: "Inventory & Capabilities — Raja Enterprises",
  description:
    "The owned inventory behind every deployment: 5 Lakh Sft of imported German hangers, 10 Lakh Sft of wooden floor platforms, 15,000 Sqmtr of stalls, 3,000 tons of temporary air-conditioning, 460 in-house personnel.",
};

export default function InventoryPage() {
  return (
    <>
      <Masthead
        eyebrow="Inventory & capabilities"
        heading="What we own, and how much of it."
        standfirst="An event company is only as good as the stock it can put on a lorry. Everything below is held as owned inventory and moved by an owned fleet — the quantities are reproduced from the company's inventory schedule, unrounded."
        aside={
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-steel-200 pt-10 lg:grid-cols-4">
            {headlineStock.map((row) => (
              <div key={row.item}>
                <dt className="sr-only">{row.item}</dt>
                <dd className="t-figure text-ink">
                  <CountUp value={row.figure} />
                  <span className="ml-2 align-baseline text-[0.3em] font-medium uppercase tracking-[0.16em] text-steel-500">
                    {row.unit}
                  </span>
                </dd>
                <p className="mt-4 text-sm leading-snug text-steel-600">{row.item}</p>
              </div>
            ))}
          </dl>
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Categories — alternating full-width rows                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell pb-8">
        {categories.map((category, i) => (
          <Reveal key={category.slug} id={category.slug} className="scroll-mt-28">
            <div
              className={`grid items-center gap-10 border-b border-steel-100 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Eyebrow>{category.kicker}</Eyebrow>
                <h2 className="t-heading mt-6 text-ink text-balance">{category.name}</h2>
                <p className="mt-5 text-[1.0625rem] font-medium leading-relaxed text-ink text-pretty">
                  {category.summary}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600 text-pretty">
                  {category.detail}
                </p>

                <dl className="mt-9 divide-y divide-steel-100 border-t border-steel-200">
                  {category.stock.map((row) => (
                    <div key={row.item} className="flex items-baseline justify-between gap-6 py-3.5">
                      <dt className="text-sm text-steel-600">{row.item}</dt>
                      <dd className="shrink-0 text-right text-sm font-medium text-ink tabular-nums">
                        {row.quantity}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                {category.media.kind === "3d" ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-card">
                    <AssetStage kind={category.media.asset} className="h-full w-full" />
                  </div>
                ) : (
                  category.image && (
                    <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-card">
                      <ParallaxMedia distance={18}>
                        <Image
                          src={category.image}
                          alt={category.imageAlt ?? category.name}
                          fill
                          sizes="100vw"
                          quality={100}
                          className="media-in object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
                        />
                      </ParallaxMedia>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* The full schedule, verbatim                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-steel-100 bg-card">
        <div className="shell band">
          <Reveal>
            <SectionHead
              eyebrow="Inventory schedule"
              heading="The full list, as it stands in the catalogue."
              standfirst="Reproduced line for line so it can be checked against the source document. Nothing here has been rounded, restated or added to."
            />
          </Reveal>

          {/*
            The schedule arrives a line at a time rather than as a block — it
            is a list being read down, and revealing it that way is the one
            place on the page where the motion matches how the content is
            actually consumed. The stagger is capped at eight steps: past that
            the last rows are waiting on an animation the reader has already
            scrolled to, which reads as lag rather than sequence.
          */}
          <dl className="mt-14 grid gap-x-16 md:grid-cols-2">
            {inventorySchedule.map((row, i) => (
              <Reveal key={row.item} delay={Math.min(i, 8) * 45}>
                <div className="schedule-row flex items-baseline justify-between gap-6 border-b border-steel-200 py-4">
                  <dt className="text-[0.9375rem] text-steel-700">{row.item}</dt>
                  <dd className="schedule-row__qty shrink-0 text-right text-[0.9375rem] font-medium text-ink tabular-nums">
                    {row.quantity}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={120} className="mt-14 max-w-3xl">
            <p className="text-sm leading-relaxed text-steel-600">
              <span className="font-medium text-ink">A note on audio-visual.</span> The schedule
              documents general lighting and LED stall fascia, and no audio-visual stock — no
              speakers, LED walls, projectors or moving-head fixtures. None are claimed on this
              site. If the company does own AV equipment, or hires it in under its own contract,
              that should be confirmed and added here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Service lines                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell band">
        <Reveal>
          <SectionHead
            eyebrow="Service lines"
            heading="What we are contracted for."
            standfirst="The eight lines carried on the front of the company catalogue."
            action={{ href: "/home3/portfolio", label: "See them executed" }}
          />
        </Reveal>

        <Reveal delay={60}>
          <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceLines.map((line) => (
              <li key={line} className="border-t border-steel-200 py-7">
                <p className="mt-4 text-lg font-medium leading-snug text-ink">{line}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Rule className="mt-6" />

        <Reveal delay={100} className="mt-10">
          <ArrowLink href="/home3/contact">Ask what a deployment would take</ArrowLink>
        </Reveal>
      </section>

      <CTABand
        heading="Need a figure we have not published?"
        body="Spans, load ratings and wind ratings are not documented in the catalogue, so they are not stated here. Ask, and we will confirm them against the structures in stock."
      />
    </>
  );
}
