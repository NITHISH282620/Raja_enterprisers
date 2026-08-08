# Raja Enterprises — Redesign Plan

**Deliverable:** a Vercel-hosted, 3D-led concept site presented to the client for approval. On sign-off, it becomes the production build.
**Constraint:** the existing WordPress site stays live and untouched throughout. Nothing is migrated or deleted until the client approves.
**Content authority:** `docs/CONTENT-SOURCE-OF-TRUTH.md`. No copy, number or specification enters the build unless it traces to that file.

---

## A. Current architecture assessment

### There is no codebase to preserve

The working directory `/home/ubuntu-wsl/projects/Raja_enterprise` was **empty**. The live site is hosted WordPress with no repository available locally. So the "redesign, don't rebuild" instruction applies to **content, IA and credibility — not to code.** There is no component layer, design system, or data model to inherit. Building fresh is not a choice we are making; it is the only available path.

### What the live site actually is

| Layer | Finding |
|---|---|
| CMS | WordPress 6.8.6 |
| Page builder | Elementor 4.1.4 |
| Homepage `<title>` | **"Full Page Slider"** — an unrenamed theme demo template |
| Plugins detected | WooCommerce 10.7.0, WP Crowdfunding 2.1.17, GiveWP 4.16.5.1, Google Site Kit, AIOSEO |
| Homepage weight | 219 KB of HTML alone, before assets |
| Content age | **6+ years stale** (client-confirmed). Newest documented project on site predates the brochure's 2023 work. |

**Assessment:** this is a demo theme that was filled in and never finished. WooCommerce, crowdfunding and donation plugins are all loaded on a B2B infrastructure site that sells none of those things — pure dead weight and attack surface. The `<title>` alone is costing them search credibility. There is nothing here worth carrying forward except the content and the URL structure.

### Routes on the live site

```
/                        home (full-page slider)
/home-portfolio/         notable events index
/creative-agency/        services + inventory list
/about-us/               about + contact details
/contact/                contact
/portfolios/<slug>/      8 project detail pages
```

**These URLs must be preserved as redirects** on cutover — `/creative-agency/` and `/home-portfolio/` are terrible slugs, but they are indexed. Map old → new in `next.config.ts` rather than dropping them.

### The real problem, stated plainly

Raja Enterprises owns 5 lakh sq ft of imported German hangers, 460 in-house personnel, 20 vehicles, and has built the stage for events inaugurated by the Prime Minister of India. **None of that is legible on the current website.** The redesign is not a styling exercise — it is making an existing operational capability visible. Every design decision below is judged against that.

---

## B. Existing components worth preserving

Nothing in code. These **content structures** are sound and carry over as-is:

| Preserve | Why |
|---|---|
| Five-item nav logic (Home · Work · Services · About · Contact) | Correct and complete for this business. Do not add items. |
| Inventory-as-quantified-table | This is the company's single best asset. The current site buries it; keep the structure, elevate the presentation. |
| Project-per-page portfolio detail pattern | Right model. Each project deserves its own URL. |
| "Got a project in mind? → Let's Talk" closing CTA | Simple, works, is already the client's voice. Keep the intent, restyle. |
| EST. 1977 / four-decade framing | Genuine differentiator in a field of new entrants. |
| Logo mark | Do not redraw. See §D for how its line motif becomes the design system. |

---

## C. Components requiring redesign

| Component | Current state | Redesign direction |
|---|---|---|
| Hero | Generic full-page slideshow | Scroll-driven 3D hanger interior. §1 below. |
| Inventory | Flat text list + 6 icon cards | Spatial 3D catalogue with expansion. §2, §3 below. |
| Portfolio | Uniform image grid, no metadata | Editorial feature + supporting projects + deployment metadata. §4 below. |
| Navigation | Standard Elementor header | Thin architectural rail, technical labels, scroll-aware. §5 below. |
| Services | Six cards with mismatched copy (two cards share the same description on the live site — a real bug) | Rewritten from brochure verticals, correct copy per card. |
| Contact | Phone/email only, no address, no form | Full HQ block, map, enquiry form with project-type routing. |
| Typography | Theme defaults | Full scale, §D. |
| Client logos | Flat grayscale strip | Named departments in text (see emblem-rights warning in source-of-truth §6). |

