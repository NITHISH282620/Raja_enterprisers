import { capabilityBar } from "@/content/company";
import { FigureStat } from "@/components/primitives/FigureStat";

/**
 * The operational strip directly beneath the hero.
 * Plain sums of brochure quantities — nothing derived beyond addition.
 */
export function CapabilityBar() {
  return (
    <section className="border-b border-steel-200 bg-paper">
      <div className="shell grid grid-cols-1 gap-10 py-14 sm:grid-cols-3 md:py-16">
        {capabilityBar.map((stat) => (
          <FigureStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
