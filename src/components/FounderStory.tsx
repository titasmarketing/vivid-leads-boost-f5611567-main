import { motion } from "framer-motion";
import craftImg from "@/assets/founder-craft.jpg";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const FounderStory = () => {
  const { t } = useTranslation();
  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]"
          >
            <img
              src={craftImg}
              alt="Meticulous craftsmanship close-up"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6"
            >
              {t.founder.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8"
            >
              {t.founder.title1}
              <br />
              <span className="text-gradient-gold">{t.founder.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-6"
            >
              {t.founder.desc1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-6"
            >
              {t.founder.desc2}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="flex items-center gap-4 mt-8"
            >
              <div className="w-12 h-[2px] bg-primary" />
              <span className="font-display font-semibold text-primary text-sm tracking-wider uppercase">
                {t.founder.name}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
