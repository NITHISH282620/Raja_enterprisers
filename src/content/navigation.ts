/**
 * The six pages, in order.
 *
 * The production site is served under /home3 so it can sit alongside the
 * /home2 design variant on the review deployment. Paths are written out in
 * full rather than composed from a base constant, because Next's typed routes
 * verify string literals at build time — a mistyped link fails the build
 * instead of shipping as a dead link.
 *
 * When a direction is signed off and moves to the domain root, this file and
 * the `href="/home3/…"` literals in src/app/home3 and src/components/site are
 * the only places that change.
 */
export const HOME = "/home3";

export const navigation = [
  { href: "/home3", label: "Home" },
  { href: "/home3/inventory", label: "Inventory" },
  { href: "/home3/portfolio", label: "Portfolio" },
  { href: "/home3/legacy", label: "Legacy" },
  { href: "/home3/locations", label: "Locations" },
  { href: "/home3/contact", label: "Contact" },
] as const;
