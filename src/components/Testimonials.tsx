import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t.testimonials.reviews[1].quote,
      author: t.testimonials.reviews[1].author,
    },
    {
      quote: t.testimonials.reviews[2].quote,
      author: t.testimonials.reviews[2].author,
    },
    {
      quote: t.testimonials.reviews[3].quote,
      author: t.testimonials.reviews[3].author,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-4 text-center"
        >
          {t.testimonials.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-5xl tracking-tighter leading-[0.95] mb-4 text-center"
        >
          {t.testimonials.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-body text-foreground/50 text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto mb-16"
        >
          {t.testimonials.desc}
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tItem, i) => (
            <motion.div
              key={tItem.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.12 }}
              className="relative bg-card rounded-2xl p-8 flex flex-col gap-6 border border-transparent hover:border-primary/20 transition-colors duration-300 overflow-hidden"
            >
              {/* Gold top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              {/* Decorative large quote mark */}
              <span
                aria-hidden="true"
                className="absolute -top-2 -left-3 font-display font-bold text-[6rem] leading-none text-primary/8 select-none pointer-events-none"
              >
                "
              </span>

              {/* Quote text */}
              <p className="relative font-body text-foreground/70 text-base leading-relaxed">
                {tItem.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-px bg-primary/60" />
                <span className="font-display font-semibold text-sm tracking-wide text-primary">
                  {tItem.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
