"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/content/projects";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

const COUNT = projects.length;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col border border-gray-1 bg-ink p-6 transition-colors duration-500 hover:border-gray-2 lg:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="text-eyebrow uppercase text-gray-2">
          {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
        </span>
        <span className="text-eyebrow uppercase text-gray-2">{project.year}</span>
      </div>

      <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-sm">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(max-width: 1023px) 92vw, 46vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-7 flex flex-1 flex-col justify-end gap-5">
        <div>
          <h3 className="text-display-2 text-white transition-colors duration-300 group-hover:text-violet">
            {project.client}
          </h3>
          <p className="mt-2 text-caption text-gray-2">{project.sector}</p>
        </div>

        <p className="measure text-body text-gray-3">{project.summary}</p>

        <div className="flex items-end justify-between gap-6 border-t border-gray-1 pt-5">
          <p>
            <span className="block text-h1 text-white">{project.metric.value}</span>
            <span className="mt-1 block text-caption text-gray-2">{project.metric.label}</span>
          </p>
          <span className="text-caption text-gray-3 transition-colors duration-300 group-hover:text-violet">
            Read the case
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Selected work. On a wide screen the track pins and scrolls sideways; on
 * anything narrower — and whenever reduced motion is set — it falls back to
 * a vertical stack, which is also what gets server-rendered.
 *
 * The travel distance is measured rather than calculated from viewport
 * units, because the panels are capped at a max width and so are not a
 * fixed fraction of the viewport at every size.
 */
export function Work() {
  const reduced = useReducedMotion();
  const isWide = useMediaQuery("(min-width: 1024px)");
  const pinned = isWide && !reduced;

  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setTravel(Math.max(0, rail.scrollWidth - window.innerWidth));
  }, []);

  useEffect(() => {
    if (!pinned) {
      setTravel(0);
      return;
    }
    measure();
    const rail = railRef.current;
    const observer = new ResizeObserver(measure);
    if (rail) observer.observe(rail);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, measure]);

  // Passing a target that never mounts makes framer-motion warn that the ref
  // is not hydrated, so the stacked layout tracks the window instead.
  const { scrollYProgress } = useScroll({
    target: pinned ? trackRef : undefined,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const heading = (
    <SectionHeading
      index="03"
      eyebrow="Selected work"
      title={["Six sites,", "still running."]}
      lede="Every one of these is on a maintenance plan today. The number under each is the one result the owner cared about."
      id="work-title"
    />
  );

  if (!pinned) {
    return (
      <section aria-labelledby="work-title" className="py-[var(--section-y)]">
        <div className="shell">
          {heading}

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} amount={0.15} className="h-full">
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <TextLink href="/work">See all work</TextLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="work-title" className="pt-[var(--section-y)]">
      <div className="shell">{heading}</div>

      {/* Vertical distance that drives the horizontal travel, 1:1 with it. */}
      <div
        ref={trackRef}
        className="relative mt-20"
        style={{ height: `calc(100svh + ${travel}px)` }}
      >
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <motion.div ref={railRef} style={{ x }} className="flex gap-6 will-change-transform">
            {/* Leading offset so the first panel lines up with the page gutter. */}
            <div aria-hidden="true" className="shrink-0" style={{ width: "var(--gutter)" }} />

            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="h-[76svh] w-[78vw] max-w-[1100px] shrink-0"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}

            {/* Not aria-hidden: it holds a real, focusable link. */}
            <div className="flex h-[76svh] w-[34vw] shrink-0 items-end pr-[var(--gutter)]">
              <TextLink href="/work">See all work</TextLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
