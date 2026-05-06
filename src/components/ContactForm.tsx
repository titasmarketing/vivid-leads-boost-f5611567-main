import { motion } from "framer-motion";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import { useTranslation } from "@/i18n";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";
const INSTAGRAM_URL = "https://www.instagram.com/sp_schilders/";
const EMAIL_ADDRESS = "spschilders@outlook.com";
const ease = [0.23, 1, 0.32, 1] as const;

const ContactCTA = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container max-w-3xl">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6 text-center"
        >
          {t.contact.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-6 text-center"
        >
          {t.contact.title1}
          <br />
          <span className="text-gradient-gold">{t.contact.title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-12 text-center max-w-xl mx-auto"
        >
          {t.contact.desc}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Row 1: WhatsApp — full width */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white px-8 py-5 rounded-xl font-display font-bold text-lg tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30"
          >
            <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
            {t.contact.btnWhatsApp}
          </a>

          {/* Row 2: Instagram + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white px-6 py-5 rounded-xl font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#833AB4]/30"
            >
              <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
              {t.contact.btnInstagram}
            </a>

            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="group flex items-center justify-center gap-3 bg-card hover:bg-card/80 border border-border text-foreground px-6 py-5 rounded-xl font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30"
            >
              <Mail className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
              {t.contact.btnEmail}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
