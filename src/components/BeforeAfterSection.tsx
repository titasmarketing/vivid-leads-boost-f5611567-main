import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeftRight } from "lucide-react";
import { useTranslation } from "@/i18n";

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  Replace these two imports with your actual before/after project photos.
//     Add the images to src/assets/ and update the paths below.
// ─────────────────────────────────────────────────────────────────────────────
import beforeImg from "@/assets/before-renovation.png";
import afterImg from "@/assets/after-renovation.png";

const WHATSAPP_URL =
  "https://wa.me/31687545046?text=Hello%2C%20I%27m%20interested%20in%20your%20services";
const ease = [0.23, 1, 0.32, 1] as const;

// ── Interactive before/after slider ──────────────────────────────────────────
const Slider = () => {
  const { t } = useTranslation();
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none cursor-col-resize"
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) move(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
    >
      {/* ── After image — base layer ── */}
      <img
        src={afterImg}
        alt="After renovation"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* ── Before image — clipped to left of slider ── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Before renovation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* ── Divider line ── */}
      <div
        className="absolute inset-y-0 w-px bg-primary/90 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.65)] border-2 border-white/15 transition-transform duration-100 active:scale-110">
          <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>

      {/* ── Corner labels ── */}
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground/80 text-xs font-display font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg pointer-events-none border border-white/10">
        {t.beforeafter.before}
      </div>
      <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-display font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg pointer-events-none">
        {t.beforeafter.after}
      </div>

      {/* ── Drag hint — fades after first interaction ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: touched ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-foreground/50 text-xs font-body tracking-wide pointer-events-none whitespace-nowrap"
      >
        <span>{t.beforeafter.drag}</span>
      </motion.div>
    </div>
  );
};

// ── Full section ──────────────────────────────────────────────────────────────
const BeforeAfterSection = () => {
  const { t } = useTranslation();
  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — slider widget */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            <Slider />
          </motion.div>

          {/* Right — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6"
            >
              {t.beforeafter.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8"
            >
              {t.beforeafter.title1}
              <br />
              <span className="text-gradient-gold">{t.beforeafter.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-6"
            >
              {t.beforeafter.desc1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-8"
            >
              {t.beforeafter.desc2}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-10 font-semibold"
            >
              {t.beforeafter.desc3}
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
              className="inline-flex items-center justify-center text-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-base tracking-tight hover:shadow-[var(--shadow-gold)] transition-shadow duration-300"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{t.beforeafter.btn}</span>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