---

## D. New components required

### Design tokens

```
Colour
  --ink        #0A0C0E   near-black, primary text
  --graphite   #16191C   dark surfaces, 3D backdrop
  --steel-900  #2A3037
  --steel-500  #6B747D
  --steel-200  #C1CED6   (sampled from logo anti-aliasing)
  --paper      #FAFAF8   primary background
  --off-white  #F1F1EE   alternating sections
  --brand      #063C5B   sampled from logo — accent ONLY
  --brand-mid  #446D83   sampled from logo

Rule: --brand appears on interactive states, the technical index numerals,
and nothing else. No gradients between brand and steel.
```

**Typography.** Futura BT is the brochure face but is commercially licensed. Use **Jost** (open, direct Futura lineage — preserves brand continuity) for display, and **IBM Plex Mono** for technical labels. No third family.

```
display-xl   clamp(3.5rem, 9vw, 9rem)   Jost 500, tracking -0.03em
display-l    clamp(2.5rem, 5vw, 4.5rem) Jost 500, tracking -0.02em
heading      1.75rem                    Jost 500
body         1.0625rem / 1.65           Jost 400, max 68ch
label        0.6875rem                  Plex Mono 500, tracking 0.18em, uppercase
figure       clamp(2rem, 4vw, 3.5rem)   Jost 400, tabular-nums  ← inventory quantities
```

**The line motif.** The logo's circle is scored with horizontal parallel lines. That becomes the system's connective tissue: 1px `--steel-200` rules under every section label, truss-rhythm repetition in the 3D, and a hairline grid overlay on the hero. It ties the 3D to the brand instead of the 3D floating free of it.

### New components

`<SectionIndex>` — `01 // STRUCTURES` technical label with rule
`<FigureStat>` — quantity + unit + item, tabular figures (`5 Lakh Sft / Imported German Hanger`)
`<HangerScene>` — R3F scroll-driven hero
`<AssetStage>` — the shared 3D rig every inventory asset renders into (§3)
`<InventoryField>` — spatial category layout + expansion controller
`<CategoryPanel>` — expanded category detail
`<ProjectFeature>` — large editorial project block
`<ProjectMeta>` — location / type / date / infrastructure deployed
`<CapabilityBar>` — the 460-personnel / 20-vehicle / 5-acre operational strip
`<Rule>` — the 1px divider primitive

---

## E. Asset requirements

### Audit result: photography is the project's biggest gap

I extracted all 738 embedded images from the brochure. **They are unusable at scale.**

| Finding | Detail |
|---|---|
| Total images extracted | 738 |
| Images ≥ 1000×700 | **0** |
| Largest single photo | 795×446 |
| Most common dimensions | 489×43, 816×80, 614×30 — **thin horizontal strips** |

The brochure's photo-collage pages (34–63 images each) are single photographs **sliced into horizontal strips** by the PDF exporter. Reassembly is possible but yields nothing above ~800px wide. **No brochure image can carry a full-bleed hero or a large editorial feature.**

### Usable now

| Asset | Res | Use |
|---|---|---|
| `Raja-logo-02.png` | 1590×400, transparent | Nav, footer. Production-ready. |
| `HMS4169-scaled…jpg` (Ambedkar statue, garlanded) | ~1435×1540 | Strong. Portfolio feature for Ambedkar Jayanti. |
| `indiasciencecongress02BU.jpeg` | 595 KB | Indian Science Congress project |
| `Animal_BhimaJewellery09.jpg` | 252 KB | Bhima Diamonds project |
| `2303_…CMAUTHORITYMEETING.jpeg` | 110 KB | Cabinet meeting project |
| Brochure `o80` — hanger interior, seated rows | 735×490 | **3D reference only** — accurate geometry for the hero truss |
| Brochure `o73` — aerial, opaque + clear-span hangers side by side | 795×446 | **3D reference only** — proves both hanger types |
| Brochure `o177` — Octonorm hall, full exhibition build | 769×452 | **3D reference only** — stall system geometry |
| Brochure `o86` — crowd under striped hanger | 762×422 | Scale evidence, small placement |

