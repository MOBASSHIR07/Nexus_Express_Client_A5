import Coverage from "@/components/modules/home/Coverage.pipe";
import Features from "@/components/modules/home/Features";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Testimonials from "@/components/modules/home/Testimonials";
import TrustMarquee from "@/components/modules/home/TrustMarquee";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustMarquee />
      <Features/>
      <HowItWorks/>
      <Coverage/>
      <Testimonials/>
      {/* Next sections will go here */}
    </main>
  );
}