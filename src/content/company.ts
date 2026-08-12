/**
 * Company facts. Every value traces to a source.
 *
 *   BR p.N — RAJA ENTERPRISES.pdf, the 52-page company catalogue
 *   WEB    — rajaenterprises.co (live site; content is older, treated as secondary)
 *
 * Do not add a field here without a source, and do not round the figures.
 * Anything the sources do not establish belongs in `openQuestions`, not in copy.
 */

export const company = {
  name: "Raja Enterprises",
  established: 1977, // BR p.3, WEB
  city: "Bengaluru", // BR p.3 — head office; public-facing copy says "across India"
  sisterConcern: "Sharada Caterers", // BR p.15

  /** BR p.3 — the company's own description of what it is, reframed for pan-India reach. */
  positioning:
    "A turnkey event management and infrastructure provider, delivering large-scale events across India. We strive to keep your cost low while keeping our performance high.",

  /** WEB — the live site's framing of reach. */
  reach:
    "Experts in organising government programmes, trade fairs, exhibitions, conferences, roadshows and business forums across India — from Karnataka and Tamil Nadu to Delhi, Uttarakhand and beyond.",

  contact: {
    // BR p.2, p.52.
    addressLines: ["“Venkat”, #145, 5th Main Road", "Bengaluru – 560018", "Karnataka, India"],
    landlines: ["080 26609751", "080 26609753", "080 26602958", "080 26602962"],
    fax: "080 26609753",
    mobile: "+91 98450 44177",
    /** BR p.2 carries the Yahoo address; the domain address is on WEB. */
    email: "raju@rajaenterprises.co",
    emailAlt: "raju_rajaenterprises@yahoo.co.in",
  },
} as const;

/** The approved hero headline. Client copy — signed off as the visual direction. */
export const hero = {
  lines: ["Engineered", "Luxury for", "Infrastructure."],
  /** Built only from documented inventory and the 1977 founding date. */
  subcopy:
    "Imported German hangers, staging, stalls, flooring and power — deployed across India by 460 in-house personnel. Headquartered in Bengaluru. Established 1977.",
} as const;

/**
 * The strip beneath the hero. Derived figures only: each is a plain sum or
 * subtraction over catalogue quantities, never an estimate.
 */
export const keyFigures = [
  { value: "1977", label: "Established", note: "BR p.3" },
  { value: "460", label: "In-house personnel", note: "300 + 100 + 50 + 10, BR p.4" },
  { value: "20", label: "Own goods vehicles", note: "BR p.4" },
  { value: "5 Lakh", label: "Sft of German hangers", note: "BR p.4" },
] as const;

/**
 * The company's strongest credibility fact, and currently invisible online.
 * BR p.43–45.
 */
export const credibility = {
  eyebrow: "Documented execution",
  statement: "Built for the Prime Minister's dais.",
  detail:
    "Raja Enterprises has delivered the ground infrastructure for national programmes inaugurated by the Hon'ble Prime Minister of India — including the Dedication to the Nation and foundation stone laying for projects worth over ₹3,600 crore — and for the swearing-in of the Karnataka state government at Kanteerava Stadium.",
  image: "/media/raja/ambedkar-ceremony.jpg",
  imageAlt:
    "Floral-dressed ceremonial approach to the Ambedkar statue at the Vidhana Soudha, 134th Ambedkar Jayanti, April 2025.",
} as const;

/**
 * How the company describes its own way of working. Assembled from catalogue
 * language (BR p.3, p.13, p.15) — no claims added.
 */
export const approach = [
  {
    index: "01",
    title: "Turnkey, not coordinated",
    body: "The catalogue's word for the service is turnkey: one contract covering structure, flooring, staging, seating, power and climate, rather than a set of vendors held together by a coordinator.",
  },
  {
    index: "02",
    title: "Owned stock, owned crew",
    body: "Hangers, platforms, stalls, chairs and barricading are held as inventory, not hired in. Erection and strike are executed by 460 in-house personnel and moved on 20 owned goods vehicles.",
  },
  {
    index: "03",
    title: "Designed before it is built",
    body: "Exhibition stalls and interiors are developed through design and visualisation ahead of fabrication — the catalogue's stated method for stall and interior work.",
  },
  {
    index: "04",
    title: "Cost held down, performance held up",
    body: "The company's own positioning line, carried on the catalogue's opening page since 1977: keep the client's cost low while keeping performance high.",
  },
] as const;

/**
 * Items the sources do not settle. Shown to the owner in the prototype so the
 * gaps are visible and decidable, rather than filled in with invention.
 */
export const openQuestions = [
  "Confirmation that the locality on the postal address is Chamarajpet. Three business directories give “5th Main, Chamarajpet, Bengaluru 560018”, which matches the PIN, but the catalogue stops at “5th Main Road”.",
  "Correct dates for the Kempegowda and Shivamogga airport inaugurations. The catalogue prints 20 May 2023 on three different events, which cannot all be right — public record puts Kempegowda at 11 November 2022 and Shivamogga at 27 February 2023.",
  "Whether “Dedication to the Nation — ₹3,600 crore” and “Shivamogga Airport Inauguration” are the same programme. The Prime Minister's Office records a single ₹3,600 crore Shivamogga event on 27 February 2023 that included the airport inauguration. Both are published here separately until this is settled.",
  "Whether any audio-visual stock is owned, hired in, or supplied through partners. The catalogue documents no AV inventory, but the company website markets “Lighting & AV Solutions”.",
  "Photographs of the workforce and the goods-vehicle fleet. 460 personnel and 20 vehicles are headline figures with no supporting image anywhere in the supplied material.",
  "Any work executed during 2024, or during 2026 to date. The most recent documented project is April 2025.",
  "Written permission to reproduce government emblems, the Vidhana Soudha and client marks on the website.",
  "The preferred public email address. Four are currently in circulation across the catalogue and the website, including both a .com and a .co.in spelling of the same Yahoo address.",
  "What the 1991 transition into core event infrastructure involved — it is the only dated milestone between the 1977 founding and the projects.",
] as const;
