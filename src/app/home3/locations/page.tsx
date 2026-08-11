import type { Metadata } from "next";
import { Masthead, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLink,
  ConfirmMarker,
  Eyebrow,
  SectionHead,
} from "@/components/site/Primitives";
import { company } from "@/content/company";
import { deliveredIn, office, reachSummary } from "@/content/locations";

export const metadata: Metadata = {
  title: "Locations — Raja Enterprises",
  description:
    "Head office in Bengaluru, Karnataka. Work delivered across Karnataka, Delhi and Tamil Nadu — Bengaluru, Haveri, Belagavi, Shivamogga, New Delhi and Chennai.",
};

export default function LocationsPage() {
  const { contact } = company;

  return (
    <>
      <Masthead
        index="04"
        eyebrow="Locations"
        heading="One office. Work wherever the ground is."
        standfirst="Raja Enterprises runs from a single Bengaluru office. There is no branch network, and this page does not claim one — what it maps instead is where work has actually been delivered."
        aside={
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-steel-200 pt-10 sm:grid-cols-4">
            <div>
              <dt className="sr-only">Offices</dt>
              <dd className="t-figure text-ink">1</dd>
              <p className="mt-4 text-sm text-steel-600">Office</p>
            </div>
            <div>
              <dt className="sr-only">States delivered in</dt>
              <dd className="t-figure text-ink">{reachSummary.states}</dd>
              <p className="mt-4 text-sm text-steel-600">States &amp; territories</p>
            </div>
            <div>
              <dt className="sr-only">Cities delivered in</dt>
              <dd className="t-figure text-ink">{reachSummary.cities}</dd>
              <p className="mt-4 text-sm text-steel-600">Cities with documented work</p>
            </div>
            <div>
              <dt className="sr-only">Own goods vehicles</dt>
              <dd className="t-figure text-ink">20</dd>
              <p className="mt-4 text-sm text-steel-600">Own goods vehicles</p>
            </div>
          </dl>
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Head office                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow index="01">{office.label}</Eyebrow>
              <h2 className="t-display-l mt-7 text-ink">{office.city}</h2>
              <address className="mt-8 space-y-1.5 text-[1.0625rem] not-italic leading-relaxed text-steel-700">
                {office.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>

              <dl className="mt-10 space-y-4 border-t border-steel-200 pt-8">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <dt className="eyebrow w-20 shrink-0">Landline</dt>
                  <dd className="text-[0.9375rem] text-steel-700">
                    {contact.landlines.join(" · ")}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <dt className="eyebrow w-20 shrink-0">Mobile</dt>
                  <dd className="text-[0.9375rem] font-medium text-ink">
                    <a href={`tel:${contact.mobile.replace(/\s/g, "")}`} className="hover:text-accent">
                      {contact.mobile}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <dt className="eyebrow w-20 shrink-0">Email</dt>
                  <dd className="text-[0.9375rem] text-steel-700">
                    <a href={`mailto:${contact.email}`} className="break-all hover:text-accent">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <ConfirmMarker>{office.note}</ConfirmMarker>
              </div>

              <ArrowLink href="/home3/contact" className="mt-8">
                Full contact details
              </ArrowLink>
            </div>

            {/*
              A schematic, not a map. Plotting pins on a real map would imply
              coordinates the sources do not give — the address is incomplete
              and several venues are named only by city.
            */}
            <div className="lg:col-span-7">
              <div className="card relative overflow-hidden p-8 md:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-steel-100)_1px,transparent_1px),linear-gradient(90deg,var(--color-steel-100)_1px,transparent_1px)] [background-size:52px_52px]"
                />
                <div className="relative">
                  <Eyebrow index="—">Operating base</Eyebrow>
                  <p className="t-heading mt-6 max-w-md text-ink text-balance">
                    Everything ships from one yard, on twenty owned vehicles.
                  </p>
                  <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-steel-600">
                    A single base is a constraint worth stating plainly: mobilisation distance is
                    real, and it is priced. What it buys in return is that the crew erecting a
                    structure in Haveri is the same crew that erected one in Bengaluru the week
                    before.
                  </p>

                  <div className="mt-12 flex flex-wrap gap-x-12 gap-y-8 border-t border-steel-200 pt-8">
                    <div>
                      <p className="eyebrow">Fleet</p>
                      <p className="mt-3 text-lg text-ink">20 own goods vehicles</p>
                    </div>
                    <div>
                      <p className="eyebrow">Crew</p>
                      <p className="mt-3 text-lg text-ink">460 in-house personnel</p>
                    </div>
                    <div>
                      <p className="eyebrow">Warehouse</p>
                      <p className="mt-3 text-lg text-steel-500">Pending confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Where work has been delivered                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell band">
        <Reveal>
          <SectionHead
            index="02"
            eyebrow="Delivered in"
            heading="Where the structures have actually gone up."
            standfirst="Each city below is backed by a project in the portfolio. Nothing on this page is a market we would merely like to serve."
            action={{ href: "/portfolio", label: "See the projects" }}
          />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {deliveredIn.map((region, i) => (
            <Reveal key={region.state} delay={i * 80}>
              <div className="border-t border-steel-300 pt-8">
                <h3 className="t-heading text-ink">{region.state}</h3>
                <ul className="mt-8 divide-y divide-steel-100">
                  {region.places.map((place) => (
                    <li key={place.city} className="py-5">
                      <p className="text-lg font-medium text-ink">{place.city}</p>
                      <p className="mt-2 text-sm leading-relaxed text-steel-600">{place.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-16 max-w-3xl">
          <p className="text-sm leading-relaxed text-steel-600">
            <span className="font-medium text-ink">Why this list is short.</span> It is built only
            from projects the catalogue and website evidence. The company describes itself as
            operating across India, and that is very likely true of far more places than these six
            — but a location earns its place here by having a project attached to it.
          </p>
        </Reveal>
      </section>

      <CTABand
        heading="Building outside these cities?"
        body="Mobilisation distance is a line in the quote, not a barrier. Tell us the site and we will price getting to it."
      />
    </>
  );
}
