import { motion } from "framer-motion";
import { ArrowRight, PiggyBank, ShieldCheck, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import scaffoldImg from "@/assets/brand/painters-scaffold.webp";
import { useTranslation } from "@/i18n";
import { quotePath } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;
const icons = [PiggyBank, Timer, ShieldCheck];

/** "Waarom SP Schilders?" — three benefits + "Een echte vakschilder nodig?" block. */
const WhySection = () => {
  const { t, locale } = useTranslation();
  const w = t.home.why;

  return (
    <section className="bg-white text-zinc-900 py-16 md:py-24">
      <div className="container max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-12 md:mb-16"
        >
          {w.title1} <span className="hl-gold">{w.title2}</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-28">
          {w.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-5 shadow-lg shadow-zinc-900/20 ring-4 ring-primary/40">
                  <Icon className="w-9 h-9 text-primary" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight mb-1">{item.title}</h3>
                <p className="font-body text-zinc-500 text-sm md:text-base">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-6"
          >
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tighter leading-[1.05] mb-6">
              {w.vakTitle1} <span className="hl-gold">{w.vakTitle2}</span>
            </h2>
            <p className="font-body text-zinc-600 text-base md:text-lg leading-relaxed mb-4">{w.vakP1}</p>
            <p className="font-body text-zinc-600 text-base md:text-lg leading-relaxed mb-4">{w.vakP2}</p>
            <p className="font-body text-zinc-600 text-base md:text-lg leading-relaxed mb-8">{w.vakP3}</p>
            <Link
              to={quotePath(locale)}
              className="inline-flex items-center gap-2 bg-primary text-zinc-900 px-7 py-4 rounded-xl font-display font-extrabold text-base tracking-tight shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-gold)]"
            >
              {w.btn}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            <div className="absolute -inset-3 rounded-[36px] bg-primary/25 -rotate-2" />
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-zinc-200 aspect-[4/3]">
              <img src={scaffoldImg} alt="SP Schilders vakschilders aan het werk op de steiger in Amsterdam" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
