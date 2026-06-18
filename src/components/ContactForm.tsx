import { motion } from "framer-motion";
import { useState, useEffect, type FormEvent } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useTranslation } from "@/i18n";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";
const WEBHOOK_URL = "https://hook.eu1.make.com/oafy4ddxvh1kjshlv2h1ok5rzw9widm9";
const ease = [0.23, 1, 0.32, 1] as const;

interface ContactFormProps {
  content?: any;
}

const ContactForm = ({ content }: ContactFormProps = {}) => {
  const { t, locale } = useTranslation();
  const { toast } = useToast();
  const data = content || t.contact;
  const infoText = data.info || t.contact.info;
  const formText = data.form || t.contact.form;
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    const handleBounce = () => {
      setShouldBounce(true);
      setTimeout(() => setShouldBounce(false), 800);
    };

    window.addEventListener("trigger-contact-bounce", handleBounce);
    return () => window.removeEventListener("trigger-contact-bounce", handleBounce);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("spschilders@outlook.com");
    setCopied(true);
    const isNl = locale === "nl";
    toast({
      title: isNl ? "E-mail gekopieerd!" : "Email copied!",
      description: isNl 
        ? "spschilders@outlook.com is gekopieerd naar het klembord." 
        : "spschilders@outlook.com has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    // Fire webhook (non-blocking — form submits regardless of response)
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, service, message }),
    }).catch(() => {});

    const waText = encodeURIComponent(
      `Hello! My name is ${name}. Phone: ${phone}. I'm interested in: ${service}. ${message}`
    );
    window.open(`https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/56a2411b-16a7-4389-9c1e-985497266eaa?text=${waText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6"
            >
              {data.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8"
            >
              {data.title1}
              <br />
              <span className="text-gradient-gold">{data.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-10"
            >
              {data.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="space-y-4"
            >
              {/* 1. Email (Botão de copiar) */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-4 p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300 w-full text-left group focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground">{infoText.email}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <p className="font-body text-foreground/60 text-sm truncate">spschilders@outlook.com</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all duration-300 flex-shrink-0 ${
                      copied 
                        ? "bg-green-500/10 border-green-500/30 text-green-500" 
                        : "bg-primary/10 border-primary/20 text-primary"
                    }`}>
                      {copied 
                        ? (locale === 'nl' ? 'Gekopieerd!' : 'Copied!') 
                        : (locale === 'nl' ? 'Klik om te kopiëren' : 'Click to copy')
                      }
                    </span>
                  </div>
                </div>
              </button>

              {/* 2. WhatsApp (Botão interativo com link e ícone real) */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300 w-full text-left group focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  {/* Ícone real do WhatsApp */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-primary transition-transform group-hover:scale-110">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-primary">{infoText.wa}</p>
                  <p className="font-body text-foreground/60 text-sm">{infoText.waDesc}</p>
                </div>
              </a>

              {/* 3. Telefone (Mantido original) */}
              <a href="tel:+31687545046" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{infoText.phone}</p>
                  <p className="font-body text-foreground/60 text-sm">+31 6 87545046</p>
                </div>
              </a>

              {/* 4. Localização (Mantido original) */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{infoText.location}</p>
                  <p className="font-body text-foreground/60 text-sm">{infoText.locValue}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            animate={shouldBounce ? { 
              y: [0, -18, 0, -8, 0],
              transition: { duration: 0.8, ease: "easeInOut" }
            } : {}}
          >
            {submitted ? (
              <div className="bg-card rounded-2xl p-8 md:p-12 border border-border flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{formText.successTitle}</h3>
                <p className="font-body text-foreground/60">{formText.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 md:p-12 border border-border space-y-6">
                <div>
                  <label htmlFor="name" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {formText.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={formText.namePlace}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {formText.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder={formText.phonePlace}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {formText.serviceLabel}
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                  >
                    <option value="">{formText.serviceEmpty}</option>
                    <option value="Painting">{t.services.items.painting.title}</option>
                    <option value="Exterior Painting">{t.services.items.exterior.title}</option>
                    <option value="Interior Painting">{t.services.items.interior.title}</option>
                    <option value="Spray Painting">{t.services.items.spray.title}</option>
                    <option value="Other">{formText.serviceOther}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {formText.msgLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={formText.msgPlace}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-gold)]"
                >
                  <Send className="w-4 h-4" />
                  {formText.btn}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
