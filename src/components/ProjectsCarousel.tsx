import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ImageLightbox from "@/components/ImageLightbox";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const imagesMap = import.meta.glob("@/assets/Carousel/*.*", { eager: true });
const projectImages = Object.values(imagesMap).map((mod) => (mod as { default: string }).default);

/** Auto-scrolling carousel of real SP Schilders project photos with lightbox. */
const ProjectsCarousel = () => {
  const { t } = useTranslation();
  const p = t.home.projects;
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="bg-slate-50 text-zinc-900 border-y border-slate-200/70 py-16 md:py-24 overflow-hidden">
      <div className="container max-w-4xl text-center mb-10 md:mb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display font-bold text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3"
        >
          {p.subtitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-4"
        >
          {p.title1} <span className="hl-gold">{p.title2}</span>
        </motion.h2>
        <p className="font-body text-zinc-500 text-base md:text-lg">{p.desc}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        className="w-full max-w-[1800px] mx-auto px-4 md:px-8 relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1.1, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-5 flex">
            {projectImages.map((src, index) => (
              <CarouselItem key={src} className="pl-5 basis-[80%] sm:basis-[55%] md:basis-[45%] lg:basis-1/3 xl:basis-[28%] 2xl:basis-1/4">
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-label={`Project ${index + 1}`}
                  className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 group cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-primary/40"
                >
                  <img
                    src={src}
                    alt={`SP Schilders project ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 backdrop-blur-sm border border-white/20">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
      </motion.div>

      <ImageLightbox images={projectImages} selectedIndex={selected} onClose={() => setSelected(null)} onSelectIndex={setSelected} />
    </section>
  );
};

export default ProjectsCarousel;
