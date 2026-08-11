import Image from "next/image";
import type { Project } from "@/content/projects";
import { ConfirmMarker, Pill } from "./Primitives";

/**
 * One executed project.
 *
 * The card renders only the metadata a source establishes. Where a date or a
 * location is unknown the row is simply absent — there is no "TBC" filler and
 * no invented year. Where the catalogue lists an event but does not establish
 * the scope of work, the card says so out loud.
 */
export function ProjectCard({
  project,
  priority = false,
  size = "md",
}: {
  project: Project;
  priority?: boolean;
  size?: "md" | "lg";
}) {
  const meta = [project.date, project.location].filter(Boolean) as string[];

  return (
    <article className="group flex h-full flex-col">
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-card ${
          size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            priority={priority}
            sizes={
              size === "lg"
                ? "(max-width: 1024px) 100vw, 60vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <p className="eyebrow">Photography pending</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Pill>{project.category}</Pill>
          {meta.length > 0 && (
            <span className="text-[0.8125rem] text-steel-500">{meta.join(" · ")}</span>
          )}
        </div>

        <h3
          className={`mt-4 text-ink text-pretty ${
            size === "lg" ? "t-heading" : "text-lg font-medium leading-snug"
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-steel-600 text-pretty">
          {project.description}
        </p>

        {project.deployed && project.deployed.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
            {project.deployed.map((item) => (
              <li
                key={item}
                className="rounded-sm bg-card px-2.5 py-1.5 text-[0.75rem] text-steel-600"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.dateWithheld && (
          <p className="mt-5 text-[0.8125rem] leading-snug text-steel-500">
            Date withheld — {project.evidence ?? "the catalogue's date for this event is unreliable."}
          </p>
        )}

        {project.confidence === "needs-confirmation" && (
          <div className="mt-5">
            <ConfirmMarker>{project.evidence}</ConfirmMarker>
          </div>
        )}
      </div>
    </article>
  );
}
