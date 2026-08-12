import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";
import { company } from "@/content/home1/company";

export const metadata: Metadata = {
  title: "Contact — Raja Enterprises",
  description: `${company.name}, Bengaluru. ${company.contact.mobile}`,
};

export default function ContactPage() {
  return (
    <PageStub index="04" name="Contact" title="Let's talk.">
      <div className="grid gap-10 sm:grid-cols-2">
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
          <div className="t-label text-steel-500">Direct</div>
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
      </div>
    </PageStub>
  );
}
