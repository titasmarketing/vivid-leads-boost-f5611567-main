import { motion } from "framer-motion";
import bgImg from "@/assets/Amsterdam_canal_district_sunset_…_202605122332.jpeg";
import logoImg from "@/assets/LOGOS CLIENTES.png";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const FounderStory = () => {
  const { t } = useTranslation();
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Amsterdam canal sunset background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
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
              className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6"
            >
              {t.founder.desc1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6"
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

          {/* Right: Floating Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="flex justify-center lg:justify-end"
          >
            <motion.img
              src={logoImg}
              alt="SP Schilders Logo"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-[80%] md:w-[60%] lg:w-[70%] h-auto drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
