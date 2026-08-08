import { Rule } from "./Rule";

/**
 * `01 // STRUCTURES` — the technical catalogue label (plan §D).
 * The numeral carries the brand colour; the name stays in ink.
 */
export function SectionIndex({
  index,
  name,
  tone = "light",
  className = "",
}: {
  index: string;
  name: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const nameColor = tone === "dark" ? "text-steel-200" : "text-ink";
  const slashColor = tone === "dark" ? "text-steel-500" : "text-steel-300";

  return (
    <div className={className}>
      <div className="t-label flex items-baseline gap-2">
        <span className="text-brand">{index}</span>
        <span className={slashColor}>//</span>
        <span className={nameColor}>{name}</span>
      </div>
      <Rule tone={tone === "dark" ? "dark" : "light"} className="mt-3" />
    </div>
  );
}
