import type { Metadata } from "next";
import { Masthead, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Eyebrow, Pill, SectionHead } from "@/components/site/Primitives";
import { featuredProject, projectCategories, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Portfolio — Raja Enterprises",
  description:
    "Executed work: national programmes inaugurated by the Prime Minister of India, the Karnataka Government swearing-in, the 86th Kannada Sahitya Sammelana, the 107th Indian Science Congress and the India International Trade Fair.",
};

export default function PortfolioPage() {
  const dated = projects.filter((p) => p.date && !p.dateWithheld).length;
  const withPhotography = [featuredProject, ...projects].filter((p) => p.image).length;

  return (
    <>
      <Masthead
        eyebrow="Portfolio"
        heading="Executed work."
        standfirst="Every project below appears in the company catalogue or on the company's own site. Where a date or a location is not established by either, it is left out rather than guessed at."
        aside={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-steel-200 pt-10">
            <div>
              <p className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                {projects.length + 1}
              </p>
              <p className="mt-2.5 text-sm text-steel-600">Projects published</p>
            </div>
            <div>
              <p className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                {dated}
              </p>
              <p className="mt-2.5 text-sm text-steel-600">With a confirmed date</p>
            </div>
            <div>
              <p className="text-[1.75rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                {withPhotography}
              </p>
              <p className="mt-2.5 text-sm text-steel-600">With catalogue photography</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => (
                <Pill key={category}>{category}</Pill>
              ))}
            </div>
          </div>
        }
      />

      {/* Feature */}
      <section className="shell">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProjectCard project={featuredProject} size="lg" priority />
            </div>
            <div className="lg:col-span-5 lg:pt-6">
              <Eyebrow>The strongest thing on this page</Eyebrow>
              <p className="t-heading mt-6 text-ink text-balance">
                Ground infrastructure for programmes inaugurated by the Hon&rsquo;ble Prime
                Minister of India.
              </p>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
                This is the credential that separates Raja Enterprises from a regional events
                contractor, and at present it appears nowhere on the company&rsquo;s website. It is
                documented in the catalogue across three separate programmes.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="shell band">
        <Reveal>
          <SectionHead
            eyebrow="All work"
            heading="Government, cultural, exhibition and corporate."
            standfirst="Grouped by nothing but chronology of evidence — the catalogue does not organise its project pages, so neither do we."
          />
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 80}>
              <ProjectCard project={project} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gaps */}
      <section className="border-t border-steel-100 bg-card">
        <div className="shell band">
          <Reveal className="max-w-3xl">
            <Eyebrow>For the owner</Eyebrow>
            <h2 className="t-display-l mt-7 text-ink text-balance">
              What is missing from this page.
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-steel-700">
              <p>
                The most recent dated project in the catalogue is May 2023. Anything executed
                since then is absent from this page simply because there is no source for it.
              </p>
              <p>
                Three projects — the Karnataka swearing-in, the Kempegowda inauguration and the
                Shivamogga airport inauguration — all carry the date 20 May 2023 in the catalogue,
                which cannot be correct for three separate events. Two of those publish without a
                date until the correct ones are supplied.
              </p>
              <p>
                Two further entries are marked in place above: the catalogue includes the
                photograph but does not itemise Raja Enterprises&rsquo; scope of work, so the site
                does not assert one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Recognise work that is missing here?"
        body="Send the event, the date and the photographs. Anything documented can go on this page; anything undocumented stays off it."
      />
    </>
  );
}
