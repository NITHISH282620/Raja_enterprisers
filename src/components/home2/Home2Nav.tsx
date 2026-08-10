"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Home2Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 xl:px-24 flex items-center justify-between">
        {/* Logo area */}
        <Link href="/home2" className="flex items-center" aria-label="Raja Enterprises Home">
          <Image src="/media/brand/raja-logo.png" alt="Raja Enterprises Logo" width={112} height={64} className="h-12 w-auto" />
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10">
          {["Inventory", "Portfolio", "Legacy", "Locations", "Contact"].map((label) => (
            <Link
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-sm font-medium text-ink/80 hover:text-brand transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Action */}
        <Link
          href="#contact"
          className="hidden md:inline-flex items-center justify-center bg-blue-50 text-brand px-6 py-2.5 text-sm font-medium transition-colors hover:bg-brand hover:text-white rounded-sm"
        >
          Enquire
        </Link>
      </div>
    </nav>
  );
}
