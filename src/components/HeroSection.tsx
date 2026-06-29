import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, ShieldCheck, FolderCheck, Droplets } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import logo from "@/assets/sp-schilders-logo.png";
import timelapseVideo from "@/assets/timelapse.mp4";
import { useTranslation } from "@/i18n";
import { useNavigate } from "react-router-dom";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";

const ease = [0.23, 1, 0.32, 1] as const;

const HeroSection = () => {
  const { t, locale } = useTranslation();
  const navigate = useNavigate();

  const trustTags = [
    { icon: ShieldCheck, label: "4 Jaar Garantie" },
    { icon: FolderCheck, label: "200+ Projecten" },
    { icon: Droplets, label: "Sikkens Premium Verf" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background pt-28 md:pt-36 pb-12">
      {/* Background image com overlay */}
      <img
        src={heroImg}
        alt="Luxury Amsterdam interior with fresh paint"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Background radial gold glow behind the 3D painter to make it stand out */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Nav bar / Menu */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-background/85 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="#" className="flex-shrink-0">
          <img src={logo} alt="SP Schilders logo" className="h-10 md:h-14 w-auto" />
        </a>

        {/* Menu Links - inspired by the image, central aligned */}
        <div className="hidden lg:flex items-center gap-8 font-display font-semibold text-sm tracking-wide text-foreground/70">
          <a href="#" className="hover:text-primary transition-colors">{locale === "nl" ? "Home" : "Home"}</a>
          <a href="#services" className="hover:text-primary transition-colors">{locale === "nl" ? "Diensten" : "Services"}</a>
          <a href="#portfolio" className="hover:text-primary transition-colors">{locale === "nl" ? "Portfolio" : "Portfolio"}</a>
          <a href="#about" className="hover:text-primary transition-colors">{locale === "nl" ? "Over Ons" : "About Us"}</a>
          <a href="#contact" className="hover:text-primary transition-colors">{locale === "nl" ? "Contact" : "Contact"}</a>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Switcher - DO NOT CHANGE FUNCTIONALITY */}
          <div className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-foreground/80 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <button 
              onClick={() => navigate('/en')} 
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:text-primary"
            >
              🇬🇧 <span className="hidden sm:inline">UK</span>
            </button>
            <span className="text-foreground/30 font-light">|</span>
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:text-primary"
            >
              🇳🇱 <span className="hidden sm:inline">NL</span>
            </button>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-display font-bold text-sm tracking-tight transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.hero.btnHeader}</span>
            <span className="sm:hidden">{locale === "nl" ? "Offerte" : "Quote"}</span>
          </a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="container relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Text */}
          <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              <p className="text-primary font-display font-semibold text-sm md:text-base tracking-widest uppercase mb-4 text-center lg:text-left">
                {t.hero.subtitle}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.4 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-foreground text-center lg:text-left"
            >
              {t.hero.title1}
              <br />
              <span className="text-gradient-gold">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="font-body text-foreground/80 text-base md:text-lg max-w-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full max-w-md mx-auto lg:mx-0 lg:max-w-none"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 md:px-8 md:py-4 rounded-lg font-display font-bold text-sm md:text-base tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-gold)] w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                {t.hero.btnWhatsApp}
              </a>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 border border-foreground/20 text-foreground px-6 py-3.5 md:px-8 md:py-4 rounded-lg font-display font-semibold text-sm md:text-base tracking-tight transition-all duration-300 hover:border-foreground/60 hover:bg-white/5 backdrop-blur-sm w-full sm:w-auto"
              >
                {t.hero.btnServices}
              </a>
            </motion.div>

            {/* Trust Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.0 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4 border-t border-white/5 w-full"
            >
              {trustTags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                >
                  <tag.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-display font-semibold text-xs text-foreground/80 tracking-tight">
                    {tag.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Timelapse Video */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.5 }}
              className="relative w-full aspect-[4/5] max-w-[360px] md:max-w-[400px] h-[450px] md:h-[500px] lg:h-[550px] bg-secondary/30 rounded-[32px] overflow-hidden border border-white/10 shadow-[var(--shadow-deep)]"
            >
              <video
                src={timelapseVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex justify-center pt-8 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
