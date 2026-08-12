# RAJA ENTERPRISES — EVENT & ASSET MATRIX

**Research deliverable. Nothing built from it yet.**
Companion to `PRE-PRODUCTION-AUDIT.md` and `RESEARCH-VISUAL-DISCOVERY.md`.
Date: 12 August 2026

---

## 0. CORRECTIONS TO MY EARLIER RESEARCH

Three of my previous conclusions were wrong. Recording them plainly.

### ❌→✅ Correction 1 — "No 2024–2026 evidence exists"

**Wrong.** I read only the *titles* returned by the portfolio API, not the post bodies.
The body of `/portfolios/ambedkar-jayanti/` reads:

> "Celebrating **134th** Ambedkar Jayanti — Venue: Vidhana Soudha, Bengaluru. The event featured
> a dignified **stage setup**… **German hanger tents** were installed to host attendees…
> paired with professional **catering services**… A specially curated **gallery** depicting
> Dr. Ambedkar's life…"

134th Ambedkar Jayanti = **14 April 2025**. Your correction was right. The WordPress post was
modified 21 May 2025, consistent with a 2025 execution.

### ❌→✅ Correction 2 — "Photography is the binding constraint, max ~1,270px"

**Badly wrong.** I only measured the catalogue PDF extracts. Raja's own WordPress media
library holds **23 photographs at ≥4,000px native**, up to **6000×4000**, 5–18 MB each.
WordPress serves a 2560px `-scaled` derivative but keeps the untouched original alongside
(`HMS4165.jpg` = **14.2 MB**, vs 1.07 MB for the scaled version).

**There is no resolution constraint.** A native 4K+ hero from real Raja photography is
available today.

### ❌→✅ Correction 3 — Wrong locations on two projects

