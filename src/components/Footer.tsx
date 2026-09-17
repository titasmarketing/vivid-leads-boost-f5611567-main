import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/sp-schilders-logo.png";
import { useTranslation } from "@/i18n";
import { ADDRESS_LINE1, ADDRESS_LINE2, EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, localePath, quotePath } from "@/lib/links";

const Footer = () => {
  const { t, locale } = useTranslation();
  const f = t.footerExtra;

  const links = [
    { label: t.nav.links.home, to: localePath(locale, "/") },
    { label: t.services.items.interior.title, to: localePath(locale, "/binnenschilder") },
    { label: t.nav.links.contact, to: localePath(locale, "/contact") },
    { label: f.quoteLink, to: quotePath(locale) },
  ];

  return (
    <footer className="bg-background relative overflow-hidden border-t border-white/[0.05]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container py-14 md:py-20 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <div>
          <img src={logo} alt="SP Schilders" className="h-16 md:h-20 w-auto mb-4 drop-shadow-lg" />
          <p className="font-display font-bold text-base tracking-tight text-foreground uppercase">SP Schilders</p>
          <p className="font-body text-foreground/50 text-sm italic mb-4">{t.footer.tagline}</p>
          <p className="font-body text-foreground/60 text-sm leading-relaxed max-w-xs">{f.about}</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-widest text-primary mb-4">{f.hours}</h3>
          <div className="flex items-start gap-3 text-foreground/70 font-body text-sm">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p>{f.hoursValue}</p>
              <p>{f.hoursTime}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-widest text-primary mb-4">{f.contact}</h3>
          <ul className="space-y-3 font-body text-sm text-foreground/70">
            <li>
              <a href={PHONE_TEL} className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary shrink-0" />{PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0" />{EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{ADDRESS_LINE1}<br />{ADDRESS_LINE2}</span>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-full bg-[#25D366] text-white font-display font-bold text-xs hover:bg-[#20ba5a] transition-colors"
              >
                WhatsApp &rarr;
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-widest text-primary mb-4">Menu</h3>
          <ul className="space-y-2.5 font-body text-sm text-foreground/70">
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.05] relative z-10 bg-black/20">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-foreground/40 text-xs">{t.footer.rights}</p>
          <p className="font-body text-foreground/40 text-xs">{t.footer.kvk}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
