import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";
import { projects } from "@/content/home1/projects";
import { ProjectMeta } from "@/components/home/SelectedWork";

export const metadata: Metadata = {
  title: "Work — Raja Enterprises",
  description:
    "State ceremonies, exhibitions and corporate events delivered across India, including programmes inaugurated by the Hon'ble Prime Minister of India.",
};

export default function WorkPage() {
  return (
    <PageStub index="01" name="Work" title="Executed.">
      <p className="t-body text-steel-700">
        The full index. Project pages, galleries and per-project deployment
        figures follow once the client supplies the source photography.
      </p>

      <div className="mt-14 flex flex-col">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="grid gap-4 border-t border-steel-200 py-8 md:grid-cols-12 md:items-baseline"
          >
            <div className="t-label text-steel-500 md:col-span-3">
              {project.type}
            </div>
            <h2 className="t-heading md:col-span-5">{project.title}</h2>
            <div className="md:col-span-4">
              <ProjectMeta project={project} compact />
            </div>
          </article>
        ))}
      </div>
    </PageStub>
  );
}
