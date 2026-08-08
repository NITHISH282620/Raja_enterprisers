"use client";

import { useEffect, useRef, useState } from "react";
import { cssEase, duration } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The 1px divider primitive.
 *
 * Echoes the horizontal line-scoring inside the logo's circular monogram —
 * the site's core graphic motif (plan §D). Draws from the left on entry.
 */
export function Rule({
  tone = "light",
  animate = true,
  className = "",
}: {
  tone?: "light" | "mid" | "dark";
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  const shouldAnimate = animate && !reduced;

  useEffect(() => {
    if (!shouldAnimate) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldAnimate]);

  const color =
    tone === "dark"
      ? "bg-steel-700"
      : tone === "mid"
        ? "bg-steel-300"
        : "bg-steel-200";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`h-px w-full origin-left ${color} ${className}`}
      style={{
        transform: `scaleX(${shown ? 1 : 0})`,
        transition: shouldAnimate
          ? `transform ${duration.base}ms ${cssEase.out}`
          : undefined,
      }}
    />
  );
}
