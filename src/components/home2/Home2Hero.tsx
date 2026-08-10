"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { company } from "@/content/company";

export function Home2Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[95svh] w-full overflow-hidden bg-white">
      {/* 2.5D Image Parallax Background */}
      <div className="absolute inset-0 bg-[#f0f4f8]">
        <div 
          className="relative w-full h-full transform-gpu"
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.05)` }}
        >
          <Image
            src="/media/projects/halle-g.png"
            alt="German Hanger Infrastructure"
            fill
            className="object-cover object-top opacity-90 mix-blend-multiply grayscale-[20%]"
            priority
          />
        </div>
      </div>

      {/* Overlays to ensure text legibility and fade into the next section */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-64"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
        }}
      />

      {/* Content wrapper with full width but controlled internal padding */}
      <div className="relative z-20 flex min-h-[95svh] flex-col justify-center px-6 md:px-12 xl:px-24 pt-32 pb-16 w-full">
        <div className="max-w-2xl">
          <div className="t-label mb-8 flex items-center gap-4 text-steel-500 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="border border-steel-300 px-3 py-1 rounded-sm tracking-widest text-[10px]">EST. {company.established}</span>
            <span className="h-px w-12 bg-steel-300" />
          </div>

          <h1 className="text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[1.05] text-ink tracking-[-0.03em] font-medium mb-8">
            <span className="block">Engineered</span>
            <span className="block">
              <span className="text-brand italic font-medium pr-3">Luxury</span>
              for
            </span>
            <span className="block">Infrastructure.</span>
          </h1>

          <p className="max-w-xl text-steel-600 text-lg md:text-xl font-normal leading-relaxed mb-12">
            Delivering excellence in event solutions across mega venues and altitudes.
            We synthesize load-bearing light with high-end architecture elements.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#inventory"
              className="group inline-flex items-center gap-3 bg-[#0a66c2] px-6 py-3.5 text-white font-medium text-sm transition-transform duration-300 hover:scale-[1.02] rounded-sm"
            >
              View Capabilities
              <span className="text-white/80 lowercase font-normal tracking-normal ml-1">
                arrow_forward
              </span>
            </Link>
            <Link
              href="#legacy"
              className="inline-flex items-center gap-3 px-6 py-3.5 text-steel-600 font-medium text-sm transition-colors duration-200 hover:text-ink border border-transparent hover:border-steel-200 rounded-sm"
            >
              Our Legacy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
