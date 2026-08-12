"use client";

/**
 * One scroll listener for the whole page.
 *
 * The motion system has many scroll-linked pieces — the header rail, every
 * drifting photograph, the legacy timeline. Each of them owning a listener
 * would mean a dozen handlers competing on a single main thread during the one
 * interaction the user is most sensitive to.
 *
 * So there is exactly one listener and one rAF gate here, and subscribers are
 * called from inside that frame. Subscribers are expected to write to the DOM
 * directly (a custom property, usually) rather than setState: scroll fires far
 * faster than React can reconcile, and a re-render per frame is how a page
 * starts to feel heavy rather than physical.
 *
 * The listener is attached on the first subscription and removed on the last,
 * so a page with no scroll-linked motion pays nothing.
 */

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame = 0;

function flush() {
  frame = 0;
  for (const run of subscribers) run();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

export function subscribeScroll(run: Subscriber): () => void {
  if (subscribers.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  subscribers.add(run);
  // Settle to the current scroll position immediately, or anything mounted
  // mid-page starts from a stale zero and visibly jumps on the first scroll.
  run();

  return () => {
    subscribers.delete(run);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

/**
 * How far a element has travelled through the viewport, as -1 → 1.
 *
 * -1 is "just below the fold", 0 is "centred", 1 is "just above the top". This
 * is the value every camera-like effect on the site is derived from, which is
 * what keeps their movement consistent with each other.
 */
export function viewportProgress(rect: DOMRect, viewportHeight: number): number {
  const span = viewportHeight / 2 + rect.height / 2;
  if (span <= 0) return 0;
  const centreOffset = rect.top + rect.height / 2 - viewportHeight / 2;
  return Math.max(-1, Math.min(1, -centreOffset / span));
}
