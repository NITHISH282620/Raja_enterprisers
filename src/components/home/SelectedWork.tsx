import Image from "next/image";
import Link from "next/link";
import { featuredProject, supportingProjects, type Project } from "@/content/home1/projects";
import { SectionIndex } from "@/components/primitives/SectionIndex";
import { Rule } from "@/components/primitives/Rule";

/**
 * Editorial feature + supporting projects (plan §4).
 *
 * `INFRASTRUCTURE DEPLOYED` is the field that does the work — it turns a
 * photograph into evidence of execution. It renders only where the source
 * documents it; it is never estimated.
 */
export function SelectedWork() {
  return (
    <section className="bg-paper">
      <div className="shell py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionIndex index="02" name="Selected work" />
            <h2 className="t-display-l mt-8 max-w-[16ch]">
              We have actually executed this.
            </h2>
          </div>
          <Link href="/work" className="t-label group inline-flex items-center gap-2 text-brand">
            All work
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <article className="mt-14">
          <figure className="relative aspect-[16/9] overflow-hidden bg-graphite">
            <Image
              src="/media/projects/indian-science-congress.jpeg"
              alt="Large-format conference build with staged seating under structure"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </figure>

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <h3 className="t-heading md:col-span-7">{featuredProject.title}</h3>
            <div className="md:col-span-5">
              <ProjectMeta project={featuredProject} />
            </div>
          </div>
        </article>

        <Rule className="mt-16" />

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {supportingProjects.map((project) => (
            <article key={project.slug}>
              <div className="t-label text-steel-500">{project.type}</div>
              <h4 className="t-heading mt-4">{project.title}</h4>
              <div className="mt-4">
                <ProjectMeta project={project} compact />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectMeta({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const rows: { label: string; value: string }[] = [];

  if (project.location) rows.push({ label: "Location", value: project.location });
  if (!compact) rows.push({ label: "Type", value: project.type });
  if (project.date) rows.push({ label: "Date", value: project.date });
  if (project.deployed?.length) {
    rows.push({ label: "Deployed", value: project.deployed.join(", ") });
  }

  return (
    <dl className="flex flex-col">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-6 border-b border-steel-200 py-3"
        >
          <dt className="t-label text-steel-500">{row.label}</dt>
          <dd className="t-body text-right text-sm text-steel-700">{row.value}</dd>
        </div>
      ))}
      {/* Date deliberately absent — the brochure's date is unreliable for this
          project, so we stay silent rather than guess (source-of-truth §5). */}
    </dl>
  );
}
