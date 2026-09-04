import { services } from "@/content/services";
import { process } from "@/content/process";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Plans } from "@/components/sections/Plans";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Design, build, AI-assisted content and SEO, and ongoing monthly care for websites. What each one includes and what it costs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={["What you", "get, and", "what it costs."]}
        lede="A project is a fixed price agreed before we start. The care plan afterwards is monthly and you can leave with thirty days' notice. There is nothing else to buy."
      />

      <section aria-labelledby="what-we-do" className="shell pb-[var(--section-y)]">
        <h2 id="what-we-do" className="sr-only">
          What we do
        </h2>

        <div className="border-t border-gray-1">
          {services.map((service, index) => (
            <Reveal key={service.id} as="article" amount={0.2} className="border-b border-gray-1">
              <div className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
                <div className="lg:col-span-4">
                  <p className="text-eyebrow uppercase text-gray-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-display-2 text-white">{service.title}</h3>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="measure text-body-lg text-gray-3">{service.summary}</p>
                  <p className="measure mt-6 text-body text-gray-2">{service.detail}</p>

                  <h4 className="mt-10 text-eyebrow uppercase text-gray-2">Included</h4>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-body text-gray-3">
                        <span aria-hidden="true" className="text-gray-2">
                          &mdash;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="timeline" className="shell pb-[var(--section-y)]">
        <Reveal>
          <h2 id="timeline" className="text-display-2 text-white">
            How long it takes
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px border border-gray-1 bg-gray-1 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <RevealItem key={step.n} className="bg-black p-7">
              <p className="text-eyebrow uppercase text-gray-2">{step.duration}</p>
              <h3 className="mt-4 text-h1 text-white">{step.title}</h3>
              <p className="mt-4 text-caption text-gray-3">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <Plans />
      <ClosingCta />
    </>
  );
}
