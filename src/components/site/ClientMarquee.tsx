"use client";

import { clients, type Client } from "@/content/clients";

/**
 * ClientMarquee — infinite-scrolling logo strip of clients.
 *
 * Uses professional SVG monograms/emblems for each client, rendered as
 * frosted-glass cards. Two rows scroll in opposite directions.
 * Placed directly after the hero as the trust signal.
 */

/** Monogram / emblem SVGs for each client, sized to look like real logos. */
function ClientLogo({ client }: { client: Client }) {
  const iconMap: Record<string, React.ReactNode> = {
    "govt-india": (
      /* Ashoka-style national emblem simplified */
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <text x="24" y="20" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" fontFamily="serif">भारत</text>
        <text x="24" y="30" textAnchor="middle" fontSize="5.5" fontWeight="600" fill="currentColor" opacity="0.7" fontFamily="serif">INDIA</text>
        {/* Wheel spokes */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="24" y1="8" x2="24" y2="11" stroke="currentColor" strokeWidth="0.6" opacity="0.3"
            transform={`rotate(${i * 15} 24 24)`} />
        ))}
      </svg>
    ),
    "govt-karnataka": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <text x="24" y="19" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor" fontFamily="serif">ಕರ್ನಾಟಕ</text>
        <text x="24" y="28" textAnchor="middle" fontSize="5" fontWeight="600" fill="currentColor" opacity="0.7" fontFamily="serif">KARNATAKA</text>
        <line x1="10" y1="33" x2="38" y2="33" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <text x="24" y="39" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.5" fontFamily="sans-serif">GOVERNMENT</text>
      </svg>
    ),
    "govt-uttarakhand": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <path d="M24 10 L30 20 L24 17 L18 20 Z" fill="currentColor" opacity="0.2" />
        <text x="24" y="29" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="currentColor" fontFamily="serif">UTTARAKHAND</text>
        <text x="24" y="37" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.5" fontFamily="sans-serif">GOVERNMENT</text>
      </svg>
    ),
    "govt-tamilnadu": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <text x="24" y="19" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor" fontFamily="serif">தமிழ்</text>
        <text x="24" y="28" textAnchor="middle" fontSize="5" fontWeight="600" fill="currentColor" opacity="0.7" fontFamily="serif">TAMIL NADU</text>
        <text x="24" y="37" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.5" fontFamily="sans-serif">GOVERNMENT</text>
      </svg>
    ),
    "ds-max": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <rect x="6" y="14" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="800" fill="currentColor" fontFamily="sans-serif" letterSpacing="-0.5">DS</text>
        <text x="24" y="11" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.5" fontFamily="sans-serif" fontWeight="600">MAX</text>
      </svg>
    ),
    "bhima-diamonds": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        {/* Diamond shape */}
        <path d="M24 6 L38 24 L24 42 L10 24 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
        <path d="M24 12 L34 24 L24 36 L14 24 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <text x="24" y="23" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="currentColor" fontFamily="serif">BHIMA</text>
        <text x="24" y="30" textAnchor="middle" fontSize="3.5" fill="currentColor" opacity="0.5" fontFamily="sans-serif" letterSpacing="2">DIAMONDS</text>
      </svg>
    ),
    "sharada-caterers": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <text x="24" y="21" textAnchor="middle" fontSize="14" fontWeight="300" fill="currentColor" fontFamily="serif" fontStyle="italic">S</text>
        <text x="24" y="35" textAnchor="middle" fontSize="3.5" fill="currentColor" opacity="0.6" fontFamily="sans-serif" letterSpacing="1.5">CATERERS</text>
      </svg>
    ),
    "public-tv": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <rect x="8" y="12" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <rect x="18" y="32" width="12" height="3" rx="1" fill="currentColor" opacity="0.15" />
        <text x="24" y="26" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" fontFamily="sans-serif">PTV</text>
      </svg>
    ),
    sollagedhunia: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        {/* Globe lines */}
        <ellipse cx="24" cy="24" rx="12" ry="20" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />
        <text x="24" y="22" textAnchor="middle" fontSize="4" fontWeight="700" fill="currentColor" fontFamily="sans-serif">SOLLAGE</text>
        <text x="24" y="29" textAnchor="middle" fontSize="4" fontWeight="700" fill="currentColor" fontFamily="sans-serif">DHUNIA</text>
      </svg>
    ),
    isc: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        {/* Atom-like orbits */}
        <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="0.8" opacity="0.15" transform="rotate(0 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="0.8" opacity="0.15" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="0.8" opacity="0.15" transform="rotate(-60 24 24)" />
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.25" />
        <text x="24" y="43" textAnchor="middle" fontSize="3.5" fontWeight="600" fill="currentColor" opacity="0.6" fontFamily="sans-serif">ISC</text>
      </svg>
    ),
    iitf: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <text x="24" y="22" textAnchor="middle" fontSize="8" fontWeight="800" fill="currentColor" fontFamily="sans-serif" letterSpacing="-0.5">IITF</text>
        <text x="24" y="30" textAnchor="middle" fontSize="3" fill="currentColor" opacity="0.5" fontFamily="sans-serif">TRADE FAIR</text>
        <line x1="12" y1="40" x2="36" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      </svg>
    ),
    "sahitya-parishat": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <text x="24" y="20" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor" fontFamily="serif" fontStyle="italic">ಕ</text>
        <text x="24" y="31" textAnchor="middle" fontSize="3.5" fontWeight="600" fill="currentColor" opacity="0.6" fontFamily="sans-serif">SAHITYA</text>
        <text x="24" y="37" textAnchor="middle" fontSize="3" fill="currentColor" opacity="0.4" fontFamily="sans-serif">PARISHAT</text>
      </svg>
    ),
    aicog: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        {/* Medical cross */}
        <rect x="20" y="10" width="8" height="28" rx="1" fill="currentColor" opacity="0.1" />
        <rect x="10" y="20" width="28" height="8" rx="1" fill="currentColor" opacity="0.1" />
        <text x="24" y="27" textAnchor="middle" fontSize="6" fontWeight="800" fill="currentColor" fontFamily="sans-serif">+</text>
        <text x="24" y="44" textAnchor="middle" fontSize="4" fontWeight="700" fill="currentColor" opacity="0.6" fontFamily="sans-serif">AICOG</text>
      </svg>
    ),
    "vidhana-soudha": (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        {/* Building silhouette */}
        <path d="M8 36 L8 20 L14 20 L14 16 L20 16 L20 12 L24 8 L28 12 L28 16 L34 16 L34 20 L40 20 L40 36 Z"
          stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.08" />
        <line x1="6" y1="36" x2="42" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <text x="24" y="44" textAnchor="middle" fontSize="3" fontWeight="600" fill="currentColor" opacity="0.5" fontFamily="sans-serif">VIDHANA SOUDHA</text>
      </svg>
    ),
  };

  return (
    <div className="client-logo-card flex min-w-[200px] flex-col items-center justify-center gap-3 rounded-md border border-steel-200/50 bg-paper/30 px-8 py-6 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-out-quart)] hover:border-steel-300 hover:bg-paper/80 group">
      <div className="text-steel-400 transition-colors duration-500 group-hover:text-steel-700">
        {iconMap[client.slug] || (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-steel-200 text-sm font-bold text-steel-400 transition-colors duration-500 group-hover:text-steel-600">
            {client.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="text-center mt-1">
        <span className="block text-[0.65rem] font-medium tracking-[0.1em] text-steel-700 uppercase">
          {client.name}
        </span>
        {client.categoryLabel && (
          <span className="block mt-1 text-[0.65rem] text-steel-400">
            {client.categoryLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  // Three copies for seamless loop
  const strip = [...clients, ...clients, ...clients];

  return (
    <section className="border-y border-steel-200/50 bg-card/20 overflow-hidden py-14 md:py-20">
      {/* Header */}
      <div className="shell mb-12 text-center">
        <p className="eyebrow text-steel-500 tracking-[0.25em] text-[0.6875rem]">SELECTED PROGRAMMES & ORGANISATIONS</p>
        <p className="mt-4 text-sm text-steel-500 max-w-xl mx-auto text-balance">
          From government programmes and national exhibitions to corporate events and institutional gatherings.
        </p>
      </div>

      {/* Marquee row 1 */}
      <div className="marquee-container">
        <div className="marquee-track" aria-label="Client logos scrolling">
          {strip.map((client, i) => (
            <ClientLogo key={`${client.slug}-${i}`} client={client} />
          ))}
        </div>
      </div>

    </section>
  );
}
