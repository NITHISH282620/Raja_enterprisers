"use client";

import { useSyncExternalStore } from "react";

/**
 * Browser state read the way React wants it read.
 *
 * These are all *external* stores — the media-query list, the scroll position,
 * the GPU's capabilities. Subscribing via useSyncExternalStore keeps the server
 * snapshot explicit and avoids the cascading re-render that setState-in-effect
 * causes.
 */

const noopSubscribe = () => () => {};

/** Matches a media query. Server snapshot is the given fallback. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/**
 * `prefers-reduced-motion`. The server snapshot is `true` so the very first
 * paint is the still variant — a user who asked for reduced motion must never
 * catch a frame of animation during hydration.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}

/** Coarse pointer — touch. Drives the tap-to-expand path in the inventory. */
export function useCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)", false);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      window.addEventListener("resize", onChange);
      return () => {
        window.removeEventListener("scroll", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

/**
 * Whether this device should run the hero canvas at all.
 *
 * Cached at module scope: the check allocates a canvas and probes for a WebGL
 * context, which must not happen on every render.
 */
let renderCapable: boolean | null = null;

function canRenderWebGL(): boolean {
  if (renderCapable !== null) return renderCapable;

  const canvas = document.createElement("canvas");
  const supported = Boolean(
    canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
  );
  const cores = navigator.hardwareConcurrency ?? 4;

  renderCapable = supported && cores >= 4;
  return renderCapable;
}

/** False on the server, so the poster frame is always what renders first. */
export function useCanRenderWebGL(): boolean {
  return useSyncExternalStore(noopSubscribe, canRenderWebGL, () => false);
}
