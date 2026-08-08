"use client";

import { useEffect, useRef, useState } from "react";
import { duration } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A quantity, its unit, and the item it belongs to.
 *
 * The quantities are the credibility of this business, so they get display
 * weight. Counts up once on first intersection; `tabular-nums` in `.t-figure`
 * prevents the width jitter that makes count-ups look cheap.
 */
export function FigureStat({
  value,
  unit,
  label,
  tone = "light",
  className = "",
}: {
  /** Number counts up. String renders as-is (e.g. "As per requirements"). */
  value: number | string;
  unit?: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const numeric = typeof value === "number";
  const [shown, setShown] = useState<number>(numeric ? 0 : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!numeric) return;
    if (reduced) {
      setShown(value as number);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, reduced, value]);

  useEffect(() => {
    if (!started || !numeric) return;
    const target = value as number;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration.slow, 1);
      // Quartic ease-out, matching the shared easing curve's character.
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, numeric, value]);

  const labelColor = tone === "dark" ? "text-steel-300" : "text-steel-500";
  const unitColor = tone === "dark" ? "text-steel-300" : "text-steel-500";
  const figureColor = tone === "dark" ? "text-paper" : "text-ink";

  return (
    <div ref={ref} className={className}>
      <div className={`t-figure ${figureColor} flex items-baseline gap-2`}>
        <span>{numeric ? shown.toLocaleString("en-IN") : value}</span>
        {unit && (
          <span className={`t-label ${unitColor} translate-y-[-0.15em]`}>
            {unit}
          </span>
        )}
      </div>
      <div className={`t-label ${labelColor} mt-3`}>{label}</div>
    </div>
  );
}
