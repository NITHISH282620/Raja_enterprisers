/**
 * Inventory. Quantities are verbatim from the catalogue's Inventory Details
 * page (BR p.4). These figures are the credibility spine of the site — do not
 * round them, restate them or embellish them.
 *
 * What is deliberately absent: audio-visual stock. The catalogue lists
 * "General Lightings" and "LED Fascia for Stalls" and nothing else. No
 * speakers, LED walls, projectors or moving-head fixtures are documented, so
 * none are claimed here. See company.openQuestions.
 */

import type { AssetKind } from "./home1/inventory";

export type Category = {
  index: string;
  slug: string;
  name: string;
  /** Two or three words. This is the eyebrow label — never a sentence. */
  kicker: string;
  /** One line — the card's standfirst. */
  summary: string;
  /** Expanded copy for the inventory page. */
  detail: string;
  /** Verbatim catalogue quantities. */
  stock: { item: string; quantity: string; ownershipStatus?: "owned" | "in-house" | "partner-provided" | "hired" | "unclear" | "owner-confirmation-required" }[];
  image?: string;
  imageAlt?: string;
  /**
   * The rendered 3D model, shared with home1's catalogue rig, for every
   * category worth modelling. People and food are left as photography —
   * modelling them produces the uncanny look the brief forbids.
   */
  media: { kind: "3d"; asset: AssetKind } | { kind: "photo" };
  /** Bento weight on the homepage grid. */
  weight: "flagship" | "major" | "standard";
};