### Must request from client (blocking for production, not for the pitch)

1. **Original high-resolution photography** — the brochure was built from originals that exist somewhere. Ask for the source folder.
2. Wide/aerial hanger shots at 2500px+ for full-bleed use.
3. Photos of the warehouse and the vehicle fleet — nobody photographs their own logistics, and it is exactly what proves operational capability.
4. Any drone footage. A 6-second aerial loop of a hanger build would outperform every 3D render on the site.

### Why this argues *for* the 3D approach

We cannot build a premium hero from 800px photographs. A modelled hanger is resolution-independent, renders at any crop, and — because German hanger trusses are simple repeated aluminium bays — can be built to genuinely match their photographs. **The 3D is not decoration here; it is the solution to an asset shortage.** That is the honest argument to make to the client.

### 3D assets to produce

Rule for what gets modelled: **manufactured and structural → 3D. Human and organic → photography.** Modelling a catering spread or a crowd produces exactly the uncanny AI-slop look the brief forbids.

| # | Category | Real inventory backing it | 3D or photo |
|---|---|---|---|
| 01 | Structures | Imported German Hanger — 5 Lakh Sft | **3D** — hero + catalogue |
| 02 | Stalls & Interiors | Octonorm 10,000 sqm · Maxima 5,000 sqm · LED Fascia | **3D** |
| 03 | Flooring & Platforms | Wooden Floor Platform 10 Lakh Sft · synthetic carpet | **3D** |
| 04 | Stage & Seating | Stage 1 Lakh Sft · 50,000 plastic + 5,000 cushion chairs · barricading 10,000 nos | **3D** |
| 05 | Power & Climate | Generators · Temporary AC 3,000 tons · cables | **3D** |
| 06 | Lighting | General Lightings · LED Fascia | **3D, generic fixtures only** — see warning below |
| 07 | Logistics | 20 own goods vehicles · warehouse | **3D**, unbranded vehicle |
| 08 | Workforce | 460 personnel (300 + 100 + 50 + 10) | **Photography** — never model people |
| 09 | Catering | Sharada Caterers | **Photography** |

⚠️ **Category 06 constraint.** The brochure documents no AV inventory — no speakers, LED walls, projectors or moving-head fixtures. The concept mockups show all four. Render generic lighting and LED fascia only. Do not model an AV inventory the company has not documented owning. Flagged as client question #4.

⚠️ Category 02 is **new versus the brief's eight**, and it is deliberate: Octonorm and Maxima stall fabrication is 15,000 sqm of real stock and a core revenue line (brochure devotes pages 11–14 to it). Omitting it would misrepresent the business.

---

## F. Motion requirements

**Governing rule from the brief:** motion supports comprehension. Every motion below is justified by what it makes the user understand.

| Motion | Purpose | Spec |
|---|---|---|
| Hero camera dolly through hanger | Conveys **enclosed volume** — the thing a photo of a tent cannot convey | Scroll-linked, 0–100% of hero, camera on a fixed spline. Never autoplay. |
| Inventory hover lift | Signals affordance, establishes depth | `translateZ` 0→18px, shadow softens outward, 220 ms `cubic-bezier(.22,1,.36,1)` |
| Category expansion | Reads as *entering* the category, not opening a modal | Selected asset scales to focus, siblings translate outward + drop to 12% opacity, 520 ms. Shared-element transform, no crossfade. |
| Figure count-up | Draws the eye to the quantities, which are the credibility | Once, on first intersection, 900 ms, tabular-nums to prevent width jitter |
| Section label rule draw | Punctuates section entry, echoes logo motif | `scaleX` 0→1, 400 ms, from left |
| Project image reveal | Editorial weight | Clip-path wipe, 600 ms, no parallax on the image itself |

