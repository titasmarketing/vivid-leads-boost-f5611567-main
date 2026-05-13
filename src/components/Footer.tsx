import { MapPin } from "lucide-react";
import logo from "@/assets/sp-schilders-logo.png";
import { useTranslation } from "@/i18n";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background relative overflow-hidden border-t border-white/[0.03]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[100px] bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.05),transparent_70%)] pointer-events-none" />

      <div className="container py-14 md:py-20 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo — prominent with subtle shadow */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={logo}
              alt="SP Schilders"
              className="relative h-20 md:h-28 w-auto mb-2 drop-shadow-lg"
            />
          </div>

          {/* Company name + tagline */}
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground uppercase">
              SP Schilders
            </h3>
            <p className="font-body text-foreground/50 text-sm md:text-base italic mt-1">
              {t.footer.tagline}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-primary mt-2">
            <MapPin className="w-5 h-5 shrink-0" />
            <span className="font-body text-sm text-foreground/70">{t.footer.location}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.03] relative z-10 bg-black/20">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-foreground/40 text-xs">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <p className="font-body text-foreground/40 text-xs">
              {t.footer.kvk}
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
