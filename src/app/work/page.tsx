import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Websites we designed, built and still maintain for hotels, restaurants, shops and logistics companies in Aruba and the region.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={["Sites we", "still look", "after."]}
        lede="Six projects, every one of them on a maintenance plan today. Each case study says what the problem was, what we did about it, and what changed."
      />

      <div className="shell pb-[var(--section-y)]">
        <div className="grid gap-6 border-t border-gray-1 pt-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              amount={0.15}
              /* The first two are above the fold on most screens, so they get
                 a slightly earlier trigger and no stagger delay. */
              delay={index < 2 ? 0 : 0.05}
              className={index % 3 === 0 ? "sm:col-span-2" : undefined}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col border border-gray-1 bg-ink p-6 transition-colors duration-500 hover:border-gray-2 lg:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-eyebrow uppercase text-gray-2">{project.sector}</span>
                  <span className="text-eyebrow uppercase text-gray-2">{project.year}</span>
                </div>

                <div
                  className={`relative mt-6 w-full overflow-hidden rounded-sm ${
                    index % 3 === 0 ? "aspect-[16/7]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                    sizes={index % 3 === 0 ? "(max-width: 639px) 92vw, 90vw" : "(max-width: 639px) 92vw, 45vw"}
                    priority={index === 0}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-7 flex flex-1 flex-col justify-end gap-5">
                  <h2 className="text-display-2 text-white transition-colors duration-300 group-hover:text-violet">
                    {project.client}
                  </h2>
                  <p className="measure text-body text-gray-3">{project.summary}</p>

                  <div className="flex items-end justify-between gap-6 border-t border-gray-1 pt-5">
                    <p>
                      <span className="block text-h1 text-white">{project.metric.value}</span>
                      <span className="mt-1 block text-caption text-gray-2">
                        {project.metric.label}
                      </span>
                    </p>
                    <span className="text-caption text-gray-3 transition-colors duration-300 group-hover:text-violet">
                      Read the case
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <ClosingCta />
    </>
  );
}
