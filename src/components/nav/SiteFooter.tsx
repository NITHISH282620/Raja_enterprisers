import Link from "next/link";
import { company } from "@/content/home1/company";
import { categories } from "@/content/home1/inventory";
import { Rule } from "@/components/primitives/Rule";

/**
 * Closing CTA + contact block.
 * Keeps the live site's "Got a project in mind? / Let's Talk" intent — it is
 * already the client's voice (plan §B) — and restyles it.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel-200 bg-off-white">
      <div className="shell py-20 md:py-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="t-display-l max-w-[14ch]">
            Got a project in mind?
          </h2>
          <Link
            href="/contact"
            className="t-label group inline-flex items-center gap-3 border border-ink px-8 py-5 transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            Let&rsquo;s talk
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <Rule className="mt-16" />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="t-label text-steel-500">Bengaluru HQ</div>
            <address className="t-body mt-4 not-italic text-steel-700">
              {company.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <div className="t-label text-steel-500">Contact</div>
            <div className="mt-4 flex flex-col gap-1">
              <a
                href={`tel:${company.contact.mobile.replace(/\s/g, "")}`}
                className="t-body text-steel-700 hover:text-brand"
              >
                {company.contact.mobile}
              </a>
              {company.contact.landline.map((number) => (
                <span key={number} className="t-body text-steel-700">
                  {number}
                </span>
              ))}
              <a
                href={`mailto:${company.contact.email}`}
                className="t-body text-steel-700 hover:text-brand"
              >
                {company.contact.email}
              </a>
            </div>
          </div>

          <div>
            <div className="t-label text-steel-500">Capabilities</div>
            <ul className="mt-4 flex flex-col gap-1">
              {categories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/capabilities#${category.slug}`}
                    className="t-body text-steel-700 hover:text-brand"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="t-label text-steel-500">Company</div>
            <ul className="mt-4 flex flex-col gap-1">
              <li>
                <Link href="/work" className="t-body text-steel-700 hover:text-brand">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="t-body text-steel-700 hover:text-brand">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="t-body text-steel-700 hover:text-brand">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Rule className="mt-16" />

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label text-steel-500">
            &copy; {year} {company.name}
          </p>
          <p className="t-label text-steel-300">
            Established {company.established} &nbsp;//&nbsp; {company.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
