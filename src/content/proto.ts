/**
 * Copy and navigation for the /home5–/home9 hero studies.
 *
 * These five routes exist to compare *hero concepts*, so everything that is
 * not the hero is deliberately identical across them: the same masthead, the
 * same sections below the fold, the same footer. Only the 3D scene changes.
 *
 * The wording here is the client's own, taken from the live site at
 * rajaenterprises.co rather than rewritten — the point of these studies is to
 * judge the visual concept, not a new headline.
 */

/** Live-site hero block, verbatim. */
export const protoHero = {
  eyebrow: "Established In 1977",
  heading: "Our Legacy",
  standfirst:
    "Raja Enterprises has been delivering experiential event solutions across India for over four decades.",
} as const;

/**
 * The live site's own menu labels.
 *
 * Only `HOME` differs per study — it points back at that study's own route.
 * The four remaining items resolve to the built-out /home3 pages, which are
 * the same content the live site's menu leads to; there is no value in
 * duplicating five identical copies of an About page to compare heroes.
 */
export const protoNav = [
  { label: "NOTABLE EVENTS", href: "/home3/portfolio" },
  { label: "SERVICES", href: "/home3/inventory" },
  { label: "ABOUT US", href: "/home3/legacy" },
  { label: "CONTACT", href: "/home3/contact" },
] as const;

/** The five studies, for the switcher that lets a reviewer flip between them. */
export const protoStudies = [
  { id: "5", href: "/home5", label: "Stadium", concept: "Stadium bowl" },
  { id: "6", href: "/home6", label: "Assembly", concept: "Exploded assembly" },
  { id: "7", href: "/home7", label: "Blueprint", concept: "Orthographic blueprint" },
  { id: "8", href: "/home8", label: "Site plan", concept: "Aerial site plan" },
  { id: "9", href: "/home9", label: "Catalogue", concept: "Studio turntable" },
] as const;
