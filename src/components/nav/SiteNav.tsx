"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrolledPast } from "@/lib/clientState";
import { cssEase, duration } from "@/lib/motion";
import { company } from "@/content/company";

/**
 * Thin architectural rail (plan §5).
 * Collapses 80px → 56px past the hero. Four items only — the brief's
 * "Locations" was dropped: only one office is documented.
 */

const links = [
  { href: "/work", index: "01", label: "Work" },
  { href: "/capabilities", index: "02", label: "Capabilities" },
  { href: "/about", index: "03", label: "About" },
  { href: "/contact", index: "04", label: "Contact" },
];

export function SiteNav() {
  const collapsed = useScrolledPast(120);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock the page behind the overlay. (The overlay closes itself from its own
  // links, rather than from an effect watching the pathname.)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // The homepage hero is dark, so the rail sits transparent over it and only
  // takes its paper background once the user scrolls past.
  const overHero = pathname === "/" && !collapsed && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-steel-200 bg-paper/88 backdrop-blur-md"
        }`}
        style={{
          height: collapsed ? 56 : 80,
          transition: `height ${duration.base}ms ${cssEase.out}, background-color ${duration.base}ms ${cssEase.out}`,
        }}
      >
        {/* Scrim. The hanger roof is bright at the top of frame, so the rail
            needs its own ground to stay legible over it. */}
        {overHero && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,12,14,0.78) 0%, rgba(10,12,14,0.42) 55%, rgba(10,12,14,0) 100%)",
            }}
          />
        )}

        <div className="shell relative flex h-full items-center justify-between">
          <Link href="/" aria-label={`${company.name} — home`}>
            <Image
              src="/media/brand/raja-logo.png"
              alt={company.name}
              width={1590}
              height={400}
              priority
              className="w-auto"
              style={{
                height: collapsed ? 20 : 28,
                transition: `height ${duration.base}ms ${cssEase.out}, filter ${duration.base}ms ${cssEase.out}`,
                // The mark is a single dark navy; inverting gives a clean white
                // knockout over the hero rather than shipping a second file.
                filter: overHero ? "brightness(0) invert(1)" : undefined,
              }}
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="t-label group flex items-baseline gap-2"
                >
                  <span
                    className={
                      active
                        ? overHero
                          ? "text-paper"
                          : "text-brand"
                        : overHero
                          ? "text-steel-500 transition-colors group-hover:text-paper"
                          : "text-steel-300 transition-colors group-hover:text-brand"
                    }
                  >
                    {link.index} {"//"}
                  </span>
                  <span
                    className={
                      overHero
                        ? active
                          ? "text-paper"
                          : "text-steel-200"
                        : active
                          ? "text-ink"
                          : "text-steel-700"
                    }
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}

            <Link
              href="/contact"
              className={`t-label border px-5 py-3 transition-colors duration-200 ${
                overHero
                  ? "border-steel-500 text-paper hover:bg-paper hover:text-ink"
                  : "border-brand text-brand hover:bg-brand hover:text-paper"
              }`}
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`t-label md:hidden ${overHero ? "text-paper" : "text-ink"}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile overlay — items at display weight, contact pinned bottom. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pt-28 pb-10 md:hidden"
        >
          <nav className="flex flex-col gap-6">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4"
                style={{
                  animation: `menu-in ${duration.base}ms ${cssEase.out} both`,
                  animationDelay: `${i * 40}ms`,
                }}
              >
                <span className="t-label text-brand">{link.index}</span>
                <span className="t-display-l">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-steel-200 pt-6">
            <div className="t-label text-steel-500">Bengaluru</div>
            <a
              href={`tel:${company.contact.mobile.replace(/\s/g, "")}`}
              className="t-heading mt-2 block"
            >
              {company.contact.mobile}
            </a>
            <a
              href={`mailto:${company.contact.email}`}
              className="t-body mt-1 block text-steel-700"
            >
              {company.contact.email}
            </a>
          </div>

          <style>{`
            @keyframes menu-in {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: none; }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes menu-in { from { opacity: 1; } to { opacity: 1; } }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
