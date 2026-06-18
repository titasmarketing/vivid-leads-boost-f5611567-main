import { motion } from "framer-motion";
import { MoveRight, PhoneCall, ArrowLeft, ShieldCheck, FolderCheck, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

// Assets
import heroBgImg from "@/assets/hero-interior.jpg";
import logo from "@/assets/sp-schilders-logo.png";

const imagesMap = import.meta.glob('@/assets/Carousel/*.*', { eager: true });
const carouselImages = Object.keys(imagesMap)
  .filter(key => {
    const filename = key.split('/').pop() || '';
    return !['unnamed (4).webp', 'unnamed (6).webp', 'unnamed (9).webp', 'unnamed.webp'].includes(filename);
  })
  .map(key => (imagesMap[key] as any).default);

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";

interface BinnenschilderHeroProps {
  content: {
    subtitle: string;
    title1: string;
    title2: string;
    description: string;
    btnHome: string;
    btnWhatsApp: string;
  };
  lang?: "en" | "nl";
}

const BinnenschilderHero = ({ content, lang = "nl" }: BinnenschilderHeroProps) => {
  const navigate = useNavigate();

  const trustTags = [
    { icon: ShieldCheck, label: "4 Jaar Garantie" },
    { icon: FolderCheck, label: "200+ Projecten" },
    { icon: Droplets, label: "Sikkens Premium Verf" },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center bg-background overflow-hidden">
      {/* Imagem de Fundo com Sobreposição Forte para Contraste */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImg}
          alt="Interior background"
          className="w-full h-full object-cover"
        />
        {/* Sobreposição mais forte conforme solicitado */}
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Nav bar com o Logo Centralizado e Maior, clicável para ir para a Home */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center py-8">
        <button
          onClick={() => navigate(lang === "en" ? "/en" : "/")}
          className="transition-transform duration-300 hover:scale-105 focus:outline-none"
          aria-label="Terug naar home"
        >
          <img src={logo} alt="SP Schilders logo" className="h-14 md:h-20 w-auto drop-shadow-lg" />
        </button>
      </nav>

      {/* Conteúdo Principal baseado no prompt do usuário */}
      <div className="relative z-10 w-full py-20 lg:py-40 mt-12 md:mt-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:gap-16 items-center lg:grid-cols-2">
            
            {/* Coluna Esquerda: Textos e Botões */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex gap-6 flex-col"
            >
              <div className="flex justify-center lg:justify-start">
                <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-widest bg-primary/10 text-center">
                  <span className="block lg:hidden">
                    {lang === "en" ? "WHY CHOOSE OUR INTERIOR PAINTING?" : "WAAROM KIEZEN VOOR ONS BINNENSCHILDERWERK?"}
                  </span>
                  <span className="hidden lg:block">{content.subtitle}</span>
                </Badge>
              </div>
              <div className="flex gap-4 flex-col">
                <h1 className="text-5xl md:text-6xl lg:text-7xl max-w-lg tracking-tighter text-left font-display font-bold text-white leading-[1.1]">
                  {content.title1}{" "}
                  <span className="text-primary">{content.title2}</span>
                </h1>
                <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/70 max-w-md text-left font-body">
                  {content.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button 
                  asChild
                  size="lg" 
                  className="gap-4 text-primary-foreground font-bold"
                  onClick={() => window.dispatchEvent(new CustomEvent("trigger-contact-bounce"))}
                >
                  <a href="#contact">
                    {content.btnWhatsApp} <PhoneCall className="w-4 h-4" />
                  </a>
                </Button>
                {/* Segundo botão pode ser para navegar para depoimentos ou ver serviços */}
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-4 bg-transparent text-white border-white/20 hover:bg-white/10"
                  onClick={() => {
                    const section = document.getElementById("contact");
                    section?.scrollIntoView({ behavior: "smooth" });
                    window.dispatchEvent(new CustomEvent("trigger-contact-bounce"));
                  }}
                >
                  {lang === "en" ? "Contact Us" : "Neem Contact Op"} <MoveRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Trust Tags */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {trustTags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2"
                  >
                    <tag.icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-display font-semibold text-xs md:text-sm text-white/90 tracking-tight">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Coluna Direita: Carrossel de fotos (uma por vez) com fade nas bordas, ajustado e centralizado */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[460px] mx-auto overflow-hidden py-4"
            >
              <div className="relative w-full">
                {/* Efeito de fade nas bordas */}
                <div className="absolute left-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-r from-background via-background/25 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-l from-background via-background/25 to-transparent pointer-events-none" />

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
                  <CarouselContent className="-ml-0 flex">
                    {carouselImages.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-0 basis-full"
                      >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-white/10 group mx-auto max-w-[400px] lg:max-w-none">
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
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default BinnenschilderHero;
