import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import GoogleReviews from "@/components/GoogleReviews";
import WhySection from "@/components/WhySection";
import WhyChooseBand from "@/components/WhyChooseBand";
import InfoSection from "@/components/InfoSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ServicesGrid from "@/components/ServicesGrid";
import FounderStory from "@/components/FounderStory";
import WhyUsStats from "@/components/WhyUsStats";
import LocationSection from "@/components/LocationSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

import beforeBinnenImg from "@/assets/before - binnen.png";
import afterBinnenImg from "@/assets/after - binnen.png";

const Index = ({ lang }: { lang?: "en" | "nl" }) => {
  const { setLocale, locale } = useTranslation();

  useEffect(() => {
    setLocale(lang ?? "nl");
  }, [lang, setLocale]);

  usePageMeta(
    locale === "en"
      ? "Painter Amsterdam | Free quote within 24 hours | SP Schilders"
      : "Schilder Amsterdam | Gratis offerte binnen 24 uur | SP Schilders",
    locale === "en"
      ? "Request a free, no-obligation painting quote in 1 minute and save up to 30%. Interior and exterior painting in Amsterdam with a 4-year warranty."
      : "Vraag in 1 minuut een gratis, vrijblijvende offerte aan en bespaar tot 30% op je schilderklus. Binnen- en buitenschilderwerk in Amsterdam met 4 jaar garantie.",
  );

  return (
    <main>
      <SiteNav />
      <HeroSection />
      <GoogleReviews />
      <WhySection />
      <WhyChooseBand />
      <InfoSection />
      <BeforeAfterSection beforeImage={beforeBinnenImg} afterImage={afterBinnenImg} />
      <ServicesGrid />
      <FounderStory />
      <WhyUsStats />
      <LocationSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
