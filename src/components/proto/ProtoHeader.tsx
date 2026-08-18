"use client";

import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { subscribeScroll } from "@/lib/scrollDriver";

/**
 * The masthead for the /home5–/home9 hero studies.
 *
 * Structurally this is the approved /home3 capsule, unchanged: brand-navy
 * ground, mark anchored left, routes measured through the middle, the enquiry
 * action closing the line, and the reading-position rail along the bottom
 * edge. Carrying it over intact is the point — with the chrome held fixed,
 * any difference a reviewer sees between the five studies is the hero.
 *
 * Two things differ from /home3. The labels are the live site's own menu
 * (Home / Notable Events / Services / About Us / Contact) rather than the
 * prototype's, and the `home` route is passed in so each study's mark and
 * first item return to that study rather than to /home3.
 */

export function ProtoHeader({ home }: { home: Route }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;

    return subscribeScroll(() => {
      const y = window.scrollY;
      const delta = y - last;

      if (y <= 40) setCompact(false);
      else if (delta > 6) setCompact(true);
      else if (delta < -6) setCompact(false);
      if (Math.abs(delta) > 6) last = y;

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

  const grounded = compact || open;
  const atHome = pathname === home;

  const linkClass = (active: boolean) =>
    `nav-link text-[0.8125rem] font-bold tracking-[0.08em] transition-colors duration-300 ${
      active ? "text-paper" : "text-paper/70 hover:text-paper"
    }`;

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
            href={home}
            aria-label="Raja Enterprises — home"
            className="nav-load nav-load--1 shrink-0"
          >
            <Image
              src="/media/brand/raja-logo.png"
              alt="Raja Enterprises"
              width={140}
              height={80}
              priority
              className={`w-auto brightness-0 invert transition-[height] duration-500 ease-[var(--ease-out-quart)] ${
                grounded ? "h-8" : "h-10"
              }`}
            />
          </Link>

          <nav aria-label="Primary" className="nav-load nav-load--2 hidden lg:block">
            <ul className="flex items-baseline gap-9">
              <li>
                <Link
                  href={home}
                  aria-current={atHome ? "page" : undefined}
                  data-active={atHome ? "" : undefined}
                  className={linkClass(atHome)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/home3/portfolio" className={linkClass(false)}>
                  NOTABLE EVENTS
                </Link>
              </li>
              <li>
                <Link href="/home3/inventory" className={linkClass(false)}>
                  SERVICES
                </Link>
              </li>
              <li>
                <Link href="/home3/legacy" className={linkClass(false)}>
                  ABOUT US
                </Link>
              </li>
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
              aria-controls="proto-mobile-nav"
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

        <div
          ref={railRef}
          aria-hidden
          className="scroll-rail absolute inset-x-0 bottom-0 h-[2px] origin-left bg-paper/45"
        />
      </div>

      {/* Mobile sheet */}
      <div
        id="proto-mobile-nav"
        hidden={!open}
        className="mt-2 overflow-hidden rounded-2xl bg-brand px-5 pb-4 lg:hidden"
      >
        <ul className="flex flex-col">
          <li>
            <Link
              href={home}
              onClick={() => setOpen(false)}
              className="block border-b border-paper/15 py-4 text-lg font-medium text-paper transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/home3/portfolio"
              onClick={() => setOpen(false)}
              className="block border-b border-paper/15 py-4 text-lg font-medium text-paper/75 transition-colors hover:text-paper"
            >
              Notable Events
            </Link>
          </li>
          <li>
            <Link
              href="/home3/inventory"
              onClick={() => setOpen(false)}
              className="block border-b border-paper/15 py-4 text-lg font-medium text-paper/75 transition-colors hover:text-paper"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/home3/legacy"
              onClick={() => setOpen(false)}
              className="block border-b border-paper/15 py-4 text-lg font-medium text-paper/75 transition-colors hover:text-paper"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/home3/contact"
              onClick={() => setOpen(false)}
              className="block py-4 text-lg font-medium text-paper/75 transition-colors hover:text-paper"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
