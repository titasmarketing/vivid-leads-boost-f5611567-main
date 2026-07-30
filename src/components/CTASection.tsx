import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";
import { Link } from "react-router-dom";

const ease = [0.23, 1, 0.32, 1] as const;

const CTASection = () => {
  const { t, locale } = useTranslation();
  const data = t.contact;

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="container max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-4"
        >
          {data.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95] mb-6"
        >
          <span className="block mb-2 text-foreground">{data.title1}</span>
          <span className="block text-gradient-gold">{data.title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-body text-foreground/70 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
        >
          {data.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          <Link
            to={locale === "en" ? "/en/contact" : "/contact"}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-display font-bold text-base md:text-lg tracking-tight shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/40"
          >
            {data.btnWhatsApp}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
