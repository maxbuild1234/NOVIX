import { services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

/**
 * Four services as alternating full-width rows rather than four identical
 * cards: odd rows set the title left and the detail right, even rows swap
 * them, so the eye zigzags down the section. Hovering washes the whole row
 * to `--ink` and turns the title violet.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="What we do"
          title={["Four things,", "done properly."]}
          lede="Most of our clients need all four. Some arrive with a site that already works and only want the last one, which is fine too."
          id="services-title"
        />
      </div>

      <div className="mt-20 border-t border-gray-1 lg:mt-28">
        {services.map((service, index) => {
          const flip = index % 2 === 1;

          return (
            <Reveal
              key={service.id}
              as="article"
              amount={0.25}
              className="group border-b border-gray-1 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink"
            >
              <div className="shell grid gap-y-6 py-12 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
                <div
                  className={`flex items-baseline gap-4 lg:col-span-5 lg:flex-col lg:items-start lg:gap-5 ${
                    flip ? "lg:order-2 lg:col-start-8" : "lg:order-1 lg:col-start-1"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="text-eyebrow text-gray-2 transition-colors duration-300 group-hover:text-violet"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-2 text-white transition-colors duration-300 group-hover:text-violet">
                    {service.title}
                  </h3>
                </div>

                <div
                  className={`lg:col-span-6 ${
                    flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7"
                  }`}
                >
                  <p className="measure text-body-lg text-gray-3">{service.summary}</p>
                  <p className="measure mt-5 text-body text-gray-2">{service.detail}</p>

                  <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-gray-1 px-4 py-1.5 text-caption text-gray-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="shell mt-14">
        <Reveal>
          <TextLink href="/services">See how each one works</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
