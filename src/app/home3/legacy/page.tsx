import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Masthead, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/motion/ParallaxMedia";
import { CountUp } from "@/components/site/motion/CountUp";
import { ArrowLink, Eyebrow, Pill, SectionHead } from "@/components/site/Primitives";
import { approach, company, credibility } from "@/content/company";
import { chapters, legacyIntro } from "@/content/legacy";
import { projects, featuredProject } from "@/content/projects";

export const metadata: Metadata = {
  title: "Legacy — Raja Enterprises, established 1977",
  description:
    "Established in 1977 in Bengaluru. How Raja Enterprises evolved through infrastructure, events, exhibitions, government programmes, corporate events and turnkey execution.",
};

const allProjects = [featuredProject, ...projects];

export default function LegacyPage() {
  return (
    <>
      <Masthead
        eyebrow={legacyIntro.eyebrow}
        heading={legacyIntro.heading}
        standfirst={legacyIntro.body[0]}
        aside={
          <div className="grid gap-10 border-t border-steel-200 pt-10 lg:grid-cols-12 lg:gap-16">
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-steel-700 text-pretty lg:col-span-7">
              {legacyIntro.body[1]}
            </p>
            <dl className="grid grid-cols-3 gap-6 lg:col-span-5">
              <div>
                <dt className="sr-only">Established</dt>
                <dd className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                  <CountUp value={String(company.established)} />
                </dd>
                <p className="mt-2.5 text-sm text-steel-600">Established</p>
              </div>
              <div>
                <dt className="sr-only">Years in operation</dt>
                <dd className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                  <CountUp value="48" />
                </dd>
                <p className="mt-2.5 text-sm text-steel-600">Years in operation</p>
              </div>
              <div>
                <dt className="sr-only">In-house personnel</dt>
                <dd className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                  <CountUp value="460" />
                </dd>
                <p className="mt-2.5 text-sm text-steel-600">In-house personnel</p>
              </div>
            </dl>
          </div>
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Six chapters — the evolution, by capability                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell">
        <Reveal>
          <SectionHead
            eyebrow="The evolution"
            heading="Six lines of work, in the catalogue's own terms."
            standfirst="Only two things are dated in the sources: the founding, and the individual projects. So this reads as capability rather than as a timeline of years we cannot evidence."
          />
        </Reveal>

        <div className="mt-16">
          {chapters.map((chapter, i) => {
            const evidence = allProjects.find((p) => p.slug === chapter.evidence);
            return (
              <Reveal key={chapter.index} delay={(i % 2) * 60}>
                <article className="grid items-center gap-10 border-t border-steel-100 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
                  <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Eyebrow>Line of work</Eyebrow>
                    <h3 className="t-heading mt-6 text-ink text-balance">{chapter.title}</h3>
                    <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
                      {chapter.body}
                    </p>

                    <ul className="mt-8 flex flex-wrap gap-2">
                      {chapter.terms.map((term) => (
                        <li key={term}>
                          <Pill>{term}</Pill>
                        </li>
                      ))}
                    </ul>

                    {evidence && (
                      <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-steel-600">
                        <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-steel-500">
                          Evidenced by
                        </span>
                        <Link
                          href="/home3/portfolio"
                          className="mt-2 inline-block font-medium text-ink transition-colors hover:text-accent"
                        >
                          {evidence.title}
                        </Link>
                        {evidence.date && (
                          <span className="text-steel-500"> · {evidence.date}</span>
                        )}
                      </p>
                    )}
                  </div>

                  <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-card">
                      <ParallaxMedia distance={16}>
                        <Image
                          src={chapter.image}
                          alt={chapter.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="media-in object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
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

      {/* ------------------------------------------------------------------ */}
      {/* How we work                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-steel-100 bg-card">
        <div className="shell band">
          <Reveal>
            <SectionHead
              eyebrow="How we work"
              heading="Four things that have not changed."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {approach.map((item, i) => (
              <Reveal key={item.index} delay={i * 70}>
                <div className="border-t border-steel-300 pt-7">
                  <h3 className="mt-5 text-lg font-medium leading-snug text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-steel-600 text-pretty">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Credibility                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell band">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-card">
              <ParallaxMedia distance={16}>
                <Image
                  src={credibility.image}
                  alt={credibility.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="media-in object-cover"
                />
              </ParallaxMedia>
            </div>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5">
            <Eyebrow>{credibility.eyebrow}</Eyebrow>
            <h2 className="t-display-l mt-7 text-ink text-balance">{credibility.statement}</h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
              {credibility.detail}
            </p>
            <ArrowLink href="/home3/portfolio" className="mt-9">
              See the executed work
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Forty-eight years, and the file is thin."
        body="Much of this history exists only as photographs in a PDF. If there are older projects, awards or associations worth recording, they belong on this page."
      />
    </>
  );
}
