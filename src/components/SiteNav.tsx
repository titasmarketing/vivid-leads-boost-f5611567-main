import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FolderCheck, Menu, Phone, ShieldCheck, X } from "lucide-react";
import logo from "@/assets/sp-schilders-logo.png";
import { useTranslation } from "@/i18n";
import { localePath, quotePath, PHONE_DISPLAY, PHONE_TEL } from "@/lib/links";

interface SiteNavProps {
  /** "minimal" hides the section links (used on the quote page). */
  variant?: "full" | "minimal";
}

const SiteNav = ({ variant = "full" }: SiteNavProps) => {
  const { t, locale } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const toEn = stripped === "/" ? "/en" : `/en${stripped}`;
  const toNl = stripped;
  const home = localePath(locale, "/");
  const quote = quotePath(locale);

  const links = [
    { label: t.nav.links.home, to: home },
    { label: t.nav.links.services, to: `${home}#services` },
    { label: t.nav.links.projects, to: `${home}#projects` },
    { label: t.nav.links.about, to: `${home}#about` },
    { label: t.nav.links.contact, to: localePath(locale, "/contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="bg-background/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between gap-4">
        <Link to={home} className="flex-shrink-0" aria-label="SP Schilders home">
          <img src={logo} alt="SP Schilders logo" className="h-10 md:h-12 w-auto" />
        </Link>

        {variant === "full" ? (
          <div className="hidden lg:flex items-center gap-7 font-display font-semibold text-sm tracking-wide text-foreground/70">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6 font-display text-xs font-semibold text-foreground/60">
            <span className="flex items-center gap-1.5"><FolderCheck className="w-4 h-4 text-primary" />{t.nav.trust1}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" />{t.nav.trust2}</span>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 font-display text-xs font-semibold tracking-wide text-foreground/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => navigate(toEn)}
              className={`hover:text-primary transition-colors focus:outline-none ${locale === "en" ? "text-primary" : ""}`}
            >
              🇬🇧 EN
            </button>
            <span className="text-foreground/30 font-light">|</span>
            <button
              type="button"
              onClick={() => navigate(toNl)}
              className={`hover:text-primary transition-colors focus:outline-none ${locale === "nl" ? "text-primary" : ""}`}
            >
              🇳🇱 NL
            </button>
          </div>

          <a
            href={PHONE_TEL}
            className="hidden xl:flex items-center gap-2 font-display font-semibold text-sm text-foreground/80 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            {PHONE_DISPLAY}
          </a>

          <Link
            to={quote}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-5 py-2.5 rounded-lg font-display font-bold text-sm tracking-tight transition-transform duration-300 hover:scale-105"
          >
            <span className="hidden sm:inline">{t.nav.cta}</span>
            <span className="sm:hidden">{t.nav.ctaShort}</span>
          </Link>

          {variant === "full" && (
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-foreground/80"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {open && variant === "full" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 font-display font-semibold text-base text-foreground/80 hover:text-primary border-b border-white/5 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-3 sm:hidden">
              <button type="button" onClick={() => { setOpen(false); navigate(toEn); }} className={`font-display text-sm font-semibold ${locale === "en" ? "text-primary" : "text-foreground/70"}`}>🇬🇧 EN</button>
              <button type="button" onClick={() => { setOpen(false); navigate(toNl); }} className={`font-display text-sm font-semibold ${locale === "nl" ? "text-primary" : "text-foreground/70"}`}>🇳🇱 NL</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteNav;
