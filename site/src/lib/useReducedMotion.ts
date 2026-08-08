"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`.
 *
 * Starts `true` so the very first paint is the still, safe variant — a user who
 * asked for reduced motion must never catch a frame of animation during
 * hydration. It relaxes to `false` on the first effect only if the query says so.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}
