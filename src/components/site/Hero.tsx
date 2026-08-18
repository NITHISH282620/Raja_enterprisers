"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function MagneticButton({ children, href = "#", className = "" }: { children: React.ReactNode, href?: string, className?: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const boundingRect = buttonRef.current?.getBoundingClientRect();
    if (!boundingRect) return;
    
    const x = clientX - (boundingRect.left + boundingRect.width / 2);
    const y = clientY - (boundingRect.top + boundingRect.height / 2);

    // Magnetic pull for the button body
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 1,
      ease: "power3.out"
    });
    
    // Stronger magnetic pull for the text inside (parallax effect)
    gsap.to(textContainerRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 1,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    });
    gsap.to(textContainerRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-center px-10 py-4 bg-ink text-white rounded-full font-medium tracking-wide overflow-hidden transition-all duration-500 hover:bg-black hover:shadow-xl ${className}`}
      style={{ willChange: "transform" }}
    >
      <div ref={textContainerRef} className="relative overflow-hidden inline-flex items-center justify-center h-6">
        {/* Text that scrolls UP out of view */}
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">{children}</div>
        {/* Text that scrolls UP into view */}
        <div className="absolute transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">{children}</div>
      </div>
    </a>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  
  // Refs for precise text animations
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // 1. Pro-level AnimMaster Entrance (Curtain Reveal)
    gsap.set(imageWrapperRef.current, { 
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
      scale: 1.25,
      filter: "brightness(0.5) blur(4px)" 
    });

    tl.to(imageWrapperRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      filter: "brightness(1) blur(0px)",
      duration: 2.2,
      ease: "power4.inOut"
    });

    // Text & Button Reveal (3D Staggered Line Rise)
    const elements = [title1Ref.current, title2Ref.current, descRef.current, btnRef.current];
    
    tl.fromTo(elements, 
      { y: 100, opacity: 0, rotateX: 20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.15, ease: "power3.out" },
      "-=1.4"
    );

    // 2. High-end ScrollTrigger Parallax
    gsap.to(imageWrapperRef.current, {
      yPercent: 25,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 3. Text Exit Animation on scroll
    gsap.to(elements, {
      y: -120,
      opacity: 0,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative isolate min-h-[92svh] w-full overflow-hidden bg-[#dfe7ee]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <div 
          ref={imageWrapperRef} 
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="/media/raja/home.1.png"
            alt="Raja Enterprises Stadium"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center] md:block hidden"
          />
          <Image
            src="/media/raja/home.1.png"
            alt="Raja Enterprises Stadium Mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
        </div>
        
        <div
          aria-hidden
          className="absolute inset-0 z-20 bg-[linear-gradient(110deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.5)_25%,rgba(255,255,255,0.05)_50%,transparent_100%)] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.7)_30%,rgba(255,255,255,0.1)_60%,transparent_100%)] md:hidden pointer-events-none"
        />
      </div>

      <div className="shell relative z-30 flex min-h-[92svh] flex-col justify-center pt-32 pb-20">
        <div className="max-w-2xl perspective-[1000px]">
          <div className="overflow-hidden pb-3">
            <h1 ref={title1Ref} className="t-display-l font-medium uppercase tracking-wide text-ink will-change-transform origin-bottom">
              OUR LEGACY
            </h1>
          </div>
          
          <div className="overflow-hidden pb-3 mt-5">
            <h2 ref={title2Ref} className="text-2xl font-semibold text-ink md:text-3xl will-change-transform origin-bottom">
              Established in 1977
            </h2>
          </div>

          <div className="overflow-hidden pb-3 mt-6">
            <p ref={descRef} className="max-w-xl text-lg italic leading-relaxed text-steel-700 text-pretty md:text-xl will-change-transform origin-bottom">
              Raja Enterprises has been delivering experiential event solutions across India for over four decades.
            </p>
          </div>

          {/* AnimMaster Pro Hover Button */}
          <div className="overflow-hidden pb-3 mt-10">
            <div ref={btnRef} className="will-change-transform origin-bottom">
              <MagneticButton href="/projects">
                Explore Projects
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

