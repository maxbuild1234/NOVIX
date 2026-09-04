/**
 * Global site facts. Edit these first — name, contact, location and nav
 * all read from here, including the JSON-LD LocalBusiness schema.
 */
export const site = {
  name: "AruWeb",
  legalName: "AruWeb Studio",
  /** Used in <title> templates and the OG image. */
  tagline: "Website design studio in Aruba",
  description:
    "We design and build websites for businesses in Aruba and abroad, then keep them fast, secure and current every month.",
  url: "https://aruweb.aw",
  email: "hello@aruweb.aw",
  /** Leave empty to omit the phone from contact details and schema. */
  phone: "",
  founded: "2021",
  address: {
    street: "Caya G.F. Betico Croes",
    locality: "Oranjestad",
    region: "Aruba",
    country: "AW",
  },
  geo: { latitude: 12.5186, longitude: -70.0358 },
  languages: ["Papiamento", "Dutch", "English", "Spanish"],
  /** Same clock as New York, and Aruba does not observe DST. */
  timezone: "AST (UTC−4), no daylight saving",
  hours: "Monday to Friday, 8:00–17:00 AST",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Start",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Plans", href: "/#plans" },
      { label: "Process", href: "/#process" },
    ],
  },
] as const;
