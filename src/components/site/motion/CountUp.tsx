"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/clientState";

/**
 * A quantity that counts to itself once, the first time it is seen.
 *
 * Reserved for the numbers that carry the company's claim — the founding year,
 * the headcount, the stock figures. Counting every number on a page turns
 * evidence into decoration, so most figures on this site are static and only
 * these move.
 *
 * The final value is what renders on the server and on first paint. The count
 * is layered on afterwards by the observer, so the figure is correct in view
 * source, correct with JS disabled, and correct under reduced motion — it just
 * does not travel to get there. That ordering also means the number never
 * causes layout shift, because `tabular-nums` at the call sites keeps every
 * intermediate value the same width as the last.
 */
export function CountUp({
  value,
  durationMs = 1200,
}: {
  /** The rendered figure, exactly as it should finish: "1977", "15,000", "460". */
  value: string;
  /** 900–1400ms. Long enough to read as deliberate, short enough not to nag. */
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // Reduced motion is handled at render time rather than here — writing the
    // final value back through state would be a cascading render to reach a
    // value we can simply read.
    if (reduced) return;

    const digits = value.replace(/[^0-9]/g, "");
    const target = Number(digits);
    // Anything without a countable number renders as written.
    if (!digits || !Number.isFinite(target) || target <= 0) return;

    const grouped = value.includes(",");
    const prefix = value.slice(0, value.search(/[0-9]/));
    const suffix = value.slice(value.search(/[0-9](?![\s\S]*[0-9])/) + 1);
    const format = (n: number) =>
      prefix + (grouped ? n.toLocaleString("en-IN") : String(n)) + suffix;

    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let start = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const step = (now: number) => {
          if (!start) start = now;
          const t = Math.min((now - start) / durationMs, 1);
          // Quartic ease-out: arrives fast, settles slowly. Same curve the rest
          // of the site's entrances use, so the count belongs to them.
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(format(Math.round(target * eased)));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        setDisplay(format(0));
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, durationMs, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? value : display}
    </span>
  );
}
