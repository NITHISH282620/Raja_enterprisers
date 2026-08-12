# RAJA ENTERPRISES — PRE-PRODUCTION AUDIT

**Status:** Discovery only. Nothing deployed, committed, pushed or deleted.
**Date of audit:** 12 August 2026
**Labels used:** `VERIFIED` (checked first-hand this session) · `CATALOGUE` (decoded from
RAJA ENTERPRISES.pdf) · `PUBLIC SOURCE` · `INFERENCE` · `CLIENT CONFIRMATION REQUIRED`

---

## HEADLINE FINDINGS

1. **Production is a WordPress site on Hostinger. The Vercel prototype cannot touch it.**
   They share no infrastructure. `VERIFIED`
2. **The live site still runs purchased-theme demo content** — blog posts titled
   "Hello world!", "How to create a NFT project and get a money", "The Biggest Design
   Trends of 2022" — plus WooCommerce, a crowdfunding plugin and donation forms. `VERIFIED`
3. **All 19 catalogue inventory lines are now verified verbatim** from the PDF's own text,
   not from a secondary transcription. They match what we have been building on. `CATALOGUE`
4. **"Dedication to the Nation ₹3,600 crore" and "Shivamogga Airport Inauguration" are
   almost certainly the same event** — Shivamogga, 27 Feb 2023. We currently show them as
   two separate projects. `PUBLIC SOURCE` → `CLIENT CONFIRMATION REQUIRED`
5. **The catalogue's "20.May 2023" is a copy-paste error on two of three events.**
   Public record contradicts it. We must not silently correct it. `PUBLIC SOURCE`
6. **The live `/home3` prototype has four broken links** (404 on `/portfolio`, `/legacy`).
   Fix is written locally but **not pushed**, per your instruction. `VERIFIED`

---

## SECTION 1 — REPOSITORY ARCHITECTURE

### 1.1 Routes (`src/app`)

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `next.config.ts` redirect → `/home3` | no page file exists |
| `/home2` | `src/app/home2/{layout,page}.tsx` | earlier photographic direction (Halle G hero) |
| `/home3` | `src/app/home3/page.tsx` | approved direction — home |
| `/home3/inventory` | `src/app/home3/inventory/page.tsx` | |
| `/home3/portfolio` | `src/app/home3/portfolio/page.tsx` | |
| `/home3/legacy` | `src/app/home3/legacy/page.tsx` | |
| `/home3/locations` | `src/app/home3/locations/page.tsx` | |
| `/home3/contact` | `src/app/home3/contact/page.tsx` | |

All 8 routes prerender as static (`○`). No server routes, no API routes, no middleware,
no route handlers, no dynamic segments. `VERIFIED`

### 1.2 Components

```
src/components/
  site/         SiteHeader SiteFooter Hero PageShell Primitives ProjectCard Reveal   ← /home3 only
  home2/        Home2Nav Home2Hero Home2Inventory Home2Projects Home2Footer Home2HangerCanvas
  three/        HeroHangerCanvas lattice.ts materials.ts models/{Hanger,Seating}.tsx
```

**Shared between both prototypes:** `src/components/three/models/Hanger.tsx`,
`models/Seating.tsx`, `lattice.ts`, `materials.ts`, `src/lib/*`, `src/content/*`,
`src/app/globals.css`, `src/app/layout.tsx`.

> **Coupling risk:** `materials.ts` is shared. A membrane/aluminium change made for
> `/home3` also changes `/home2`'s canvas. Currently tuned for `/home3`. `VERIFIED`

### 1.3 Content layer (`src/content`)

| File | Contents |
| --- | --- |
| `company.ts` | positioning, contact, key figures, credibility, approach, `openQuestions` |
| `inventory.ts` | 9 categories + `inventorySchedule` (19 lines) + `serviceLines` (8) |
| `projects.ts` | `featuredProject` + 15 projects, with `confidence` / `dateWithheld` / `evidence` |
| `legacy.ts` | 6 chapters keyed to catalogue terminology |
| `locations.ts` | one office + `deliveredIn` |
| `navigation.ts` | the six nav entries |

The `confidence` / `dateWithheld` / `evidence` discipline is already implemented and should
be preserved exactly as-is. `VERIFIED`

### 1.4 Assets (`public/media`)

| Folder | Count | Notes |
| --- | --- | --- |
| `catalogue/` | 24 JPG | extracted from the catalogue PDF; **max width ~1,220px** |
| `projects/` | 9 | mixed legacy assets; `home3-stadium.png` now unused and untracked |
| `brand/` | 1 | `raja-logo.png` |

**No 3D model files at all** — no `.glb`, `.gltf`, `.fbx`, `.hdr`, `.exr`. All 3D geometry is
generated procedurally in `lattice.ts`. **No video assets. No custom font files** (fonts come
from `next/font`). `VERIFIED`

### 1.5 Uncommitted working tree (as of this audit)

```
 M src/app/home3/inventory/page.tsx     ← link prefix fix
 M src/app/home3/locations/page.tsx     ← link prefix fix
 M src/app/home3/page.tsx               ← link prefix fix (x2)
 M src/components/site/Primitives.tsx   ← href typed as next `Route`
?? public/media/projects/home3-stadium.png   (unused)
?? work_screen.png                           (stray)
```

