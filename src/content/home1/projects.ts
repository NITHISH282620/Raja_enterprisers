/**
 * Executed projects. See docs/CONTENT-SOURCE-OF-TRUTH.md §5.
 *
 * `date: null` is deliberate, not missing data. Brochure pages 43, 46 and 47
 * all carry "20. May 2023" for three different events, which cannot be correct.
 * Rather than guess, those projects publish without a date until the client
 * confirms. See client question #2.
 *
 * `deployed` is the field that turns a photograph into proof of execution.
 * It is only populated where the brochure evidences it — never estimated.
 */

export type Project = {
  slug: string;
  title: string;
  type: string;
  location: string | null;
  date: string | null;
  /** Set when the source date is known-unreliable, so the UI can stay silent. */
  dateWithheld?: boolean;
  deployed?: string[];
  image?: string;
  source: string;
};

export const featuredProject: Project = {
  slug: "pm-dedication",
  title:
    "Dedication to the Nation & foundation stone laying for projects worth over ₹3,600 crore",
  type: "State programme",
  location: "Karnataka",
  date: null,
  dateWithheld: true,
  deployed: ["German hangers", "Staging", "Barricading", "Temporary power"],
  source: "BR p.45",
};

export const projects: Project[] = [
  {
    slug: "karnataka-swearing-in",
    title: "Swearing-in ceremony of the new Karnataka Government",
    type: "State ceremony",
    location: "Kanteerava Stadium, Bengaluru",
    date: "20 May 2023",
    source: "BR p.43",
  },
  {
    slug: "kannada-sahitya-sammelana",
    title: "86th Kannada Sahitya Sammelana",
    type: "Cultural programme",
    location: "Haveri",
    date: "6–8 January 2023",
    source: "BR p.42",
  },
  {
    slug: "pwd-inauguration",
    title: "PWD programme inauguration by the Hon'ble Prime Minister of India",
    type: "State programme",
    location: "Karnataka",
    date: "20 June 2022",
    source: "BR p.44",
  },
  {
    slug: "kempegowda-inauguration",
    title: "Kempegowda International Airport & Statue inauguration",
    type: "State programme",
    location: "Bengaluru",
    date: null,
    dateWithheld: true,
    source: "BR p.46",
  },
  {
    slug: "shivamogga-airport",
    title: "Shivamogga Airport inauguration",
    type: "State programme",
    location: "Shivamogga",
    date: null,
    dateWithheld: true,
    source: "BR p.47",
  },
  {
    slug: "iitf-delhi",
    title: "India International Trade Fair",
    type: "Exhibition — interiors & stall fabrication",
    location: "New Delhi",
    date: "2021",
    source: "BR p.14",
  },
  {
    slug: "indian-science-congress",
    title: "107th Indian Science Congress",
    type: "Conference",
    location: null,
    date: null,
    image: "/media/projects/indian-science-congress.jpeg",
    source: "WEB",
  },
  {
    slug: "ambedkar-jayanti",
    title: "Ambedkar Jayanti at Vidhana Soudha",
    type: "State programme",
    location: "Bengaluru",
    date: null,
    image: "/media/projects/ambedkar-jayanti.jpg",
    source: "WEB",
  },
  {
    slug: "cabinet-meeting",
    title: "Karnataka Government Cabinet Meeting",
    type: "State programme",
    location: "Bengaluru",
    date: null,
    image: "/media/projects/cabinet-meeting.jpeg",
    source: "WEB",
  },
  {
    slug: "bhima-diamonds",
    title: "Bhima Diamonds",
    type: "Corporate event",
    location: null,
    date: null,
    image: "/media/projects/bhima-diamonds.jpg",
    source: "WEB",
  },
  {
    slug: "global-investors-summit",
    title: "Global Investors Summit 2023",
    type: "Government summit",
    location: null,
    date: "2023",
    source: "WEB",
  },
  {
    slug: "ds-max-anniversary",
    title: "DS Max Anniversary 2023",
    type: "Corporate event",
    location: null,
    date: "2023",
    source: "WEB",
  },
];

/** The three shown beneath the feature on the homepage. */
export const supportingProjects = projects.slice(0, 3);
