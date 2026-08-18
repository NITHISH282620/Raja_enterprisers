import { protoHero } from "@/content/proto";

/**
 * The hero's type block, identical across all five studies.
 *
 * The wording is the client's own, from rajaenterprises.co. It is set once
 * here rather than restated in five hero files so that when a reviewer sees a
 * difference between two studies, it is the scene behind the type, never the
 * type itself.
 *
 * `tone` is the only variable. Three of the scenes are bright — paper ground,
 * daylight — and two are dark, and a headline has to hold either way.
 */
export function HeroCopy({
  tone = "light",
  caption,
}: {
  /** `light` = dark type on a bright scene. `dark` = paper type on a dark one. */
  tone?: "light" | "dark";
  /** What the scene behind the type actually is. Quiet, but it earns its line. */
  caption: string;
}) {
  const dark = tone === "dark";

  return (
    <div className="max-w-2xl">
      <div className="hero-entrance hero-entrance--1 flex items-center gap-4">
        <span
          className={`eyebrow rounded-sm border px-3 py-1.5 backdrop-blur-sm ${
            dark
              ? "border-steel-500/70 bg-ink/40 text-paper"
              : "border-steel-400/70 bg-paper/50 text-ink"
          }`}
        >
          {protoHero.eyebrow}
        </span>
        <span
          aria-hidden
          className={`h-px w-16 ${dark ? "bg-steel-400/50" : "bg-steel-400/50"}`}
        />
      </div>

      <h1
        className={`t-display-xl hero-entrance hero-entrance--2 mt-9 uppercase ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {protoHero.heading}
      </h1>

      <p
        className={`hero-entrance hero-entrance--3 mt-9 max-w-xl text-lg leading-relaxed text-pretty md:text-xl ${
          dark ? "text-steel-200" : "text-steel-700"
        }`}
      >
        {protoHero.standfirst}
      </p>

      <p
        className={`hero-entrance hero-entrance--5 mt-12 max-w-md text-[0.8125rem] leading-relaxed ${
          dark ? "text-steel-400" : "text-steel-600"
        }`}
      >
        <span className={`font-medium ${dark ? "text-steel-300" : "text-steel-700"}`}>
          Above:
        </span>{" "}
        {caption}
      </p>
    </div>
  );
}