**Non-negotiables**
- `prefers-reduced-motion: reduce` → all scroll-linked camera work becomes static composed frames; count-ups render final values; expansions become instant state changes. Not an afterthought; built in from the first commit.
- No motion blocks reading. No text animates in per-character.
- Hero must reach first meaningful paint **without** WebGL: render a static poster frame, hydrate the canvas after. If WebGL is unavailable or the device is low-power, the poster frame *is* the hero and the page is still complete.
- Mobile: no scroll-linked camera. Hover interactions become tap-to-expand. Three fixed hero frames instead of a continuous dolly.
- Budget: 60 fps on a mid-range Android. If the hanger scene cannot hold that, reduce truss bay count before reducing lighting quality.

---

## G. Implementation sequence

Each step ends in something deployable to Vercel and viewable by the client.

| # | Step | Output |
|---|---|---|
| 0 | Scaffold: Next.js 15 App Router + TS + Tailwind v4, deploy blank to Vercel, confirm preview URL | Working pipeline |
| 1 | Tokens, type scale, `<Rule>`, `<SectionIndex>`, `<FigureStat>` | Design system page |
| 2 | Content layer: `content/*.ts` typed from the source-of-truth doc, single import point | No hardcoded copy anywhere after this |
| 3 | Nav + footer + page shells for all 5 routes, old-URL redirects | Navigable site, real content, no 3D |
| 4 | **Static hero** — composed frame, full typography, no WebGL | First client-showable moment |
| 5 | `<AssetStage>` shared rig + the Structures hanger model | Proves the 3D language on one asset |
| 6 | `<HangerScene>` scroll dolly + reduced-motion fallbacks | The hero the pitch rests on |
| 7 | Remaining 3D assets through the same rig | Consistent catalogue |
| 8 | `<InventoryField>` spatial layout + expansion | Phase 3 interaction |
| 9 | Portfolio: feature + supporting + metadata | Credibility layer |
| 10 | Responsive pass, reduced-motion audit, Lighthouse, real-device check | Pitch-ready |

**Stack:** Next.js 15 · TypeScript · Tailwind v4 · react-three-fiber + drei · Lenis (smooth scroll) · GSAP ScrollTrigger (scroll-linked camera) · Vercel.

**Gate at step 4.** Send the static hero before building any 3D. If the typography and composition do not land, the 3D will not save it — and we will have spent the expensive effort on a direction the client rejects.

---

## 1. Homepage

```
┌─────────────────────────────────────────────────┐
│  [logo]      WORK  CAPABILITIES  ABOUT  ⟶ENQUIRE│  thin rail
├─────────────────────────────────────────────────┤
│                                                 │
│   EST. 1977                                     │  mono label
│                                                 │
│   Infrastructure for                            │  display-xl
│   events at state scale.                        │
│                                                 │
│   ── 3D HANGER INTERIOR, camera inside ──       │
│   ── truss bays receding, soft daylight ──      │
│                                                 │
│   [ VIEW CAPABILITIES ]   [ OUR WORK ]          │
└─────────────────────────────────────────────────┘
   scroll ↓ camera moves down the hanger's length
┌─────────────────────────────────────────────────┐
│  460 PERSONNEL   20 VEHICLES   48 YEARS         │  CapabilityBar
├─────────────────────────────────────────────────┤
│  Built for the Prime Minister's dais.           │  ← the credibility line
│  Photo: PM inauguration / Kanteerava            │
├─────────────────────────────────────────────────┤
│  01 // STRUCTURES ── 09 // CATERING             │  InventoryField
│  spatial 3D catalogue                           │
├─────────────────────────────────────────────────┤
│  SELECTED WORK — feature + 3 supporting         │
├─────────────────────────────────────────────────┤
│  Got a project in mind? →                       │
└─────────────────────────────────────────────────┘
```

Headline is a placeholder pending client sign-off. "Engineered Luxury for Infrastructure" from the mockup is not their copy; "Infrastructure for events at state scale" is closer to what the brochure evidences. Offer both.

