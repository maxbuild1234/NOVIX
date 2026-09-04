export type ProcessStep = {
  n: string;
  title: string;
  duration: string;
  body: string;
};

/** A real sequence, so it is numbered. */
export const process: ProcessStep[] = [
  {
    n: "01",
    title: "Discover",
    duration: "Week 1",
    body: "We sit down — at your place if you are on the island, on a call if you are not. We work out who buys from you, what stops them, and what the site has to do. You get a written scope and a fixed price before anything else happens.",
  },
  {
    n: "02",
    title: "Design",
    duration: "Weeks 2–3",
    body: "You see real pages with your own words and photos in them, not a grey wireframe. We agree the look on the homepage first, then apply it across the rest. Two rounds of changes are built into the price.",
  },
  {
    n: "03",
    title: "Build",
    duration: "Weeks 4–5",
    body: "We write the code, wire up your bookings or forms, load the content in every language you need, and test it on the phones your customers actually carry. Then we launch, usually on a Tuesday morning.",
  },
  {
    n: "04",
    title: "Maintain",
    duration: "Every month after",
    body: "Your plan starts the day you launch. We patch, back up, monitor and make your edits, and on the first of each month you get a report showing traffic, enquiries and what we changed. This is where most of our clients stay for years.",
  },
];
