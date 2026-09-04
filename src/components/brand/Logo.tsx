/**
 * AruWeb brand mark.
 *
 * The device is the full stop. It already exists in the hero — "stay
 * built." ends in a purple period — and it carries the studio's whole
 * posture: a finished statement, a price said out loud, work that is
 * done rather than ongoing-forever. So the logo is "A." and the wordmark
 * is "ARUWEB."
 *
 * The A is drawn as geometry rather than set in Poppins, so the mark is
 * identical everywhere including the favicon, where no webfont is loaded.
 * Its proportions match Poppins: a geometric skeleton, circular terminals,
 * a crossbar sitting slightly above centre.
 *
 * The letterforms inherit `currentColor`, so the mark takes the colour of
 * whatever it sits in. Only the dot is fixed to the accent.
 */

type LogoMarkProps = {
  className?: string;
  /** Set false to draw the dot in currentColor too, for one-colour contexts. */
  accent?: boolean;
};

export function LogoMark({ className, accent = true }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Stroke weight is 3.2 rather than 3: against Poppins Bold beside it,
          a 3 read noticeably lighter than the wordmark. */}
      <path
        d="M5.6 23.5 L13.1 8.5 L20.6 23.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 18.2 H17.0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="25.3" cy="22" r="2.6" fill={accent ? "var(--color-violet)" : "currentColor"} />
    </svg>
  );
}

type LogoProps = {
  /** "lockup" is the mark plus the wordmark; "mark" is the A alone. */
  variant?: "lockup" | "mark";
  className?: string;
};

/**
 * The horizontal lockup used in the header and footer. The wordmark is
 * live text in Poppins rather than outlines, so it stays selectable and
 * scales with the type system.
 */
export function Logo({ variant = "lockup", className }: LogoProps) {
  if (variant === "mark") {
    return <LogoMark className={className ?? "h-7 w-7"} />;
  }

  // The dot belongs to the monogram, not to both halves. Setting it twice —
  // "A." beside "ARUWEB." — reads as a stutter and spends the device twice,
  // so the wordmark runs clean and the mark carries the accent.
  //
  // The gap has to clear the wordmark's 0.22em tracking, or the mark looks
  // like it is the first letter of the word rather than a mark beside it.
  return (
    <span className={`inline-flex items-center gap-3.5 ${className ?? ""}`}>
      <LogoMark className="h-6 w-6 shrink-0" />
      <span className="text-caption font-bold uppercase leading-none tracking-[0.22em]">
        Aruweb
      </span>
    </span>
  );
}
