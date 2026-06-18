import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent("trigger-contact-bounce"))}
      aria-label="Contact"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl animate-wa-pulse transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
