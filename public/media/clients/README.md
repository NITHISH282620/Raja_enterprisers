# Organisation marks

The strip on `/home3` renders a logo when a client has a `logo` path in
`src/content/clients.ts`, and falls back to a typographic wordmark when it does
not. Adding a mark is a one-line change — drop the file here and set the path:

```ts
{ name: "Public TV", slug: "public-tv", logo: "/media/clients/public-tv.svg", … }
```

SVG preferred, transparent PNG at 2x otherwise. Any aspect ratio is fine; the
strip normalises everything to a 28px cap height and applies its own greyscale,
so supply the plain mark rather than a pre-styled one.

## Why this folder is empty

The marks were **not** downloaded off the web, for two separate reasons.

**The government emblems are statutorily restricted.** Government of India,
Karnataka, Tamil Nadu and Uttarakhand. The State Emblem of India (Prohibition
of Improper Use) Act, 2005 restricts use of the national emblem, and state
emblems fall under comparable restrictions. This is not a licensing preference
that a client can waive on their own account.

An earlier version of `ClientMarquee.tsx` shipped hand-drawn inline SVG
approximations of these — a simplified Ashoka emblem reading "भारत / INDIA",
and invented seals for three states. Those were removed. An approximated
national emblem is both a legal exposure and, visibly, a fake.

**The rest are third-party trademarks.** Public TV, Indian Science Congress,
India International Trade Fair, Kannada Sahitya Parishat, DS Max Properties,
Bhima Diamonds, Sharada Caterers. Placing a trademark on a commercial site
asserts a relationship. `clients.ts` notes its sources include "owner
testimony" rather than documentation, so the relationships are not all
evidenced, and the section is headed "Selected programmes & organisations"
rather than "Trusted by" for exactly that reason.

## To complete this

For each organisation, the owner needs to confirm the engagement was
contractual, and supply either the mark from their own records or written
permission to use it. Government programme work is normally credited in words —
"Deployed for the Government of Karnataka" — which is what the wordmark
fallback already does, and is the safer presentation regardless.