export const categories: Category[] = [
  {
    index: "01",
    slug: "structures",
    kicker: "Infrastructure",
    name: "German Hangers & Structures",
    summary: "Imported aluminium clear-span hangers — 5 Lakh Sft in stock.",
    detail:
      "Clear-span aluminium hangers imported for large-format deployment. Column-free interiors take staging, seating and services without breaking sightlines, and the shell is weatherproof enough to hold a full day's programme on open ground. This is the single largest holding in the inventory and the reason a field can become a venue.",
    stock: [{ item: "Imported German Hanger", quantity: "5 Lakh Sft" }],
    image: "/media/raja/inventory/german-hanger-3d.jpg",
    imageAlt:
      "Interior of a Raja clear-span hanger at the Vidhana Soudha, looking up into the roof structure.",
    media: { kind: "photo" }, // Changed from 3d asset to photo to use the enclosed hanger image
    weight: "flagship",
  },
  {
    index: "02",
    slug: "flooring-platforms",
    kicker: "Ground works",
    name: "Flooring & Platforms",
    summary: "Wooden floor platforms — 10 Lakh Sft — and new synthetic carpet.",
    detail:
      "Level, load-bearing wooden platform decking laid over uneven or unmade ground: the substrate that makes a field usable as a venue. Finished with brand-new synthetic carpet rather than reused stock. At 10 Lakh Sft this is the largest quantity in the catalogue.",
    stock: [
      { item: "Wooden Floor Platform", quantity: "10 Lakh Sft" },
      { item: "Brand New Synthetic Carpet", quantity: "As per requirements" },
    ],
    image: "/media/raja/inventory/wooden-floor-3d-new.jpg",
    imageAlt:
      "Carpeted banner avenue at the 107th Indian Science Congress, University of Agricultural Sciences, Bengaluru.",
    media: { kind: "photo" },
    weight: "major",
  },
  {
    index: "03",
    slug: "stalls-interiors",
    kicker: "Fabrication",
    name: "Stalls & Interiors",
    summary: "Octonorm and Maxima systems — 15,000 Sqmtr — plus custom fabrication.",
    detail:
      "Design and fabrication of exhibition stalls and interiors: modular Octonorm and Maxima systems alongside custom-built shells, developed through design and visualisation before the build. LED fascia is fitted to stall frontage.",
    stock: [
      { item: "Octonorm Stalls", quantity: "10,000 Sqmtr" },
      { item: "Maxima Stalls", quantity: "5,000 Sqmtr" },
      { item: "LED Fascia for Stalls", quantity: "Contemporary" },
    ],
    image: "/media/raja/inventory/octonorm-stalls-3d-new.jpg",
    imageAlt: "Octonorm stall bays fitted out for exhibitors at the 107th Indian Science Congress.",
    media: { kind: "photo" },
    weight: "major",
  },
  {
    index: "04",
    slug: "stage-seating",
    kicker: "Audience",
    name: "Stage & Seating",
    summary: "1 Lakh Sft of staging, 55,000 chairs, 1 Lakh RFT of barricading.",
    detail:
      "Modular staging built to the required height and span, audience seating from stackable plastic through covered cushioned chairs, and iron barricading for crowd separation and secure perimeters. The seating count is what allows a state-scale gathering to be seated rather than standing.",
    stock: [
      { item: "Stage", quantity: "1 Lakh Sft (different sizes)" },
      { item: "Plastic Chairs", quantity: "50,000 Nos." },
      { item: "Cushion Chairs with Covers", quantity: "5,000 Nos." },
      { item: "Iron Barricading", quantity: "10,000 Nos. (1 Lakh RFT)" },
    ],
    image: "/media/raja/inventory/stage-seating-3d.jpg",
    imageAlt: "Dais and stage backdrop built for a state ceremony at the Vidhana Soudha.",
    media: { kind: "photo" },
    weight: "major",
  },
  {
    index: "05",
    slug: "power-climate",
    kicker: "Services",
    name: "Power & Climate",
    summary: "3,000 tons of temporary air-conditioning, with generators and cabling.",
    detail:
      "Independent power generation and temporary air-conditioning for enclosed structures, with cable runs sized to the deployment. This is the services layer that makes an enclosed hanger habitable for a full-day programme rather than merely covered.",
    stock: [
      { item: "Temporary Air-conditioners", quantity: "3,000 Tons" },
      { item: "Generators", quantity: "As per requirements" },
      { item: "Different Sizes Lighting Cables", quantity: "As per requirements" },
    ],
    image: "/media/raja/inventory/ac-unit-3d.jpg",
    imageAlt: "Enclosed hanger over a sports ground with tiered seating and general lighting.",
    media: { kind: "photo" },
    weight: "standard",
  },
  {
    index: "06",
    slug: "lighting",
    kicker: "Lighting",
    name: "Lighting",
    summary: "General lighting across structures, stall bays and approaches.",
    detail:
      "General lighting for structures, stall bays and circulation routes, distributed on cable runs sized to the site. The catalogue documents general lighting and LED stall fascia only — no audio-visual stock is listed, and none is claimed here.",
    stock: [{ item: "General Lightings", quantity: "As per requirements" }],
    image: "/media/raja/inventory/lighting-av-multi-3d.jpg",
    imageAlt: "Lit hanger interior at dusk, arranged with lounge seating.",
    media: { kind: "photo" },
    weight: "standard",
  },
  {
    index: "07",
    slug: "workforce",
    kicker: "People",
    name: "Workforce",
    summary: "460 in-house personnel, from ground crew to site managers.",
    detail:
      "Erection, fit-out and strike are executed by in-house crew rather than contracted labour — 300 general workforce, 100 skilled, 50 field supervisors and 10 managers. Site standards carry from one deployment to the next because the same people carry them.",
    stock: [
      { item: "Labours", quantity: "300 Members" },
      { item: "Skilled Labours", quantity: "100 Members" },
      { item: "Field Work Supervisors", quantity: "50 Members" },
      { item: "Managers", quantity: "10 Members" },
    ],
    image: "/media/catalogue/state-gathering.jpg",
    imageAlt: "Several thousand seated attendees under a Raja Enterprises hanger.",
    media: { kind: "photo" },
    weight: "standard",
  },
  {
    index: "08",
    slug: "logistics",
    kicker: "Movement",
    name: "Logistics",
    summary: "A 20-vehicle owned fleet moving stock to site.",
    detail:
      "Inventory at this scale only counts if it reaches the ground on schedule. Transport runs on owned goods vehicles rather than hired capacity, so mobilisation is not contingent on third-party availability at peak season.",
    stock: [{ item: "Own Goods Vehicles", quantity: "20 Nos." }],
    image: "/media/raja/inventory/logistics-fleet-3d.jpg",
    imageAlt: "Long banquet rows laid out under a hanger, showing the scale of a single deployment.",
    media: { kind: "photo" },
    weight: "standard",
  },
  {
    index: "09",
    slug: "catering",
    kicker: "Hospitality",
    name: "Catering",
    summary: "Delivered in-house through sister concern Sharada Caterers.",
    detail:
      "Catering is handled by sister concern Sharada Caterers — corporate breakfast, lunch and meal-box service for business meetings, conferences and events — planned alongside the infrastructure rather than subcontracted around it.",
    stock: [{ item: "Sharada Caterers", quantity: "Sister concern" }],
    image: "/media/raja/catering-service.jpg",
    imageAlt: "Catering service laid out by sister concern Sharada Caterers at a state ceremony.",
    media: { kind: "photo" },
    weight: "standard",
  },
];

