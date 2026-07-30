import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const LocationSection = () => {
  const { locale } = useTranslation();
  const isEn = locale === "en";

  return (
    <section className="py-16 md:py-24 bg-slate-50 text-zinc-900 relative z-20 border-y border-slate-200/80">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-2"
          >
            {isEn ? "OUR LOCATION" : "ONZE LOCATIE"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight mb-3"
          >
            {isEn ? "Visit Us in Amsterdam" : "Vind Ons in Amsterdam"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-600 font-body text-base"
          >
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span>Nicolaas Anslijnstraat 82, 1068 WR Amsterdam, Países Baixos</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-200/80 overflow-hidden"
        >
          <div className="w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden relative">
            <iframe
              title="SP Schilders Google Maps Location"
              src="https://maps.google.com/maps?q=Nicolaas%20Anslijnstraat%2082%2C%201068%20WR%20Amsterdam%2C%20Pa%C3%ADses%20Baixos&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
