/**
 * Executed projects.
 *
 * Sources: the company catalogue (BR p.N) and the live site (WEB).
 * Photographs are the catalogue's own; several carry printed backdrops or
 * camera timestamps that independently confirm the date and place, and those
 * are noted in `evidence`.
 *
 * Two rules govern this file:
 *
 *  1. `date: null` and `location: null` are deliberate, not missing data. The
 *     catalogue prints "20 May 2023" on three different events, which cannot
 *     all be correct, so those publish without a date until the owner confirms.
 *  2. `confidence: "needs-confirmation"` marks an item that appears in the
 *     catalogue but whose scope of work is not established by it. The UI shows
 *     this to the owner rather than quietly presenting it as settled.
 */

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string | null;
  date: string | null;
  /** Set when the source's date is known-unreliable, so the UI stays silent. */
  dateWithheld?: boolean;
  description: string;
  /** What the catalogue evidences was deployed. Never estimated. */
  deployed?: string[];
  image?: string;
  imageAlt?: string;
  /** Why we believe the metadata above. Shown to the owner in review. */
  evidence?: string;
  confidence: "documented" | "needs-confirmation";
  source: string;
};

/** The lead item on the portfolio page and the homepage credibility band. */
export const featuredProject: Project = {
  slug: "dedication-to-the-nation",
  title: "Dedication to the Nation & foundation stone laying",
  category: "National programme",
  location: "Karnataka",
  date: null,
  dateWithheld: true,
  description:
    "Ground infrastructure for the dedication and foundation stone laying of projects worth over ₹3,600 crore, inaugurated by the Hon'ble Prime Minister of India. Hanger, dais, staging and audience seating under one contract.",
  deployed: ["German hangers", "Dais & staging", "Audience seating", "Iron barricading"],
  image: "/media/catalogue/pm-dedication.jpg",
  imageAlt:
    "Flower-dressed dais under a Raja Enterprises hanger, with the ₹3,600 crore dedication backdrop on screen.",
  evidence: "Project backdrop legible in the catalogue photograph.",
  confidence: "documented",
  source: "BR p.45",
};