These are the 404 fixes. **Held, not committed.** `VERIFIED`

---

## SECTION 2 — CURRENT PRODUCTION / DEPLOYMENT ARCHITECTURE

### 2.1 The live company website — `rajaenterprises.co`

| Property | Value | Evidence |
| --- | --- | --- |
| Platform | **WordPress 6.8.6** | `<meta name=generator>`, `/wp-json/` link header `VERIFIED` |
| Host | **Hostinger** | `platform: hostinger`, `panel: hpanel` response headers `VERIFIED` |
| Web server | LiteSpeed (+ LiteSpeed cache) | `server: LiteSpeed`, `x-litespeed-cache: hit` `VERIFIED` |
| PHP | 8.2.30 | `x-powered-by` `VERIFIED` |
| Address | `2a02:4780:11:764:0:2695:dc37:5` (Hostinger range, IPv6) | DNS `VERIFIED` |
| Front page | page ID 782, slug `full-page-slider` | `rel=alternate` header `VERIFIED` |
| Theme | `most` | asset paths `VERIFIED` |
| Page builder | Elementor + Jeg Elementor Kit + Header-Footer Elementor | asset paths `VERIFIED` |
| Forms | Metform, Contact Form 7 | asset paths `VERIFIED` |
| SEO | All in One SEO Pack | asset paths `VERIFIED` |
| **Commerce/donation** | **WooCommerce, WP Crowdfunding, GiveWP, Woo Smart Wishlist, qrowd-addon** | asset paths `VERIFIED` |

**Custom post types present:** `portfolios` (8 entries), `product`, `give_forms`,
`metform-entry`, `elementor_library`, `e-floating-buttons`. `VERIFIED`

**Total real content: 7 pages + 8 portfolio items.** Everything else is theme demo data.

### 2.2 The prototype — `raja-enterprisers.vercel.app`

| Property | Value |
| --- | --- |
| Host | **Vercel**, edge region `bom1` (Mumbai) `VERIFIED` |
| Framework | Next.js 16.3.0, static prerender (`x-nextjs-prerender: 1`) `VERIFIED` |
| Repo | `github.com/NITHISH282620/Raja_enterprisers` `VERIFIED` |
| Branch | `main` `VERIFIED` |
| Latest commit | `2a49e0b` — "six-page approval prototype at /home3…" `VERIFIED` |
| Deploy trigger | git push to `main` (no Vercel CLI, no `.vercel/` dir locally) `INFERENCE` |

### 2.3 The relationship — **this is the important part**

```
rajaenterprises.co ──DNS──► Hostinger (LiteSpeed) ──► WordPress 6.8.6
                                                      NOT connected to git

raja-enterprisers.vercel.app ──► Vercel ──► GitHub NITHISH282620/Raja_enterprisers @ main
                                             this repository
```

**They are entirely separate systems.** A `git push` publishes only to
`raja-enterprisers.vercel.app`. It has **no route to the client's live domain**, because the
domain's DNS resolves to Hostinger, not Vercel. `VERIFIED`

Practical consequence: the earlier push was **not** a production change. The client's site
was never at risk. Production changes would require either a DNS cutover or editing files
via Hostinger — neither of which has been done.

### 2.4 UNKNOWN — REQUIRES ACCESS/CONFIRMATION

- Vercel account owner, project name, team, and whether any custom domain is attached.
- Vercel environment variables (none referenced in code; `.env*` absent locally).
- Whether Vercel preview deployments are enabled for branches/PRs.
- Hostinger plan, backup schedule, staging capability, PHP/WP update policy.
- Who owns the domain registration and where DNS is managed.
- Whether anyone else edits the WordPress site.
- Google Search Console / Analytics ownership and current indexed inventory.

---

## SECTION 3 — VERSION BASELINE

All read from installed `node_modules`, not from the manifest's semver ranges. `VERIFIED`

| Layer | Version |
| --- | --- |
| Node | 24.18.1 |
| Package manager | npm 11.16.0 (`package-lock.json`, lockfileVersion 3) |
| Framework | Next.js **16.3.0** (App Router, Turbopack, typed routes on) |
| React | 19.2.8 / react-dom 19.2.8 |
| TypeScript | 5.9.3, `strict: true`, alias `@/* → ./src/*` |
| CSS | Tailwind **4.3.3** via `@tailwindcss/postcss`, CSS-first `@theme` in `globals.css` |
| 3D | three **0.185.1**, @react-three/fiber **9.7.0**, @react-three/drei **10.7.8** |
| Animation | **gsap 3.15.0 and lenis 1.3.26 are installed but never imported** `VERIFIED` |
| Lint | eslint 9.39.5 + eslint-config-next 16.3.0 |
| Build | `next build` → 8 static routes, tsc + eslint clean |

**Dead dependencies:** `gsap`, `lenis` — zero imports anywhere in `src/`. Either adopt them
deliberately for the motion system or remove them. `src/lib/motion.ts` is likewise defined
but unused (only `useReducedMotion` is consumed).

### Code classification

