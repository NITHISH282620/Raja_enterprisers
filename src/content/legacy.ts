/**
 * The legacy narrative.
 *
 * Only two dates are documented: 1977 (founding, BR p.3) and the dated
 * projects in projects.ts. The chapters below are therefore organised by
 * *capability* rather than by invented years — each one describes a line of
 * work the catalogue evidences, and cites the project that proves it.
 *
 * No founding story, succession, turnover, headcount growth or award history
 * is asserted, because none is documented.
 */

export const legacyIntro = {
  eyebrow: "Established 1977",
  heading: "Forty-eight years of putting structures on open ground.",
  body: [
    "Raja Enterprises was established in 1977 and is based in Bengaluru. The catalogue describes the company's primary activities as event management and infrastructure provision, conferences, corporate events, and organising and management — delivered as a complete turnkey service.",
    "What that has come to mean in practice is a company that owns what it deploys. Hangers, platforms, stalls, staging, seating, barricading, power and climate are held as inventory; 460 in-house personnel erect and strike them; 20 owned goods vehicles move them. The work below is the record the catalogue evidences.",
  ],
} as const;

export type Chapter = {
  index: string;
  title: string;
  body: string;
  /** The catalogue terminology this chapter is built from. */
  terms: string[];
  /** Slug of a project in projects.ts that evidences it. */
  evidence: string;
  image: string;
  imageAlt: string;
};

export const chapters: Chapter[] = [
  {
    index: "01",
    title: "Infrastructure",
    body: "The base of the business is physical stock and the ability to put it on unmade ground. Imported German hangers give a column-free enclosure; wooden floor platforms make an uneven field level and load-bearing; generators and temporary air-conditioning make the result habitable for a full day. It is the layer every other line of work sits on.",
    terms: ["German Hangers", "Wooden Floor Platform", "Generators", "Temporary Air-conditioners"],
    evidence: "kannada-sahitya-sammelana-86",
    image: "/media/raja/hero-vidhana-soudha.jpg",
    imageAlt: "Raja clear-span hanger erected at the Vidhana Soudha, Bengaluru.",
  },
  {
    index: "02",
    title: "Events",
    body: "Turnkey event management: the catalogue's own framing of the service. One contract carries structure, flooring, staging, seating, lighting, power and catering, so the client holds a single line of responsibility rather than coordinating a field of vendors on site.",
    terms: ["Corporate Events", "Turnkey", "Stage", "Cushion Chairs with Covers"],
    evidence: "ds-max-anniversary-2023",
    image: "/media/raja/hanger-interior-2025.jpg",
    imageAlt: "Interior of a Raja clear-span hanger, looking up into the roof structure.",
  },
  {
    index: "03",
    title: "Exhibitions",
    body: "Design and fabrication of exhibition stalls and interiors — modular Octonorm and Maxima systems alongside custom-built shells, developed through design and visualisation before anything is cut. The catalogue describes a team assembled for design, fabrication, display, production, construction and installation.",
    terms: ["Octonorm Stalls", "Maxima Stalls", "LED Fascia", "Interior"],
    evidence: "india-international-trade-fair",
    image: "/media/raja/exhibition-hall-2020.jpg",
    imageAlt: "Exhibition hall under a Raja hanger, filled with fabricated stalls, 107th Indian Science Congress.",
  },
  {
    index: "04",
    title: "Government programmes",
    body: "The most demanding line of work, and the one with the least tolerance for error: ceremonial infrastructure on government ground, to fixed dates, under security constraint. The catalogue records programmes inaugurated by the Hon'ble Prime Minister of India and the swearing-in of the Karnataka state government.",
    terms: ["Iron Barricading", "Dais", "Government programmes"],
    evidence: "dedication-to-the-nation",
    image: "/media/catalogue/pm-pwd-2022.jpg",
    imageAlt: "Dais and LED backdrop for a Prime Ministerial programme, June 2022.",
  },
  {
    index: "05",
    title: "Corporate events",
    body: "Conferences, business forums, roadshows and anniversary events, run through the same inventory and the same crew as the state work. Catering is delivered in-house by sister concern Sharada Caterers rather than subcontracted around the build.",
    terms: ["Conferences", "Business forums", "Sharada Caterers", "Rental Furnitures"],
    evidence: "indian-science-congress-107",
    image: "/media/raja/exhibition-crowd.jpg",
    imageAlt: "Delegates in the exhibition hall at the 107th Indian Science Congress.",
  },
  {
    index: "06",
    title: "Turnkey execution",
    body: "What ties the five together. Owning the stock, the crew and the vehicles means mobilisation does not depend on third-party availability at peak season — and that the standard applied on a state ceremony is the same one applied on a trade fair the following week.",
    terms: ["Turnkey event management", "Own Goods Vehicles", "Field Work Supervisors"],
    evidence: "karnataka-swearing-in",
    image: "/media/catalogue/hanger-dining.jpg",
    imageAlt: "Long banquet rows laid the full length of a hanger.",
  },
];
