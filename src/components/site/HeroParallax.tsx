"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * HeroParallax — a lightweight replacement for the Three.js hanger canvas.
 *
 * Instead of WebGL geometry it layers CSS-driven motion over the photograph:
 *   1. The photograph itself moves at ~0.35× scroll speed (depth)
 *   2. Geometric structural elements — angled beams, a grid overlay, and
 *      floating accent lines — drift at different rates, giving the
 *      impression of a layered, three-dimensional composition
 *   3. A subtle breathing animation on the geometry keeps the hero alive
 *      when no scrolling is happening
 *
 * The result is visually rich, never overlaps copy, runs at 60fps on any
 * device, and weighs nothing compared to a WebGL pipeline.
 */
export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when hero top is at viewport top, 1 when hero is fully scrolled away
    const progress = Math.min(Math.max(-rect.top / (vh || 1), 0), 1);

    // Apply parallax via CSS custom property — GPU-composited transforms only
    node.style.setProperty("--parallax", `${progress}`);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    // Respect reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <div
      ref={containerRef}
      className="hero-parallax-container"
      aria-hidden
      style={{ "--parallax": "0" } as React.CSSProperties}
    >
      {/* Structural beam — top-left diagonal */}
      <div className="hero-beam hero-beam--left" />

      {/* Structural beam — bottom-right diagonal */}
      <div className="hero-beam hero-beam--right" />

      {/* Grid overlay — subtle engineering grid */}
      <div className="hero-grid" />

      {/* Accent accent lines — floating horizontal elements */}
      <div className="hero-accent-line hero-accent-line--1" />
      <div className="hero-accent-line hero-accent-line--2" />
      <div className="hero-accent-line hero-accent-line--3" />
    </div>
  );
}
