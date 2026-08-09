import Image from "next/image";
import { credibility } from "@/content/company";
import { SectionIndex } from "@/components/primitives/SectionIndex";

/**
 * The most important editorial decision on the page (plan §1).
 *
 * This company has built the infrastructure for programmes inaugurated by the
 * Prime Minister of India, and that fact is currently invisible on their
 * website. It goes directly under the hero, not buried in a portfolio grid.
 */
export function CredibilityBand() {
  return (
    <section className="bg-ink text-paper">
      <div className="shell grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <SectionIndex index="00" name="Track record" tone="dark" />
          <h2 className="t-display-l mt-10 text-paper">
            {credibility.statement}
          </h2>
          <p className="t-body mt-8 text-steel-300">{credibility.detail}</p>
        </div>

        <div className="md:col-span-7">
          <figure className="relative aspect-[4/3] overflow-hidden bg-graphite">
            <Image
              src="/media/projects/ambedkar-jayanti.jpg"
              alt="State programme installation at Vidhana Soudha, Bengaluru"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          </figure>
          <figcaption className="t-label mt-4 text-steel-500">
            Ambedkar Jayanti &nbsp;//&nbsp; Vidhana Soudha, Bengaluru
          </figcaption>
        </div>
      </div>
    </section>
  );
}
