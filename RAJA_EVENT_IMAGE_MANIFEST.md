# Raja Enterprises — event image & logo research

Research pass against the 27-row event list supplied by the owner
(`eventlist.jpeg`), plus a full inventory of Raja's own published media.

**Status vocabulary**

| Status | Meaning |
| --- | --- |
| `VERIFIED` | Evidence ties the image to Raja Enterprises' own work. Publishable. |
| `EVENT_REFERENCE` | Genuinely the right event, no evidence Raja's installation is shown. Research only — never captioned as Raja's work. |
| `REFERENCE_ONLY` | Copyrighted, no basis to publish. Not placed in the site. |
| `AI_REPRESENTATION` | Generated stand-in. None produced in this pass. |
| `NOT_FOUND` | No reliable image located. |

---

## 1. Headline result

**40 `VERIFIED` photographs downloaded**, all from Raja's own media library at
`rajaenterprises.co`, retrieved through the site's public WordPress REST API
(`/wp-json/wp/v2/media`, 295 items enumerated across 4 pages). No login,
paywall or access control was involved.

These are the only images in this pass that can be captioned as Raja's work.

**Zero images were downloaded from news or third-party event sites.** The
reasoning is in §4 — it is a deliberate outcome, not a failure to search.

---

## 2. Verified library — `public/media/events/`

| Project | Files | Max resolution | Status | Source |
| --- | --- | --- | --- | --- |
| `ambedkar-jayanti/` | 17 | 2560×1707 | `VERIFIED` | rajaenterprises.co portfolio — 134th Ambedkar Jayanti, Vidhana Soudha, Apr 2025 |
| `indian-science-congress/` | 15 | 2560×1440 | `VERIFIED` | rajaenterprises.co portfolio — 107th Indian Science Congress |
| `cabinet-meeting/` | 7 | 1600×1200 | `VERIFIED` | rajaenterprises.co portfolio — Karnataka cabinet meeting |
| `aicog-2019/` | 1 | 2560×1920 | `VERIFIED` | rajaenterprises.co media library — AICOG 2019 |

All originals preserved at source resolution. Nothing recompressed, nothing
upscaled, no existing repo asset overwritten. Every file the brief asked to
protect is present: HMS4180-1, HMS4230, HMS4165, HMS4146, DSC03291,
DSC03221/03222, DSC03516/03520.

Scope of work, in Raja's own words on those portfolio pages — Indian Science
Congress: *"premium German hanger tent installation, extensive event branding,
grand entry arch fabrication."* Global Investors Summit (Destination
Uttarakhand 2023): *"German hanger tents and the fabrication of customised
exhibition stalls."*

## 3. Logos — `public/media/clients/`

Five real logos, taken from **Raja's own media library** — i.e. marks the
client already publishes on their own production site.

