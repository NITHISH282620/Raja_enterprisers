import type { Metadata } from "next";
import { Masthead } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ConfirmMarker, Eyebrow, SectionHead } from "@/components/site/Primitives";
import { company, openQuestions } from "@/content/company";
import { serviceLines } from "@/content/inventory";

export const metadata: Metadata = {
  title: "Contact — Raja Enterprises, Bengaluru",
  description:
    "Raja Enterprises, “Venkat”, #145, 5th Main Road, Bengaluru – 560018. Telephone 080 26609751 · Mobile +91 98450 44177.",
};

export default function ContactPage() {
  const { contact } = company;

  return (
    <>
      <Masthead
        index="05"
        eyebrow="Contact"
        heading="Tell us the ground, the date and the headcount."
        standfirst="Those three things are enough for a first conversation about what a deployment takes. Everything below is reproduced exactly as it appears in the company catalogue."
      />

      <section className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------------ */}
          {/* Details — the catalogue's own, unaltered                      */}
          {/* ------------------------------------------------------------ */}
          <Reveal className="lg:col-span-5">
            <Eyebrow index="01">Head office</Eyebrow>

            <address className="mt-8 space-y-1.5 text-[1.25rem] not-italic leading-relaxed text-ink">
              {contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>

            <dl className="mt-12 divide-y divide-steel-100 border-y border-steel-200">
              <div className="py-6">
                <dt className="eyebrow">Telephone</dt>
                <dd className="mt-4 space-y-2">
                  {contact.landlines.map((number) => (
                    <p key={number}>
                      <a
                        href={`tel:${number.replace(/\s/g, "")}`}
                        className="text-[1.0625rem] text-steel-700 transition-colors hover:text-accent"
                      >
                        {number}
                      </a>
                    </p>
                  ))}
                </dd>
              </div>

              <div className="py-6">
                <dt className="eyebrow">Mobile</dt>
                <dd className="mt-4">
                  <a
                    href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                    className="text-[1.25rem] font-medium text-ink transition-colors hover:text-accent"
                  >
                    {contact.mobile}
                  </a>
                </dd>
              </div>

              <div className="py-6">
                <dt className="eyebrow">Fax</dt>
                <dd className="mt-4 text-[1.0625rem] text-steel-700">{contact.fax}</dd>
              </div>

              <div className="py-6">
                <dt className="eyebrow">Email</dt>
                <dd className="mt-4 space-y-2">
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all text-[1.0625rem] font-medium text-ink transition-colors hover:text-accent"
                    >
                      {contact.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${contact.emailAlt}`}
                      className="break-all text-[0.9375rem] text-steel-600 transition-colors hover:text-accent"
                    >
                      {contact.emailAlt}
                    </a>
                  </p>
                </dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <ConfirmMarker>
                The catalogue address stops at “5th Main Road”. A locality is needed before this
                can be mapped or published as a structured address.
              </ConfirmMarker>
              <ConfirmMarker>
                Two email addresses are in circulation. Confirm which should be public, and
                whether the Yahoo address should be retired.
              </ConfirmMarker>
            </div>
          </Reveal>

          {/* ------------------------------------------------------------ */}
          {/* Enquiry form — presentational in this prototype               */}
          {/* ------------------------------------------------------------ */}
          <Reveal delay={90} className="lg:col-span-7">
            <div className="card p-8 md:p-12">
              <Eyebrow index="02">Enquiry</Eyebrow>
              <h2 className="t-heading mt-6 text-ink">Start a conversation.</h2>

              <form className="mt-10 grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" />
                <Field label="Organisation" name="organisation" autoComplete="organization" />
                <Field label="Email" name="email" type="email" autoComplete="email" />
                <Field label="Telephone" name="telephone" type="tel" autoComplete="tel" />

                <div className="sm:col-span-2">
                  <label htmlFor="requirement" className="eyebrow block">
                    What do you need
                  </label>
                  <select
                    id="requirement"
                    name="requirement"
                    defaultValue=""
                    className="mt-3 w-full rounded-sm border border-steel-200 bg-paper px-4 py-3.5 text-[0.9375rem] text-ink transition-colors focus:border-accent focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a service line
                    </option>
                    {serviceLines.map((line) => (
                      <option key={line} value={line}>
                        {line}
                      </option>
                    ))}
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="eyebrow block">
                    Ground, date and headcount
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Where the site is, when it runs, and roughly how many people it has to hold."
                    className="mt-3 w-full resize-y rounded-sm border border-steel-200 bg-paper px-4 py-3.5 text-[0.9375rem] text-ink transition-colors placeholder:text-steel-300 focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled
                    className="inline-flex w-full items-center justify-center rounded-sm bg-accent px-6 py-4 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-steel-300 sm:w-auto"
                  >
                    Send enquiry
                  </button>
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-steel-500">
                    This form is presentational in the review prototype — it is not yet wired to an
                    inbox. Deciding which address enquiries should reach is one of the questions
                    below.
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Open questions for the owner                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-steel-100 bg-card">
        <div className="shell band">
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="Before this goes live"
              heading="Seven things only the owner can settle."
              standfirst="Rather than fill these gaps with plausible-sounding text, the prototype leaves them open. Each one is a decision, not a writing task."
            />
          </Reveal>

          <Reveal delay={80} className="mt-14">
            <ol className="grid gap-x-16 md:grid-cols-2">
              {openQuestions.map((question, i) => (
                <li
                  key={question}
                  className="flex gap-5 border-b border-steel-200 py-6"
                >
                  <span className="eyebrow shrink-0 pt-1 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-steel-700 text-pretty">
                    {question}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-3 w-full rounded-sm border border-steel-200 bg-paper px-4 py-3.5 text-[0.9375rem] text-ink transition-colors focus:border-accent focus:outline-none"
      />
    </div>
  );
}
