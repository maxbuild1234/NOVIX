import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { baseUrl, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { ClosingCta } from "@/components/sections/ClosingCta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({
      title: "Case study not found",
      description: "That case study does not exist.",
      path: "/work",
    });
  }

  const meta = pageMetadata({
    title: `${project.client} — ${project.sector}`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });

  // Prefer the project's own cover over the site-wide OG card.
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: project.cover.src,
          width: project.cover.width,
          height: project.cover.height,
          alt: project.cover.alt,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${project.client} website`,
          about: project.sector,
          dateCreated: project.year,
          abstract: project.summary,
          inLanguage: project.languages,
          image: `${baseUrl}${project.cover.src}`,
          creator: { "@id": `${baseUrl}/#studio` },
        }}
      />

      <article>
        <header className="shell pt-40 pb-14 lg:pt-48 lg:pb-20">
          <Reveal>
            <Eyebrow>{project.sector}</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-8 text-display-1 text-white">{project.client}</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="measure mt-10 text-body-lg text-gray-3">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-14 grid gap-px border border-gray-1 bg-gray-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Year", value: project.year },
                { label: "Plan", value: `${project.plan} — ongoing` },
                { label: "Languages", value: project.languages.join(", ") },
                { label: "Headline result", value: `${project.metric.value} ${project.metric.label}` },
              ].map((item) => (
                <div key={item.label} className="bg-black p-6">
                  <dt className="text-eyebrow uppercase text-gray-2">{item.label}</dt>
                  <dd className="mt-3 text-body text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        <Reveal className="shell" amount={0.1}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-1">
            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              width={project.images[0].width}
              height={project.images[0].height}
              sizes="(max-width: 1439px) 92vw, 1376px"
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="shell py-[var(--section-y)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <Reveal as="section" className="lg:col-span-7">
              <h2 className="text-h1 text-white">The challenge</h2>
              <p className="measure mt-6 text-body text-gray-3">{project.challenge}</p>

              <h2 className="mt-16 text-h1 text-white">What we did</h2>
              <ol className="mt-6 border-t border-gray-1">
                {project.approach.map((step, stepIndex) => (
                  <li key={step} className="flex gap-6 border-b border-gray-1 py-6">
                    <span aria-hidden="true" className="text-eyebrow text-gray-2">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="measure text-body text-gray-3">{step}</p>
                  </li>
                ))}
              </ol>

              <h2 className="mt-16 text-h1 text-white">The outcome</h2>
              <p className="measure mt-6 text-body text-gray-3">{project.outcome}</p>
            </Reveal>

            <Reveal as="aside" className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <h2 className="text-eyebrow uppercase text-gray-2">Results</h2>
              <dl className="mt-8 border-t border-gray-1">
                {project.results.map((result) => (
                  <div key={result.label} className="border-b border-gray-1 py-6">
                    <dt className="sr-only">{result.label}</dt>
                    <dd>
                      <span className="block text-display-2 text-white">{result.value}</span>
                      <span className="mt-2 block text-caption text-gray-2">{result.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-12 text-eyebrow uppercase text-gray-2">What we did</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-gray-1 px-4 py-1.5 text-caption text-gray-3"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="shell" amount={0.1}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-1">
            <Image
              src={project.images[1].src}
              alt={project.images[1].alt}
              width={project.images[1].width}
              height={project.images[1].height}
              sizes="(max-width: 1439px) 92vw, 1376px"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <nav aria-label="More work" className="shell flex flex-wrap items-center justify-between gap-6 py-[var(--section-y)]">
          <TextLink href="/work">All work</TextLink>
          <Link
            href={`/work/${next.slug}`}
            className="group text-right transition-colors duration-300"
          >
            <span className="block text-eyebrow uppercase text-gray-2">Next case</span>
            <span className="mt-2 block text-h1 text-white group-hover:text-violet">
              {next.client}
            </span>
          </Link>
        </nav>
      </article>

      <ClosingCta />
    </>
  );
}
