import { site } from "@/content/site";
import { plans } from "@/content/plans";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us about your business and what the site needs to do. We reply within two business days with scope, price and a start date.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={["Tell us what", "you are", "selling."]}
        lede="A paragraph is enough to start. We reply within two business days with a straight answer on scope, price and when we could begin."
      />

      <div className="shell pb-[var(--section-y)]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-gray-1 pt-8">
              <h2 className="text-eyebrow uppercase text-gray-2">Or just email us</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block text-h1 text-white transition-colors duration-200 hover:text-violet"
              >
                {site.email}
              </a>
            </div>

            <dl className="mt-12 space-y-7 border-t border-gray-1 pt-8 text-caption">
              <div>
                <dt className="text-gray-2">Studio</dt>
                <dd className="mt-1 text-gray-3">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}
                </dd>
              </div>
              <div>
                <dt className="text-gray-2">Hours</dt>
                <dd className="mt-1 text-gray-3">{site.hours}</dd>
              </div>
              <div>
                <dt className="text-gray-2">Timezone</dt>
                <dd className="mt-1 text-gray-3">{site.timezone}</dd>
              </div>
              <div>
                <dt className="text-gray-2">Languages</dt>
                <dd className="mt-1 text-gray-3">{site.languages.join(", ")}</dd>
              </div>
            </dl>

            <div className="mt-12 border-t border-gray-1 pt-8">
              <h2 className="text-eyebrow uppercase text-gray-2">Already have a site?</h2>
              <p className="measure mt-4 text-body text-gray-3">
                If it works and you only need someone to look after it, say so. Care
                plans start at ${Math.min(...plans.map((plan) => plan.price))} a month
                and we can take over an existing site in about a week.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
