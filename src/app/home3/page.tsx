import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/PageShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { AssetStage } from "@/components/three/AssetStage";
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
  const flooring = categories.find((c) => c.slug === "flooring-platforms")!;
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
      {/* Precision Execution at Scale — capability pop-out grid             */}
      {/* ------------------------------------------------------------------ */}
      <section id="capabilities" className="shell band-tight pb-24 overflow-visible">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="t-display-l text-ink">Precision Execution at Scale.</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-600 text-balance">
              Experts in organizing government programs, trade fairs, exhibitions, conferences, roadshows, and business forums across India. Our approach treats every project with architectural rigor.
            </p>
          </div>
        </Reveal>

        {/* Top Tier: 3 Cards */}
        <div className="mt-28 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Flagship — German Hangers */}
          <Reveal className="h-full">
            <Link
              href="/home3/inventory#structures"
              className="capability-card card group relative flex h-full flex-col bg-[#f8f9fa] border border-steel-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e7e8] flex items-center justify-center p-6 lg:p-10">
                <Image
                  src="/media/raja/inventory/german-hanger-3d.jpg"
                  alt="Premium Röder German Hanger Structure"
                  fill
                  priority
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05] mix-blend-multiply contrast-[1.05]"
                />
              </div>

              <div className="flex flex-col flex-1 px-8 py-8 lg:px-10 lg:py-10 text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.16em] text-steel-500 uppercase flex items-center">
                  <span className="text-ink mr-3 font-bold text-sm">01</span>
                  <span className="w-8 h-px bg-steel-300 mr-3 transition-all duration-500 group-hover:w-12"></span>
                  OWNED INVENTORY
                </p>
                <h3 className="t-heading mt-5 text-ink text-[1.75rem] font-medium leading-tight group-hover:text-accent transition-colors">Turnkey Event Infrastructure</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600 font-medium text-pretty">
                  {structures.detail}
                </p>
                <div className="mt-8 flex items-baseline">
                  <span className="text-[3.5rem] leading-none tracking-[-0.03em] text-ink font-light">5</span>
                  <span className="ml-3 text-[0.8rem] font-bold tracking-[0.16em] text-steel-500 uppercase">LAKH SFT IN STOCK</span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Authentic Röder */}
          <Reveal delay={40} className="h-full">
            <div className="card group relative flex h-full flex-col bg-[#f8f9fa] border border-steel-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
              <div className="relative w-full aspect-[4/3] bg-[#e5e7e8] flex items-center justify-center p-6 lg:p-10">
                 <div className="absolute inset-x-0 bottom-0 top-0 mix-blend-multiply opacity-90 transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05]">
                   <AssetStage kind="hanger" className="w-full h-full scale-[1.1] origin-bottom" lazy={false} />
                 </div>
              </div>
              <div className="flex flex-col flex-1 px-8 py-8 lg:px-10 lg:py-10 text-left relative z-10">
                <p className="text-[0.65rem] font-bold tracking-[0.16em] text-steel-500 uppercase flex items-center">
                  <span className="text-ink mr-3 font-bold text-sm">02</span>
                  <span className="w-8 h-px bg-steel-300 mr-3 transition-all duration-500 group-hover:w-12"></span>
                  GLOBAL STANDARDS
                </p>
                <h3 className="t-heading mt-5 text-ink text-[1.75rem] font-medium leading-tight group-hover:text-accent transition-colors">Authentic Röder Tents</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600 font-medium text-pretty">
                  Imported specifically to ensure the highest global standards for wind resistance, structural integrity, and premium aesthetic finish.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Inventory schedule */}
          <Reveal delay={80} className="md:col-span-2 lg:col-span-1 h-full">
            <div className="card flex h-full flex-col bg-[#f4f5f6] border border-steel-100 p-8 lg:px-10 lg:py-12 rounded-3xl lg:mt-8">
              <Eyebrow>Held in stock</Eyebrow>
              <h3 className="t-heading mt-4 text-ink text-2xl lg:text-3xl">The inventory schedule</h3>

              <dl className="mt-8 flex-1 divide-y divide-steel-200">
                {headlineStock.map((row) => (
                  <div key={row.item} className="flex items-center justify-between gap-4 py-4">
                    <dt className="text-[0.9375rem] font-medium leading-relaxed text-steel-600">{row.item}</dt>
                    <dd className="shrink-0 text-right text-lg font-bold text-ink tabular-nums">
                      {row.figure}
                      <span className="ml-2 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-steel-500">
                        {row.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <ArrowLink href="/home3/inventory" className="mt-8 text-xs font-bold tracking-[0.16em] uppercase text-accent">
                Full schedule
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        {/* Bottom Tier: 4 Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 01: Wooden Floor */}
          <Reveal delay={0}>
            <Link
              href="/home3/inventory#wooden-floors"
              className="capability-card card group relative flex h-full flex-col bg-[#f8f9fa] border border-steel-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e7e8] flex items-center justify-center p-6">
                <Image
                  src="/media/raja/inventory/wooden-floor-3d.jpg"
                  alt="Wooden Floor Platforms"
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05] mix-blend-multiply contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col flex-1 px-8 py-8 text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.16em] text-steel-500 uppercase flex items-center">
                  <span className="w-6 h-px bg-steel-300 mr-3 transition-all duration-500 group-hover:w-10"></span>
                  10 LAKH SFT
                </p>
                <h3 className="t-heading mt-3 text-ink text-xl font-medium group-hover:text-accent transition-colors">
                  Wooden Floor Platforms
                </h3>
              </div>
            </Link>
          </Reveal>

          {/* Card 02: Octonorm Stalls */}
          <Reveal delay={70}>
            <Link
              href="/home3/inventory#octonorm-stalls"
              className="capability-card card group relative flex h-full flex-col bg-[#f8f9fa] border border-steel-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e7e8] flex items-center justify-center p-6">
                <Image
                  src="/media/raja/inventory/octonorm-stalls-3d.jpg"
                  alt="Octonorm & Maxima Stalls"
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05] mix-blend-multiply contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col flex-1 px-8 py-8 text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.16em] text-steel-500 uppercase flex items-center">
                  <span className="w-6 h-px bg-steel-300 mr-3 transition-all duration-500 group-hover:w-10"></span>
                  15,000 SQMTR
                </p>
                <h3 className="t-heading mt-3 text-ink text-xl font-medium group-hover:text-accent transition-colors">
                  Octonorm & Maxima Stalls
                </h3>
              </div>
            </Link>
          </Reveal>

          {/* Card 03: Lighting & AV */}
          <Reveal delay={140}>
            <Link
              href="/home3/inventory#lighting-av"
              className="capability-card card group relative flex h-full flex-col bg-[#f8f9fa] border border-steel-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e7e8] flex items-center justify-center p-6">
                <Image
                  src="/media/raja/inventory/lighting-av-multi-3d.jpg"
                  alt="Lighting & AV Solutions"
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05] mix-blend-multiply contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col flex-1 px-8 py-8 text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.16em] text-steel-500 uppercase flex items-center">
                  <span className="w-6 h-px bg-steel-300 mr-3 transition-all duration-500 group-hover:w-10"></span>
                  TURNKEY AV
                </p>
                <h3 className="t-heading mt-3 text-ink text-xl font-medium group-hover:text-accent transition-colors">
                  Lighting & AV Solutions
                </h3>
              </div>
            </Link>
          </Reveal>

          {/* Card 04: AC */}
          <Reveal delay={210}>
            <Link
              href="/home3/inventory#air-conditioning"
              className="capability-card card group relative flex h-full flex-col bg-[#f8f9fa] border border-steel-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e7e8] flex items-center justify-center p-6">
                <Image
                  src="/media/raja/inventory/ac-unit-3d.jpg"
                  alt="Industrial AC Unit"
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05] mix-blend-multiply contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col flex-1 px-8 py-8 text-left">
                <p className="text-[0.65rem] font-bold tracking-[0.16em] text-steel-500 uppercase flex items-center">
                  <span className="w-6 h-px bg-steel-300 mr-3 transition-all duration-500 group-hover:w-10"></span>
                  3,000 TONS
                </p>
                <h3 className="t-heading mt-3 text-ink text-xl font-medium group-hover:text-accent transition-colors">
                  Air-conditioning
                </h3>
              </div>
            </Link>
          </Reveal>
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
