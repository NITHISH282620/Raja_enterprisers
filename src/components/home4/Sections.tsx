import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/motion/ParallaxMedia";
import { CountUp } from "@/components/site/motion/CountUp";
import {
  capabilities,
  closing,
  positioning,
  scaleFigures,
  selectedWork,
  yearsInOperation,
} from "@/content/home4";

/**
 * The middle of the page.
 *
 * These sections were the ones carrying the density problem on /home3: a
 * flagship card, an inventory schedule and a four-up card grid were all
 * competing inside a single band. The fix is not smaller cards — it is fewer
 * containers. Capabilities is now one repeating full-width row, and the
 * schedule has gone to the inventory page where a reader who wants it can find
 * it. Fewer elements, more photograph.
 */

/* ------------------------------------------------------------------------ */
/* 02 — Positioning                                                          */
/* ------------------------------------------------------------------------ */

export function Positioning() {
  return (
    <section className="h4-shell h4-band">
      <div className="h4-content lg:pl-[8.333%]">
        <Reveal>
          <p className="h4-label text-steel-500">{positioning.label}</p>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="h4-display-2 mt-8 max-w-3xl text-ink text-balance">
            {positioning.statement}
          </h2>
        </Reveal>

        <Reveal delay={130}>
          <div className="mt-10 max-w-2xl space-y-6">
            {positioning.body.map((p) => (
              <p key={p.slice(0, 24)} className="h4-body text-steel-700 text-pretty">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <hr className="h4-rule mt-14 max-w-2xl" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 03 — Capabilities                                                         */
/* ------------------------------------------------------------------------ */

export function Capabilities() {
  return (
    <section id="capabilities" className="h4-shell h4-band-tight scroll-mt-24">
      <Reveal>
        <p className="h4-label text-steel-500">Capabilities</p>
      </Reveal>

      <div className="mt-14">
        {capabilities.map((c, i) => {
          const imageFirst = i % 2 === 1;
          return (
            <Reveal key={c.label}>
              {/* Full-width row, not a card. The only division between one
                  capability and the next is a hairline and a lot of air. */}
              <article className="grid items-center gap-10 border-t border-steel-100 py-14 lg:grid-cols-12 lg:gap-16 lg:py-24">
                <div className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : ""}`}>
                  <p className="h4-label text-accent">{c.label}</p>
                  <h3 className="h4-display-2 mt-6 text-ink text-balance">{c.title}</h3>
                  <p className="h4-body mt-6 max-w-lg text-steel-700 text-pretty">{c.body}</p>

                  <div className="mt-9 border-t border-steel-200 pt-5">
                    <p className="h4-figure text-ink">{c.figure}</p>
                    <p className="h4-label mt-3 text-steel-500">{c.figureLabel}</p>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : ""}`}>
                  <div className="h4-frame group aspect-[3/2] w-full">
                    <ParallaxMedia distance={16}>
                      <Image
                        src={c.image}
                        alt={c.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="media-in object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
                      />
                    </ParallaxMedia>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 04 — Selected work                                                        */
/* ------------------------------------------------------------------------ */

export function SelectedWork() {
  return (
    <section id="work" className="h4-band-tight scroll-mt-24">
      <div className="h4-shell">
        <Reveal>
          <p className="h4-label text-steel-500">Selected work</p>
        </Reveal>
        <Reveal delay={70}>
          <h2 className="h4-display-2 mt-8 max-w-2xl text-ink text-balance">
            Executed jobs, with the date and the ground they stood on.
          </h2>
        </Reveal>
      </div>

      <div className="h4-shell mt-16">
        {/* Asymmetric on purpose: 7/5 then 5/7, so the eye is never walking
            down a column of identical tiles. */}
        <div className="grid gap-x-16 gap-y-20 lg:grid-cols-12">
          {selectedWork.map((p, i) => {
            const wide = i % 3 === 0;
            return (
              <Reveal
                key={p.event}
                delay={(i % 2) * 80}
                className={wide ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article className="group">
                  <div
                    className={`h4-frame w-full ${wide ? "aspect-[3/2]" : "aspect-[4/5]"}`}
                  >
                    <ParallaxMedia distance={14}>
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 50vw, 45vw"
                        className="media-in object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
                      />
                    </ParallaxMedia>
                  </div>

                  {/* Metadata as a definition list — it is a record, and a
                      record has fields. A year that is not established is an
                      absent row, never a "TBC". */}
                  <div className="mt-7 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                    <h3 className="h4-heading text-ink text-pretty">{p.event}</h3>
                    <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-steel-100 pt-5 sm:grid-cols-3">
                      <div>
                        <dt className="h4-label text-steel-400">Client</dt>
                        <dd className="mt-2 text-[0.9375rem] text-steel-700">{p.client}</dd>
                      </div>
                      {p.year && (
                        <div>
                          <dt className="h4-label text-steel-400">Year</dt>
                          <dd className="mt-2 text-[0.9375rem] text-steel-700 tabular-nums">
                            {p.year}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="h4-label text-steel-400">Location</dt>
                        <dd className="mt-2 text-[0.9375rem] text-steel-700">{p.location}</dd>
                      </div>
                    </dl>
                    <p className="h4-caption mt-5 text-steel-600">{p.scope}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 05 — Scale                                                                */
/* ------------------------------------------------------------------------ */

export function Scale() {
  // Computed at render on the server, so it is right in 2027 without anyone
  // remembering to edit it.
  const years = String(yearsInOperation());

  return (
    <section className="border-y border-steel-100 bg-card">
      <div className="h4-shell h4-band">
        <Reveal>
          <p className="h4-label text-steel-500">Scale</p>
        </Reveal>
        <Reveal delay={70}>
          <h2 className="h4-display-2 mt-8 max-w-2xl text-ink text-balance">
            Owned, not hired in.
          </h2>
        </Reveal>

        <dl className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {scaleFigures.map((f, i) => {
            const value = f.value ?? years;
            return (
              <Reveal key={f.label} delay={Math.min(i, 4) * 60}>
                <div className="border-t border-steel-300 pt-6">
                  <dd className="h4-figure text-ink">
                    {f.count ? <CountUp value={value} /> : value}
                  </dd>
                  <dt className="h4-label mt-5 text-steel-600">{f.label}</dt>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 08 — Closing                                                              */
/* ------------------------------------------------------------------------ */

export function Closing() {
  return (
    <section className="bg-ink text-paper">
      <div className="h4-shell h4-band">
        <Reveal>
          <h2 className="h4-display-1 max-w-3xl text-paper text-balance">
            {closing.statement}
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="h4-lead mt-8 max-w-xl text-steel-200 text-pretty">{closing.body}</p>
        </Reveal>
        <Reveal delay={150}>
          {/* One action. The previous band offered a button and a phone number
              and made the reader choose between them. */}
          <Link
            href={closing.action.href}
            className="cta-arrow mt-12 inline-flex items-center gap-2 rounded-sm bg-paper px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-paper"
          >
            {closing.action.label}
            <span aria-hidden className="cta-arrow__glyph">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
