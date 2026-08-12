/**
 * Locations.
 *
 * The catalogue documents exactly one office. No branch network is claimed,
 * because none is evidenced — the concept boards' "Locations" navigation item
 * is answered here with the office plus the places work has actually been
 * executed, each traceable to a project in projects.ts.
 */

export const office = {
  label: "Head office",
  city: "Bengaluru",
  addressLines: ["“Venkat”, #145, 5th Main Road", "Bengaluru – 560018", "Karnataka, India"],
  note: "The complete locality for 5th Main Road is pending owner confirmation before it is published as a mapped address.",
  source: "BR p.2, p.52",
} as const;

/**
 * Where work has been delivered. Every entry is backed by a project in
 * projects.ts — nothing here is a market we would merely like to serve.
 */
export const deliveredIn = [
  {
    state: "Karnataka",
    places: [
      { city: "Bengaluru", note: "Vidhana Soudha, Kanteerava Stadium, University of Agricultural Sciences" },
      { city: "Haveri", note: "86th Kannada Sahitya Sammelana" },
      { city: "Belagavi", note: "Vishwa Kannada Sammelana 2011" },
      { city: "Shivamogga", note: "Airport inauguration" },
      { city: "Male Mahadeshwara Hills", note: "Karnataka Government Cabinet Meeting" },
    ],
  },
  {
    state: "Delhi",
    places: [{ city: "New Delhi", note: "India International Trade Fair" }],
  },
  {
    state: "Tamil Nadu",
    places: [
      {
        city: "Chennai",
        note: "Jawaharlal Nehru Indoor Stadium — scope of work pending owner confirmation",
      },
    ],
  },
  {
    state: "Uttarakhand",
    places: [{ city: "Uttarakhand", note: "Global Investors Summit 2023 — Destination Uttarakhand" }],
  },
] as const;

/** Counts derived from the list above, not asserted independently. */
export const reachSummary = {
  states: deliveredIn.length,
  cities: deliveredIn.reduce((n, s) => n + s.places.length, 0),
} as const;
