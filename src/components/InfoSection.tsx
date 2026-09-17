import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import timelapseVideo from "@/assets/timelapse.mp4";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

interface InfoBlockProps {
  title1: string;
  titleHl: string;
  title2: string;
  intro: string;
  more: string;
  readMore: string;
  readLess: string;
  delay?: number;
}

const InfoBlock = ({ title1, titleHl, title2, intro, more, readMore, readLess, delay = 0 }: InfoBlockProps) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay }}
    >
      <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-4">
        {title1} <span className="hl-gold">{titleHl}</span> {title2}
      </h2>
      <p className="font-body text-zinc-600 text-base md:text-lg leading-relaxed">{intro}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="font-body text-zinc-600 text-base md:text-lg leading-relaxed overflow-hidden pt-4"
          >
            {more}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 font-display font-bold text-sm text-zinc-900 border-b-2 border-primary pb-0.5 hover:text-amber-600 transition-colors"
      >
        {open ? readLess : readMore}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </motion.div>
  );
};

/** "Wat kost een vakschilder?" / "Wat doet SP Schilders?" with expandable copy + painter portrait. */
const InfoSection = () => {
  const { t } = useTranslation();
  const info = t.home.info;

  return (
    <section className="bg-white text-zinc-900 py-16 md:py-24 overflow-hidden">
      <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-12">
          <InfoBlock {...info.cost} readMore={info.readMore} readLess={info.readLess} />
          <InfoBlock {...info.what} readMore={info.readMore} readLess={info.readLess} delay={0.1} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-[32px] bg-primary/30" />
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-zinc-200 aspect-[4/5] bg-zinc-900">
            <video
              src={timelapseVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;
