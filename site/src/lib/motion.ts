/**
 * One duration scale, one easing set, one reduced-motion guard.
 * Components must not define their own timings — plan §6.
 * Mirrors the custom properties in globals.css.
 */

export const duration = {
  instant: 120, // state feedback
  quick: 220, // hover, lift
  base: 380, // reveals, rule draws
  expand: 520, // category expansion
  slow: 900, // figure count-up
} as const;

export const ease = {
  /** Entering. Decelerating, settles without overshoot. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Transforming between two states. Symmetric. */
  inOut: [0.65, 0.05, 0.36, 1] as const,
};

export const cssEase = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.65, 0.05, 0.36, 1)",
} as const;

/** Depth tiers for the inventory field — plan §2. */
export const zPlane = {
  front: 0,
  mid: -40,
  back: -80,
} as const;

export type DurationKey = keyof typeof duration;

/** `transition` shorthand honouring the shared scale. */
export function transition(
  properties: string[],
  key: DurationKey = "quick",
  easing: keyof typeof cssEase = "out",
): string {
  return properties
    .map((p) => `${p} ${duration[key]}ms ${cssEase[easing]}`)
    .join(", ");
}