| Class | Files |
| --- | --- |
| **Production code** | none in this repo — production is WordPress, elsewhere |
| **Prototype — approved direction** | `src/app/home3/**`, `src/components/site/**`, `src/components/three/HeroHangerCanvas.tsx` |
| **Prototype — alternate direction** | `src/app/home2/**`, `src/components/home2/**` |
| **Shared** | `src/content/**`, `src/lib/**`, `src/components/three/{lattice,materials,models}`, `globals.css`, `app/layout.tsx` |
| **Shared assets** | `public/media/catalogue/**`, `public/media/brand/**` |
| **Unused** | `public/media/projects/home3-stadium.png`, `work_screen.png`, gsap, lenis, `lib/motion.ts` |

Everything in this repository is safe to modify. Nothing here is production.

---

## SECTION 4 — CONTENT SOURCE-OF-TRUTH HIERARCHY

1. **Supplied catalogue** (`RAJA ENTERPRISES.pdf`) — authoritative for inventory, services,
   company description, project titles/dates as the company states them.
2. **Client's own live website** — authoritative for positioning language, contact details,
   and the portfolio list. Note it **contradicts the catalogue in places** (§13).
3. **Photographic evidence inside catalogue images** — printed backdrops and camera
   timestamps; strong corroboration for dates.
4. **Official government / PMO sources** — for public-event dates only, never to assert
   Raja's involvement.
5. **Reputable press** — corroboration only.

**Never** infer Raja's execution of an event from equipment appearing in a photograph.

### Catalogue text — now decoded first-hand

The PDF's text is in subset Type0 fonts with a constant **+29 glyph offset** and no usable
`ToUnicode` map, which is why earlier extraction produced mojibake and dropped every digit.
Decoding it properly this session means **§5 is now first-party verified**, not transcribed.
Decoder and plain text are in the session scratchpad (`pdf/decode.py`, `catalogue-plain.txt`).

---

## SECTION 5 — CATALOGUE FACTS (`CATALOGUE`, verbatim)

### 5.1 Company statement (p.3)

> "Raja Enterprises is Established in 1977. its based in bangalore. Company's primary
> activities include Event management and infrastructure provider, Conferences, Corporate
> Events and Organizing and Management. Raja Enterprises is Provides complete turnkey event
> management services, We strive to keep your cost low while keeping our performance high,
> we are committed"

### 5.2 Inventory Details (p.4) — **all 19 lines verified**

| Item | Quantity | Matches our `inventory.ts`? |
| --- | --- | --- |
| Imported German Hanger | 5 Lakh Sft | ✅ |
| Wooden Floor Platform | 10 Lakh Sft | ✅ |
| Octonorm Stalls | 10,000 Sqmtr | ✅ |
| Maxima Stalls | 5,000 Sqmtr | ✅ |
| LED Fascia for Stalls | Contemporary | ✅ |
| Temporary Air-**conditions** | 3,000 tons | ⚠️ we wrote "Air-conditioners" |
| Plastic Chairs | 50,000 No's | ✅ |
| Cushion chairs with Covers | 5,000 No's | ✅ |
| Brand New Synthetic carpet | As per Requirements | ✅ |
| Iron Barricading | 10,000 No's (1 Lakh RFT) | ✅ |
| Stage | 1 lakh Sft (Different Sizes) | ✅ |
| General Lightings | As per Requirements | ✅ |
| Generators | As per Requirements | ✅ |
| Different Sizes Lighting Cables | As per Requirements | ✅ |
| Labours | 300 Members | ✅ |
| Skilled Labours | 100 Members | ✅ |
| Field Work Supervisors | 50 Members | ✅ |
| Managers | 10 Members | ✅ |
| Own goods Vehicles | 20 No's | ✅ |

The list you supplied in the brief matches the catalogue exactly. The only divergence in our
build is the word "Air-conditioners" vs the catalogue's "Air-conditions" — trivial, but since
the rule is *do not silently correct*, flag it rather than keep our tidier wording.

**Confirmed absent from the schedule:** any audio-visual stock. No speakers, LED walls,
projectors or moving-head fixtures. (But see §13.1 — the client's own website *does* market
"Lighting and AV Solutions".)

### 5.3 Service lines (cover, p.2) — all 8 verified

Exhibition · Corporate Events · Interior · German Hangers · Catering Services ·
Rental Furnitures · Temporary Toilets & Bathrooms · Hiring

### 5.4 Project pages — exact titles and dates

| Catalogue title (verbatim) | Catalogue date |
| --- | --- |
| 86th Kannada **Sayithya** Sammelana Haveri | 06.07.08 Jan 2023 |
| Swearing ceremony of New Karnataka Govt. 2023 at Kanteerava Stadium | 20.May 2023 |
| **PWD Programme Inauguration** by Hon'ble Prime Minister of India | 20.June 2022 |
| Dedication to the Nation and Foundation Stone laying for various Project worth over Rs. 3600 Crore, Innaugurated by Hon'ble Prime Minister Govt. of India | *(none)* |
| Kempegowda Internationa Airport Inauguration / Kempegowda Statue Inauguration | 20.May 2023 |
| Shivamogga Airport Inauguration | 20.May 2023 |
| Interiors — IITF-Delhi | 2021 |

Two corrections this implies for our current `projects.ts`:

