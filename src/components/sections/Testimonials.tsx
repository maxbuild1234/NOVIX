import { testimonials } from "@/content/testimonials";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-[var(--section-y)]">
      <div className="shell">
        <SectionHeading
          index="07"
          eyebrow="What they say"
          title={["Three", "clients."]}
          id="testimonials-title"
        />

        <RevealGroup className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-8" stagger={0.1}>
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.company} as="figure" className="border-t border-gray-1 pt-8">
              <blockquote className="text-body-lg text-gray-3">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 text-caption">
                <span className="block text-white">{testimonial.name}</span>
                <span className="mt-1 block text-gray-2">
                  {testimonial.role}, {testimonial.company}
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
