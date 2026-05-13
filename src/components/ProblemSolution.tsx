import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";
const ease = [0.23, 1, 0.32, 1] as const;

const imagesMap = import.meta.glob('@/assets/Carousel/*.*', { eager: true });
const carouselImages = Object.values(imagesMap).map((mod: any) => mod.default);

const ProblemSolution = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      {/* Subtle background glow to separate from other sections */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.04),transparent_70%)] pointer-events-none" />
      <div className="container max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top: Centralized Text Content */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6"
        >
          {t.problem.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8 max-w-3xl"
        >
          <span className="block mb-2">{t.problem.title1}</span>
          <span className="block text-gradient-gold">{t.problem.title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-6 max-w-2xl"
        >
          {t.problem.desc1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
        >
          {t.problem.desc2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mb-16"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-base tracking-tight shadow-lg shadow-primary/20"
          >
            <MessageCircle className="w-5 h-5" />
            {t.problem.btn}
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom: Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className="container relative max-w-[1400px] mx-auto px-4"
      >
        <div className="relative">
          {/* Left Shadow/Blur */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 flex">
              {carouselImages.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group">
                    <img
                      src={src as string}
                      alt={`SP Schilders project photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Right Shadow/Blur */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
};

export default ProblemSolution;
