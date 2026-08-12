import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/PageShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { ArrowLink, Eyebrow, Rule, SectionHead } from "@/components/site/Primitives";
import { approach, company, credibility, keyFigures } from "@/content/company";
import { categories, headlineStock } from "@/content/inventory";
import { homepageProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Raja Enterprises — Event infrastructure since 1977",
  description:
    "Turnkey event management and infrastructure across India. Imported German hangers, flooring, staging, stalls, power and climate, deployed pan-India by 460 in-house personnel. Headquartered in Bengaluru. Established 1977.",
};

export default function HomePage() {
  // Extract specific categories for the bento grid
  const structures = categories.find((c) => c.slug === "structures")!;
  const stalls = categories.find((c) => c.slug === "stalls-interiors")!;
  const staging = categories.find((c) => c.slug === "stage-seating")!;
  const catering = categories.find((c) => c.slug === "catering")!;

  return (
    <>
      <Hero />

      {/* ------------------------------------------------------------------ */}
      {/* Clients marquee                                                     */}
      {/* ------------------------------------------------------------------ */}
      <ClientMarquee />

      {/* ------------------------------------------------------------------ */}
      {/* Positioning + key figures                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell band-tight">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Who we are</Eyebrow>
            <p className="t-display-l mt-5 text-ink text-balance">
              {company.positioning}
            </p>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5 lg:pt-2">
            <p className="text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
              {company.reach}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
              {keyFigures.map((figure) => (
                <div key={figure.label}>
                  <dt className="sr-only">{figure.label}</dt>
                  <dd className="text-4xl lg:text-[3rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                    {figure.value}
                  </dd>
                  <p className="mt-3 text-sm font-medium leading-snug text-steel-600">{figure.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Rule className="mt-10 md:mt-14" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Precision Execution at Scale — capability bento                    */}
      {/* ------------------------------------------------------------------ */}
      <section id="capabilities" className="shell band-tight">
        <Reveal>
          <SectionHead
            eyebrow="Capabilities"
            heading="Precision execution at scale."
            standfirst="Every quantity below is held as owned stock, not hired in. These are the figures from the catalogue's inventory schedule, unrounded."
            align="center"
          />
        </Reveal>

        {/* Top Tier: Flagship + Inventory Schedule */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Flagship — structures */}
          <Reveal className="lg:col-span-8">
            <Link
              href="/home3/inventory#structures"
              className="card group relative flex h-full min-h-[400px] flex-col justify-end overflow-hidden p-8 lg:min-h-[560px] lg:p-12"
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
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,14,0.85)_0%,rgba(10,12,14,0.4)_40%,rgba(10,12,14,0.05)_75%)]"
                />
              </div>

              <div className="relative transform transition-transform duration-[800ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-2">
                <p className="eyebrow text-white/75">
                  <span className="text-white">01</span>
                  <span aria-hidden className="mx-3 inline-block h-px w-6 align-middle bg-white/40 transition-all duration-700 group-hover:w-10" />
                  OWNED INVENTORY
                </p>
                <h3 className="t-heading mt-5 max-w-xl text-white md:text-3xl lg:text-4xl">Turnkey Event Infrastructure</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
                  {structures.detail}
                </p>
                <p className="mt-8 text-4xl leading-none tracking-[-0.03em] text-white tabular-nums md:text-5xl lg:text-6xl">
                  5
                  <span className="ml-3 text-[0.3em] font-medium uppercase tracking-[0.16em] text-white/70">
                    Lakh Sft in stock
                  </span>
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Inventory schedule extract */}
          <Reveal delay={80} className="lg:col-span-4">
            <div className="card flex h-full min-h-[400px] flex-col p-8 lg:min-h-[560px] lg:p-11">
              <Eyebrow>Held in stock</Eyebrow>
              <h3 className="t-heading mt-5 text-ink md:text-3xl lg:text-4xl">The inventory schedule</h3>

              <dl className="mt-9 flex-1 divide-y divide-steel-200">
                {headlineStock.map((row) => (
                  <div key={row.item} className="flex items-baseline justify-between gap-4 py-4">
                    <dt className="text-sm leading-relaxed text-steel-600 md:text-base">{row.item}</dt>
                    <dd className="shrink-0 text-right text-lg font-medium text-ink tabular-nums md:text-xl">
                      {row.figure}
                      <span className="ml-2 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-steel-500">
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
        </div>

        {/* Bottom Tier: 4-Card Capability Grid */}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 01: Fabrication */}
          <Reveal delay={0}>
            <Link
              href="/home3/inventory#stalls-interiors"
              className="capability-card card group relative flex min-h-[360px] flex-col overflow-hidden lg:min-h-[440px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={stalls.image!}
                  alt={stalls.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="media-in object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
                />
              </div>
              <div className="p-7 transform transition-transform duration-[800ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                <Eyebrow>FABRICATION</Eyebrow>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors group-hover:text-accent lg:text-2xl">
                  {stalls.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{stalls.summary}</p>
              </div>
            </Link>
          </Reveal>

          {/* Card 02: Audience */}
          <Reveal delay={70}>
            <Link
              href="/home3/inventory#stage-seating"
              className="capability-card card group relative flex min-h-[360px] flex-col overflow-hidden lg:min-h-[440px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={staging.image!}
                  alt={staging.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="media-in object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
                />
              </div>
              <div className="p-7 transform transition-transform duration-[800ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                <Eyebrow>AUDIENCE</Eyebrow>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors group-hover:text-accent lg:text-2xl">
                  {staging.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{staging.summary}</p>
              </div>
            </Link>
          </Reveal>

          {/* Card 03: Infrastructure */}
          <Reveal delay={140}>
            <Link
              href="/home3/inventory#structures"
              className="capability-card card group relative flex min-h-[360px] flex-col overflow-hidden lg:min-h-[440px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={structures.image!}
                  alt={structures.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="media-in object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
                />
              </div>
              <div className="p-7 transform transition-transform duration-[800ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                <Eyebrow>INFRASTRUCTURE</Eyebrow>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors group-hover:text-accent lg:text-2xl">
                  {structures.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{structures.summary}</p>
              </div>
            </Link>
          </Reveal>

          {/* Card 04: Services */}
          <Reveal delay={210}>
            <Link
              href="/home3/inventory#catering"
              className="capability-card card group relative flex min-h-[360px] flex-col overflow-hidden lg:min-h-[440px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={catering.image!}
                  alt={catering.imageAlt!}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="media-in object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
                />
              </div>
              <div className="p-7 transform transition-transform duration-[800ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                <Eyebrow>SERVICES</Eyebrow>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors group-hover:text-accent lg:text-2xl">
                  Catering & Event Support
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{catering.summary}</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Credibility band                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-steel-100 bg-card">
        <div className="shell band-tight">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{credibility.eyebrow}</Eyebrow>
              <h2 className="t-display-l mt-5 text-ink text-balance">{credibility.statement}</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
                {credibility.detail}
              </p>
              <ArrowLink href="/home3/portfolio" className="mt-7">
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
      <section className="shell band-tight">
        <Reveal>
          <SectionHead
            eyebrow="Selected work"
            heading="Notable events."
            standfirst="Government programmes, state ceremonies and national exhibitions, each drawn from the company catalogue."
            action={{ href: "/home3/portfolio", label: "View all work" }}
          />
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
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
        <div className="shell band-tight">
          <Reveal>
            <SectionHead
              eyebrow="Since 1977"
              heading="Forty-eight years of putting structures on open ground."
              standfirst="Raja Enterprises owns what it deploys — the stock, the crew and the vehicles that move them. That is the whole argument, and it is the reason the work below holds to fixed dates."
              action={{ href: "/home3/legacy", label: "Read the legacy" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
            {approach.map((item, i) => (
              <Reveal key={item.index} delay={i * 70}>
                <div className="border-t border-steel-200 pt-8">
                  <h3 className="mt-5 text-xl font-medium leading-snug text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-steel-600 text-pretty md:text-base">
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