| Organisation | File | Resolution | Status |
| --- | --- | --- | --- |
| Government of Karnataka | `government-of-karnataka.png` | 1920×1920 | `VERIFIED` (Raja's own site) |
| Government of India | `government-of-india.png` | high-res | `VERIFIED` (Raja's own site) |
| MM Hills | `mm-hills.png` | high-res | `VERIFIED` (Raja's own site) |
| Collegedunia | `collegedunia.png` | — | `VERIFIED` (Raja's own site) |
| Public TV | `public-tv.png` | — | `VERIFIED` (Raja's own site) |
| Ministry of Heavy Industries | — | — | `NOT_FOUND` (thumbnail only) |

This supersedes my earlier caution about the government emblems: Raja already
publishes these on their live site, so the decision is one the owner has
already taken on their own account. I am mirroring existing practice, not
introducing new exposure.

The fabricated inline-SVG emblems (an invented Ashoka emblem, three invented
state seals, ISC/IITF/Sahitya Parishat/AICOG/Vidhana Soudha icon marks) were
deleted in the previous commit. None were reinstated.

---

## 4. The 27-row event list

Names are reproduced from the source image without silent correction. Where
OCR is doubtful the verified spelling is given in the notes rather than
substituted.

| # | Organisation | Event | Year | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | The Art of Living Trust | Navarathri Function | 2023 | `NOT_FOUND` | Art of Living publishes ashram photography; none attributable to Raja infrastructure. |
| 2 | ISGCON Bengaluru | 64th Annual Congress, Indian Society of Gastroenterology | 2023 | `NOT_FOUND` | Society site is delegate-facing; no public installation gallery. |
| 3 | La Renon Healthcare Pvt Ltd | Company event | — | `NOT_FOUND` | No public coverage. |
| 4 | First Circle Biztech Pvt Ltd | FC Expo 2024 | 2024 | `NOT_FOUND` | Organiser galleries not publicly indexed. |
| 5 | FICCI | EIMA Agrimach 2024 | 2024 | `EVENT_REFERENCE` | Confirmed: 29 Feb–3 Mar 2024, UAS GKVK Bengaluru, FICCI + FEDERUNACOMA, 40,000+ visitors. Imagery found is organiser/press — see §5. |
| 6 | Khanha Shanti Vanam | Tent city, Bangalore | — | `NOT_FOUND` | Verified spelling is **Kanha Shanti Vanam** (Heartfulness). Not corrected in the table per instruction. |
| 7 | ABS Business Solutions | Education fair | — | `NOT_FOUND` | No public coverage. |
| 8 | Collegedunia Web Pvt Ltd | Collegedunia Education Fair | — | `NOT_FOUND` | Logo obtained (§3); no event photography. |
| 9 | Garment Technology Expo Pvt Ltd | GTE 2024 | 2024 | `EVENT_REFERENCE` | Confirmed: 20–22 Sep 2024, Gayatri Vihar, Palace Grounds, Bengaluru. No public gallery. |
| 10 | CSB — National Silkworm Seed Organization | Central Silk Board conference | — | `NOT_FOUND` | OCR "COSTING"/"BORAD" likely *Hosting* / *Board*. |
| 11 | Vaidic Dharma Sanstana | Navarathri Function 2024 | 2024 | `NOT_FOUND` | No public coverage. |
| 12 | Karnataka State Habitat Centre | Hampi Utsav 2024 | 2024 | `EVENT_REFERENCE` | Confirmed: 3–5 Feb 2024, Gayatri Peetha Vedike, Hampi; inaugurated by CM Siddaramaiah. Coverage is press photography. |
| 13 | Sri Adichunchanagiri Shikshana Trust | Founder Day | — | `NOT_FOUND` | No public coverage. |
| 14 | First Circle Biztech Pvt Ltd | FC Expo 2025 | 2025 | `NOT_FOUND` | As #4. |
| 15 | University of Agricultural Sciences | Krishimela 2024-25 | 2024–25 | `EVENT_REFERENCE` | UAS GKVK Bengaluru. Same venue as #5. |
| 16 | Karnataka State Marketing Communication & Advertising | Pourakarmika Samavesha | — | `NOT_FOUND` | Government programme; press coverage only. |
| 17 | Build Teck Polymer Pvt Ltd | Silver Jubilee | — | `NOT_FOUND` | No public coverage. |
| 18 | Vaidic Dharma Sansthan | Navarathri Function | — | `NOT_FOUND` | Duplicate of #11 in a different year. |
| 19 | Tribal Welfare Department | Valmiki Jayanthi 2025 | 2025 | `NOT_FOUND` | Government programme; press coverage only. |
| 20 | Sri Malai Maheshwara Swamy | MM Hills | — | `NOT_FOUND` | Logo obtained (§3); no event photography. |
| 21 | Skyblue Event Management India Pvt Ltd | World Fisheries Day 2024 | 2024 | `NOT_FOUND` | Sub-contracted through an agency; attribution would be two steps removed. |
| 22 | Karnataka Chalanachitra Academy | 17th Bengaluru International Film Festival | — | `EVENT_REFERENCE` | BIFFes is well covered; imagery is festival/press. |
| 23 | Trievibe Entertainment Pvt Ltd | Karthik Live | — | `NOT_FOUND` | Concert photography is rights-managed. |
| 24 | Karnataka State Marketing Communication & Advertising | International Conference on Dam Safety | — | `NOT_FOUND` | Government programme; press coverage only. |
| 25 | Karnataka State Marketing Communication & Advertising | 5th Annual Convocation | — | `NOT_FOUND` | Institution not identified in the source row. |
| 26 | Karnataka State Marketing Communication & Advertising | 119th birthday of Dr Babu Jagjeevan Ram | — | `NOT_FOUND` | Government programme; press coverage only. |
| 27 | ABS Business Solution | Vidyapeeta Education Fair | — | `NOT_FOUND` | As #7. |

**Tally:** 0 `VERIFIED` · 5 `EVENT_REFERENCE` (event confirmed, no usable
image) · 22 `NOT_FOUND` · 0 downloaded.

---

## 5. Why nothing was downloaded for these 27

Not for lack of searching. The searches returned the events reliably — dates,
venues, organisers, scale — but not photographs that clear the brief's own bar.

**There is no public photographic record of most of these.** Twenty-two are
corporate functions, trust events, education fairs and government programmes.
Trade-show sites (tradeindia, 10times, allevents) carry promotional stock, not
event photography. That is a genuine absence, and the brief says not to
fabricate a result.

**Where coverage exists it is press photography.** Hampi Utsav, BIFFes and the
government programmes are covered by news outlets — rights-managed images,
`REFERENCE_ONLY` by the brief's own rule, and the brief also says not to put
those silently into the site.

**Critically: none of it would show Raja's work.** A press photograph of Hampi
Utsav shows a stage. Nothing in the frame or its metadata establishes who
built it. Downloading it produces a file that can never be captioned — it fails
`VERIFIED` by definition, and the brief is explicit that `EVENT_REFERENCE`
must never be presented as "Raja Enterprises completed this."

So the yield would have been a folder of unusable copyrighted files. The 40
verified Raja photographs are worth more than all 27 folders of that.

**A note on the existing site.** The media library inventory turned up
something worth raising: of 124 images over 1600px on `rajaenterprises.co`,
**44 are WordPress theme stock** — Unsplash portraits, nightclub crowds, beach
weddings, "woman eating watermelon", `stock-photo-*`. Only 40 are genuine Raja
project photography. The live site is padded with filler, which is the same
problem as unusable downloads in a different costume.

---

## 6. What would actually complete this

In descending order of value:

1. **The owner's own photo archive.** 27 events were executed; site photographs
   almost certainly exist on phones, in WhatsApp groups, or with the crew.
   These are `VERIFIED` on arrival and need no permission. This single step
   would outperform any amount of further web research.
2. **Raja's Facebook page** (`facebook.com/p/Raja-Enterprises-100063491243826`)
   — project photography may be posted there. It is behind a login wall, which
   the brief correctly forbids circumventing; the owner can export it directly.
3. **Client-supplied event photography**, with written permission, for the
   organisations where the relationship is contractual.
4. **Remaining logos** from each organisation's own press/brand page, once the
   owner confirms which relationships are contractual.

Until then the site should keep doing what it does now: name the organisations
in words, and show only photography Raja owns.
