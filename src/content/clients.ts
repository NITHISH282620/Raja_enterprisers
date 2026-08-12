/**
 * Clients.
 *
 * Assembled from three sources:
 *   1. The executed projects in projects.ts (each names a commissioning body)
 *   2. Client-supplied names (Karnataka Government, Indian Government,
 *      Public TV, Sollagedhunia)
 *   3. The company catalogue and website portfolio
 *
 * Only organisations for which there is documented work or owner testimony
 * are listed. The tier field drives visual sizing in the marquee.
 */

export type Client = {
  name: string;
  /** Short identifier used for logo filename lookup. */
  slug: string;
  /** Path to a verified, client-supplied logo file. Absent until one exists —
   *  the strip falls back to a wordmark rather than inventing a mark. */
  logo?: string;
  /** Determines visual weight in the marquee strip. */
  tier: "government" | "corporate" | "media" | "institution";
  /** The descriptive event context (e.g. 'Government programme', 'National exhibition') */
  categoryLabel?: string;
  /** The project or relationship that evidences this client. */
  evidence?: string;
};

export const clients: Client[] = [
  // ── Government ────────────────────────────────────────────────────
  {
    name: "Government of India",
    slug: "govt-india",
    tier: "government",
    categoryLabel: "National programme",
    evidence: "PWD Programme, Dedication to the Nation, airport inaugurations",
  },
  {
    name: "Government of Karnataka",
    slug: "govt-karnataka",
    tier: "government",
    categoryLabel: "Government programme",
    evidence: "Karnataka swearing-in, cabinet meetings, Ambedkar Jayanti",
  },
  {
    name: "Government of Uttarakhand",
    slug: "govt-uttarakhand",
    tier: "government",
    categoryLabel: "Government summit",
    evidence: "Global Investors Summit 2023 — Destination Uttarakhand",
  },
  {
    name: "Government of Tamil Nadu",
    slug: "govt-tamilnadu",
    tier: "government",
    categoryLabel: "State programme",
    evidence: "National Highways & housing projects inauguration, Chennai",
  },

  // ── Corporate ─────────────────────────────────────────────────────
  {
    name: "DS Max Properties",
    slug: "ds-max",
    tier: "corporate",
    categoryLabel: "Corporate event",
    evidence: "DS Max Anniversary 2023",
  },
  {
    name: "Bhima Diamonds",
    slug: "bhima-diamonds",
    tier: "corporate",
    categoryLabel: "Corporate event",
    evidence: "Corporate event — interiors, staging, seating",
  },
  {
    name: "Sharada Caterers",
    slug: "sharada-caterers",
    tier: "corporate",
    categoryLabel: "Event services partner",
    evidence: "Sister concern — catering arm for all events",
  },

  // ── Media ─────────────────────────────────────────────────────────
  {
    name: "Public TV",
    slug: "public-tv",
    tier: "media",
    categoryLabel: "Media partner",
    evidence: "Client-supplied — Kannada news channel coverage & event partnerships",
  },
  {
    name: "Sollagedhunia",
    slug: "sollagedhunia",
    tier: "media",
    categoryLabel: "Media partner",
    evidence: "Client-supplied — media & content partnership",
  },

  // ── Institutions ──────────────────────────────────────────────────
  {
    name: "Indian Science Congress",
    slug: "isc",
    tier: "institution",
    categoryLabel: "National scientific congress",
    evidence: "107th Indian Science Congress, UAS Bengaluru",
  },
  {
    name: "India International Trade Fair",
    slug: "iitf",
    tier: "institution",
    categoryLabel: "National exhibition",
    evidence: "Stall fabrication at IITF, New Delhi",
  },
  {
    name: "Kannada Sahitya Parishat",
    slug: "sahitya-parishat",
    tier: "institution",
    categoryLabel: "Cultural programme",
    evidence: "86th Kannada Sahitya Sammelana, Haveri",
  },
  {
    name: "AICOG",
    slug: "aicog",
    tier: "institution",
    categoryLabel: "Medical congress",
    evidence: "62nd All India Congress of Obstetrics & Gynaecology",
  },
  {
    name: "Vidhana Soudha",
    slug: "vidhana-soudha",
    tier: "institution",
    categoryLabel: "State ceremony venue",
    evidence: "Multiple state ceremonies at the Vidhana Soudha forecourt",
  },
] as const;

/** For display grouping — derived, not hand-listed. */
export const clientTiers = Array.from(
  new Set(clients.map((c) => c.tier)),
);
