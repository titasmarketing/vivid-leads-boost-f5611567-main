import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Maximize2 } from "lucide-react";
import { useTranslation } from "@/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import ImageLightbox from "@/components/ImageLightbox";

import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";
const ease = [0.23, 1, 0.32, 1] as const;

const imagesMap = import.meta.glob('@/assets/Carousel/*.*', { eager: true });
const carouselImages = Object.values(imagesMap).map((mod: any) => mod.default);

interface ProblemSolutionProps {
  content?: any;
  hideCarousel?: boolean;
}

const ProblemSolution = ({ content, hideCarousel = false }: ProblemSolutionProps) => {
  const { t, locale } = useTranslation();
  const data = content || t.problem;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <section className="section-padding relative overflow-hidden bg-white text-zinc-900">
      {/* Subtle background glow to separate from other sections */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.06),transparent_70%)] pointer-events-none" />
      <div className="container max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top: Centralized Text Content */}
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
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8 max-w-3xl text-zinc-900"
        >
          <span className="block mb-2 text-zinc-900">{data.title1}</span>
          <span className="block text-gradient-gold">{data.title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-body text-zinc-600 text-base md:text-lg leading-relaxed mb-6 max-w-2xl"
        >
          {data.desc1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="font-body text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
        >
          {data.desc2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mb-16"
        >
          <Link
            to={locale === "en" ? "/en/contact" : "/contact"}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-base tracking-tight shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105"
          >
            {data.btn}
          </Link>
        </motion.div>
      </div>

      {/* Bottom: Carousel */}
      {!hideCarousel && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="w-full max-w-[1800px] mx-auto px-4 md:px-8 relative"
        >
          <div className="relative">
            {/* Left Shadow/Blur */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-44 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              plugins={[
                AutoScroll({
                  playOnInit: true,
                  speed: 1.2,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-6 flex">
                {carouselImages.map((src, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-6 basis-[85%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3 xl:basis-[30%] 2xl:basis-1/4"
                  >
                    <div 
                      onClick={() => setSelectedImageIndex(index)}
                      className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 group cursor-pointer"
                    >
                      <img
                        src={src as string}
                        alt={`SP Schilders project photo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 backdrop-blur-sm border border-white/20 shadow-lg">
                          <Maximize2 className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Right Shadow/Blur */}
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-44 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      )}

      {/* Lightbox for Fullscreen Image View */}
      <ImageLightbox
        images={carouselImages as string[]}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onSelectIndex={setSelectedImageIndex}
      />
    </section>
  );
};

export default ProblemSolution;