| Project | I had | Actually (Raja's own site) |
| --- | --- | --- |
| Karnataka Government Cabinet Meeting | Bengaluru | **Male Mahadeshwara Hills (MM Hills)** |
| Global Investors Summit 2023 | (none) | **"Destination Uttarakhand"** — i.e. Uttarakhand, not Karnataka |

The second is significant: it is **hard evidence of execution in a fourth state**, and it
materially strengthens the pan-India position.

---

## 1. EVENT MASTER LIST

Sources: `C` = catalogue · `W` = Raja's own website · `P` = photographic evidence · `X` = external corroboration

| # | Event | Date | Location | Src | Raja's stated scope | Images | Confidence | Confirm? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **134th Ambedkar Jayanti** | **14 Apr 2025** | Vidhana Soudha, Bengaluru | W,P | stage, German hanger tents, catering, life-gallery, floral | **11 @ 5.7–6K px** | **High** | recommended |
| 2 | 107th Indian Science Congress | 3–7 Jan 2020 | UAS, Bengaluru | C,W,P,X | German hangers, delegate + exhibition halls, branding, entry arches; **"inaugurated by the Hon'ble PM"** | **13 @ 6000×3376** | **High** | no |
| 3 | Karnataka Govt swearing-in | 20 May 2023 | Kanteerava Stadium, Bengaluru | C,P,X | barricading, staging, seating, ground protection | 1 (low-res) | High | no |
| 4 | 86th Kannada Sahitya Sammelana | 6–8 Jan 2023 | Haveri | C,P | hanger, stage, mass seating, lighting | 3 (low-res) | High | no |
| 5 | PWD Programme Inauguration by Hon'ble PM | 20 Jun 2022 | Bengaluru | C,P | hanger, dais, flooring, seating | 3 (low-res) | High | no |
| 6 | Dedication to the Nation, **₹3,600 crore** | *catalogue gives none* | *catalogue gives none* | C,P | hanger, dais, staging, seating | 1 (low-res) | High | **yes — see §1.1** |
| 7 | Kempegowda Airport + Statue inauguration | C says 20 May 2023 · **X says 11 Nov 2022** | Bengaluru | C,X | not itemised | — | Medium | **yes — date** |
| 8 | Shivamogga Airport inauguration | C says 20 May 2023 · **X says 27 Feb 2023** | Shivamogga | C,X | not itemised | — | Medium | **yes — date** |
| 9 | Interiors — IITF | 2021 | New Delhi | C | interiors, stall fabrication | 2 (low-res) | High | no |
| 10 | **62nd AICOG 2019** | 2019 | Gayatri Vihar, Palace Grounds, Bengaluru | W,P | stall fabrication, full exhibition hall, main stage, branding, delegate accommodation, catering | 1 @ 2560×1920 | High | scope only |
| 11 | Karnataka Govt Cabinet Meeting | n/d | **MM Hills** | W | hangers, AC, wooden flooring, red carpet, lighting, arches, catering | logo only | High | date |
| 12 | **Global Investors Summit 2023 — "Destination Uttarakhand"** | 2023 | **Uttarakhand** | W | German hanger tents, customised exhibition stalls | — | High | no |
| 13 | DS Max Anniversary 2023 | 2023 | Gayatri Vihar, Palace Grounds, Bengaluru | W | **LED stage**, sound & lighting, branding, catering | logo only | High | AV model |
| 14 | Bhima Diamonds | n/d | Gayatri Vihar, Palace Grounds, Bengaluru | W | venue selection, bespoke lighting, full setup | logo only | High | date |
| 15 | National Constitution Day | n/d | Vidhan Soudha, Bengaluru | W | ⚠️ body text is **copy-pasted from GIS 2023** and does not describe this event | — | Low | **yes — content bug** |
| 16 | Vishwa Kannada Sammelana | 2011 | Belagavi | C,P | fabricated arch, stage, lighting | 1 (low-res) | High | no |
| 17 | 112 Emergency Response flag-off | n/d | Vidhana Soudha, Bengaluru | C,P | carpet, dais, barricading | 1 (low-res) | High | date |
| 18 | National Highways/housing, Chennai | 26 May 2022 | J. Nehru Indoor Stadium, Chennai | C,P | **not itemised** | 1 (low-res) | Low | **yes — scope** |

**Total distinct documented events: 18** (was 15).
**New this pass: #1 (2025), #10, #11 location, #12 location, #15.**

### 1.1 Suspected duplicate — do NOT merge without confirmation

PMO's own release: *"PM inaugurates & lays foundation stone of multiple development projects
worth **more than Rs 3,600 crore** in **Shivamogga**, Karnataka"* — 27 Feb 2023, and that
programme **included the Shivamogga Airport inauguration**.

So events **#6 and #8 are probably one programme**. Per your instruction they remain **two
separate entries** with a visible confirmation marker until the owner rules.

---

## 2. INFRASTRUCTURE MASTER LIST — authentic image coverage

For each of the catalogue's capabilities: is there a *Raja-owned* image?

| # | Capability | Catalogue qty | Authentic Raja image? | Best source | 3D? |
| --- | --- | --- | --- | --- | --- |
| 1 | Imported German Hanger | 5 Lakh Sft | ✅ **abundant, 6K px** | HMS4180-1, HMS4230, german_tent_raja | **P0** |
| 2 | Wooden Floor Platform | 10 Lakh Sft | ⚠️ implied only (under carpet) | hanger-avenue | P1 |
| 3 | Octonorm Stalls | 10,000 Sqmtr | ✅ **6K px** | DSC034xx ISC stall halls | **P1** |
| 4 | Maxima Stalls | 5,000 Sqmtr | ❌ not distinguishable | — | P2 |
| 5 | LED Fascia for Stalls | Contemporary | ✅ 1.2K px | stall-led-fascia, stall-karnataka | P2 |
| 6 | Temporary Air-conditions | 3,000 tons | ❌ **none** | — | P3 |
| 7 | Plastic Chairs | 50,000 | ✅ 6K px | HMS4230 (red chairs visible) | P2 |
| 8 | Cushion Chairs w/ Covers | 5,000 | ✅ 6K px | HMS4230, banquet-hall | P2 |
| 9 | Synthetic Carpet | as req. | ✅ **6K px** | DSC03291 (red carpet avenue) | — |
| 10 | Iron Barricading | 10,000 / 1 Lakh RFT | ✅ **6K px** | HMS4180-1 (red barricades, foreground) | P2 |
| 11 | Stage | 1 Lakh Sft | ✅ **6K px** | HMS4146 (dais), Images-05-* (LED stage) | **P1** |
| 12 | General Lightings | as req. | ⚠️ ambient only | hanger-lounge | P3 |
| 13 | Generators | as req. | ❌ **none** | — | P3 |
| 14 | Lighting Cables | as req. | ❌ **none** | — | P3 |
| 15 | Labours (300) | 300 | ⚠️ crowd, not crew | — | — |
| 16 | Skilled Labours (100) | 100 | ❌ **none** | — | — |
| 17 | Field Supervisors (50) | 50 | ❌ **none** | — | — |
| 18 | Managers (10) | 10 | ❌ **none** | — | — |
| 19 | Own Goods Vehicles (20) | 20 | ❌ **none** | — | P3 |
| 20 | Interiors / stall fabrication | as req. | ✅ **6K px** | DSC034xx | P1 |
| 21 | Catering (Sharada) | — | ✅ **6K px** | HMS41xx catering service | — |
| 22 | **Own Warehouse — 5 Acres** *(website only, not catalogue)* | 5 Acres | ❌ **none** | — | — |

**Nine capabilities have no authentic image at all.** The most commercially damaging gaps are
**workforce** (460 people is a headline claim with zero visual proof) and **logistics/fleet**
(20 vehicles, likewise). Both are trivially photographable by the client — a yard shot of the
fleet and a crew shot during a build would close them.

---

## 3. HIGHEST-QUALITY IMAGE SHORTLIST

All are **Raja-owned** (their own WordPress media library) unless marked. Native sizes read
from the untouched originals, not the served derivative. **No image has been upscaled.**

### Tier A — hero-capable (native ≥ 4K)

| Rank | File | Native | MB | Shows | Auth | Res | Comp | Infra | Scale | Light | Hero | Rights |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1** | **HMS4180-1** | **5808×3872** | 6.1 | **Clear-span hanger directly in front of the Vidhana Soudha** — dome + Ashoka capital visible, Ambedkar statue left, folk performers, red barricading, seated crowd | 10 | 10 | 9 | 10 | 9 | 7 | **10** | Raja |
| **2** | HMS4230 | **6000×4000** | 7.4 | Hanger **interior looking up** into the clear-span roof, blue valance, police, seated crowd | 10 | 10 | 9 | 10 | 8 | 8 | **9** | Raja |
| 3 | HMS4156 | 6000×4000 | 18.3 | Ambedkar Jayanti — statue + floral, ceremonial | 10 | 10 | 8 | 6 | 7 | 8 | 7 | Raja |
| 4 | HMS4146 | 4000×6000 | 16.0 | Dais/stage with dignitary backdrop (portrait) | 10 | 10 | 8 | 8 | 6 | 7 | 6 | Raja |
| 5 | DSC03291 | 6000×3376 | 9.0 | 107th ISC banner avenue, red carpet, native 16:9 | 10 | 10 | 9 | 6 | 7 | 7 | 7 | Raja |
| 6 | DSC03221/03222 | 6000×3376 | 6.5 | ISC exhibition hall interiors, stalls, crowd | 10 | 10 | 8 | 9 | 8 | 6 | 7 | Raja |
| 7 | DSC03516/03520 | 6000×3376 | ~5 | ISC Octonorm stall bays, close | 10 | 10 | 8 | 10 | 5 | 6 | 5 | Raja |
| 8 | HMS4165 | 5754×3836 | 14.2 | Ambedkar life-gallery interior | 10 | 10 | 7 | 5 | 5 | 7 | 4 | Raja |

### Tier B — local, client-supplied, not yet in repo

| File | Native | Shows | Note |
| --- | --- | --- | --- |
| `german_tent_raja.jpeg` | 1600×1204 | **Bare aluminium portal frames at golden hour**, receding, sun flare | Best *structural* image; provenance `CONFIRM` |
| `raja_2.jpeg` | 1376×768 | second approved board (interior hero) | design reference |

### Tier C — catalogue extracts already in repo
24 images, 800–1,270px. **Keep as card/section imagery.** Now demoted from hero duty.

### ❌ Do not use
Press/agency photographs · Stitch AV renders (z4, z5) · Stitch oil refinery (z6) · Halle G ·
any third-party German-hanger vendor photograph.

---

## 4. HERO RECOMMENDATION — resolved

**Primary: `HMS4180-1` (5808×3872) — the hanger in front of the Vidhana Soudha.**

Why this frame and not another:

- It is **Raja-owned** and **native 5.8K** — no upscaling, no rights ambiguity.
- It contains, in one frame, the four things the site must assert: **a Raja clear-span
  structure**, **the seat of the Karnataka state government**, **crowd scale**, and **owned
  barricading**. For a government-procurement visitor this is the most persuasive single
  image in the entire corpus.
- It is **2025 work** — it closes the "newest proof is 2023" problem at the top of the page.
- Its structure is the *same* portal-frame type our `lattice.ts` already generates, so the 3D
  layer can align to it rather than contradict it.
- Its composition suits `raja_1`: horizon low, sky open upper-left for the copy column,
  structure mass centre-right.

**Secondary (interior variant, matches `raja_2.jpeg`): `HMS4230` (6000×4000)** — looking up
into the clear-span roof. Recommend showing the owner both.

**Construction** — unchanged from the approved hybrid, now with a real plate:

```
BACKGROUND   HMS4180-1, graded, slight desaturation, 4K
MIDGROUND    atmospheric depth separation
FOREGROUND   procedural portal-frame geometry, aligned to the photographed structure
CAMERA       drone approach → settles into raja_1 composition
FALLBACK     the graded still alone (also the WebGL/reduced-motion poster)
```

The fallback being *the photograph itself* is the point: if WebGL never loads, the hero is
still a real 4K photograph of Raja's work, not an empty box.

---

## 5. 3D ASSET PLAN — P0 → P3

| Pri | Asset | Why | Evidence to build from | Verdict |
| --- | --- | --- | --- | --- |
| **P0** | **German Hanger** (improve existing) | 5 Lakh Sft is the flagship line; hero depends on it; already 80% built | HMS4180-1, HMS4230, german_tent_raja | **Build now** |
| **P1** | **Octonorm stall bay** | 15,000 Sqmtr of stock; visually distinctive; now has 6K reference | DSC03516/03520/03222 | Build after approval |
| **P1** | **Stage / platform** | 1 Lakh Sft; every event page needs it | HMS4146, Images-05-* | Build after approval |
| **P2** | Wooden floor platform | large qty but visually plain; better as exploded diagram than hero 3D | hanger-avenue | Photographic + diagram |
| **P2** | Seating block | already exists (`Seating.tsx`), just needs materials | HMS4230 | Reuse |
| **P2** | Iron barricading | cheap to model, adds realism to ground plane | HMS4180-1 foreground | Nice-to-have |
| **P3** | Generators / AC / cables | no reference imagery, low visual value | none | **Do not build** |
| **P3** | Goods vehicles | no reference imagery | none | **Do not build** |
| **P3** | Lighting truss + AV | **AV ownership unconfirmed** — modelling it would assert stock Raja may not own | none | **Blocked on §10** |

**Hanger improvements (P0):** membrane sag between purlins · aluminium material variation ·
base plates · cross-bracing · gable/door detail · realistic ground contact + contact shadow ·
environment lighting (self-hosted HDR, CSP-safe) · replace deprecated `THREE.Clock` /
`PCFSoftShadowMap`.

---

## 6. ASSET STORAGE (proposed — not created)

```
public/media/
  original/events/{ambedkar-2025,isc-2020,...}/     # untouched, ≥4K, Raja-owned
  web/events/…                                       # derivatives for the site
  web/infrastructure/…
  references/external/                               # REFERENCE ONLY — VERIFY RIGHTS
```
Every external image carries a JSON sidecar: `source, sourceUrl, originalUrl, width, height,
format, event, attribution, rightsStatus, confidence, usage`. **Originals are never
overwritten, and derivatives never replace them.**

---

## 7. IMPLEMENTATION PLAN

### 1 — What will change
`src/content/projects.ts` (add 134th Ambedkar Jayanti 2025; fix MM Hills and Uttarakhand
locations; adopt catalogue's "PWD Programme Inauguration" title; add AICOG 2019, National
Constitution Day, Cabinet Meeting) · `src/content/inventory.ts` (Own Warehouse 5 Acres,
Special Furniture — flagged as website-only) · `src/content/legacy.ts` (1991 milestone) ·
`src/components/site/Hero.tsx` (photographic plate + camera) ·
`src/components/three/HeroHangerCanvas.tsx` (drone choreography, fallback) ·
`src/components/three/materials.ts` + `lattice.ts` (hanger realism) · new
`WhoWeServe` section · mobile/tablet compositions.

### 2 — What stays untouched
**Production WordPress, Hostinger, DNS — absolutely.** Also `/home2` and its components ·
`src/app/layout.tsx` · the `Reveal` primitive · the confidence/`dateWithheld`/`evidence`
discipline · the catalogue quantities · `SiteHeader`/`SiteFooter` structure · the raja_1
composition.

### 3 — Assets reused
All 24 catalogue images (demoted to cards) · `raja-logo.png` · `lattice.ts`, `materials.ts`,
`Hanger.tsx`, `Seating.tsx` · the whole `site/` component vocabulary.

### 4 — 3D created
P0 hanger improvements only, until approval. Then P1 Octonorm + stage.

### 5 — Pages affected
Home (most) · Portfolio (new + corrected entries) · Inventory (2 extra lines, AV status) ·
Legacy (1991) · Locations (Uttarakhand → 4 states) · Contact (unchanged).

### 6 — Hero animation
Five beats, ~7–9 s, one continuous eased path, settling into the raja_1 frame; then
scroll-linked drift. **Headline and CTAs paint immediately at full opacity — they never wait
for the camera.** Any scroll input skips to the resting frame.

### 7 — Mobile differs
Dedicated compositions at 390/430/768/834/1024/1280/1440+. Phones start at beat 4 (short
descend + settle), DPR capped, shadows off, second structure removed, portrait-cropped plate.

### 8 — Fallback
`prefers-reduced-motion` → resting frame, no fly-through. No WebGL → the graded 4K photograph
as a static hero. Slow connection → photograph first, canvas hydrates after.

### 9 — Verification
`tsc` + `eslint` + `next build` clean · all 8 routes 200 · zero horizontal overflow at all 7
widths · zero broken images · zero console errors · hero FPS sampled on desktop and throttled
mobile · reduced-motion and WebGL-off paths screenshotted · full-page captures for owner review.

---

## 8. WHAT TO REQUEST FROM RAJA

**Now unblocked** — we no longer need high-res photography for the hero; they already have it.

1. **Written confirmation we may use the WordPress media library images** (esp. `HMS4180-1`).
2. **Photographs of the workforce and the 20-vehicle fleet** — two capabilities with 460 and
   20 as headline numbers and *zero* visual proof.
3. Provenance/rights for `german_tent_raja.jpeg`.
4. Is the ₹3,600 crore dedication the same event as Shivamogga Airport?
5. Correct dates: Kempegowda, Shivamogga, Cabinet Meeting, Bhima, 112 flag-off.
6. **AV: owned, hired, or partner-provided?** (blocks P3 3D and the Inventory wording)
7. National Constitution Day — the description on your site is copy-pasted from GIS 2023.
8. Anything from 2024, or 2026 to date.
9. Warehouse — 5 acres, where?
10. South India or across India? *(evidence now supports across India: Karnataka, Delhi,
    Uttarakhand, Tamil Nadu)*
11. What happened in 1991?
12. ~10 stills from `vid1_raja.mp4`.

---

**Nothing implemented. Production untouched.** The prototype at `/home3` is being pushed to
Vercel unchanged in content — only the four broken internal links are fixed.
