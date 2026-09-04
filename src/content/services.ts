export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
};

/**
 * Four services, rendered as an asymmetric editorial list rather than
 * four identical cards. Order matters — it mirrors the process.
 */
export const services: Service[] = [
  {
    id: "design",
    title: "Design",
    summary:
      "We draw the site around what your business actually sells, not around a template we bought.",
    detail:
      "We start with your customers and the two or three things you need them to do. Then we design the pages that get them there — in your language, with your photos, at the length people will actually read.",
    deliverables: [
      "Sitemap and page plan",
      "Full desktop and mobile design",
      "Type, colour and photography direction",
      "Two rounds of revisions",
    ],
  },
  {
    id: "build",
    title: "Build",
    summary:
      "Hand-built in Next.js. It loads in about a second on hotel Wi-Fi and it will still load in five years.",
    detail:
      "No page builders, no plugin stacks that break when one of them updates. We write the code, host it on a global CDN, and hand you a small editor for the parts you change often.",
    deliverables: [
      "Responsive build from 360px up",
      "Booking, forms and payment integrations",
      "Editable content areas",
      "Analytics and search console set up",
    ],
  },
  {
    id: "ai",
    title: "AI-assisted content and SEO",
    summary:
      "We use AI to draft in four languages and find the searches you are missing. A person edits every word.",
    detail:
      "Papiamento, Dutch, English and Spanish, drafted fast and then read line by line by someone who lives here. We check what people search for before they land, and write pages that answer it.",
    deliverables: [
      "Keyword and competitor research",
      "Page copy in up to four languages",
      "Local schema and Google Business Profile",
      "A content calendar you can keep up with",
    ],
  },
  {
    id: "care",
    title: "Ongoing care",
    summary:
      "The part most studios hand back to you. We keep it — updates, security, edits and a monthly report.",
    detail:
      "A website is not a delivery, it is a thing that runs. Every plan includes hosting, patching, backups, uptime monitoring and a set number of content edits, plus a plain-English report of what changed and what it did.",
    deliverables: [
      "Hosting, SSL and daily backups",
      "Security monitoring and patching",
      "Content edits within your plan hours",
      "Monthly performance report",
    ],
  },
];
