/**
 * Company facts. Every value traces to docs/CONTENT-SOURCE-OF-TRUTH.md.
 * `BR p.N` = company brochure page N. `WEB` = live site (stale, secondary).
 *
 * Do not add a field here without a source. Do not round the figures.
 */

export const company = {
  name: "Raja Enterprises",
  established: 1977, // BR p.3
  city: "Bengaluru", // BR p.3
  sisterConcern: "Sharada Caterers", // BR p.15

  /** BR p.3, verbatim intent, lightly repunctuated for the web. */
  positioning:
    "A turnkey event management and infrastructure provider. We strive to keep your cost low while keeping our performance high.",

  contact: {
    // BR p.2, p.52. Locality still missing — client question #1.
    addressLines: ["“Venkat”, #145, 5th Main Road", "Bengaluru – 18"],
    landline: ["080 26609751 / 53", "080 26602958 / 62"],
    mobile: "+91 98450 44177",
    email: "raju@rajaenterprises.co",
  },
} as const;

/**
 * Headline variants. The client picks one at the pitch — plan §1.
 * `grounded` is defensible from executed work; `concept` is from the mockups.
 */
export const headlines = {
  grounded: {
    id: "grounded",
    lines: ["Infrastructure for", "events at state scale."],
    label: "Grounded",
    note: "Evidenced by executed work",
  },
  concept: {
    id: "concept",
    lines: ["Engineered Luxury", "for Infrastructure."],
    label: "Concept",
    note: "From the concept boards",
  },
} as const;

export type HeadlineId = keyof typeof headlines;

export const heroSubcopy =
  "Imported German hangers, staging, stalls and power — deployed with 460 in-house personnel across India since 1977.";

/**
 * The operational strip below the hero. Derived figures only — each is a plain
 * sum of brochure quantities, stated in the doc's “derived figures” section.
 */
export const capabilityBar = [
  { value: 460, suffix: "", label: "In-house personnel" },
  { value: 20, suffix: "", label: "Own goods vehicles" },
  { value: 48, suffix: "", label: "Years in operation" },
] as const;

/**
 * The company's strongest credibility fact, and currently invisible online.
 * BR p.44, p.45, p.43.
 */
export const credibility = {
  statement: "Built for the Prime Minister's dais.",
  detail:
    "Raja Enterprises has delivered the infrastructure for programmes inaugurated by the Hon'ble Prime Minister of India — including the dedication of projects worth over ₹3,600 crore — and for the swearing-in of the Karnataka state government at Kanteerava Stadium.",
} as const;
