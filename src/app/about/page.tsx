import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata = pageMetadata({
  title: "About",
  description:
    "A small website studio in Oranjestad, Aruba. Who we are, how we work, and why we keep looking after the sites we build.",
  path: "/about",
});

const beliefs = [
  {
    title: "A website is not a delivery",
    body: "It is a thing that runs, every day, whether or not anyone is looking at it. Handing over a folder of files and walking away is how sites end up broken two years later. That is why every project ends in a plan rather than an invoice.",
  },
  {
    title: "AI drafts, people decide",
    body: "We use AI to move fast on first drafts, translations and research. It is genuinely good at that. It is not good at knowing that a hotel in Noord and one in San Nicolas sell to completely different people. Someone here reads every line before it ships.",
  },
  {
    title: "Small on purpose",
    body: "We take one project at a time. It means a waiting list, and it means the person who designs your site is the person who answers when you email about it two years later. We think that trade is worth it.",
  },
  {
    title: "Say the price",
    body: "Every price on this site is a real number. If a project does not fit your budget we will say so in the first email rather than after three meetings.",
  },
];

const numbers = [
  { value: "2021", label: "Studio founded" },
  { value: "23", label: "Sites launched" },
  { value: "19", label: "Still on a plan with us" },
  { value: "4", label: "Languages we work in" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={["A small", "studio in", "Oranjestad."]}
        lede="We design and build websites for businesses here and abroad, then keep them running. That is the whole company. There is no account team, no ticket queue, and no plan to grow into one."
      />

      <section aria-labelledby="numbers" className="shell pb-[var(--section-y)]">
        <h2 id="numbers" className="sr-only">
          The studio in numbers
        </h2>

        <RevealGroup className="grid gap-px border border-gray-1 bg-gray-1 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((item) => (
            <RevealItem key={item.label} className="bg-black p-7 lg:p-9">
              <p className="text-display-2 text-white">{item.value}</p>
              <p className="mt-3 text-caption text-gray-2">{item.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section aria-labelledby="beliefs" className="shell pb-[var(--section-y)]">
        <Reveal>
          <h2 id="beliefs" className="text-display-2 text-white">
            Four things we believe
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-gray-1">
          {beliefs.map((belief) => (
            <Reveal key={belief.title} as="article" amount={0.25} className="border-b border-gray-1">
              <div className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                <h3 className="text-h1 text-white lg:col-span-5">{belief.title}</h3>
                <p className="measure text-body text-gray-3 lg:col-span-6 lg:col-start-7">
                  {belief.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="where" className="shell pb-[var(--section-y)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="where" className="text-display-2 text-white">
              Where we are
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <p className="measure text-body-lg text-gray-3">
              We work from {site.address.locality}, on {site.address.street}. Aruba is
              about 110,000 people, which is small enough that we have met most of
              our clients in person and that word travels if we do bad work.
            </p>
            <p className="measure mt-6 text-body text-gray-3">
              Roughly half our work is for people we have never met — in the US, the
              Netherlands, and across Curacao and Bonaire. We are on {site.timezone},
              which lines up with New York for most of the year and never shifts.
              Everything runs the same either way: the same plans, the same response
              times, the same person answering.
            </p>
            <p className="measure mt-6 text-body text-gray-2">
              We work in {site.languages.join(", ")}. Most of our clients switch
              between two of them mid-sentence, and so do we.
            </p>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <ClosingCta />
    </>
  );
}
