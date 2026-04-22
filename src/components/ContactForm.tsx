import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useTranslation } from "@/i18n";

const WHATSAPP_URL = "https://wa.me/31687545046?text=Hello%2C%20I%27m%20interested%20in%20your%20services";
const WEBHOOK_URL = "https://hook.eu1.make.com/oafy4ddxvh1kjshlv2h1ok5rzw9widm9";
const ease = [0.23, 1, 0.32, 1] as const;

const ContactForm = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    // Fire webhook (non-blocking — form submits regardless of response)
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, service, message }),
    }).catch(() => {});

    const waText = encodeURIComponent(
      `Hello! My name is ${name}. Email: ${email}. Phone: ${phone}. I'm interested in: ${service}. ${message}`
    );
    window.open(`https://wa.me/31687545046?text=${waText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-6"
            >
              {t.contact.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-8"
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
              className="font-body text-foreground/60 text-base md:text-lg leading-relaxed mb-10"
            >
              {t.contact.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="space-y-5"
            >
              <a href="tel:+31687545046" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.contact.info.phone}</p>
                  <p className="font-body text-foreground/60 text-sm">+31 6 87545046</p>
                </div>
              </a>

              <a href="mailto:spschilders@outlook.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.contact.info.email}</p>
                  <p className="font-body text-foreground/60 text-sm">spschilders@outlook.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.contact.info.location}</p>
                  <p className="font-body text-foreground/60 text-sm">{t.contact.info.locValue}</p>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group mt-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-primary">{t.contact.info.wa}</p>
                  <p className="font-body text-foreground/60 text-sm">{t.contact.info.waDesc}</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-card rounded-2xl p-8 md:p-12 border border-border flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{t.contact.form.successTitle}</h3>
                <p className="font-body text-foreground/60">{t.contact.form.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 md:p-12 border border-border space-y-6">
                <div>
                  <label htmlFor="name" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {t.contact.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={t.contact.form.namePlace}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block font-display font-semibold text-sm mb-2 text-foreground">
                      {t.contact.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder={t.contact.form.emailPlace}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-display font-semibold text-sm mb-2 text-foreground">
                      {t.contact.form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder={t.contact.form.phonePlace}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {t.contact.form.serviceLabel}
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                  >
                    <option value="">{t.contact.form.serviceEmpty}</option>
                    <option value="Painting">{t.services.items.painting.title}</option>
                    <option value="Exterior Painting">{t.services.items.exterior.title}</option>
                    <option value="Interior Painting">{t.services.items.interior.title}</option>
                    <option value="Spray Painting">{t.services.items.spray.title}</option>
                    <option value="Other">{t.contact.form.serviceOther}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-display font-semibold text-sm mb-2 text-foreground">
                    {t.contact.form.msgLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t.contact.form.msgPlace}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-gold)]"
                >
                  <Send className="w-4 h-4" />
                  {t.contact.form.btn}
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
