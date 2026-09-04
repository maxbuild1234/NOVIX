import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-caption tracking-[0.02em] transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-violet hover:text-white focus-visible:bg-violet focus-visible:text-white",
  ghost:
    "border border-gray-1 text-white hover:border-violet hover:text-violet focus-visible:border-violet",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Set false for secondary placements where the pull would feel noisy. */
  magnetic?: boolean;
  withArrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
  withArrow = true,
}: ButtonLinkProps) {
  const link = (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </Link>
  );

  if (!magnetic) return link;
  return <Magnetic className="inline-block">{link}</Magnetic>;
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  withArrow?: boolean;
};

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} disabled:pointer-events-none disabled:opacity-50 ${className ?? ""}`}
    >
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

/** A text link with the one purple underline the system allows. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 text-white transition-colors duration-200 hover:text-violet ${className ?? ""}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-violet transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
      <Arrow />
    </Link>
  );
}
