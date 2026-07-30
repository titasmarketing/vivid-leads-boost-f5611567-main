import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n";
import { Link, useLocation } from "react-router-dom";

import binnenImg from "@/assets/IMG_3625 (1).jpg";
import buitenImg from "@/assets/a6e8b7d8-df94-4ccc-a852-9d87b71a83b6.jpg";
import paintingImg from "@/assets/service-painting-v2.jpg";
import microcementImg from "@/assets/service-microcement-v2.jpg";
import cleaningImg from "@/assets/service-cleaning-v2.png";
import maintenanceImg from "@/assets/service-maintenance-v2.png";

const ease = [0.23, 1, 0.32, 1] as const;
const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";

const ServicesGrid = () => {
  const { locale } = useTranslation();
  const location = useLocation();
  const isEn = locale === "en";
  const isBinnenschilderPage = location.pathname.includes("binnenschilder");

  const bottomServices = [
    {
      title: isEn ? "Painting" : "Schilderwerk",
      image: paintingImg,
      link: WHATSAPP_URL,
    },
    {
      title: isEn ? "Exterior Painting" : "Buitenschilderwerk",
      image: microcementImg,
      link: WHATSAPP_URL,
    },
    {
      title: isEn ? "Interior Painting" : "Binnenschilderwerk",
      image: cleaningImg,
      link: isBinnenschilderPage ? undefined : (isEn ? "/en/binnenschilder" : "/binnenschilder"),
    },
    {
      title: isEn ? "Spray Painting" : "Spuitwerk",
      image: maintenanceImg,
      link: WHATSAPP_URL,
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 text-zinc-900 border-y border-slate-200/80">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-3"
          >
            {isEn ? "OUR SERVICES" : "ONZE DIENSTEN"}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900"
          >
            {isEn ? "Our Professional Services" : "Onze Professionele Diensten"}
          </motion.h2>
        </div>

        {/* ── Top Featured Services (Zigzag Layout) ── */}
        <div className="space-y-16 md:space-y-24 mb-20 md:mb-28">

          {/* 1. Binnenschilderwerk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-6 space-y-4"
            >
              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
                {isEn ? "Interior Painting" : "Binnenschilderwerk"}
              </h3>
              <p className="font-body text-slate-600 text-base md:text-lg leading-relaxed">
                {isEn
                  ? "Breathe new life into your interior spaces with our precision interior painting. Whether it is a single room or an entire building, we create an inviting atmosphere with clean lines and vibrant colors."
                  : "Blaas uw binnenruimtes nieuw leven in met ons precisie binnenschilderwerk. Of het nu een enkele kamer of een heel pand is, wij creëren een uitnodigende sfeer met strakke lijnen en levendige kleuren."}
              </p>
              <div className="pt-2">
                <Link
                  to={isEn ? "/en/binnenschilder" : "/binnenschilder"}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-tight transition-transform duration-300 hover:scale-105 shadow-md shadow-primary/20"
                >
                  <span>{isEn ? "View service" : "Bekijk dienst"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[4/3] group relative">
                <img
                  src={binnenImg}
                  alt="Binnenschilderwerk SP Schilders"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* 2. Buitenschilderwerk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Image Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[4/3] group relative">
                <img
                  src={buitenImg}
                  alt="Buitenschilderwerk SP Schilders"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Text Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-6 space-y-4 order-1 lg:order-2"
            >
              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
                {isEn ? "Exterior Painting" : "Buitenschilderwerk"}
              </h3>
              <p className="font-body text-slate-600 text-base md:text-lg leading-relaxed">
                {isEn
                  ? "Protect and beautify the exterior of your property with our expert painting services. From facades to window frames, our durable finishes withstand the unpredictable weather in Amsterdam."
                  : "Bescherm en verfraai de buitenkant van uw pand met onze deskundige schilderdiensten. Van gevels tot kozijnen, onze duurzame afwerkingen zijn bestand tegen het wisselvallige weer in Amsterdam."}
              </p>
              <div className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-tight transition-transform duration-300 hover:scale-105 shadow-md shadow-primary/20"
                >
                  <span>{isEn ? "View service" : "Bekijk dienst"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── Bottom 4 Grid Card Services (SP Black Styling) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomServices.map((service, i) => {
            const CardButton = (
              <span className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-4 rounded-xl font-display font-bold text-sm tracking-tight transition-all duration-300 group-hover:scale-105 shadow-md">
                {isEn ? "Bekijk dienst" : "Bekijk dienst"}
              </span>
            );

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="group bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Top Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 text-center flex flex-col items-center flex-1 justify-between gap-4">
                  <h4 className="font-display font-bold text-2xl text-white tracking-tight">
                    {service.title}
                  </h4>

                  {service.link?.startsWith("/") ? (
                    <Link to={service.link} className="w-full">
                      {CardButton}
                    </Link>
                  ) : service.link ? (
                    <a href={service.link} target="_blank" rel="noopener noreferrer" className="w-full">
                      {CardButton}
                    </a>
                  ) : (
                    CardButton
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
