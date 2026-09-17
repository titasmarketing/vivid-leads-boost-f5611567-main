import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import bannerImg from "@/assets/brand/scaffold-banner.webp";
import { useTranslation } from "@/i18n";
import { quotePath } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;

/** Dark brand band: "Waarom kiezen voor SP Schilders" with checklist + scaffold banner photo. */
const WhyChooseBand = () => {
  const { t, locale } = useTranslation();
  const b = t.home.band;

  return (
    <section className="relative bg-zinc-900 text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(224,195,73,0.14),transparent_60%)] pointer-events-none" />
      <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image with golden frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="lg:col-span-6 relative order-2 lg:order-1"
        >
          <div className="absolute inset-0 -translate-x-3 translate-y-3 md:-translate-x-4 md:translate-y-4 rounded-[28px] border-2 border-primary/50 pointer-events-none" />
          <div className="relative rounded-[28px] overflow-hidden shadow-[var(--shadow-deep)] aspect-[4/3]">
            <img src={bannerImg} alt="Steiger met SP Schilders banner op een pand in Amsterdam" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        {/* Right Column: Text & Checklist */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-6 order-1 lg:order-2"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] tracking-tighter leading-[1.05] mb-4">
            {b.title}
          </h2>
          <p className="font-body text-white/70 text-base md:text-lg mb-7">{b.sub}</p>
          <ul className="space-y-4 mb-9">
            {b.bullets.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3 font-body text-base md:text-lg text-white/90"
              >
                <CheckCircle2 className="w-6 h-6 text-zinc-900 fill-primary shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <Link
            to={quotePath(locale)}
            className="inline-flex items-center gap-2 bg-primary text-zinc-900 px-7 py-4 rounded-xl font-display font-extrabold text-base tracking-tight shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-gold)]"
          >
            {b.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseBand;
