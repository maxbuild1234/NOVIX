import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Plans } from "@/components/sections/Plans";
import { WhyAruba } from "@/components/sections/WhyAruba";
import { Marquee } from "@/components/sections/Marquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Process />
      <Plans />
      <WhyAruba />
      <Marquee />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
