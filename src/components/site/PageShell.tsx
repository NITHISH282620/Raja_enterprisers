import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Button, Eyebrow, Rule } from "./Primitives";

/**
 * The masthead every interior page opens with.
 *
 * It is deliberately the hero's quiet sibling: same type scale one step down,
 * same left alignment, same mono eyebrow, no imagery. That consistency is what
 * stops five interior pages from reading as five different websites.
 */
export function Masthead({
  index,
  eyebrow,
  heading,
  standfirst,
  aside,
}: {
  index: string;
  eyebrow: string;
  heading: ReactNode;
  standfirst?: ReactNode;
  /** Optional right-hand column — a figure strip or a short definition list. */
  aside?: ReactNode;
}) {
  return (
    <section className="shell pt-32 pb-14 md:pt-44 md:pb-20">
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal delay={60} className="lg:col-span-7">
          <h1 className="t-display-l text-ink text-balance">{heading}</h1>
        </Reveal>

        {standfirst && (
          <Reveal delay={120} className="lg:col-span-5 lg:pt-2">
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-steel-700 text-pretty">
              {standfirst}
            </p>
          </Reveal>
        )}
      </div>

      {aside && (
        <Reveal delay={180} className="mt-14">
          {aside}
        </Reveal>
      )}

      <Rule className="mt-14 md:mt-20" />
    </section>
  );
}

/**
 * The closing call to action. Identical on all six pages — it is the last
 * thing a reviewer sees on every route, so it has to be the same thing.
 */
export function CTABand({
  heading = "Got a project in mind?",
  body = "Tell us the ground, the date and the headcount. We will tell you what it takes to put a structure on it.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-steel-100 bg-ink text-paper">
      <div className="shell band">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-steel-300">Enquiries</p>
            <h2 className="t-display-l mt-6 text-paper text-balance">{heading}</h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-steel-200 text-pretty">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/home3/contact">Start an enquiry</Button>
              <a
                href="tel:+919845044177"
                className="inline-flex items-center justify-center rounded-sm border border-steel-700 px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:border-steel-500"
              >
                +91 98450 44177
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
