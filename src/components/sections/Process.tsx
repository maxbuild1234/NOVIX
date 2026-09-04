import { process } from "@/content/process";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Four steps in order, so the numbering is doing real work. A single rule
 * runs down the left with each step hanging off it, which reads as a
 * sequence rather than four boxes.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="How it goes"
          title={["Five weeks,", "then every", "month after."]}
          lede="A typical project runs about five weeks from the first conversation to launch. What happens after launch is the part we care most about."
          id="process-title"
        />

        <RevealGroup className="mt-20 lg:mt-28" stagger={0.1}>
          <ol className="border-t border-gray-1">
            {process.map((step) => (
              <RevealItem key={step.n} as="li" className="border-b border-gray-1">
                <div className="grid gap-4 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                  <div className="flex items-baseline gap-5 lg:col-span-4">
                    {/* gray-1 here would be 1.2:1 — invisible. These numerals
                        carry the sequence, so they use gray-2 at 4.9:1. */}
                    <span aria-hidden="true" className="text-display-2 leading-none text-gray-2">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-h1 text-white">{step.title}</h3>
                      <p className="mt-1 text-eyebrow uppercase text-gray-2">{step.duration}</p>
                    </div>
                  </div>

                  <p className="measure text-body text-gray-3 lg:col-span-7 lg:col-start-6">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>

        <Reveal className="mt-12">
          <p className="measure text-body text-gray-2">
            We take one project at a time, which is why there is a waiting list. It is
            also why the person who designs your site is the person who answers when
            you email about it two years later.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
