import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/PageShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ArrowLink, Eyebrow, Rule, SectionHead } from "@/components/site/Primitives";
import { approach, company, credibility, keyFigures } from "@/content/company";
import { categories, headlineStock } from "@/content/inventory";
import { homepageProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Raja Enterprises — Event infrastructure since 1977",
  description:
    "Turnkey event management and infrastructure from Bengaluru. Imported German hangers, flooring, staging, stalls, power and climate, deployed across India by 460 in-house personnel.",
};

export default function HomePage() {
  // The three bento cards that carry photography, chosen for weight.
  const [structures, flooring, stalls, staging] = categories;

  return (
    <>
      <Hero />

      {/* ------------------------------------------------------------------ */}
      {/* Positioning + key figures                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell band-tight">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="01">Who we are</Eyebrow>
            <p className="t-display-l mt-7 text-ink text-balance">
              {company.positioning}
            </p>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5 lg:pt-3">
            <p className="text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
              {company.reach}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9">
              {keyFigures.map((figure) => (
                <div key={figure.label}>
                  <dt className="sr-only">{figure.label}</dt>
                  <dd className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                    {figure.value}
                  </dd>
                  <p className="mt-2.5 text-sm leading-snug text-steel-600">{figure.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Rule className="mt-16 md:mt-24" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Precision Execution at Scale — capability bento                    */}
      {/* ------------------------------------------------------------------ */}
      <section id="capabilities" className="shell band">
        <Reveal>
          <SectionHead
            index="02"
            eyebrow="Capabilities"
            heading="Precision execution at scale."
            standfirst="Every quantity below is held as owned stock, not hired in. These are the figures from the catalogue's inventory schedule, unrounded."
            align="center"
          />
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* Flagship — structures */}
          <Reveal className="lg:col-span-8">
            <Link
              href="/home3/inventory#structures"
              className="card group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden p-8 md:min-h-[480px] md:p-11"
            >
              <div className="absolute inset-0">
                <Image
                  src={structures.image!}
                  alt={structures.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,14,0.92)_0%,rgba(10,12,14,0.55)_38%,rgba(10,12,14,0.12)_70%)]"
                />
              </div>

              <div className="relative">
                <p className="eyebrow text-white/70">
                  <span className="text-white">{structures.index}</span>
                  <span aria-hidden className="mx-3 inline-block h-px w-6 align-middle bg-white/40" />
                  {structures.kicker}
                </p>
                <h3 className="t-heading mt-5 max-w-lg text-white">{structures.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                  {structures.detail}
                </p>
                <p className="mt-7 text-[2.25rem] leading-none tracking-[-0.03em] text-white tabular-nums">
                  5
                  <span className="ml-2 text-[0.35em] font-medium uppercase tracking-[0.16em] text-white/70">
                    Lakh Sft in stock
                  </span>
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Inventory schedule extract */}
          <Reveal delay={80} className="lg:col-span-4">
            <div className="card flex h-full min-h-[420px] flex-col p-8 md:min-h-[480px] md:p-10">
              <Eyebrow index={flooring.index}>Held in stock</Eyebrow>
              <h3 className="t-heading mt-5 text-ink">The inventory schedule</h3>

              <dl className="mt-9 flex-1 divide-y divide-steel-200">
                {headlineStock.map((row) => (
                  <div key={row.item} className="flex items-baseline justify-between gap-4 py-4">
                    <dt className="text-sm leading-snug text-steel-600">{row.item}</dt>
                    <dd className="shrink-0 text-right text-[1.0625rem] font-medium text-ink tabular-nums">
                      {row.figure}
                      <span className="ml-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-steel-500">
                        {row.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <ArrowLink href="/home3/inventory" className="mt-8">
                Full schedule
              </ArrowLink>
            </div>
          </Reveal>

          {/* Stalls */}
          <Reveal delay={40} className="lg:col-span-6">
            <Link
              href="/home3/inventory#stalls-interiors"
              className="card group relative flex min-h-[340px] flex-col overflow-hidden md:min-h-[380px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={stalls.image!}
                  alt={stalls.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-9">
                <Eyebrow index={stalls.index}>{stalls.kicker}</Eyebrow>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors group-hover:text-accent">
                  {stalls.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{stalls.summary}</p>
              </div>
            </Link>
          </Reveal>

          {/* Staging & seating */}
          <Reveal delay={120} className="lg:col-span-6">
            <Link
              href="/home3/inventory#stage-seating"
              className="card group relative flex min-h-[340px] flex-col overflow-hidden md:min-h-[380px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={staging.image!}
                  alt={staging.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-9">
                <Eyebrow index={staging.index}>{staging.kicker}</Eyebrow>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors group-hover:text-accent">
                  {staging.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{staging.summary}</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Credibility band                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-steel-100 bg-card">
        <div className="shell band">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow index="03">{credibility.eyebrow}</Eyebrow>
              <h2 className="t-display-l mt-7 text-ink text-balance">{credibility.statement}</h2>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
                {credibility.detail}
              </p>
              <ArrowLink href="/home3/portfolio" className="mt-9">
                See the executed work
              </ArrowLink>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-steel-100">
                <Image
                  src={credibility.image}
                  alt={credibility.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Selected work                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell band">
        <Reveal>
          <SectionHead
            index="04"
            eyebrow="Selected work"
            heading="Notable events."
            standfirst="Government programmes, state ceremonies and national exhibitions, each drawn from the company catalogue."
            action={{ href: "/home3/portfolio", label: "View all work" }}
          />
        </Reveal>

        {/* The Prime Ministerial project is deliberately absent here — the
            credibility band directly above already carries it, and running the
            same photograph twice in one scroll reads as thin material. */}
        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {homepageProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Legacy / approach                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-steel-100">
        <div className="shell band">
          <Reveal>
            <SectionHead
              index="05"
              eyebrow="Since 1977"
              heading="Forty-eight years of putting structures on open ground."
              standfirst="Raja Enterprises owns what it deploys — the stock, the crew and the vehicles that move them. That is the whole argument, and it is the reason the work below holds to fixed dates."
              action={{ href: "/home3/legacy", label: "Read the legacy" }}
            />
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {approach.map((item, i) => (
              <Reveal key={item.index} delay={i * 70}>
                <div className="border-t border-steel-200 pt-7">
                  <p className="eyebrow text-accent">{item.index}</p>
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

      <CTABand />
    </>
  );
}
