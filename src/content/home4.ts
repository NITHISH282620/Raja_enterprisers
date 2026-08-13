/**
 * /home4 copy.
 *
 * Rewritten from scratch rather than carried over. The previous line —
 * "Engineered Luxury for Infrastructure" — was retired on the owner's
 * instruction: *luxury* is the register of an event decorator, and the company
 * being described owns five lakh square feet of imported steel and moves it on
 * its own lorries.
 *
 * Rules applied throughout:
 *  · Every quantity traces to the company catalogue (BR p.3–4). Nothing is
 *    rounded up, and nothing appears here that is flagged for owner
 *    confirmation in src/content/inventory.ts.
 *  · No superlatives. The numbers are the argument; adjectives would weaken
 *    them. Banned: one-stop, best-in-class, world-class, seamless, passionate,
 *    unforgettable, "your vision, our mission".
 *  · Years in operation is derived, never typed — see `yearsInOperation`.
 */

import { company } from "./company";

export const ESTABLISHED = company.established; // 1977 — BR p.3

/**
 * Years in operation, computed at render.
 *
 * This was hardcoded as "48" in four places, which was correct in 2025, wrong
 * in 2026, and would have been wrong every year after. A figure derived from
 * a date should never be typed by hand.
 */
export function yearsInOperation(now: Date = new Date()): number {
  return now.getFullYear() - ESTABLISHED;
}

export const hero = {
  eyebrow: "Est. 1977",
  location: "Bengaluru",
  /** Set line by line: the mask reveal animates each one separately. */
  headline: ["Infrastructure for events", "at state scale."],
  standfirst:
    "Clear-span structures, staging, flooring and exhibition systems for India's largest public events. Owned inventory, erected by our own people.",
  actions: {
    primary: { label: "Selected work", href: "/home4#work" },
    secondary: { label: "Start an enquiry", href: "/home3/contact" },
  },
  /** Two figures only. The hero states scale; the scale section evidences it. */
  metadata: [
    { figure: "5 Lakh Sft", label: "Owned German hangers" },
    { figure: "460", label: "In-house personnel" },
  ],
  scrollCue: "Scroll",
} as const;

export const positioning = {
  label: "What we build",
  statement: "An event is only as good as what it can be held inside.",
  body: [
    "Raja Enterprises builds the physical environment — imported German clear-span hangers, wooden floor platforms, Octonorm and Maxima stalls, staging, flooring and power.",
    "Everything is held as owned inventory rather than hired in, erected by 460 in-house personnel and moved on 20 company vehicles. That is what makes a date on a contract dependable.",
  ],
} as const;

/**
 * Four lines of work, drawn from the eight service lines on the catalogue
 * cover and grouped by what is physically deployed. Each carries one owned
 * quantity, because a capability claim without a number is a brochure claim.
 */
export const capabilities = [
  {
    label: "Clear-span structures",
    title: "German hangers, erected on open ground.",
    body: "Imported aluminium clear-span hangers that need no internal columns, so the floor plan belongs to the event rather than to the structure. Erected on stadium turf, car parks and ceremonial approaches.",
    figure: "5 Lakh Sft",
    figureLabel: "Held in stock",
    image: "/media/events/ambedkar-jayanti/HMS4230-scaled.jpg",
    imageAlt:
      "Interior of a Raja clear-span German hanger, looking up into the roof structure.",
  },
  {
    label: "Exhibition & stalls",
    title: "Octonorm and Maxima, built to a floor plan.",
    body: "Modular stall systems with LED fascia, fabricated and dressed for trade fairs, national exhibitions and institutional congresses.",
    figure: "15,000 Sqmtr",
    figureLabel: "Octonorm & Maxima",
    image: "/media/raja/octonorm-stalls.jpg",
    imageAlt: "Octonorm exhibition stalls with branded fascia at a national exhibition.",
  },
  {
    label: "Staging & seating",
    title: "Dais, staging and seating at ceremonial scale.",
    body: "Staging and barricading for state ceremonies, swearing-in and public addresses, with cushioned and plastic seating held against the headcount.",
    figure: "50,000 Nos.",
    figureLabel: "Plastic chairs owned",
    image: "/media/events/indian-science-congress/DSC03291-scaled.jpg",
    imageAlt: "Staging and seating installed for the 107th Indian Science Congress.",
  },
  {
    label: "Flooring & power",
    title: "Level floor over any ground.",
    body: "Wooden floor platforms that take a level surface across grass, gravel and gradient, with power distribution and temporary climate control run alongside.",
    figure: "10 Lakh Sft",
    figureLabel: "Wooden floor platforms",
    image: "/media/raja/exhibition-hall-2020.jpg",
    imageAlt: "Wooden floor platform laid across an exhibition hall floor.",
  },
] as const;

