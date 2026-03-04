import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyProSeReady from "@/components/WhyProSeReady";
import ProblemStatement from "@/components/ProblemStatement";
import HowItWorks from "@/components/HowItWorks";
import Scenarios from "@/components/Scenarios";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyProSeReady />
      <ProblemStatement />
      <HowItWorks />
      <Scenarios />
      <Pricing />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