The **"built for the Prime Minister's dais"** band placed directly after the hero is the most important editorial decision on the page. It is the company's strongest fact and it is currently invisible.

## 2. Inventory section

Not a 6-up grid. A composed field on an asymmetric 12-column grid, cards at three depth tiers (z-planes at 0 / -40 / -80 px), sized by significance — Structures largest, since 5 lakh sq ft of hangers is the flagship.

Each resting card: `01 // STRUCTURES` · name · the quantity as `<FigureStat>` · 3D asset on the shared rig.
Hover: lift, shadow softens, one line of secondary detail fades in.
Click: expands into `<CategoryPanel>` — siblings push outward and dim, asset becomes focus, quantities and capabilities list, CTA.

Mobile: single column, depth flattened, tap to expand inline. No pointer-tracking.

## 3. 3D asset system

Consistency comes from a **shared rig**, not from per-asset art direction. `<AssetStage>` fixes:

- Camera: 35 mm equivalent, fixed 22° elevation / 35° azimuth three-quarter view, orthographic-leaning perspective
- Lighting: one HDRI studio environment for all assets + single soft key at 40° + subtle fill. Identical across every asset.
- Ground: neutral `--off-white` sweep, contact shadow only, no reflective floor
- Scale: a shared unit grid so a chair and a hanger read at honest relative size
- Materials: PBR only — brushed aluminium, PVC membrane, plywood, powder-coated steel. Roughness kept high; controlled specular, no chrome.
- No text, no logos, no invented labels baked into any render

Every asset is a child of this rig. Swapping the rig restyles the entire catalogue at once.

## 4. Portfolio

```
FEATURED
  full-bleed image, display-l title
  ProjectMeta:  LOCATION · TYPE · DATE · INFRASTRUCTURE DEPLOYED
  ↓
SUPPORTING (3-up, asymmetric)
  ↓
FULL INDEX (compact rows, sortable by type)
```

`INFRASTRUCTURE DEPLOYED` is the field that does the work — "German hangers, 4,000 sq ft staging, 12,000 seats" turns a photograph into proof of execution. It requires the client to supply per-project deployment figures; where unavailable, the field is omitted rather than estimated.

Feature slot: the PM inauguration or the Karnataka swearing-in. Publish the two airport inaugurations **without dates** until the brochure's date error is resolved.

## 5. Navigation

Thin rail, `--paper` at 88% with backdrop blur, 1px `--steel-200` bottom rule. Logo left at 28px height. Four items in `label` style, generous tracking. `ENQUIRE` right, `--brand` outline that fills on hover.

Scrolling down past the hero collapses height 80px → 56px. Active section reflected via mono index (`03 //`) beside the current nav item — reinforces the catalogue language and orients the user in a long scroll.

Mobile: logo + `MENU`. Full-screen overlay, items at `display-l`, staggered 40 ms, contact details pinned bottom.

## 6. Motion system

Centralised in `lib/motion.ts` — one duration scale, one easing set, one reduced-motion guard. No component defines its own timings.

```
instant  120ms   state feedback
quick    220ms   hover, lift
base     380ms   reveals, rules
expand   520ms   category expansion
slow     900ms   figure count-up

ease-out    cubic-bezier(.22, 1, .36, 1)     enter
ease-inout  cubic-bezier(.65, .05, .36, 1)   transform between states
```

---

## Risks

| Risk | Mitigation |
|---|---|
| Client has no high-res photography | 3D carries the hero; request originals in parallel. Already the plan. |
| Brochure date errors ship as fact | Publish those two projects without dates. Flagged in source-of-truth. |
| 3D pushes bundle past acceptable load | Static poster hero, canvas hydrates after. Draco-compress geometry. Budget checked at step 6, not at the end. |
| Invented inventory undermines credibility with a client who knows their own stock | Category 06 scoped to documented lighting only. Client question #4 raised. |
| Government emblem usage | Name departments in text; do not reproduce emblems without written permission. |
| Pitch approved, then content still stale | Client questions in source-of-truth §9 must be answered before production cutover, not after. |
