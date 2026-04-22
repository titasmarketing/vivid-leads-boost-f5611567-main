import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n";

const WHATSAPP_URL = "https://wa.me/31687545046?text=Hello%2C%20I%27m%20interested%20in%20your%20services";

const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.info.wa}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl animate-wa-pulse transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
