import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n";

const WHATSAPP_URL = "https://wa.me/31687545046?text=Hello%2C%20I%27m%20interested%20in%20your%20services";
const ease = [0.23, 1, 0.32, 1] as const;

const ProblemSolution = () => {
  const { t } = useTranslation();
  return (
    <section className="section-padding bg-background">
      <div className="container max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6"
        >
          {t.problem.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-5xl lg:text-5xl tracking-tighter leading-[0.95] mb-8"
        >
          <span className="block xl:whitespace-nowrap mb-2">
            {t.problem.title1}
          </span>
          <span className="block text-gradient-gold">
            {t.problem.title2}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
        >
          {t.problem.desc1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          {t.problem.desc2}
        </motion.p>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-base tracking-tight"
        >
          <MessageCircle className="w-5 h-5" />
          {t.problem.btn}
        </motion.a>
      </div>
    </section>
  );
};

export default ProblemSolution;
