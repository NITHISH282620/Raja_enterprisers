import Image from "next/image";
import { clients, type Client } from "@/content/clients";

/**
 * The organisations strip.
 *
 * A slow, single-line archive of the bodies Raja has built for. It reads as a
 * record moving past rather than a carousel selling something, which is the
 * whole reason it moves at roughly 25px/sec instead of the 60-plus a marquee
 * usually defaults to.
 *
 * On logos, deliberately: this renders wordmarks, not emblems. The previous
 * version drew its own approximations of the Indian national emblem and of
 * several state government seals in inline SVG. Those are not decorative
 * assets — the State Emblem of India is restricted by statute, state seals sit
 * under the same class of restriction, and the broadcaster and trade-fair
 * marks are third-party trademarks whose use here would imply an endorsement
 * nobody has confirmed. An approximated seal is worse than no seal: it is both
 * a legal exposure and, visibly, a fake.
 *
 * So the strip is typographic until real files arrive. `logo` on a Client is
 * already wired below — drop a verified file in and that row switches from
 * wordmark to mark with no change here.
 */

/**
 * Uniform cap height for any supplied mark.
 *
 * 40px, not the 28 this started at. These are detailed institutional emblems —
 * the Karnataka seal alone carries two lions, a shield and a ribbon of text —
 * and below about 36px they collapse into grey mud. The wordmarks beside them
 * set the baseline; the marks have to be legible at the same optical weight.
 *
 * `width` is only a hint for the optimiser's aspect calculation; the rendered
 * ratio comes from each file, since the row mixes 4:1 wordmark logos with
 * square seals.
 */
const LOGO_HEIGHT = 40;

function ClientMark({ client }: { client: Client }) {
  return (
    <div className="client-mark group flex shrink-0 items-center gap-3">
      {client.logo ? (
        <Image
          src={client.logo}
          alt={client.name}
          height={LOGO_HEIGHT}
          width={LOGO_HEIGHT * 4}
          /* No greyscale. The convention is to desaturate a logo wall for
             consistency, but that assumes a full set of marks. Five of sixteen
             organisations have one, so the row is mixed, and a desaturated
             emblem next to a solid wordmark reads as a smudge rather than as
             restraint. In colour at 85% they sit at the same optical weight as
             the type — which is also how Raja shows them on its own site. */
          className="h-10 w-auto object-contain opacity-85 transition-opacity duration-500 ease-[var(--ease-out-quart)] group-hover:opacity-100"
        />
      ) : (
        <span className="whitespace-nowrap text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-steel-500 transition-colors duration-500 ease-[var(--ease-out-quart)] group-hover:text-brand">
          {client.name}
        </span>
      )}
    </div>
  );
}

export function ClientMarquee() {
  // Two copies is all a -50% translate needs to loop seamlessly; a third was
  // tripling the DOM for no visual gain.
  const logoClients = clients.filter((c) => c.logo);
  // Repeat enough times to ensure seamless scrolling on wide screens with fewer items
  const strip = [...logoClients, ...logoClients, ...logoClients, ...logoClients, ...logoClients];

  return (
    <section className="overflow-hidden border-y border-steel-100 bg-card/30 py-16 md:py-20">
      <div className="shell mb-12 text-center">
        <p className="eyebrow justify-center text-steel-500">
          Selected programmes &amp; organisations
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-steel-600 text-balance">
          From government programmes and national exhibitions to corporate events and
          institutional gatherings.
        </p>
      </div>

      {/*
        The rail is masked at both ends so names enter and leave the frame
        instead of being cut by it — without this the strip reads as a clipped
        overflow rather than as something continuing past the page.
      */}
      <div className="marquee-container">
        <div className="marquee-track items-center" aria-label="Organisations Raja Enterprises has built for">
          {strip.map((client, i) => (
            <ClientMark key={`${client.slug}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
