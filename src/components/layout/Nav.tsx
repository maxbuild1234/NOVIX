"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled && !open ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-caption uppercase tracking-[0.22em] text-white"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-caption transition-colors duration-200 hover:text-white ${
                  active ? "text-white" : "text-gray-2"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ButtonLink href="/contact" className="px-5 py-2.5" magnetic={false}>
            Start a project
          </ButtonLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-1 text-white md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 top-20 bg-black md:hidden"
          >
            <nav aria-label="Main" className="shell flex flex-col gap-2 pt-10">
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-gray-1 py-5 text-display-2 text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                <ButtonLink href="/contact" magnetic={false}>
                  Start a project
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
