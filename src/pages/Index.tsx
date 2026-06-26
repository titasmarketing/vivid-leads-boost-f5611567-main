import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import FounderStory from "@/components/FounderStory";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

import beforeBinnenImg from "@/assets/before - binnen.png";
import afterBinnenImg from "@/assets/after - binnen.png";

const Index = ({ lang }: { lang?: "en" | "nl" }) => {
  const { setLocale } = useTranslation();

  useEffect(() => {
    if (lang) {
      setLocale(lang);
    } else {
      // By default, assuming "nl" on `/` due to user request
      setLocale("nl");
    }
  }, [lang, setLocale]);

  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ProblemSolution />
      <BeforeAfterSection 
        beforeImage={beforeBinnenImg}
        afterImage={afterBinnenImg}
      />
      <ServicesGrid />
      <FounderStory />
      <Testimonials />
      <CTASection />

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
