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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-[var(--ease-out-quart)] ${
        grounded
          ? "bg-paper/85 py-3 shadow-[0_1px_0_0_var(--color-steel-100)] backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="shell flex items-center justify-between gap-6">
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
          <ul className="flex items-center gap-9">
            {navigation.slice(1).map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-1 text-sm font-medium transition-colors ${
                      active ? "text-accent" : "text-steel-700 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-[width] duration-400 ease-[var(--ease-out-quart)] ${
                        active ? "w-full" : "w-0"
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
            className="hidden rounded-sm bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white md:inline-flex"
          >
            Enquire
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
                className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-300 ease-[var(--ease-out-quart)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-300 ease-[var(--ease-out-quart)] ${
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