- We titled the June 2022 event "Rail & road infrastructure inauguration", derived from the
  Kannada banner. **The catalogue's own title is "PWD Programme Inauguration."** Use theirs.
- The catalogue spells it **"Sayithya"**, we wrote "Sahitya" (the conventional spelling).
  Flag rather than silently correct.

### 5.5 Interiors & Catering blurbs

Interiors (p.~15): *"…boutique firm… design and fabrication of exhibitions customized stalls
and interior… our team has been part of many satisfied client's exhibitions **across the
country**."* → supports pan-India for exhibition work. `CATALOGUE`

Catering: *"having sistern concerns company **SHARADA CATERERS**… best corporate catering in
Bangalore… corporate breakfast, lunch, and meal box catering."* `CATALOGUE`

---

## SECTION 6 — VERIFIED COMPANY RESEARCH

| Claim | Source | Type | Confidence | Safe to publish? | Client confirm? |
| --- | --- | --- | --- | --- | --- |
| Established 1977 | catalogue p.3 + own site | CATALOGUE + official | High | ✅ | No |
| Headquartered Bangalore/Bengaluru | catalogue + own about page | CATALOGUE + official | High | ✅ | No |
| **"In 1991 made a strategic transition into core event infrastructure and management"** | own about page | official | High | ✅ | Recommended |
| "Over three decades of specialized experience in the events industry" | own about page | official | High | ✅ | No |
| "One of **South India's** most trusted… event infrastructure companies" | own about page | official | High | ✅ | ⚠️ conflicts with pan-India |
| "Delivering… across India for over four decades" | own home page | official | High | ✅ | No |
| "Exhibitions **across the country**" | catalogue + own contact page | CATALOGUE + official | High | ✅ | No |
| "State ceremonies attended by the Hon'ble Prime Minister of India" | own about page | official | High | ✅ | No |
| Sister concern: Sharada Caterers | catalogue | CATALOGUE | High | ✅ | No |
| Turnkey event management provider | catalogue p.3 | CATALOGUE | High | ✅ | No |
| 460 in-house personnel (300+100+50+10) | catalogue p.4, summed | CATALOGUE + arithmetic | High | ✅ | Recommended |
| Phone +91 98450 44177 | catalogue + both site pages | consistent | High | ✅ | No |
| **Phone +91 98457 71144** | own about page only | official | Medium | ⚠️ | **Yes** |
| Email `raju@rajaenterprises.co` | own about page | official | High | ✅ | Yes (see §13.2) |
| Email `info@rajaenterprises.co` | own contact page | official | High | ✅ | Yes |
| Landlines 080 26609751/53, 26602958/62 | catalogue + own contact page | consistent | High | ✅ | No |
| TradeIndia company profile exists | tradeindia.com | directory | Medium | ❌ don't cite | Optional |

