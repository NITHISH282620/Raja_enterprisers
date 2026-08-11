# Client approval prototype — what to review

Six pages, one design system, built from the company catalogue
(`RAJA ENTERPRISES.pdf`) and rajaenterprises.co.

Run it: `npm run dev` → http://localhost:3000

| Page | Route |
| --- | --- |
| Home | `/` |
| Inventory & Capabilities | `/inventory` |
| Portfolio | `/portfolio` |
| Legacy | `/legacy` |
| Locations | `/locations` |
| Contact | `/contact` |

Desktop screenshots (1440px, in scroll order) and mobile (390px) are in
`docs/review-screens/`.

## Where the content comes from

Every figure, date, place and quantity traces to a source, recorded in the
content files:

- `src/content/inventory.ts` — quantities verbatim from the catalogue's
  Inventory Details page. Not rounded, not restated.
- `src/content/projects.ts` — executed work, with an `evidence` note on each
  item saying why we believe its metadata.
- `src/content/company.ts` — contact details exactly as printed; also holds
  `openQuestions`, the seven things only the owner can settle.
- `src/content/locations.ts` — one office, plus cities backed by a project.
- `src/content/legacy.ts` — the six lines of work, in catalogue terminology.

Photography in `public/media/catalogue/` was extracted from the catalogue PDF
itself, so the site shows the company's own projects rather than stock imagery.

## Two things the prototype deliberately does *not* do

**It does not invent.** Where the sources do not settle something, the page
says so instead of filling the gap:

- Three projects carry the date *20 May 2023* in the catalogue — the swearing-in,
  Kempegowda and Shivamogga. That cannot be right for three separate events, so
  two of them publish without a date.
- Two entries (Global Investors Summit, DS Max Anniversary, plus the Chennai
  programme) appear in the sources but their scope of work is not itemised.
  These render with a visible "needs owner confirmation" marker.
- No audio-visual inventory is claimed anywhere. The catalogue documents general
  lighting and LED stall fascia and nothing else.

**It does not claim a branch network.** The catalogue documents one office.
`/locations` maps where work has actually been delivered instead.

## Decisions worth a second opinion

1. **The Prime Ministerial work leads the site.** It is the strongest credential
   in the catalogue and currently appears nowhere on the live website. If there
   is a reason it should be played down, say so.
2. **The hero is live 3D**, not a photograph — the catalogue's own hanger
   photographs top out around 800px wide, too small to run full-bleed.
3. **The enquiry form is presentational.** It is not wired to an inbox, because
   which address should receive enquiries is one of the open questions.

## Superseded

The earlier `(home1)`, `home2` and `home3` prototype routes were removed; the
approved `/home3` direction is carried forward by the production pages. A copy
of the untracked `home3` files is in the session scratchpad, and the tracked
ones remain in git history.
