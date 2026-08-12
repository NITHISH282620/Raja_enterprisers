"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/navigation";
import { subscribeScroll } from "@/lib/scrollDriver";

/**
 * The masthead: the approved floating capsule, in the brand blue.
 *
 * The mark is anchored at the left end of the capsule, the routes sit as a
 * measured group through the middle, and the enquiry action closes the line at
 * the right end — the composition the client signed off on, carried over
 * intact and only recoloured. Deep brand navy ground, paper type, and a paper
 * capsule for the action so it reads as the one thing to press.
 */

/**
 * The client's label set. `Testimonials` is deliberately absent: it had no page
 * behind it and was pointing at "#", and a masthead that navigates nowhere is
 * worse than one item shorter. `Locations` takes the slot — same register, and
 * it is a page that exists.
 */
const links = [
  { label: "HOME", href: "/home3" },
  { label: "ABOUT", href: "/home3/legacy" },
  { label: "SERVICES", href: "/home3/inventory" },
  { label: "LOCATIONS", href: "/home3/locations" },
  { label: "GALLERY", href: "/home3/portfolio" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  /**
   * Compact on the way down, expanded on the way up — the capsule behaves like
   * it is attached to the page rather than parked over it. It is never hidden:
   * a masthead that disappears makes a long page feel unmoored.
   *
   * The 6px dead zone stops trackpad jitter from flickering the two states, and
   * everything within 40px of the top is always expanded so the head of the
   * page has one unambiguous resting look.
   */
  useEffect(() => {
    let last = window.scrollY;

    return subscribeScroll(() => {
      const y = window.scrollY;
      const delta = y - last;

      if (y <= 40) setCompact(false);
      else if (delta > 6) setCompact(true);
      else if (delta < -6) setCompact(false);
      if (Math.abs(delta) > 6) last = y;

      // Written straight to the DOM: this updates every frame of every scroll,
      // and routing it through setState would re-render the whole masthead for
      // a value exactly one element reads.
      const rail = railRef.current;
      if (rail) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        rail.style.setProperty("--progress", max > 0 ? String(Math.min(y / max, 1)) : "0");
      }
    });
  }, []);

  // The sheet closes from the link that navigated (see onClick below) rather
  // than from an effect on pathname — closing in an effect would queue a second
  // render on every route change just to undo state the click already knows about.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const grounded = compact || open;

  return (
    <header
      className={`nav-entrance fixed left-4 right-4 z-50 transition-all duration-500 ease-[var(--ease-out-quart)] md:left-1/2 md:right-auto md:w-full md:max-w-6xl md:-translate-x-1/2 ${
        grounded ? "top-3" : "top-6"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-brand px-5 transition-all duration-500 ease-[var(--ease-out-quart)] md:rounded-full md:px-8 ${
          grounded
            ? "py-2.5 shadow-[0_10px_30px_rgb(6,60,91,0.28)]"
            : "py-4 shadow-[0_14px_40px_rgb(6,60,91,0.22)]"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/home3"
            aria-label="Raja Enterprises — home"
            className="nav-load nav-load--1 shrink-0"
          >
            <Image
              src="/media/brand/raja-logo.png"
              alt="Raja Enterprises"
              width={140}
              height={80}
              priority
              /* The mark is a single dark navy, which would disappear into the
                 capsule. Knocking it out to paper is one filter rather than a
                 second asset to keep in sync. */
              className={`w-auto brightness-0 invert transition-[height] duration-500 ease-[var(--ease-out-quart)] ${
                grounded ? "h-8" : "h-10"
              }`}
            />
          </Link>

          <nav aria-label="Primary" className="nav-load nav-load--2 hidden lg:block">
            <ul className="flex items-baseline gap-9">
              {links.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      data-active={active ? "" : undefined}
                      className={`nav-link text-[0.8125rem] font-bold tracking-[0.08em] transition-colors duration-300 ${
                        active ? "text-paper" : "text-paper/70 hover:text-paper"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/home3/contact"
              className="cta-arrow hidden items-center gap-1.5 rounded-full bg-paper px-7 py-3 text-[0.8125rem] font-bold tracking-[0.08em] text-brand transition-colors duration-300 hover:bg-accent hover:text-paper md:inline-flex"
            >
              CONTACT
              <span aria-hidden className="cta-arrow__glyph">
                +
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-1 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-px w-full bg-paper transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-paper transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/*
          Reading position, drawn along the inside of the capsule's bottom edge
          and clipped to its radius. It is the one element that is always moving
          while the user is, which is what attaches the masthead to the document.
        */}
        <div
          ref={railRef}
          aria-hidden
          className="scroll-rail absolute inset-x-0 bottom-0 h-[2px] origin-left bg-paper/45"
        />
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="mt-2 overflow-hidden rounded-2xl bg-brand px-5 pb-4 lg:hidden"
      >
        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-paper/15 py-4 text-lg font-medium transition-colors last:border-0 ${
                  pathname === item.href ? "text-paper" : "text-paper/75 hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