**No social media presence was discovered** (no Instagram/LinkedIn/Facebook/YouTube found in
search or in the site's markup). `CLIENT CONFIRMATION REQUIRED` — if accounts exist with
recent project photography, that is the single richest untapped content source.

---

## SECTION 7 — LAST-TWO-YEARS EVENT RESEARCH (2024 – 2026)

**Honest answer: nothing verifiable was found.**

| Finding | Detail |
| --- | --- |
| Newest dated item in the catalogue | 20 May 2023 |
| Newest portfolio entry on the live site | Global Investors Summit 2023 / DS Max Anniversary 2023 |
| WordPress `portfolios` CPT | all 8 entries authored 11 Aug 2022; none added since |
| Independent 2024–2026 evidence of Raja execution | **none found** |

So there is a **three-year documentation gap (mid-2023 → today)** for a company that is
certainly still trading. This is the largest single content risk in the project: a site
whose newest proof is three years old undercuts the "still operating at scale" message.

Two portfolio items exist on the live site that are **not** in our `projects.ts`:

| Item | Source | Status |
| --- | --- | --- |
| **AICOG 2019** (All India Congress of Obstetrics & Gynaecology) | live site `portfolios` CPT | `CLIENT CONFIRMATION REQUIRED` — scope not stated |
| **National Constitution Day at Vidhan Soudha** | live site `portfolios` CPT | `CLIENT CONFIRMATION REQUIRED` — no date stated |

### Public-record date conflicts — do not auto-correct

| Event | Catalogue says | Public record | Source |
| --- | --- | --- | --- |
| Karnataka Govt swearing-in, Kanteerava | 20 May 2023 | 20 May 2023 ✅ consistent | press |
| Kempegowda Airport T2 + Statue | 20 May 2023 | **11 November 2022** | [PM unveils statue & inaugurates T2](https://www.aninews.in/news/national/general-news/pm-modi-arrives-in-city-to-unveil-statue-of-kempegowda-inaugurate-airports-terminal-2-20221111095627/), [Business Standard](https://www.business-standard.com/article/current-affairs/modi-to-inaugurate-airport-s-terminal-2-unveil-kempegowda-s-statue-today-122111100146_1.html) |
| Shivamogga Airport | 20 May 2023 | **27 February 2023** | [Deccan Herald](https://www.deccanherald.com/state/top-karnataka-stories/pm-modi-to-inaugurate-shivamogga-airport-and-launch-development-projects-in-karnataka-on-february-27-1195211.html), [NewsOnAir](https://www.newsonair.gov.in/shivamogga-airport-inaugurated-by-prime-minister-narendra-modi-in-february-begins-air-operations-today) |

### ⚠️ Likely duplicate — highest-value finding in this section

The PMO's own release is titled **"PM inaugurates & lays foundation stone of multiple
development projects worth more than Rs 3,600 crore in Shivamogga, Karnataka"**, and that
programme **included the Shivamogga Airport inauguration** — same day, 27 Feb 2023.
[pmindia.gov.in](https://www.pmindia.gov.in/en/news_updates/pm-inaugurates-lays-foundation-stone-of-multiple-development-projects-worth-more-than-rs-3600-crore-in-shivamogga-karnataka/)

The catalogue lists "Dedication to the Nation… ₹3,600 Crore" and "Shivamogga Airport
Inauguration" as two entries. **They are very probably one event.** We currently publish them
as two separate projects with two different photographs — which inflates the portfolio count
and is exactly the kind of thing a government client would notice.
`PUBLIC SOURCE` → `CLIENT CONFIRMATION REQUIRED`

---

## SECTION 8 — PRODUCT / EQUIPMENT RESEARCH

| System | What is actually established | Manufacturer | Confidence |
| --- | --- | --- | --- |
| German hanger | **Imported**, aluminium, clear-span; 5 Lakh Sft held. Contact page: "Aluminium German Hanger Tents" | **UNKNOWN** | catalogue High / brand None |
| Octonorm stalls | 10,000 Sqmtr held | Octanorm is a real German maker (generic in Indian trade use) | Medium |
| Maxima stalls | 5,000 Sqmtr held | Maxima is a real system brand (also used generically) | Medium |
| LED fascia | fitted to stall frontage, "Contemporary" | UNKNOWN | Low |
| Wooden floor platform | 10 Lakh Sft | UNKNOWN | catalogue High |
| Staging | 1 Lakh Sft, different sizes | UNKNOWN | catalogue High |
| Temporary AC | 3,000 tons | UNKNOWN | catalogue High |
| Barricading | 10,000 units / 1 Lakh RFT | UNKNOWN | catalogue High |
| Generators, lighting cable | "as per requirements" | UNKNOWN | catalogue High |
| Goods vehicles | 20 owned | UNKNOWN | catalogue High |
| **Audio-visual** | **not in the schedule**, but marketed on the live site | n/a | conflict — §13.1 |

**No specific manufacturer, model, span rating, wind rating or load rating is documented
anywhere.** Terms like "Octonorm" and "Maxima" are used generically across the Indian
exhibition trade, so their presence is **not** evidence of a supplier relationship.

### Imagery rights recommendation

| Option | Verdict |
| --- | --- |
| A. Real Raja photographs | ✅ **Primary.** Client-owned, authentic, already extracted. Limited by resolution (§13.4). |
| B. Licensed product imagery | ❌ Avoid. Implies supplier relationships we cannot evidence. |
| C. Our own 3D reconstruction | ✅ **Secondary.** No rights issue; we author it. |
| D. 3D interpretation of Raja's *photographed* equipment | ✅ **Best of both** — proportions taken from their own photographs, so it is authentic *and* rights-clean. |

**Do not** copy third-party manufacturer renders into the build. **Do not** name a
manufacturer until the client confirms one in writing.

---

## SECTION 9 — 3D ASSET STRATEGY

### Current state

`lattice.ts` procedurally generates a genuinely well-constructed hanger: lattice box-truss
portal frames (four chords + zigzag web bracing + panel posts), purlins along the roof
slopes and eaves, a membrane shell, and a gable end. Instanced — a whole hanger is a handful
of draw calls. Spec: 25 m clear span, 4.2 m eave, 7.4 m ridge. `VERIFIED`

This is a real asset and should be kept and extended, not replaced.

### Gaps against "archviz, not gaming"

| Gap | Impact |
| --- | --- |
| No environment map / IBL | metals read flat; `drei`'s `Environment` needs a local HDR (CSP-safe, must be self-hosted) |
| No material variation | one aluminium, one membrane — no wear, no dirt, no seams |
| Membrane is a hard-edged polygon shell | real PVC sags between purlins; catenary edges would sell it instantly |
| No ground texture | structure floats on flat colour |
| No secondary detail | no guy lines, ratchets, base plates, door frames, cable trays |
| Deprecated APIs in console | `THREE.Clock` deprecated → `THREE.Timer`; `PCFSoftShadowMap` deprecated → `PCFShadowMap` (38 warnings at tablet width) `VERIFIED` |
| No WebGL failure fallback | if WebGL is unavailable the hero is blank paper |
| No mobile GPU tier gating | full shadow map + 2 structures on a phone |

### Recommended asset ladder

1. **Hanger (exists)** — extend: sagging membrane, base plates, bracing, door bays.
2. **Stage + seating (partly exists)** — `Seating.tsx` is a good chair instance; add a
   modular deck with skirting.
3. **Octonorm stall bay** — the highest-value *new* asset; the extrusion + infill panel
   system is visually distinctive and directly represents 15,000 Sqmtr of stock.
4. **Wooden floor platform** — a bearer/joist/deck stack, shown as an exploded assembly.
5. **Truss + fixture rig** — only if AV ownership is confirmed (§13.1).

Build them all from the same `materials.ts` family so the catalogue reads as one system.

---

## SECTION 10 — HOMEPAGE HERO RECOMMENDATION

### Assessment of the current `/home3` hero

| Verdict | Detail |
| --- | --- |
| ✅ Good | Composition matches the approved `raja_1` board; type, colour, "Est. 1977" chip all correct. Scroll-linked dolly + drift is restrained and reads as architectural. Reduced-motion parks a static frame. |
| ⚠️ Wrong | It reads as a **technical drawing, not a venue.** White membrane on a near-white sky, no ground texture, no people, no event. It says "we model tents," not "we build the environment your event happens in." |
| ⚠️ Wrong | **No sense of scale.** Nothing human-sized in frame. |
| ❌ Missing | No WebGL fallback. |
| ⚠️ Mobile | At 390–400px the structure sits directly behind body copy; a vertical veil was added but the structure still competes. |
| ⚠️ Tablet | At 1024×1366 the hero is bottom-heavy: type occupies the top third, 3D the lower two-thirds, with a dead band between. |

### Recommendation — **Option E: real photograph as environmental base + 3D structural overlay**

Ranked against your five options:

| Option | Verdict |
| --- | --- |
| 1. Real Raja event photography alone | Strong on credibility, weak on resolution (§13.4) |
| 2. Raja's actual German hanger (photo) | same resolution limit |
| 3. Custom 3D reconstruction alone | **what we have now** — crisp but sterile |
| 4. Drone/architectural perspective | `hanger-aerial.jpg` is the single best asset we hold |
| 5. **Hybrid real-image + 3D** | ✅ **recommended** |

Concretely: a real large-scale Raja execution photograph (candidates: `hanger-aerial.jpg`,
the drone shot of two hangers on a lawn; or `state-gathering.jpg`, several thousand seated
attendees under a hanger) as the environmental plate, **desaturated and graded**, with the
procedural truss geometry resolving *out of* it in the foreground — structure emerging from
evidence. The photograph supplies scale, people and legitimacy; the 3D supplies crispness,
motion and the "engineered" idea. It also directly answers "Raja can build the environment
in which this event happens."

**Blocker:** the hero plate needs ≥ 2,400px of real photography. We do not have it (§13.4).
This is the **single highest-priority client ask.**

---

## SECTION 11 — MOTION SYSTEM RECOMMENDATION

### Current state

One primitive — `Reveal` (18px rise + fade, IntersectionObserver, fires once) — plus the hero
camera. Reduced motion handled in CSS. That consistency is genuinely good and should be the
spine of the system. `VERIFIED`

But: `gsap` and `lenis` are installed and unused, and `lib/motion.ts` defines a duration/easing
scale nothing imports. **Decide deliberately** — either adopt Lenis for scroll smoothing and
GSAP ScrollTrigger for choreography, or delete both. Do not leave them installed.

### Proposed one motion language

| Surface | Behaviour | Reason |
| --- | --- | --- |
| Hero | slow camera drift + scroll-linked dolly | establishes scale, physically believable |
| Section entry | the existing 18px rise, stagger ≤ 240ms | one entrance, everywhere |
| Figures | count-up on first view, `tabular-nums` | the quantities *are* the argument |
| Capabilities | 3D object slow-rotates on scroll progress | shows the product, not decoration |
| Inventory | items enter from depth (z), not from the side | reinforces the depth language |
| Portfolio | image scale 1.00 → 1.04 over 1.2s on hover | restrained, premium |
| Legacy | 1977 → 1991 → today progression draws as a rule | uses the newly-found 1991 milestone |
| Contact | none beyond entry | forms must not move |

**Non-negotiables:** honour `prefers-reduced-motion`; cap DPR on mobile; gate shadow maps by
GPU tier; `frameloop="never"` when the canvas is off-screen (already done); provide a static
poster if WebGL fails; never animate anything that carries a number the reader is trying to
read.

**Explicitly excluded** per your brief: neon, glow, particles, cursor effects, aggressive
parallax, glassmorphism, SaaS-template springs.

---

## SECTION 12 — COMPLETE PAGE ARCHITECTURE

Your proposed IA is close. Two changes, both driven by the catalogue rather than convention.

**Change 1 — put "Industries / client types" third, not sixth.** A government procurement
officer and a corporate marketing head need to self-identify before they will read an
inventory table. The catalogue itself is organised by *client type* (Corporate Events,
German Hangers, Exhibitions, Interiors, Catering), not by equipment.

**Change 2 — merge "Scale/proof" into the hero surround** rather than a separate band.

### Recommended homepage order

```
1  Hero                     photograph + 3D, "Engineered Luxury for Infrastructure."
2  Proof strip              1977 · 460 personnel · 20 vehicles · 5 Lakh Sft   (immediate scale)
3  Who we serve             Government · Corporate · Exhibitions · Conferences · Public programmes
4  Capabilities / Inventory bento, catalogue figures unrounded
5  3D infrastructure system the interactive hanger/stall/stage — the "we own this" moment
6  Selected projects        PM programmes first
7  Legacy                   1977 → 1991 → today
8  Operational reach        pan-India, evidenced
9  CTA + Footer
```

### Site map

| Page | Purpose | Status |
| --- | --- | --- |
| Home | the argument in one scroll | exists |
| Inventory / Capabilities | the schedule, verbatim | exists |
| Portfolio | executed work with confidence markers | exists |
| Legacy | 1977 → 1991 → today | exists, needs the 1991 milestone |
| Locations | HQ + evidenced reach | exists |
| Contact | catalogue details + enquiry | exists, form not wired |
| **Services** (new?) | per-line detail for the 8 catalogue lines | **decision needed** |

**On §8's question — services as pages or modules?** Raja's business structure is
*inventory-led*: they sell what they own. The 8 cover lines are not 8 businesses; they are
**sales framings of one inventory**. Recommendation: keep them as **homepage capability
modules + the Inventory page**, and add **one "Who we serve" page** organised by client type.
Eight thin service pages would dilute, not strengthen — and we have no per-service content
to fill them.

---

## SECTION 13 — CONTENT GAPS

### 13.1 ⚠️ The AV contradiction — resolve before launch

- Catalogue inventory: **no AV stock whatsoever.**
- Client's live homepage: markets **"Lighting and AV Solutions"** as in-house infrastructure.

We currently publish "no AV is claimed," which contradicts the client's own marketing. Either
they own AV that the catalogue omits, or they hire it in and market it as a service. Both are
legitimate — but we must know which. `CLIENT CONFIRMATION REQUIRED`

### 13.2 Contact details — four addresses, two spellings

| Address | Where |
| --- | --- |
| `raju@rajaenterprises.co` | live about page |
| `info@rajaenterprises.co` | live contact page |
| `raju_rajaenterprises@yahoo.co.in` | catalogue + live about page |
| `raju_rajaenterprises@yahoo.**com**` | live contact page |

The `.co.in` / `.com` split on their own site is almost certainly a typo on one of them.
Also **+91 98457 71144** appears only on the about page and is absent from the catalogue.

### 13.3 Other gaps

| Gap | Impact |
| --- | --- |
| Nothing executed after May 2023 | **critical** — three-year proof gap |
| Postal address stops at "5th Main Road" | cannot be mapped or marked up as LocalBusiness |
| Hanger span / load / wind ratings undocumented | government tenders ask for these |
| No client list or testimonials | strong trust signal, entirely absent |
| No certifications / registrations (GST, MSME, ISO) | procurement pre-qualification |
| 5-acre warehouse claim (live site) unverified | asset claim we cannot substantiate |
| AICOG 2019, National Constitution Day | on live site, absent from ours |
| Kannada-language content | Karnataka government audience |
| No social media discovered | richest potential source of recent photography |

### 13.4 📷 Photography — the binding constraint

Every catalogue image maxes out around **1,220 × 555px**, most nearer 800px wide. That is
adequate for cards and acceptable for mid-page bands. It is **not** adequate for a full-bleed
hero on a 1440px+ display, which is the entire reason the hero is currently 3D.

**Ask the client for the original photograph files.** The catalogue images are compressed
derivatives; the originals are almost certainly 4000px+ camera files. This one delivery would
unlock the recommended hero and lift every card on the site.

---

## SECTION 14 — CLIENT CONFIRMATION QUESTIONS

Ordered by how much they block us.

**Blocking**

1. **Original high-resolution photographs** — the catalogue copies are too small for a hero.
   Do the original camera files exist? (§13.4)
2. **Any work executed since May 2023?** Photographs, event names, dates, locations. Without
   this the site's newest proof is three years old. (§7)
3. **AV: owned or hired?** The catalogue lists none; the website markets it. (§13.1)
4. **Are "Dedication to the Nation ₹3,600 crore" and "Shivamogga Airport" the same event?**
   The PMO record says the Shivamogga programme *was* the ₹3,600 crore dedication. (§7)
5. **Correct dates for Kempegowda and Shivamogga.** The catalogue prints 20 May 2023 on both,
   but public record says 11 Nov 2022 and 27 Feb 2023. (§7)

**Important**

6. Which email should be public — and is `yahoo.com` vs `yahoo.co.in` a typo? (§13.2)
7. Is **+91 98457 71144** current and should it be published?
8. Complete postal address, with locality and landmark.
9. **South India or pan-India?** The about page says "South India's most trusted"; the home
   page says "across India". Which is the positioning? (§19 of your brief)
10. Scope of work on **AICOG 2019** and **National Constitution Day**.
11. Scope of work on **Global Investors Summit 2023**, **DS Max Anniversary 2023** and the
    **Chennai** programme — currently marked "needs confirmation".
12. What happened in **1991**? The about page calls it a strategic transition — this is the
    only other dated milestone we have and it would anchor the Legacy page.

**Useful**

13. Client names/logos we may publish, and written permission for government emblems.
14. Hanger span, height, load and wind ratings.
15. GST / MSME / ISO registrations for procurement credibility.
16. Is the 5-acre warehouse still owned, and where?
17. Do social media accounts exist?
18. Where should enquiries land (which inbox), and is a CRM in use?
19. Is Kannada-language content wanted?

---

## SECTION 15 — PRODUCTION RISKS

| # | Risk | Severity | Notes |
| --- | --- | --- | --- |
| 1 | **WooCommerce + WP Crowdfunding + GiveWP on a corporate site** | **High** | Donation forms and a shop on an event-infrastructure site. Unused commerce plugins are a large attack surface and a live `/my-account` page. Removal must be planned, not improvised. |
| 2 | **Purchased-theme demo content still live** | **High** | "Hello world!", "How to create a NFT project and get a money", "Biggest Design Trends of 2022" are publicly reachable and indexable under a 1977 company's domain. |
| 3 | **Cutover is a platform migration, not a redeploy** | **High** | WordPress/Hostinger → Next.js/Vercel means DNS change, hosting change, and losing WP-side editing. The client must consciously accept that they will no longer edit via WordPress. |
| 4 | **Existing indexed URLs** | Medium | `/about-us`, `/creative-agency`, `/home-portfolio`, `/contact`, `/portfolios/*` are indexed. Redirect map exists in `next.config.ts` but is **untested against real Search Console data**. |
| 5 | **Three-year proof gap** | Medium | Newest evidence is May 2023. |
| 6 | **Publishing a wrong date on a government project** | Medium | Two catalogue dates are contradicted by the PMO record. Publishing either version unreviewed is a credibility risk with exactly the audience that matters. |
| 7 | **Government emblems / PM imagery** | Medium | State emblems and PM photographs carry usage restrictions. Needs written permission. |
| 8 | **No WebGL fallback** | Medium | Hero is blank if WebGL is unavailable or blocked. |
| 9 | **Low-resolution photography** | Medium | Caps the visual ceiling of the whole design. |
| 10 | **Enquiry form not wired** | Medium | Currently presentational; a live site must capture leads. |
| 11 | **Shared `materials.ts`** | Low | Tuning `/home3` silently changes `/home2`. |
| 12 | **Dead deps (gsap, lenis)** | Low | Ship weight and confusion. |
| 13 | **Deprecated three.js APIs** | Low | `THREE.Clock`, `PCFSoftShadowMap` warnings. |
| 14 | **`/home3` broken links live now** | Low | Fix written locally, held per instruction. |

---

## SECTION 16 — EXACT NEXT IMPLEMENTATION SEQUENCE

**Nothing below starts without your approval.**

### Phase 0 — unblock (client, not us)
- [ ] Send the §14 blocking questions.
- [ ] Request original high-resolution photographs.
- [ ] Request any 2024–2026 project material.

### Phase 1 — repair the prototype (local only, ~1 hour)
- [ ] Commit the four held link fixes (currently uncommitted).
- [ ] Correct project titles to catalogue wording ("PWD Programme Inauguration").
- [ ] Add `AICOG 2019` + `National Constitution Day` as `needs-confirmation`.
- [ ] Flag the suspected Shivamogga/₹3,600 crore duplicate in-page.
- [ ] Add the 1991 milestone to Legacy.
- [ ] Reconcile the AV statement pending the client's answer.
- [ ] Decide gsap/lenis: adopt or remove.

### Phase 2 — mobile + tablet optimisation (your specific ask)
- [ ] Hero: dedicated mobile composition — reframe the camera for portrait rather than
      veiling a landscape frame; consider a static poster below 768px.
- [ ] Tablet 768–1024: close the dead band; the hero is currently bottom-heavy at 1024×1366.
- [ ] Gate shadow maps and DPR by device tier; drop the second hanger on mobile.
- [ ] Add the WebGL failure fallback.
- [ ] Re-verify 1440 / 1280 / 1024 / 834 / 768 / 430 / 390 / 360.

### Phase 3 — content architecture
- [ ] Add "Who we serve" (§12).
- [ ] Rebuild Legacy on 1977 → 1991 → today.
- [ ] Pan-India positioning, once §14 Q9 is answered.

### Phase 4 — 3D + motion
- [ ] Hybrid hero, once high-resolution photography arrives.
- [ ] Octonorm stall bay asset.
- [ ] Formalise the motion system; adopt or delete gsap/lenis.

### Phase 5 — pre-cutover (only after sign-off)
- [ ] Export the WordPress redirect map from real Search Console data.
- [ ] Wire the enquiry form to a confirmed inbox.
- [ ] Structured data (LocalBusiness) once the full address exists.
- [ ] Accessibility + Lighthouse pass.
- [ ] Agree the DNS cutover window and rollback plan with the client.
- [ ] Confirm in writing that the client accepts losing WordPress editing.

---

## APPENDIX — VERIFICATION ARTEFACTS

| Artefact | Location |
| --- | --- |
| PDF CID decoder | scratchpad `pdf/decode.py` |
| Decoded catalogue text | scratchpad `pdf/catalogue-plain.txt` |
| 250 extracted catalogue images | scratchpad `pdf/images/` |
| 24 curated images (in repo) | `public/media/catalogue/` |
| Desktop + mobile screenshots | `docs/review-screens/` |
| Review notes | `docs/REVIEW-NOTES.md` |

**No production system was accessed, authenticated to, or modified during this audit.**
All production information was obtained from public, unauthenticated HTTP responses and the
public WordPress REST API.
