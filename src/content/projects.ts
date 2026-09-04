export type Project = {
  slug: string;
  client: string;
  sector: string;
  year: string;
  /** One number, shown on the card and at the top of the case study. */
  metric: { value: string; label: string };
  summary: string;
  services: string[];
  plan: string;
  languages: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  results: { value: string; label: string }[];
  cover: { src: string; alt: string; width: number; height: number };
  images: { src: string; alt: string; width: number; height: number }[];
};

export const projects: Project[] = [
  {
    slug: "casa-marisol",
    client: "Casa Marisol",
    sector: "Boutique hotel, Noord",
    year: "2024",
    metric: { value: "+41%", label: "direct bookings" },
    summary:
      "A twelve-room hotel paying 18% commission on nearly every booking. We built them a reason to book direct.",
    services: ["Design", "Build", "Content in 3 languages", "Care plan"],
    plan: "Grow",
    languages: ["English", "Dutch", "Spanish"],
    challenge:
      "Casa Marisol had twelve rooms and a website that could not take a booking. Every reservation came through a marketplace that took 18% of it, and the owner had no way to talk to guests before they arrived. The site itself was five years old, built on a template, and took eleven seconds to load a photo gallery.",
    approach: [
      "We put the booking widget in the first screen on mobile, where 78% of their traffic comes from, and priced direct stays 8% below the marketplace rate.",
      "We shot and compressed the room photography ourselves, so twelve rooms load in under two seconds on a phone.",
      "We wrote the rooms, rates and area pages in English, Dutch and Spanish, matched to what each market actually searches for.",
      "We set up a pre-arrival email that offers airport pickup, a service they already ran but never sold.",
    ],
    outcome:
      "Direct bookings rose 41% in the first two quarters, which at their room rate covered the build inside five months. They have been on the Grow plan since launch, and we update rates and seasonal offers for them each month.",
    results: [
      { value: "+41%", label: "direct bookings" },
      { value: "1.4s", label: "load time on 4G" },
      { value: "3", label: "languages maintained" },
    ],
    cover: {
      src: "/work/casa-marisol-cover.png",
      alt: "The Casa Marisol website on a laptop and a phone, with the direct booking form in view.",
      width: 1200,
      height: 900,
    },
    images: [
      {
        src: "/work/casa-marisol-01.png",
        alt: "The Casa Marisol homepage, showing room rates and a direct booking form.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/casa-marisol-02.png",
        alt: "The room detail pages on mobile, shown in English, Dutch and Spanish.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "boca-catalina-dive",
    client: "Boca Catalina Dive Co.",
    sector: "Watersports and tours",
    year: "2025",
    metric: { value: "62%", label: "of tours booked online" },
    summary:
      "Tourists were giving up before the tour list loaded. We cut the site to a fifth of its weight.",
    services: ["Design", "Build", "SEO", "Care plan"],
    plan: "Grow",
    languages: ["English", "Dutch"],
    challenge:
      "Boca Catalina ran four boats and took almost every booking by phone or WhatsApp, which meant two staff answering the same three questions all day. Their old site weighed 9MB and took over six seconds to show the tour list on a hotel connection. Most visitors never saw it.",
    approach: [
      "We rebuilt the tour list as the homepage, with times, prices and remaining spots visible without a tap.",
      "We connected their existing booking system so availability is live, and kept WhatsApp as a one-tap fallback.",
      "We wrote pages for the searches that actually bring people in: snorkel trips, wreck dives, sunset sails, instead of one page called Services.",
      "We compressed the underwater photography to a fifth of its old weight without it looking worse.",
    ],
    outcome:
      "Within four months, 62% of tours were being booked on the site rather than by phone. The two staff who used to answer calls now run the dock. Page weight went from 9MB to 1.6MB.",
    results: [
      { value: "62%", label: "of tours booked online" },
      { value: "1.6MB", label: "page weight, down from 9MB" },
      { value: "-70%", label: "booking phone calls" },
    ],
    cover: {
      src: "/work/boca-catalina-dive-cover.png",
      alt: "The Boca Catalina Dive Co. tour booking page shown on a phone.",
      width: 1200,
      height: 900,
    },
    images: [
      {
        src: "/work/boca-catalina-dive-01.png",
        alt: "The tour list with live availability, departure times and prices.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/boca-catalina-dive-02.png",
        alt: "A tour detail page with the booking step open on mobile.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "ferreteria-san-nicolas",
    client: "Ferreteria San Nicolas",
    sector: "Hardware retail",
    year: "2024",
    metric: { value: "3x", label: "quote requests" },
    summary:
      "A hardware store with 4,000 products and no catalogue. We put the 200 that matter online.",
    services: ["Design", "Build", "Content", "Care plan"],
    plan: "Care",
    languages: ["Papiamento", "Spanish", "English"],
    challenge:
      "The shop had been on Caya Betico Croes for thirty years and sold to contractors who called to ask whether something was in stock. There was no website at all, just a Facebook page with a phone number. Contractors were ordering online from Curacao instead.",
    approach: [
      "We did not try to put 4,000 products online. We listed the 200 that contractors ask about, with sizes, brands and a request-a-quote button.",
      "We wrote it in Papiamento first, then Spanish and English, because that is the order their customers speak in.",
      "We built a quote form that lands in the owner's WhatsApp, not an inbox nobody opens.",
      "We claimed and filled their Google Business Profile, which had been sitting unverified for years.",
    ],
    outcome:
      "Quote requests tripled in the first six months and now arrive with the part number attached, so staff stop guessing. They are on the Care plan and we add products as they stock them.",
    results: [
      { value: "3x", label: "quote requests" },
      { value: "200", label: "products listed" },
      { value: "1st", label: "in local search for their category" },
    ],
    cover: {
      src: "/work/ferreteria-san-nicolas-cover.png",
      alt: "The Ferreteria San Nicolas product catalogue shown on a tablet.",
      width: 1200,
      height: 900,
    },
    images: [
      {
        src: "/work/ferreteria-san-nicolas-01.png",
        alt: "The product listing with sizes, brands and stock status.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/ferreteria-san-nicolas-02.png",
        alt: "The quote request form, shown in Papiamento.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "sabor-criollo",
    client: "Sabor Criollo",
    sector: "Restaurant group, 3 locations",
    year: "2025",
    metric: { value: "1.2s", label: "load, down from 6.4s" },
    summary:
      "Three restaurants, three websites, three different menus. We made it one.",
    services: ["Design", "Build", "AI content", "Care plan"],
    plan: "Partner",
    languages: ["Papiamento", "English", "Dutch", "Spanish"],
    challenge:
      "Sabor Criollo ran three locations, each with its own site built by a different person at a different time. Menus went out of date the moment prices changed, and the kitchen manager was editing three sets of PDFs by hand. Two of the three sites were not mobile friendly at all.",
    approach: [
      "We built one site with three location pages sharing a single menu the kitchen manager edits once.",
      "We replaced the PDF menus with real pages, so they show up in search and can be read on a phone at the table.",
      "We used AI to draft dish descriptions in four languages, then had a local writer fix every one of them.",
      "We put opening hours, holidays and reservations in one place that syncs to all three Google listings.",
    ],
    outcome:
      "The site loads in 1.2 seconds instead of 6.4. Menu updates take one person about four minutes instead of an afternoon. They moved to the Partner plan after six months because they wanted us on call during service.",
    results: [
      { value: "1.2s", label: "load time, from 6.4s" },
      { value: "4 min", label: "to update all three menus" },
      { value: "4", label: "languages from one source" },
    ],
    cover: {
      src: "/work/sabor-criollo-cover.png",
      alt: "The Sabor Criollo menu page shown across three restaurant locations.",
      width: 1200,
      height: 900,
    },
    images: [
      {
        src: "/work/sabor-criollo-01.png",
        alt: "The shared menu system, showing one dish in four languages.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/sabor-criollo-02.png",
        alt: "The three location pages with opening hours and reservation links.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "palm-ridge-dental",
    client: "Palm Ridge Dental",
    sector: "Healthcare",
    year: "2023",
    metric: { value: "-28%", label: "no-shows" },
    summary:
      "A dental practice losing an hour a day to no-shows. Online booking with reminders fixed most of it.",
    services: ["Design", "Build", "Care plan"],
    plan: "Care",
    languages: ["Papiamento", "Dutch", "English"],
    challenge:
      "Palm Ridge booked every appointment by phone during opening hours, which is exactly when their patients are also at work. Reception spent mornings on the phone, and roughly one appointment in six was a no-show with no reminder sent.",
    approach: [
      "We added online booking that shows real availability, so patients book at nine at night when they remember.",
      "We wired up automatic SMS and email reminders at 48 hours and 4 hours before.",
      "We wrote plain-language pages for the treatments people are nervous about, with prices, because nobody wants to phone to ask.",
      "We kept the site small and accessible. This is a medical practice, and a good share of their patients are over seventy.",
    ],
    outcome:
      "No-shows dropped 28% within three months, which is about four recovered appointments a week. Reception now handles bookings between patients rather than instead of them.",
    results: [
      { value: "-28%", label: "no-shows" },
      { value: "44%", label: "of bookings made after hours" },
      { value: "AA", label: "accessibility, verified" },
    ],
    cover: {
      src: "/work/palm-ridge-dental-cover.png",
      alt: "The Palm Ridge Dental appointment booking page on a desktop screen.",
      width: 1200,
      height: 900,
    },
    images: [
      {
        src: "/work/palm-ridge-dental-01.png",
        alt: "The appointment booking flow showing available times.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/palm-ridge-dental-02.png",
        alt: "A treatment page with plain-language explanations and prices.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "isla-cargo",
    client: "Isla Cargo",
    sector: "Logistics, Aruba to Curacao",
    year: "2025",
    metric: { value: "-45%", label: "tracking calls" },
    summary:
      "Customers phoned every day to ask where their shipment was. Now they look it up.",
    services: ["Design", "Build", "Integration", "Care plan"],
    plan: "Partner",
    languages: ["Papiamento", "Dutch", "English", "Spanish"],
    challenge:
      "Isla Cargo moves freight between Aruba, Curacao and Bonaire. Their tracking lived in an internal system nobody outside the office could see, so customers phoned. Three staff spent a large part of every day reading shipment statuses down the telephone.",
    approach: [
      "We built a tracking page that reads their existing system through a small API, so nothing internal had to change.",
      "We made the tracking number the whole interface: paste it, see where the container is, see when it clears customs.",
      "We wrote the rate and route pages in four languages, because their customers split roughly evenly across them.",
      "We added a status page for the ferry schedule, which is the other thing everybody phoned about.",
    ],
    outcome:
      "Tracking calls fell 45% in the first quarter. The three staff who fielded them now work on quotes. They are on the Partner plan, and we are extending the tracking to Bonaire this year.",
    results: [
      { value: "-45%", label: "tracking calls" },
      { value: "4", label: "languages" },
      { value: "99.9%", label: "uptime since launch" },
    ],
    cover: {
      src: "/work/isla-cargo-cover.png",
      alt: "The Isla Cargo shipment tracking page shown on a phone.",
      width: 1200,
      height: 900,
    },
    images: [
      {
        src: "/work/isla-cargo-01.png",
        alt: "The tracking interface showing a shipment between Aruba and Curacao.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/isla-cargo-02.png",
        alt: "The route and rate pages shown in four languages.",
        width: 1600,
        height: 1000,
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
