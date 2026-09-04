export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They rebuilt the site in five weeks and we stopped losing bookings to the phone. What I value more is that someone answers when I email on a Sunday.",
    name: "Marisol Tromp",
    role: "Owner",
    company: "Casa Marisol",
  },
  {
    quote:
      "Our old site took six seconds to load on a phone. Tourists gave up before the tour list appeared. Now it is under two and the bookings show it.",
    name: "Dwight Feliciano",
    role: "Director",
    company: "Boca Catalina Dive Co.",
  },
  {
    quote:
      "I am not a website person. I send them a photo and a price and it is on the site the same day. That is the whole reason we pay monthly.",
    name: "Carmen Solognier",
    role: "Manager",
    company: "Ferretería San Nicolas",
  },
];
