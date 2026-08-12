"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/clientState";
import { subscribeScroll, viewportProgress } from "@/lib/scrollDriver";

/**
 * A photograph that holds still while its frame moves — the difference between
 * a picture on a page and a view through a window.
 *
 * The frame stays exactly where the layout put it. Only the plate inside
 * drifts, by `distance` pixels either side of centre as the frame crosses the
 * viewport. At the default 16px that is barely perceptible in isolation, which
 * is the point: it reads as depth across a page of photographs rather than as
 * an effect on any one of them.
 *
 * The plate is inset negatively so it is larger than the frame it moves in.
 * Without that slack a drift of any size would pull a hard edge into view at
 * one end of the travel.
 *
 * Drift is written as `translate`, not `transform`. Every photograph on the
 * site already spends `transform` on hover-magnify and `scale` on its entrance
 * push-in; `translate` is the third independent channel, so all three compose
 * instead of overwriting each other.
 */
export function ParallaxMedia({
  children,
  distance = 16,
  className = "",
}: {
  children: ReactNode;
  /** Peak drift either side of centre, in px. Keep it in the 8–20 range. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    return subscribeScroll(() => {
      const rect = node.getBoundingClientRect();
      // Off-screen frames cost nothing but a rect read.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = viewportProgress(rect, window.innerHeight);
      node.style.setProperty("--drift", `${(progress * distance).toFixed(2)}px`);
    });
  }, [reduced, distance]);

  return (
    <div
      ref={ref}
      // -inset-6 is 24px of slack, comfortably more than the 20px ceiling the
      // distance prop is documented to take.
      className={`media-drift absolute -inset-6 ${className}`}
    >
      {children}
    </div>
  );
}