export const projects: Project[] = [
  {
    slug: "rail-road-infrastructure-2022",
    title: "Rail & road infrastructure inauguration by the Hon'ble Prime Minister",
    category: "National programme",
    location: "Bengaluru",
    date: "20 June 2022",
    description:
      "Enclosed hanger, dais and full audience infrastructure for the inauguration of rail and road infrastructure projects by the Hon'ble Prime Minister of India.",
    deployed: ["German hangers", "Dais & staging", "Carpeted flooring", "Audience seating"],
    image: "/media/catalogue/pm-pwd-2022.jpg",
    imageAlt:
      "Wide LED backdrop and red-carpeted dais under a hanger for the June 2022 Prime Ministerial programme.",
    evidence:
      "Date and city printed on the event backdrop, and matched by the camera timestamp on the catalogue photograph (20 June 2022, 16:28).",
    confidence: "documented",
    source: "BR p.44",
  },
  {
    slug: "karnataka-swearing-in",
    title: "Swearing-in ceremony of the Karnataka Government",
    category: "State ceremony",
    location: "Kanteerava Stadium, Bengaluru",
    date: "20 May 2023",
    description:
      "Stadium-scale build for the swearing-in of the state government: barricaded approach routes, protected turf, staging and seating across the ground.",
    deployed: ["Iron barricading", "Staging", "Audience seating", "Ground protection"],
    image: "/media/catalogue/stadium-barricading.jpg",
    imageAlt:
      "Barricaded stadium perimeter and protected turf laid out for the Karnataka Government swearing-in.",
    confidence: "documented",
    source: "BR p.43",
  },
  {
    slug: "kannada-sahitya-sammelana-86",
    title: "86th Kannada Sahitya Sammelana",
    category: "Cultural programme",
    location: "Haveri",
    date: "6–8 January 2023",
    description:
      "A three-day literary gathering built on open ground — main hanger, decorated stage, seating for a mass audience, and the circulation and services to hold it for three consecutive days.",
    deployed: ["German hangers", "Stage", "Audience seating", "General lighting"],
    image: "/media/catalogue/sammelana-address.jpg",
    imageAlt:
      "Address from the Sammelana stage to a filled hanger at the 86th Kannada Sahitya Sammelana.",
    evidence: "Camera timestamp on the catalogue photograph (8 January 2023) falls inside the stated dates.",
    confidence: "documented",
    source: "BR p.42",
  },
  {
    slug: "indian-science-congress-107",
    title: "107th Indian Science Congress",
    category: "Conference",
    location: "University of Agricultural Sciences, Bengaluru",
    date: "3–7 January 2020",
    description:
      "Conference infrastructure across a university campus — registration halls, session structures and delegate seating for a five-day national science congress.",
    deployed: ["German hangers", "Registration structures", "Delegate seating", "Flooring"],
    image: "/media/catalogue/science-congress.jpg",
    imageAlt: "Registration counters under a hanger, branded for the 107th Indian Science Congress.",
    evidence:
      "Event dates and venue printed on the registration and stage backdrops in the catalogue photographs.",
    confidence: "documented",
    source: "BR, WEB",
  },
  {
    slug: "emergency-response-112",
    title: "112 Emergency Response Support System flag-off",
    category: "State programme",
    location: "Vidhana Soudha, Bengaluru",
    date: null,
    dateWithheld: true,
    description:
      "Ceremonial build on the Vidhana Soudha steps — carpeted approach, dais and dressing for a state flag-off, executed on a working government forecourt.",
    deployed: ["Carpeted flooring", "Dais", "Barricading"],
    image: "/media/catalogue/emergency-response-112.jpg",
    imageAlt:
      "Red-carpeted steps and dais set against the Vidhana Soudha for the 112 Emergency Response flag-off.",
    evidence: "Venue and programme legible on the catalogue photograph; the date is not stated.",
    confidence: "documented",
    source: "BR",
  },
  {
    slug: "india-international-trade-fair",
    title: "India International Trade Fair",
    category: "Exhibition",
    location: "New Delhi",
    date: "2021",
    description:
      "Interiors and stall fabrication at India's largest trade fair — modular systems and custom-built shells fitted out across the hall.",
    deployed: ["Octonorm stalls", "Custom fabrication", "LED fascia", "Synthetic carpet"],
    image: "/media/catalogue/exhibition-hall.jpg",
    imageAlt: "Exhibition hall seen from above, filled with fabricated stalls on red carpet.",
    confidence: "documented",
    source: "BR p.14",
  },
  {
    slug: "vishwa-kannada-sammelana-2011",
    title: "Vishwa Kannada Sammelana 2011",
    category: "Cultural programme",
    location: "Belagavi",
    date: "2011",
    description:
      "A world Kannada convention with a fabricated temple-form entrance arch and ceremonial staging — an early example of the fabrication side of the business at civic scale.",
    deployed: ["Custom fabrication", "Stage", "General lighting"],
    image: "/media/catalogue/vishwa-kannada-2011.jpg",
    imageAlt:
      "Fabricated temple-form entrance and stage for Vishwa Kannada Sammelana 2011 at Belagavi.",
    evidence: "Event name, year and city printed on the fabricated arch in the catalogue photograph.",
    confidence: "documented",
    source: "BR",
  },
  {
    slug: "kempegowda-inauguration",
    title: "Kempegowda International Airport & Statue inauguration",
    category: "National programme",
    location: "Bengaluru",
    date: null,
    dateWithheld: true,
    description:
      "Ceremonial infrastructure for the airport terminal and Kempegowda statue inauguration.",
    image: "/media/catalogue/hanger-avenue.jpg",
    imageAlt: "Carpeted central avenue and barricading under a hanger.",
    evidence:
      "The catalogue prints 20 May 2023 here and on two other events, so the date is withheld pending confirmation.",
    confidence: "documented",
    source: "BR p.46",
  },
  {
    slug: "shivamogga-airport",
    title: "Shivamogga Airport inauguration",
    category: "National programme",
    location: "Shivamogga",
    date: null,
    dateWithheld: true,
    description: "Ceremonial infrastructure for the inauguration of Shivamogga Airport.",
    image: "/media/catalogue/hanger-arena.jpg",
    imageAlt: "Enclosed hanger with tiered seating erected over a ground.",
    evidence:
      "The catalogue prints 20 May 2023 here and on two other events, so the date is withheld pending confirmation.",
    confidence: "documented",
    source: "BR p.47",
  },
  {
    slug: "ambedkar-jayanti",
    title: "Ambedkar Jayanti at Vidhana Soudha",
    category: "State programme",
    location: "Bengaluru",
    date: null,
    description:
      "Annual commemoration infrastructure on the Vidhana Soudha forecourt — staging, seating and carpeted approach.",
    image: "/media/projects/ambedkar-jayanti.jpg",
    imageAlt: "Ambedkar Jayanti commemoration at Vidhana Soudha, Bengaluru.",
    confidence: "documented",
    source: "WEB",
  },
  {
    slug: "karnataka-cabinet-meeting",
    title: "Karnataka Government Cabinet Meeting",
    category: "State programme",
    location: "Bengaluru",
    date: null,
    description:
      "Conference infrastructure for a sitting of the state cabinet — enclosed structure, seating and services.",
    image: "/media/projects/cabinet-meeting.jpeg",
    imageAlt: "Karnataka Government cabinet meeting venue.",
    confidence: "documented",
    source: "WEB",
  },
  {
    slug: "global-investors-summit-2023",
    title: "Global Investors Summit 2023",
    category: "Government summit",
    location: null,
    date: "2023",
    description:
      "Summit infrastructure for a government investment forum — exhibition build, delegate seating and conference structures.",
    image: "/media/catalogue/g20-session.jpg",
    imageAlt: "Delegate session laid out in a large conference hall.",
    evidence:
      "Listed on the company website. The photograph is from the catalogue's conference section; the scope of work is not itemised in either source.",
    confidence: "needs-confirmation",
    source: "WEB",
  },
  {
    slug: "bhima-diamonds",
    title: "Bhima Diamonds",
    category: "Corporate event",
    location: null,
    date: null,
    description:
      "Corporate event build for a jewellery retailer — interiors, staging and guest seating.",
    image: "/media/projects/bhima-diamonds.jpg",
    imageAlt: "Bhima Diamonds corporate event interior.",
    confidence: "documented",
    source: "WEB",
  },
  {
    slug: "ds-max-anniversary-2023",
    title: "DS Max Anniversary 2023",
    category: "Corporate event",
    location: null,
    date: "2023",
    description:
      "Anniversary event for a property developer — staging, seating, lighting and catering under one contract.",
    image: "/media/catalogue/banquet-evening.jpg",
    imageAlt: "Evening banquet layout with dressed tables and stage lighting.",
    evidence:
      "Listed on the company website. Photograph is representative of the corporate work in the catalogue rather than confirmed as this event.",
    confidence: "needs-confirmation",
    source: "WEB",
  },
  {
    slug: "national-highways-chennai-2022",
    title: "National Highways & housing projects inauguration, Chennai",
    category: "National programme",
    location: "Jawaharlal Nehru Indoor Stadium, Chennai",
    date: "26 May 2022",
    description:
      "Stage and ceremonial infrastructure for the inauguration of national highway, petroleum pipeline and housing projects by the Hon'ble Prime Minister of India.",
    image: "/media/catalogue/pm-chennai-2022.jpg",
    imageAlt:
      "Ceremonial stage at the Jawaharlal Nehru Indoor Stadium, Chennai, May 2022.",
    evidence:
      "Date, venue and programme printed on the backdrop in the catalogue photograph. Raja Enterprises' scope of work on this event is not itemised in the catalogue.",
    confidence: "needs-confirmation",
    source: "BR",
  },
];

/** Categories used by the portfolio filter, derived rather than hand-listed. */
export const projectCategories = Array.from(
  new Set([featuredProject, ...projects].map((p) => p.category)),
).sort();

/** The three carried on the homepage beneath the feature. */
export const homepageProjects = projects.slice(0, 3);
