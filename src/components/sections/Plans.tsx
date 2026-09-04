import { plans, plansNote } from "@/content/plans";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The visual peak of the page after the hero. A full-bleed `--ink` band so
 * the section reads as its own plane, with the recommended tier physically
 * lifted out of the row and carrying the one purple edge in view.
 *
 * Features are a definition list, not a grid of ticks, so assistive tech
 * gets label/value pairs rather than a wall of checkmarks.
 */
export function Plans() {
  return (
    <section
      id="plans"
      aria-labelledby="plans-title"
      className="border-y border-gray-1 bg-ink py-[var(--section-y)]"
    >
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Maintenance plans"
          title={["Keep it", "running."]}
          lede="We build it once. After that it needs someone on it every month — patching, backups, edits, and somebody who notices when it goes down. That is the part most studios hand back to you."
          id="plans-title"
        />

        {/* Grid items stretch by default, so all three cards share a height
            and `mt-auto` lines the buttons up along one baseline — with Grow
            offset by exactly the amount it is lifted. */}
        <RevealGroup
          className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-3 lg:gap-5"
          stagger={0.1}
        >
          {plans.map((plan) => (
            <RevealItem
              key={plan.id}
              className={
                plan.recommended
                  ? "relative rounded-lg lg:-mt-10"
                  : "relative rounded-lg lg:mt-0"
              }
            >
              {/* The purple edge lives on the recommended tier only. */}
              <div
                className={`relative flex h-full flex-col rounded-lg p-7 lg:p-8 ${
                  plan.recommended
                    ? "bg-black shadow-[0_0_0_1px_var(--color-purple),0_0_60px_-20px_var(--color-purple)]"
                    : "border border-gray-1 bg-black/40"
                }`}
              >
                {plan.recommended ? (
                  <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-purple px-3 py-1 text-eyebrow uppercase text-white">
                    Most chosen
                  </p>
                ) : null}

                <h3 className="text-h1 text-white">{plan.name}</h3>
                <p className="mt-3 text-body text-gray-3">{plan.pitch}</p>

                <p className="mt-8 flex items-baseline gap-2">
                  <span
                    className={
                      plan.recommended
                        ? "text-display-1 text-white"
                        : "text-display-2 text-white"
                    }
                  >
                    ${plan.price}
                  </span>
                  <span className="text-caption text-gray-2">
                    /{plan.cadence}
                    <span className="sr-only"> {plan.currency}</span>
                  </span>
                </p>

                <dl className="mt-9 border-t border-gray-1">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-baseline justify-between gap-4 border-b border-gray-1 py-3"
                    >
                      <dt className="text-caption text-gray-2">{feature.label}</dt>
                      <dd className="text-right text-caption text-gray-3">{feature.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-7 space-y-2">
                  {plan.extras.map((extra) => (
                    <li key={extra} className="flex gap-3 text-caption text-gray-3">
                      <span aria-hidden="true" className="text-gray-2">
                        &mdash;
                      </span>
                      {extra}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <p className="text-caption text-gray-2">{plan.suits}</p>
                  <div className="mt-6">
                    <ButtonLink
                      href={`/contact?plan=${plan.id}`}
                      variant={plan.recommended ? "primary" : "ghost"}
                      magnetic={false}
                      className="w-full"
                    >
                      {plan.cta}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <p className="measure text-body text-gray-2">{plansNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
