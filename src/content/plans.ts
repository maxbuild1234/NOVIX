export type Plan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  cadence: string;
  /** One line on who this is for. */
  suits: string;
  pitch: string;
  recommended: boolean;
  /** Rendered as a definition list so screen readers get label/value pairs. */
  features: { label: string; value: string }[];
  extras: string[];
  cta: string;
};

/**
 * ── EDIT PRICES HERE ─────────────────────────────────────────────
 * Prices are monthly, in USD. Nothing else in the codebase hardcodes
 * a number — the plans section, the JSON-LD offers and the contact
 * form's budget hints all read from this file.
 * ─────────────────────────────────────────────────────────────────
 */
export const plans: Plan[] = [
  {
    id: "care",
    name: "Care",
    price: 89,
    currency: "USD",
    cadence: "month",
    suits: "One-page sites and small business sites that rarely change.",
    pitch: "Everything needed to keep a site online, safe and current.",
    recommended: false,
    features: [
      { label: "Hosting and SSL", value: "Included" },
      { label: "Updates and patching", value: "Monthly" },
      { label: "Security monitoring", value: "24/7 uptime + malware scan" },
      { label: "Content edits", value: "1 hour per month" },
      { label: "Performance report", value: "Quarterly" },
      { label: "Response time", value: "Within 48 hours" },
    ],
    extras: ["Daily backups, kept 30 days", "Yearly accessibility check"],
    cta: "Choose Care",
  },
  {
    id: "grow",
    name: "Grow",
    price: 229,
    currency: "USD",
    cadence: "month",
    suits: "Shops, restaurants and tour operators with something to say each month.",
    pitch: "Care, plus the content and search work that moves the numbers.",
    recommended: true,
    features: [
      { label: "Hosting and SSL", value: "Included, staging site too" },
      { label: "Updates and patching", value: "Weekly" },
      { label: "Security monitoring", value: "24/7 + firewall rules" },
      { label: "Content edits", value: "4 hours per month" },
      { label: "Performance report", value: "Monthly" },
      { label: "Response time", value: "Within 24 hours" },
    ],
    extras: [
      "AI-drafted content, edited by us",
      "Search tracking on 25 terms",
      "One new landing page per quarter",
    ],
    cta: "Choose Grow",
  },
  {
    id: "partner",
    name: "Partner",
    price: 549,
    currency: "USD",
    cadence: "month",
    suits: "Teams with several locations, or anyone who sells through the site daily.",
    pitch: "We act as your web department. You get our phone number, not a form.",
    recommended: false,
    features: [
      { label: "Hosting and SSL", value: "Included, staging + preview links" },
      { label: "Updates and patching", value: "Continuous" },
      { label: "Security monitoring", value: "24/7 + quarterly audit" },
      { label: "Content edits", value: "12 hours per month" },
      { label: "Performance report", value: "Monthly, with a call" },
      { label: "Response time", value: "Within 4 hours, business days" },
    ],
    extras: [
      "Quarterly design refresh",
      "Multi-language content upkeep",
      "Direct line to the person who built it",
    ],
    cta: "Talk to us",
  },
];

export const plansNote =
  "Month to month. Cancel with 30 days' notice. Priced in USD; we can bill in Aruban florin at the fixed rate if that is easier for your accountant.";

/** Budget bands offered in the contact form. */
export const budgetRanges = [
  "Under $2,500",
  "$2,500 – $6,000",
  "$6,000 – $15,000",
  "Over $15,000",
  "Not sure yet",
] as const;
