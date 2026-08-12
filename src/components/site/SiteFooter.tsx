import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import { serviceLines } from "@/content/inventory";
import { navigation } from "@/content/navigation";

/**
 * Footer. Contact block is the catalogue's own details, unaltered — the
 * numbers and address are not paraphrased anywhere on this site.
 *
 * Note what is absent: no invented system names, no careers page, no social
 * accounts. Nothing links anywhere that does not exist.
 */
export function SiteFooter() {
  const { contact } = company;

  return (
    <footer className="border-t border-steel-100 bg-card">
      <div className="shell band-tight">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Identity + address */}
          <div className="lg:col-span-4">
            <Image
              src="/media/brand/raja-logo.png"
              alt="Raja Enterprises"
              width={160}
              height={92}
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel-600">
              Turnkey event management and infrastructure, deployed across India since{" "}
              {company.established}. Headquartered in Bengaluru.
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-steel-600">
              {contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <h2 className="eyebrow">Pages</h2>
            <ul className="mt-6 space-y-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalogue service lines — verbatim from the cover */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow">What we provide</h2>
            <ul className="mt-6 space-y-3.5">
              {serviceLines.map((line) => (
                <li key={line} className="text-sm text-steel-600">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-6 space-y-3.5 text-sm text-steel-600">
              {contact.landlines.map((number) => (
                <li key={number}>
                  <a
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {number}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                  className="font-medium text-ink transition-colors hover:text-accent"
                >
                  {contact.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-steel-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">
            © {new Date().getFullYear()} {company.name}
          </p>
          <p className="eyebrow">Headquartered in Bengaluru · Deployed Across India</p>
        </div>
      </div>
    </footer>
  );
}
