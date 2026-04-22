import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import FounderStory from "@/components/FounderStory";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

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
      <ServicesGrid />
      <BeforeAfterSection />
      <FounderStory />
      <Testimonials />
      <ContactForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
