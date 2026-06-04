import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import { useNavigate } from "react-router-dom";

import BinnenschilderHero from "@/components/BinnenschilderHero";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import FounderStory from "@/components/FounderStory";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import beforeBinnenImg from "@/assets/before - binnen.png";
import afterBinnenImg from "@/assets/after - binnen.png";

const Binnenschilder = ({ lang }: { lang?: "en" | "nl" }) => {
  const { t, setLocale } = useTranslation();

  useEffect(() => {
    if (lang) {
      setLocale(lang);
    } else {
      setLocale("nl");
    }
  }, [lang, setLocale]);

  // Safely get the ads translation or fallback to the generic one
  const adsData = (t as any).binnenschilderAds || {};
  const pageData = (t as any).binnenschilderPage || {};

  return (
    <main className="bg-background min-h-screen">
      <BinnenschilderHero 
        content={{
          subtitle: adsData.problem?.subtitle || pageData.subtitle,
          title1: pageData.title1,
          title2: pageData.title2,
          description: pageData.description,
          btnHome: pageData.btnHome,
          btnWhatsApp: pageData.btnWhatsApp
        }} 
        lang={lang} 
      />
      <BeforeAfterSection 
        content={adsData.beforeafter} 
        beforeImage={beforeBinnenImg}
        afterImage={afterBinnenImg}
      />
      <TrustBar content={adsData.trust} />
      <ProblemSolution content={adsData.problem} hideCarousel={true} />
      <FounderStory content={adsData.founder} />
      <Testimonials content={adsData.testimonials} />
      <ContactForm content={adsData.contact} />
      
      {/* Onze diensten moved down here, exactly before the Footer */}
      <ServicesGrid />

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Binnenschilder;
