import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Droplets, FolderCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/brand/hero-painter-van.webp";
import { useTranslation } from "@/i18n";
import { quotePath } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;
const tagIcons = [ShieldCheck, FolderCheck, Droplets];

const HeroSection = () => {
  const { t, locale } = useTranslation();
  const h = t.home.hero;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background pt-24 md:pt-28 pb-14">
      <img
        src={heroImg}
        alt="SP Schilders vakschilder bij de bedrijfsbus in Amsterdam"
        className="absolute inset-0 w-full h-full object-cover object-[68%_center] md:object-[60%_center]"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 md:p-10 max-w-[580px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-display font-bold uppercase tracking-[0.18em] text-zinc-500 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {h.kicker}
          </p>

          <h1 className="font-display font-extrabold text-[2rem] sm:text-4xl md:text-[2.9rem] leading-[1.05] tracking-tighter text-zinc-900">
            {h.title1}{" "}
            <span className="bg-primary text-zinc-900 px-2 rounded-lg box-decoration-clone">{h.titleHighlight}</span>{" "}
            {h.title2}
          </h1>

          <ul className="mt-6 space-y-3">
            {h.bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.12 }}
                className="flex items-start gap-3 font-body text-sm sm:text-base text-zinc-700"
              >
                <CheckCircle2 className="w-5 h-5 text-zinc-900 fill-primary shrink-0 mt-0.5" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            to={quotePath(locale)}
            className="mt-7 flex items-center justify-center gap-2 w-full bg-primary text-zinc-900 px-6 py-4 rounded-xl font-display font-extrabold text-base sm:text-lg tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-gold)] shadow-lg shadow-primary/30"
          >
            {h.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-center font-body text-xs text-zinc-500">{h.note}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1 }}
          className="flex flex-wrap gap-3 mt-6 max-w-[580px]"
        >
          {h.tags.map((label, i) => {
            const Icon = tagIcons[i % tagIcons.length];
            return (
              <div key={label} className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-4 py-2">
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="font-display font-semibold text-xs text-white/90 tracking-tight">{label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
