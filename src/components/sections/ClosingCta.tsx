import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function ClosingCta() {
  return (
    <section
      id="contact"
      aria-labelledby="closing-title"
      className="border-t border-gray-1 py-[var(--section-y)]"
    >
      <div className="shell">
        <Reveal>
          <Eyebrow index="08">Start</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 id="closing-title" className="mt-8 text-display-1 text-white">
            <span className="block">Tell us what</span>
            <span className="block">you are selling.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="measure text-body-lg text-gray-3">
              Send us a paragraph about your business and what the site needs to
              do. We reply within two business days with a straight answer on
              scope, price and when we could start.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">Start a project</ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="text-caption text-gray-3 underline decoration-gray-1 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-violet"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-6 border-t border-gray-1 pt-8 text-caption">
              <div>
                <dt className="text-gray-2">Studio</dt>
                <dd className="mt-1 text-gray-3">
                  {site.address.street}, {site.address.locality}
                </dd>
              </div>
              <div>
                <dt className="text-gray-2">Hours</dt>
                <dd className="mt-1 text-gray-3">{site.hours}</dd>
              </div>
              <div>
                <dt className="text-gray-2">Languages</dt>
                <dd className="mt-1 text-gray-3">{site.languages.join(", ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
