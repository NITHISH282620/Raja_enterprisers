"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Review-only control. Five hero concepts are only comparable if a reviewer
 * can flip between them without going back to a URL bar, so the switcher is
 * pinned where it will not sit over the hero copy.
 *
 * Delete this component and its five call sites once a direction is chosen.
 */

const studies = [
  { href: "/home5", label: "Stadium" },
  { href: "/home6", label: "Assembly" },
  { href: "/home7", label: "Blueprint" },
  { href: "/home8", label: "Site plan" },
  { href: "/home9", label: "Catalogue" },
] as const;

export function StudySwitcher() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 lg:block">
      <div className="flex items-center gap-1 rounded-full border border-steel-200 bg-paper/85 p-1.5 shadow-[0_10px_30px_rgb(10,12,14,0.10)] backdrop-blur-md">
        <span className="px-3 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-steel-400">
          Hero study
        </span>
        {studies.map((study) => {
          const active = pathname === study.href;
          return (
            <Link
              key={study.href}
              href={study.href}
              className={`rounded-full px-4 py-2 text-[0.75rem] font-medium transition-colors duration-300 ${
                active
                  ? "bg-brand text-paper"
                  : "text-steel-600 hover:bg-steel-100 hover:text-ink"
              }`}
            >
              {study.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
