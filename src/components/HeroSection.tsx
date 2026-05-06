import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, ShieldCheck, FolderCheck, Droplets } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import logo from "@/assets/sp-schilders-logo.png";
import { useTranslation } from "@/i18n";
import { useNavigate } from "react-router-dom";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";

const ease = [0.23, 1, 0.32, 1] as const;

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const trustTags = [
    { icon: ShieldCheck, label: "4 Jaar Garantie" },
    { icon: FolderCheck, label: "200+ Projecten" },
    { icon: Droplets, label: "Sikkens Premium Verf" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Luxury Amsterdam interior with fresh paint"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Nav bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <img src={logo} alt="SP Schilders logo" className="h-12 md:h-16 w-auto" />
        
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 font-display text-base font-semibold tracking-wide text-foreground/80 bg-background/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <button 
              onClick={() => navigate('/en')} 
              className="hover:text-primary transition-colors flex items-center gap-1.5 focus:outline-none focus:text-primary"
            >
              🇬🇧 <span className="hidden sm:inline">UK</span>
            </button>
            <span className="text-foreground/30 font-light">|</span>
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-primary transition-colors flex items-center gap-1.5 focus:outline-none focus:text-primary"
            >
              🇳🇱 <span className="hidden sm:inline">NL</span>
            </button>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-bold text-sm tracking-tight transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            {t.hero.btnHeader}
          </a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 container text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="text-primary font-display font-semibold text-sm md:text-base tracking-widest uppercase mb-6 drop-shadow-sm"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-6 drop-shadow-md"
        >
          {t.hero.title1}
          <br />
          <span className="text-gradient-gold">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="font-body text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-sm font-medium"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-gold)]"
          >
            <MessageCircle className="w-5 h-5" />
            {t.hero.btnWhatsApp}
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg font-display font-semibold text-base tracking-tight transition-all duration-300 hover:border-foreground/60 bg-background/5 hover:bg-background/20 backdrop-blur-sm"
          >
            {t.hero.btnServices}
          </a>
        </motion.div>

        {/* Trust Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-8"
        >
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
