"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HOME, navigation } from "@/content/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * The header sits transparent over the hero and takes a ground once the page
   * moves under it. On every route except home there is no hero to sit over,
   * so it starts grounded.
   */
  const overHero = pathname === HOME;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const grounded = scrolled || !overHero || open;

  return (
    <header
      className={`nav-entrance fixed left-4 right-4 z-50 border transition-all duration-500 ease-[var(--ease-out-quart)] md:left-1/2 md:right-auto md:w-full md:max-w-6xl md:-translate-x-1/2 ${
        grounded
          ? "top-4 border-steel-100 bg-white/92 py-3 shadow-[0_8px_30px_rgb(6,60,91,0.10)] backdrop-blur-md md:rounded-full md:px-8"
          : "top-6 border-white/70 bg-white py-4 shadow-[0_10px_36px_rgb(6,60,91,0.14)] md:rounded-full md:px-8"
      } rounded-2xl px-4`}
    >
      <div className="nav-inner-in shell flex items-center justify-between gap-6">
        <Link href="/home3" aria-label="Raja Enterprises — home" className="shrink-0">
          <Image
            src="/media/brand/raja-logo.png"
            alt="Raja Enterprises"
            width={140}
            height={80}
            priority
            className="h-10 w-auto md:h-11"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {[
              { label: "HOME", href: "/home3" },
              { label: "ABOUT", href: "/home3/legacy" },
              { label: "SERVICES", href: "/home3/inventory" },
              { label: "TESTIMONIALS", href: "#" },
              { label: "GALLERY", href: "/home3/portfolio" },
            ].map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.8125rem] font-bold tracking-wider transition-colors ${
                      active ? "text-accent" : "text-brand/70 hover:text-accent"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-accent transition-[width] duration-400 ease-[var(--ease-out-quart)] ${
                        active ? "w-4" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/home3/contact"
            className="hidden rounded-full bg-accent px-7 py-3 text-[0.8125rem] font-bold tracking-wider text-white shadow-[0_4px_14px_rgb(10,102,194,0.35)] transition-transform hover:scale-105 md:inline-flex"
          >
            CONTACT +
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-full bg-brand transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-brand transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="shell mt-3 border-t border-steel-100 pt-4 pb-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-steel-100 py-4 text-lg font-medium transition-colors ${
                  pathname === item.href ? "text-accent" : "text-ink"
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
