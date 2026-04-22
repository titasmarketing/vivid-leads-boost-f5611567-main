import logo from "@/assets/sp-schilders-logo.png";
import { useTranslation } from "@/i18n";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 bg-secondary border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logo} alt="SP Schilders" className="h-10 w-auto" />
          <p className="font-body text-foreground/40 text-sm text-center">
            {t.footer.desc}
          </p>
          <p className="font-body text-foreground/40 text-sm">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
