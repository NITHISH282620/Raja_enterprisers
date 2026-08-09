"use client";

/**
 * Kept as its own module so the many components importing `useReducedMotion`
 * do not all need to know it is implemented over useSyncExternalStore.
 */
export { useReducedMotion } from "./clientState";
