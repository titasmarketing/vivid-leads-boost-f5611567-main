import { MapPin } from "lucide-react";
import logo from "@/assets/sp-schilders-logo.png";
import { useTranslation } from "@/i18n";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#3d3d38] border-t border-white/8">
      <div className="container py-14 md:py-20">
        <div className="flex flex-col items-center text-center gap-5">
          {/* Logo — prominent */}
          <img
            src={logo}
            alt="SP Schilders"
            className="h-20 md:h-28 w-auto mb-2"
          />

          {/* Company name + tagline */}
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-white uppercase">
              SP Schilders
            </h3>
            <p className="font-body text-white/50 text-sm md:text-base italic mt-1">
              {t.footer.tagline}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/50">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="font-body text-sm">{t.footer.location}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <p className="font-body text-white/35 text-xs">
            {t.footer.rights}
          </p>
          <p className="font-body text-white/35 text-xs">
            {t.footer.kvk}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
