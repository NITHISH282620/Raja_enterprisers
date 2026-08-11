"use client";

import Image from "next/image";
import Link from "next/link";

export function Home2Projects() {
  const displayProjects = [
    { title: "107th Indian Science Congress", image: "/media/projects/indian-science-congress.jpeg", tag: "GOVERNMENT EVENT" },
    { title: "Global Investors Summit", image: "/media/projects/cabinet-meeting.jpeg", tag: "CORPORATE FORUM" },
    { title: "DS Max Anniversary", image: "/media/projects/bhima-diamonds.jpg", tag: "CORPORATE CELEBRATION" },
  ];

  return (
    <section id="portfolio" className="w-full bg-white py-24">
      <div className="w-full px-6 md:px-12 xl:px-24 mx-auto max-w-[1920px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-[2rem] font-medium tracking-tight text-ink mb-4">
              Notable Events.
            </h2>
            <p className="text-steel-600 text-sm">
              Flawless execution for high-stakes government and corporate gatherings.
            </p>
          </div>
          <Link href="/work" className="text-brand text-xs font-medium flex items-center gap-2 hover:gap-3 transition-all mt-6 md:mt-0">
            View All Portfolio <span className="text-steel-400 font-normal lowercase tracking-normal">arrow_forward</span>
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-steel-100 mb-6">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-steel-200" />
                )}
              </div>
              <div className="text-[#0a66c2] text-[9px] font-bold tracking-widest uppercase mb-2">
                {project.tag}
              </div>
              <h3 className="text-lg font-medium text-ink transition-colors">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