/** The four figures carried as the inventory masthead. */
export const headlineStock = [
  { figure: "5", unit: "Lakh Sft", item: "Imported German Hangers" },
  { figure: "10", unit: "Lakh Sft", item: "Wooden Floor Platforms" },
  { figure: "15,000", unit: "Sqmtr", item: "Octonorm & Maxima Stalls" },
  { figure: "3,000", unit: "Tons", item: "Temporary Air-conditioning" },
] as const;

/**
 * The full Inventory Details table, verbatim (BR p.4), rendered as a schedule
 * on the inventory page. An owner reviewing this should recognise their own
 * document line for line.
 */
export const inventorySchedule = [
  { item: "Imported German Hanger", quantity: "5 Lakh Sft", ownershipStatus: "owned" },
  { item: "Wooden Floor Platform", quantity: "10 Lakh Sft", ownershipStatus: "owned" },
  { item: "Octonorm Stalls", quantity: "10,000 Sqmtr", ownershipStatus: "owned" },
  { item: "Maxima Stalls", quantity: "5,000 Sqmtr", ownershipStatus: "owned" },
  { item: "LED Fascia for Stalls", quantity: "Contemporary", ownershipStatus: "unclear" },
  { item: "Temporary Air-conditioners", quantity: "3,000 Tons", ownershipStatus: "owner-confirmation-required" },
  { item: "Plastic Chairs", quantity: "50,000 Nos.", ownershipStatus: "owned" },
  { item: "Cushion Chairs with Covers", quantity: "5,000 Nos.", ownershipStatus: "owned" },
  { item: "Brand New Synthetic Carpet", quantity: "As per requirements", ownershipStatus: "unclear" },
  { item: "Iron Barricading", quantity: "10,000 Nos. (1 Lakh RFT)", ownershipStatus: "owned" },
  { item: "Stage", quantity: "1 Lakh Sft (different sizes)", ownershipStatus: "owned" },
  { item: "General Lightings", quantity: "As per requirements", ownershipStatus: "unclear" },
  { item: "Generators", quantity: "As per requirements", ownershipStatus: "unclear" },
  { item: "Different Sizes Lighting Cables", quantity: "As per requirements", ownershipStatus: "unclear" },
  { item: "Labours", quantity: "300 Members", ownershipStatus: "in-house" },
  { item: "Skilled Labours", quantity: "100 Members", ownershipStatus: "in-house" },
  { item: "Field Work Supervisors", quantity: "50 Members", ownershipStatus: "in-house" },
  { item: "Managers", quantity: "10 Members", ownershipStatus: "in-house" },
  { item: "Own Goods Vehicles", quantity: "20 Nos.", ownershipStatus: "owned" },
] as const;

/** The eight lines the catalogue cover sells (BR p.2). */
export const serviceLines = [
  "Exhibition",
  "Corporate Events",
  "Interior",
  "German Hangers",
  "Catering Services",
  "Rental Furnitures",
  "Temporary Toilets & Bathrooms",
  "Hiring",
] as const;
