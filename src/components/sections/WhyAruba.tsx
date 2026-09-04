import { site } from "@/content/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const facts = [
  {
    label: "Languages",
    value: site.languages.join(", "),
    body: "We write and answer email in all four. Most of our clients switch between two of them mid-sentence, and so do we.",
  },
  {
    label: "Timezone",
    value: site.timezone,
    body: "Same clock as New York for most of the year, and we never move it. An hour ahead of Miami in winter, level in summer, no twice-yearly confusion.",
  },
  {
    label: "The island",
    value: "110,000 people",
    body: "Small enough that we have met most of our clients in person, and that word travels if we do bad work. That is a useful pressure to be under.",
  },
  {
    label: "Everyone else",
    value: "Remote, worldwide",
    body: "Roughly half our work is for clients we have never met, in the US, the Netherlands and across the region. The care plans work the same either way.",
  },
];

export function WhyAruba() {
  return (
    <section aria-labelledby="aruba-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Why Aruba"
          title={["Here, and", "everywhere", "else."]}
          lede="We know this market because we live in it. We also do most of our work for people who have never been here."
          id="aruba-title"
        />

        <RevealGroup className="mt-20 grid gap-px border border-gray-1 bg-gray-1 sm:grid-cols-2">
          {facts.map((fact) => (
            <RevealItem key={fact.label} className="bg-black p-7 lg:p-10">
              <p className="text-eyebrow uppercase text-gray-2">{fact.label}</p>
              <p className="mt-4 text-h1 text-white">{fact.value}</p>
              <p className="measure mt-4 text-body text-gray-3">{fact.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <p className="measure text-body text-gray-2">
            Practically, it means we can sit in your restaurant on a Tuesday and
            watch someone try to read your menu on their phone. That is worth more
            than any amount of analytics.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
