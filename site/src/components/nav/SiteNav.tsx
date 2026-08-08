"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on navigation, and lock the page behind it.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-steel-200 bg-paper/88 backdrop-blur-md"
        style={{
          height: collapsed ? 56 : 80,
          transition: `height ${duration.base}ms ${cssEase.out}`,
        }}
      >
        <div className="shell flex h-full items-center justify-between">
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
                transition: `height ${duration.base}ms ${cssEase.out}`,
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
                        ? "text-brand"
                        : "text-steel-300 transition-colors group-hover:text-brand"
                    }
                  >
                    {link.index} //
                  </span>
                  <span
                    className={active ? "text-ink" : "text-steel-700"}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="t-label border border-brand px-5 py-3 text-brand transition-colors duration-200 hover:bg-brand hover:text-paper"
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="t-label text-ink md:hidden"
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
