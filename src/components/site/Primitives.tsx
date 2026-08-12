import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

/**
 * The shared vocabulary: eyebrow, section head, rule, figure, pill, marker.
 * Six pages draw from this file so spacing, weight and colour stay identical
 * without any page restating them.
 */

/**
 * Mono label above a heading.
 *
 * It used to carry a two-digit index. The numbers were removed because they
 * were not describing anything: the sections they sat on are not a sequence,
 * nothing refers back to "03", and the count restarted on every page — so the
 * same section could be 03 in one place and 05 in another. A number that does
 * not encode order is decoration wearing the costume of structure. The rule
 * stays, because that is doing real work separating the label from the
 * heading it introduces.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-px w-6 bg-steel-300" />
      <span>{children}</span>
    </p>
  );
}

/** Section head: eyebrow, heading, optional standfirst, optional trailing link. */
export function SectionHead({
  eyebrow,
  heading,
  standfirst,
  action,
  align = "left",
}: {
  eyebrow: string;
  heading: ReactNode;
  standfirst?: ReactNode;
  action?: { href: Route; label: string };
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-8 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "max-w-3xl" : "max-w-2xl"}>
        <Eyebrow className={centered ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
        <h2 className="t-display-l mt-6 text-ink text-balance">{heading}</h2>
        {standfirst && (
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
            {standfirst}
          </p>
        )}
      </div>
      {action && (
        <div className={centered ? "" : "shrink-0"}>
          <ArrowLink href={action.href}>{action.label}</ArrowLink>
        </div>
      )}
    </div>
  );
}

/** The site's only text link treatment. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: Route;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-brand ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/** The site's two buttons. There is no third. */
export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: Route;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-medium transition-all duration-300 ease-[var(--ease-out-quart)]";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-brand"
      : // Carries its own ground: this button also sits over the hero canvas,
        // where a transparent fill lets the structure read through the label.
        "border border-steel-200 bg-paper/70 text-steel-700 backdrop-blur-sm hover:border-steel-300 hover:bg-paper hover:text-ink";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/**
 * A quantity from the catalogue. Figure and unit are separated so the number
 * carries the weight and the unit stays quiet — the pattern used on every page.
 */
export function Figure({
  figure,
  unit,
  label,
  size = "md",
}: {
  figure: string;
  unit?: string;
  label: string;
  size?: "md" | "lg";
}) {
  return (
    <div>
      <p
        className={`${
          size === "lg" ? "t-figure" : "text-[2rem] leading-none tracking-[-0.03em]"
        } text-ink tabular-nums`}
      >
        {figure}
        {unit && (
          <span className="ml-2 align-baseline text-[0.4em] font-medium uppercase tracking-[0.16em] text-steel-500">
            {unit}
          </span>
        )}
      </p>
      <p className="mt-3 text-sm leading-snug text-steel-600">{label}</p>
    </div>
  );
}

/** Hairline rule. The logo's line-scoring, used as the section divider. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-steel-100 ${className}`} />;
}

/** Small category chip. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow rounded-full border border-steel-200 px-3 py-1.5 text-[0.625rem] text-steel-600">
      {children}
    </span>
  );
}

/**
 * The owner-review marker.
 *
 * Where the catalogue and the website do not settle something, the prototype
 * says so in the page rather than inventing a value. This is the component
 * that carries that admission, and it is meant to be visible.
 */
export function ConfirmMarker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-lg bg-amber-50 px-3 py-2.5 text-[0.8125rem] leading-snug text-amber-900 ring-1 ring-amber-200/70">
      <span aria-hidden className="mt-px shrink-0 font-mono text-[0.625rem] tracking-widest">
        ?
      </span>
      <span>
        <span className="font-medium">Needs owner confirmation — </span>
        {children}
      </span>
    </p>
  );
}
