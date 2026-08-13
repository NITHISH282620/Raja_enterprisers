"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { subscribeScroll } from "@/lib/scrollDriver";

/**
 * The masthead.
 *
 * Four routes and one action — the brief's ceiling, and about the point where
 * a navigation stops being a signpost and becomes a menu system. It sits
 * transparent over the hero, where the plate's own wash carries the contrast,
 * and takes a paper ground the moment the page moves under it.
 */

const links = [
  { label: "Work", href: "/home4#work" },
  { label: "Capabilities", href: "/home4#capabilities" },
  { label: "About", href: "/home3/legacy" },
  { label: "Contact", href: "/home3/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeScroll(() => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const rail = railRef.current;
      if (rail) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        rail.style.setProperty("--progress", max > 0 ? String(Math.min(y / max, 1)) : "0");
      }
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const grounded = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,height] duration-500 ease-[var(--ease-out-quart)] ${
        grounded
          ? "h-[68px] border-steel-200/70 bg-paper/95 backdrop-blur-md"
          : "h-[88px] border-transparent bg-transparent"
      }`}
    >
      {/*
        Scrim. The hero plate is a bright sky at the top of frame, so paper-white
        navigation over it disappears entirely. This gives the bar its own
        ground without darkening the photograph itself — it is 96px tall and
        gone by the headline.
      */}
      {!grounded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(10,12,14,0.62)_0%,rgba(10,12,14,0.28)_55%,transparent_100%)]"
        />
      )}

      <div className="h4-shell relative flex h-full items-center justify-between gap-8">
        <Link href="/home4" aria-label="Raja Enterprises — home" className="shrink-0">
          <Image
            src="/media/brand/raja-logo.png"
            alt="Raja Enterprises"
            width={140}
            height={80}
            priority
            /* The mark is a single dark navy. Over the hero plate it is knocked
               out to paper with one filter rather than shipping a second file. */
            className={`w-auto transition-[height,filter] duration-500 ease-[var(--ease-out-quart)] ${
              grounded ? "h-8" : "h-9 brightness-0 invert"
            }`}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`nav-link text-[0.9375rem] transition-colors duration-300 ${
                grounded ? "text-steel-700 hover:text-brand" : "text-paper/80 hover:text-paper"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/home3/contact"
            className={`cta-arrow inline-flex items-center gap-2 rounded-sm px-6 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 ${
              grounded
                ? "bg-brand text-paper hover:bg-accent"
                : "border border-paper/40 text-paper hover:bg-paper hover:text-ink"
            }`}
          >
            Enquire
            <span aria-hidden className="cta-arrow__glyph">
              →
            </span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="home4-nav"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                grounded ? "bg-ink" : "bg-paper"
              } ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 block h-px w-full transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                grounded ? "bg-ink" : "bg-paper"
              } ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {/* Reading position — the one element always moving while the user is. */}
      <div
        ref={railRef}
        aria-hidden
        className="scroll-rail absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
      />

      <div
        id="home4-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-steel-100 bg-paper px-6 pb-6 md:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-steel-100 py-4 text-lg font-medium transition-colors ${
                  pathname === l.href ? "text-accent" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
