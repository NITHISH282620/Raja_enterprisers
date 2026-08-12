"use client";

export function HeroParallax() {
  return (
    <div
      className="hero-parallax-container"
      aria-hidden
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
