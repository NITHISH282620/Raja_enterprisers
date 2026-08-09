import type { Metadata } from "next";
import { categories, headlineStock } from "@/content/inventory";
import { InventoryField, PhotoPending } from "@/components/inventory/InventoryField";
import { SectionIndex } from "@/components/primitives/SectionIndex";
import { FigureStat } from "@/components/primitives/FigureStat";
import { Rule } from "@/components/primitives/Rule";
import { AssetStage } from "@/components/three/AssetStage";

export const metadata: Metadata = {
  title: "Capabilities & Inventory — Raja Enterprises",
  description:
    "5 Lakh Sft of imported German hangers, 10 Lakh Sft of wooden platforms, 15,000 sqm of stall systems, 3,000 tons of temporary air-conditioning, 460 in-house personnel.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="border-b border-steel-200 bg-paper pt-32 md:pt-40">
        <div className="shell pb-16">
          <SectionIndex index="02" name="Capabilities" />
          <h1 className="t-display-xl mt-10 max-w-[14ch]">Held in stock.</h1>
          <p className="t-body mt-8 text-steel-700">
            Raja Enterprises owns its inventory rather than sourcing it per
            project. The figures below are the working stock — the reason a
            state-scale programme can be mobilised on schedule.
          </p>

          <Rule className="mt-16" />

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {headlineStock.map((stat) => (
              <FigureStat
                key={stat.item}
                value={stat.quantity}
                unit={stat.unit}
                label={stat.item}
              />
            ))}
          </div>
        </div>
      </section>

      <InventoryField />

      {/* Full catalogue, one row per category, asset on the shared rig. */}
      <section className="border-t border-steel-200 bg-paper">
        <div className="shell py-20 md:py-28">
          <SectionIndex index="03" name="Full catalogue" />

          <div className="mt-14 flex flex-col gap-20">
            {categories.map((category, i) => (
              <article
                key={category.slug}
                id={category.slug}
                className="grid scroll-mt-28 gap-10 md:grid-cols-12 md:items-center"
              >
                <div
                  className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] border border-steel-200 bg-off-white">
                    {category.media.kind === "3d" ? (
                      <AssetStage
                        kind={category.media.asset}
                        className="h-full w-full"
                      />
                    ) : (
                      <PhotoPending />
                    )}
                  </div>
                </div>

                <div className="md:col-span-6">
                  <div className="t-label flex items-baseline gap-2">
                    <span className="text-brand">{category.index}</span>
                    <span className="text-steel-300">{"//"}</span>
                    <span className="text-steel-700">
                      {category.name.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="t-display-l mt-6">{category.name}</h2>
                  <p className="t-body mt-6 text-steel-700">{category.detail}</p>

                  <dl className="mt-8">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
