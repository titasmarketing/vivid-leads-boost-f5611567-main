import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Star, Send, MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n";

const WEBHOOK_URL = "https://hook.eu1.make.com/oafy4ddxvh1kjshlv2h1ok5rzw9widm9";
const ease = [0.23, 1, 0.32, 1] as const;

interface TestimonialsProps {
  content?: any;
}

const Testimonials = ({ content }: TestimonialsProps = {}) => {
  const { t, locale } = useTranslation();
  const formText = t.contact.form;
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const scriptSrc = "https://cdn.featurable.com/widget/v2/embed.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.defer = true;
      script.setAttribute("charset", "UTF-8");
      document.body.appendChild(script);
    } else {
      const script = document.createElement("script");
      script.src = `${scriptSrc}?v=${Date.now()}`;
      script.defer = true;
      script.setAttribute("charset", "UTF-8");
      document.body.appendChild(script);
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (!input) {
      setPhone("");
      return;
    }

    if (input === "+" || input === "+3" || input === "+31" || input === "+31 ") {
      setPhone("");
      return;
    }

    if (!input.startsWith("+31")) {
      const digits = input.replace(/\D/g, "");
      if (!digits) {
        setPhone("");
        return;
      }
      if (digits.startsWith("31")) {
        input = "+31 " + digits.slice(2);
      } else {
        input = "+31 " + digits;
      }
    }

    const countryCode = "+31";
    let localPart = input.slice(countryCode.length);
    localPart = localPart.replace(/\D/g, "");

    if (localPart.length > 9) {
      localPart = localPart.slice(0, 9);
    }

    let formatted = countryCode;

    if (localPart.length > 0) {
      const firstDigit = localPart[0];
      if (firstDigit === "6") {
        formatted += " " + firstDigit;
        if (localPart.length > 1) {
          formatted += " " + localPart.slice(1, 5);
        }
        if (localPart.length > 5) {
          formatted += " " + localPart.slice(5, 9);
        }
      } else {
        if (localPart.length <= 2) {
          formatted += " " + localPart;
        } else if (localPart.length <= 5) {
          formatted += " " + localPart.slice(0, 2) + " " + localPart.slice(2);
        } else {
          formatted += " " + localPart.slice(0, 2) + " " + localPart.slice(2, 5) + " " + localPart.slice(5, 9);
        }
      }
    } else {
      formatted += " ";
    }

    setPhone(formatted);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phoneVal = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: phoneVal, service, message }),
    }).catch(() => {});

    const waText = encodeURIComponent(
      `Hello! My name is ${name}. Phone: ${phoneVal}. I'm interested in: ${service}. ${message}`
    );
    window.open(`https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/56a2411b-16a7-4389-9c1e-985497266eaa?text=${waText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50 text-zinc-900 border-y border-slate-200/70 relative z-20">
      <div className="container max-w-[1750px] mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-10 items-start">

          {/* Left Column: Featurable Google Reviews Widget (65% Width on Desktop, Second on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="w-full lg:w-[65%] bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200/80 flex flex-col overflow-hidden h-full"
          >
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-slate-800 tracking-tight mb-2">
                Onze klanten waarderen ons met:
              </h3>
              <div className="flex justify-center items-center gap-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 md:w-8 md:h-8 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Featurable Google Reviews Widget Container */}
            <div
              id="featurable-21cdbb73-f908-4fab-8f97-77a4dddbe5a1"
              data-featurable-async
              className="w-full min-h-[300px]"
            />
          </motion.div>

          {/* Right Column: Contact Form (35% Width) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="w-full lg:w-[35%] flex flex-col justify-start"
          >
            {/* Header above form */}
            <div className="mb-6">
              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight mb-3">
                {locale === "en"
                  ? "Looking for a painter in Amsterdam or surrounding areas?"
                  : "Op zoek naar een schilder in Amsterdam of omstreken?"}
              </h3>
              <p className="font-body text-slate-600 text-base md:text-lg leading-relaxed">
                {locale === "en"
                  ? "Contact us today and receive a free, no-obligation quote."
                  : "Neem vandaag nog contact met ons op en ontvang een vrijblijvende offerte."}
              </p>
            </div>

            {/* Form Container (SP Dark Styling - Full Size Matching Contact Section) */}
            {submitted ? (
              <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800 flex flex-col items-center justify-center min-h-[400px] text-center text-white">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{formText.successTitle}</h3>
                <p className="font-body text-zinc-400">{formText.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl p-8 md:p-10 border border-zinc-800 space-y-6 text-white shadow-xl">
                <div>
                  <label htmlFor="name" className="block font-display font-semibold text-sm mb-2 text-zinc-200">
                    {formText.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={formText.namePlace}
                    className="w-full bg-zinc-800/80 border border-zinc-700/80 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-display font-semibold text-sm mb-2 text-zinc-200">
                    {formText.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={formText.phonePlace}
                    pattern="^\+31\s?([0-9]\s?){9}$"
                    title={locale === "nl" 
                      ? "Vul a.b.b. een geldig Nederlands telefoonnummer in (bijv. +31 6 1234 5678)" 
                      : "Please enter a valid Dutch phone number (e.g. +31 6 1234 5678)"
                    }
                    className="w-full bg-zinc-800/80 border border-zinc-700/80 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block font-display font-semibold text-sm mb-2 text-zinc-200">
                    {formText.serviceLabel}
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full bg-zinc-800/80 border border-zinc-700/80 rounded-xl px-4 py-3.5 font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
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
                  <label htmlFor="message" className="block font-display font-semibold text-sm mb-2 text-zinc-200">
                    {formText.msgLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder={formText.msgPlace}
                    className="w-full bg-zinc-800/80 border border-zinc-700/80 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-gold)] shadow-lg shadow-primary/20"
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

export default Testimonials;
