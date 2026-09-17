import { motion } from "framer-motion";
import { ArrowRight, Award, ShieldCheck, Timer, Users } from "lucide-react";
import { Link } from "react-router-dom";
import bgImg from "@/assets/brand/painter-interior.webp";
import { useTranslation } from "@/i18n";
import { quotePath } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;
const icons = [Timer, Users, Award, ShieldCheck];

/** "Waarom ons?" — four proof points on a branded photo + final CTA. */
const WhyUsStats = () => {
  const { t, locale } = useTranslation();
  const s = t.home.stats;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-zinc-950 text-white">
      <img src={bgImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
      <div className="absolute inset-0 bg-zinc-950/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(224,195,73,0.08),transparent_70%)] pointer-events-none" />

      <div className="container max-w-6xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-14 text-white"
        >
          {s.title1} <span className="text-gradient-gold">{s.title2}</span>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-14">
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="flex flex-col items-center text-center bg-zinc-900/80 border border-white/15 rounded-3xl px-4 py-7 backdrop-blur-md shadow-xl shadow-black/50"
              >
                <Icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <p className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white leading-tight">{item.title}</p>
                <p className="font-body text-sm text-zinc-300 mt-1.5">{item.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            to={quotePath(locale)}
            className="inline-flex items-center gap-3 bg-primary text-zinc-900 px-8 py-4 rounded-xl font-display font-extrabold text-base md:text-lg tracking-tight shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-gold)]"
          >
            {s.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsStats;