/**
 * Six projects. Selected for verifiable date and venue first, photography
 * second — a portfolio entry that cannot be checked is decoration.
 * `image: null` means no photograph is held; the entry still runs, because the
 * job is evidenced by the catalogue even where the picture is not.
 */
export const selectedWork = [
  {
    client: "Government of Karnataka",
    event: "134th Ambedkar Jayanti",
    year: "2025",
    location: "Vidhana Soudha, Bengaluru",
    scope: "Clear-span hanger, ceremonial approach, seating",
    image: "/media/events/ambedkar-jayanti/HMS4180-1-scaled.jpg",
    imageAlt:
      "Raja clear-span hanger erected in front of the Vidhana Soudha for the 134th Ambedkar Jayanti.",
  },
  {
    client: "Indian Science Congress Association",
    event: "107th Indian Science Congress",
    year: "2020",
    location: "University of Agricultural Sciences, Bengaluru",
    scope: "German hanger installation, entry arch, event branding",
    image: "/media/events/indian-science-congress/DSC03516-scaled.jpg",
    imageAlt: "Exhibition avenue and stalls at the 107th Indian Science Congress.",
  },
  {
    client: "Government of Karnataka",
    event: "Swearing-in ceremony of the Karnataka Government",
    year: "2023",
    location: "Kanteerava Stadium, Bengaluru",
    scope: "Staging, barricading and seating",
    image: "/media/catalogue/stadium-barricading.jpg",
    imageAlt: "Barricading and staging installed across a stadium ground.",
  },
  {
    client: "Government of Karnataka",
    event: "86th Kannada Sahitya Sammelana",
    year: "2023",
    location: "Haveri",
    scope: "Hangers, staging and public seating",
    image: "/media/catalogue/sammelana-stage.jpg",
    imageAlt: "Main stage and audience cover at the 86th Kannada Sahitya Sammelana.",
  },
  {
    client: "Government of India",
    event: "PWD Programme inauguration by the Prime Minister",
    year: "2022",
    location: "Bengaluru",
    scope: "Ceremonial structure and dais",
    image: "/media/catalogue/pm-pwd-2022.jpg",
    imageAlt: "Ceremonial dais and cover for a Prime Ministerial inauguration.",
  },
  {
    client: "Indian Society of Obstetrics & Gynaecology",
    event: "62nd All India Congress of Obstetrics & Gynaecology",
    year: null,
    location: "Gayatri Vihar, Palace Grounds, Bengaluru",
    scope: "Exhibition build and delegate infrastructure",
    image: "/media/events/aicog-2019/AICOG_2019_03.jpg",
    imageAlt: "Exhibition build at the All India Congress of Obstetrics & Gynaecology.",
  },
] as const;

/**
 * Scale figures. Every one traces to the catalogue.
 *
 * Temporary air-conditioning (3,000 Tons) is deliberately absent: it carries
 * `ownershipStatus: "owner-confirmation-required"` in inventory.ts, and a
 * headline figure is the last place an unconfirmed number belongs.
 */
export const scaleFigures = [
  { value: "1977", label: "Established", note: "BR p.3", count: false },
  { value: null, label: "Years in operation", note: "Derived from 1977", count: true },
  { value: "460", label: "In-house personnel", note: "BR p.4", count: true },
  { value: "20", label: "Owned goods vehicles", note: "BR p.4", count: true },
  { value: "5 Lakh Sft", label: "Imported German hangers", note: "BR p.4", count: false },
  { value: "10 Lakh Sft", label: "Wooden floor platforms", note: "BR p.4", count: false },
  { value: "15,000 Sqmtr", label: "Octonorm & Maxima stalls", note: "BR p.4", count: true },
] as const;

export const structure = {
  label: "Engineering",
  title: "A clear span holds the roof up without standing in the room.",
  body: "The load runs out along the truss to the perimeter, so nothing lands in the middle of the floor. That is the whole reason a hanger can cover a stadium approach or a ceremonial ground and leave the plan to the event.",
  specs: [
    { term: "System", value: "Imported aluminium clear-span" },
    { term: "Internal columns", value: "None" },
    { term: "Deployment", value: "Erected and struck in-house" },
  ],
} as const;

export const closing = {
  statement: "Built to hold.",
  body: "Tell us the ground, the date and the headcount.",
  action: { label: "Start an enquiry", href: "/home3/contact" },
} as const;
