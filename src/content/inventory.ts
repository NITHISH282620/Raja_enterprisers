/**
 * Inventory categories. Quantities are verbatim from brochure p.4 —
 * docs/CONTENT-SOURCE-OF-TRUTH.md §4. These numbers are the credibility spine
 * of the site: do not round, restate or embellish them.
 *
 * `asset` selects the 3D model rendered on the shared AssetStage rig.
 * `media: "photo"` marks categories we deliberately do NOT model — modelling
 * people or food produces exactly the uncanny look the brief forbids.
 */

export type AssetKind =
  | "hanger"
  | "stalls"
  | "flooring"
  | "stage"
  | "power"
  | "lighting"
  | "logistics";

export type Category = {
  index: string;
  slug: string;
  name: string;
  /** One line, shown on hover at rest state. */
  summary: string;
  /** Expanded panel copy. */
  detail: string;
  /** Verbatim brochure quantities. */
  stock: { item: string; quantity: string }[];
  media: { kind: "3d"; asset: AssetKind } | { kind: "photo" };
  /** Layout weight in the spatial field — plan §2. */
  scale: "flagship" | "major" | "standard";
  tier: "front" | "mid" | "back";
};

export const categories: Category[] = [
  {
    index: "01",
    slug: "structures",
    name: "Structures",
    summary: "Imported aluminium German hangers, clear-span and weatherproof.",
    detail:
      "Clear-span aluminium hangers imported for large-format deployment — column-free interiors that take staging, seating and services without obstructing sightlines. Erected for state ceremonies, exhibitions and conferences across India.",
    stock: [{ item: "Imported German Hanger", quantity: "5 Lakh Sft" }],
    media: { kind: "3d", asset: "hanger" },
    scale: "flagship",
    tier: "front",
  },
  {
    index: "02",
    slug: "stalls-interiors",
    name: "Stalls & Interiors",
    summary: "Octonorm and Maxima systems, custom fabrication, LED fascia.",
    detail:
      "Design and fabrication of exhibition stalls and interiors — modular Octonorm and Maxima systems alongside custom-built shells, with 3D concept design and visualisation ahead of the build.",
    stock: [
      { item: "Octonorm Stalls", quantity: "10,000 Sqmtr" },
      { item: "Maxima Stalls", quantity: "5,000 Sqmtr" },
      { item: "LED Fascia for Stalls", quantity: "Contemporary" },
    ],
    media: { kind: "3d", asset: "stalls" },
    scale: "major",
    tier: "mid",
  },
  {
    index: "03",
    slug: "flooring-platforms",
    name: "Flooring & Platforms",
    summary: "Wooden floor platforms and brand-new synthetic carpet.",
    detail:
      "Level, load-bearing wooden platform decking laid over uneven or unmade ground — the substrate that makes a field usable as a venue — finished with new synthetic carpet.",
    stock: [
      { item: "Wooden Floor Platform", quantity: "10 Lakh Sft" },
      { item: "Brand New Synthetic Carpet", quantity: "As per requirements" },
    ],
    media: { kind: "3d", asset: "flooring" },
    scale: "major",
    tier: "front",
  },
  {
    index: "04",
    slug: "stage-seating",
    name: "Stage & Seating",
    summary: "Staging, 55,000 chairs and iron barricading.",
    detail:
      "Modular staging built to the required height and span, with audience seating from stackable plastic through covered cushioned chairs, and iron barricading for crowd separation and secure perimeters.",
    stock: [
      { item: "Stage", quantity: "1 Lakh Sft (different sizes)" },
      { item: "Plastic Chairs", quantity: "50,000 Nos." },
      { item: "Cushion Chairs with Covers", quantity: "5,000 Nos." },
      { item: "Iron Barricading", quantity: "10,000 Nos. (1 Lakh RFT)" },
    ],
    media: { kind: "3d", asset: "stage" },
    scale: "major",
    tier: "front",
  },
  {
    index: "05",
    slug: "power-climate",
    name: "Power & Climate",
    summary: "Generators and 3,000 tons of temporary air-conditioning.",
    detail:
      "Independent power generation and temporary air-conditioning for enclosed structures, with cabling runs sized to the deployment. The services layer that makes a hangar habitable for a full day's programme.",
    stock: [
      { item: "Temporary Air-conditioning", quantity: "3,000 Tons" },
      { item: "Generators", quantity: "As per requirements" },
      { item: "Lighting Cables (various sizes)", quantity: "As per requirements" },
    ],
    media: { kind: "3d", asset: "power" },
    scale: "standard",
    tier: "mid",
  },
  {
    index: "06",
    slug: "lighting",
    name: "Lighting",
    summary: "General lighting across structures, stalls and approaches.",
    detail:
      "General lighting for structures, stall bays and circulation routes, distributed on cable runs sized to the site.",
    // NOTE: the brochure documents NO AV inventory — no speakers, LED walls,
    // projectors or moving-head fixtures. The concept mockups showed all four.
    // Scoped to documented stock only. See source-of-truth §4 warning + Q4.
    stock: [{ item: "General Lightings", quantity: "As per requirements" }],
    media: { kind: "3d", asset: "lighting" },
    scale: "standard",
    tier: "back",
  },
  {
    index: "07",
    slug: "logistics",
    name: "Logistics",
    summary: "A 20-vehicle owned fleet moving stock to site.",
    detail:
      "Inventory at this scale only matters if it reaches the ground on schedule. Transport is run on owned goods vehicles rather than hired capacity, so mobilisation is not contingent on third-party availability.",
    stock: [{ item: "Own Goods Vehicles", quantity: "20 Nos." }],
    media: { kind: "3d", asset: "logistics" },
    scale: "standard",
    tier: "mid",
  },
  {
    index: "08",
    slug: "workforce",
    name: "Workforce",
    summary: "460 in-house personnel, from ground crew to site managers.",
    detail:
      "Erection, fit-out and strike are executed by in-house crew rather than contracted labour — 300 general workforce, 100 skilled, 50 field supervisors and 10 managers, carrying site standards from one deployment to the next.",
    stock: [
      { item: "Labour Workforce", quantity: "300 Members" },
      { item: "Skilled Labour", quantity: "100 Members" },
      { item: "Field Work Supervisors", quantity: "50 Members" },
      { item: "Managers", quantity: "10 Members" },
    ],
    media: { kind: "photo" },
    scale: "standard",
    tier: "back",
  },
  {
    index: "09",
    slug: "catering",
    name: "Catering",
    summary: "Delivered in-house through Sharada Caterers.",
    detail:
      "Catering is handled by sister concern Sharada Caterers — corporate breakfast, lunch and meal-box service for business meetings, conferences and events, planned alongside the infrastructure rather than subcontracted around it.",
    stock: [{ item: "Sharada Caterers", quantity: "Sister concern" }],
    media: { kind: "photo" },
    scale: "standard",
    tier: "back",
  },
];

/** Headline stock figures for the capabilities page masthead. */
export const headlineStock = [
  { quantity: "5", unit: "Lakh Sft", item: "Imported German Hangers" },
  { quantity: "10", unit: "Lakh Sft", item: "Wooden Floor Platforms" },
  { quantity: "15,000", unit: "Sqmtr", item: "Octonorm & Maxima Stalls" },
  { quantity: "3,000", unit: "Tons", item: "Temporary Air-conditioning" },
] as const;
