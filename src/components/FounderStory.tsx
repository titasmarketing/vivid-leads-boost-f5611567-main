import { motion } from "framer-motion";
import bgImg from "@/assets/Amsterdam_canal_district_sunset_…_202605122332.jpeg";
import timelapseVideo from "@/assets/timelapse.mp4";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

interface FounderStoryProps {
  content?: any;
}

const FounderStory = ({ content }: FounderStoryProps = {}) => {
  const { t } = useTranslation();
  const data = content || t.founder;
  return (
    <section id="about" className="relative section-padding overflow-hidden">
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
              {data.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8"
            >
              {data.title1}
              <br />
              <span className="text-gradient-gold">{data.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6"
            >
              {data.desc1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6"
            >
              {data.desc2}
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
                {data.name}
              </span>
            </motion.div>
          </div>

          {/* Right: Timelapse Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="flex justify-center lg:justify-end w-full"
          >
            <div className="relative w-full max-w-[480px] aspect-video lg:aspect-square bg-secondary/30 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <video
                src={timelapseVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
