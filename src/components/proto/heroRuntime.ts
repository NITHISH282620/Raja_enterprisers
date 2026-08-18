"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The plumbing every hero study shares.
 *
 * Each of the five scenes is a different idea, but they all need the same three
 * things: a scroll value normalised across the hero's own height, a flag that
 * stops the render loop once the hero leaves the viewport, and a container to
 * measure. Keeping that here means a scene file contains only its concept.
 *
 * `progress` is a ref rather than state on purpose. It updates on every scroll
 * frame and is read inside `useFrame`; routing it through React would re-render
 * the tree sixty times a second to deliver a number that no DOM node reads.
 */
export function useHeroProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      progress.current = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { containerRef, progress, active };
}
