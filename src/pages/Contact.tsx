import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "@/i18n";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Copy, Check, MessageCircle, Send, Map } from "lucide-react";

import logo from "@/assets/sp-schilders-logo.png";
import heroBgImg from "@/assets/hero-interior.jpg";

import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const ease = [0.23, 1, 0.32, 1] as const;
const WHATSAPP_URL = "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";
const WEBHOOK_URL = "https://hook.eu1.make.com/oafy4ddxvh1kjshlv2h1ok5rzw9widm9";

const Contact = ({ lang }: { lang?: "en" | "nl" }) => {
  const { t, setLocale } = useTranslation();
  const navigate = useNavigate();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (lang) {
      setLocale(lang);
    } else {
      setLocale("nl");
    }
  }, [lang, setLocale]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("spschilders@outlook.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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
    let localPart = input.slice(countryCode.length).replace(/\D/g, "");
    if (localPart.length > 9) localPart = localPart.slice(0, 9);
    let formatted = countryCode;
    if (localPart.length > 0) {
      const firstDigit = localPart[0];
      if (firstDigit === "6") {
        formatted += " " + firstDigit;
        if (localPart.length > 1) formatted += " " + localPart.slice(1, 5);
        if (localPart.length > 5) formatted += " " + localPart.slice(5, 9);
      } else {
        if (localPart.length <= 2) formatted += " " + localPart;
        else if (localPart.length <= 5) formatted += " " + localPart.slice(0, 2) + " " + localPart.slice(2);
        else formatted += " " + localPart.slice(0, 2) + " " + localPart.slice(2, 5) + " " + localPart.slice(5, 9);
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

  const isEn = lang === "en";

  return (
    <main className="bg-background min-h-screen">
      {/* ── Fixed Navbar matching main page ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex items-center justify-between">
        <Link to={isEn ? "/en" : "/"} className="flex-shrink-0">
          <img src={logo} alt="SP Schilders logo" className="h-10 md:h-14 w-auto" />
        </Link>

        {/* Menu Links */}
        <div className="hidden lg:flex items-center gap-8 font-display font-semibold text-sm tracking-wide text-foreground/70">
          <Link to={isEn ? "/en" : "/"} className="hover:text-primary transition-colors">
            {isEn ? "Home" : "Home"}
          </Link>
          <Link to={isEn ? "/en#services" : "/#services"} className="hover:text-primary transition-colors">
            {isEn ? "Services" : "Diensten"}
          </Link>
          <Link to={isEn ? "/en#portfolio" : "/#portfolio"} className="hover:text-primary transition-colors">
            {isEn ? "Portfolio" : "Portfolio"}
          </Link>
          <Link to={isEn ? "/en/binnenschilder" : "/binnenschilder"} className="hover:text-primary transition-colors">
            {isEn ? "Interior Painting" : "Binnenschilder"}
          </Link>
          <Link
            to={isEn ? "/en/contact" : "/contact"}
            className="text-primary font-bold border-b-2 border-primary pb-0.5 transition-colors"
          >
            {isEn ? "Contact" : "Contact"}
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-foreground/80 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <button 
              onClick={() => navigate('/en/contact')} 
              className={`hover:text-primary transition-colors flex items-center gap-1 focus:outline-none ${isEn ? 'text-primary' : ''}`}
            >
              🇬🇧 <span className="hidden sm:inline">UK</span>
            </button>
            <span className="text-foreground/30 font-light">|</span>
            <button 
              onClick={() => navigate('/contact')} 
              className={`hover:text-primary transition-colors flex items-center gap-1 focus:outline-none ${!isEn ? 'text-primary' : ''}`}
            >
              🇳🇱 <span className="hidden sm:inline">NL</span>
            </button>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-display font-bold text-sm tracking-tight transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{isEn ? "Free Quote" : "Gratis Offerte"}</span>
            <span className="sm:hidden">{isEn ? "Quote" : "Offerte"}</span>
          </a>
        </div>
      </nav>

      {/* ── Hero / Title Header Section (Reduced Overlay Opacity) ── */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] w-full flex flex-col justify-center bg-background overflow-hidden pt-28 md:pt-36 pb-16">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImg}
            alt="SP Schilders Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/90" />
        </div>

        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Hero Text */}
        <div className="container max-w-5xl mx-auto px-4 relative z-10 text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-primary font-display font-semibold text-sm md:text-base tracking-widest uppercase mb-4"
          >
            {isEn ? "GET IN TOUCH" : "NEEM CONTACT OP"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white max-w-3xl"
          >
            <span className="block">{isEn ? "Ready to" : "Klaar om te"}</span>
            <span className="block">{isEn ? "transform" : "transformeren?"}</span>
            <span className="block text-gradient-gold">{isEn ? "your space?" : "uw ruimte?"}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-body text-white/70 text-base md:text-xl leading-relaxed max-w-2xl mt-6"
          >
            {isEn
              ? "Contact us today and receive a non-binding quote. We respond quickly!"
              : "Neem vandaag nog contact met ons op en ontvang een vrijblijvende offerte. Wij reageren snel!"}
          </motion.p>
        </div>
      </section>

      {/* ── Main Contact Section: Contact Cards (Left) & Form (Right) ── */}
      <section className="py-16 md:py-24 bg-white text-zinc-900 relative z-20 border-y border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
            
            {/* Left Column: 4 Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-5 space-y-6"
            >
              {/* 1. Telefoon / WhatsApp Card */}
              <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
                      {isEn ? "Phone / WhatsApp" : "Telefoon / WhatsApp"}
                    </h3>
                    <p className="font-body text-slate-500 text-sm mb-4">
                      {isEn ? "Directly available for questions and free quotes" : "Direct bereikbaar voor vragen en vrijblijvende offertes"}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href="tel:+31687545046"
                        className="font-display font-bold text-lg text-primary hover:underline transition-colors"
                      >
                        +31 6 87545046
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-sm hover:bg-[#20ba5a] transition-all hover:scale-105"
                      >
                        WhatsApp &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. E-mail Card */}
              <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
                      E-mail
                    </h3>
                    <p className="font-body text-slate-500 text-sm mb-4">
                      {isEn ? "Send us your project details or files" : "Stuur ons uw projectgegevens of bestanden"}
                    </p>
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <a
                        href="mailto:spschilders@outlook.com"
                        className="font-display font-bold text-base sm:text-lg text-slate-900 hover:text-primary transition-colors truncate"
                      >
                        spschilders@outlook.com
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300/90 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors focus:outline-none"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-green-600">{isEn ? "Copied!" : "Gekopieerd!"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isEn ? "Copy" : "Kopiëren"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Adres Card */}
              <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
                      Adres
                    </h3>
                    <p className="font-body font-bold text-slate-900 text-base leading-relaxed">
                      Nicolaas Anslijnstraat 82
                    </p>
                    <p className="font-body text-slate-600 text-base leading-relaxed">
                      1068 WR Amsterdam, Países Baixos (Nederland)
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Openingstijden Pill Card */}
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-primary/10 border border-primary/25 text-slate-800 text-sm font-medium">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span className="font-body font-semibold">
                  {isEn ? "Opening hours: Monday to Saturday 08:00 - 18:00" : "Openingstijden: Maandag t/m Zaterdag 08:00 - 18:00"}
                </span>
              </div>
            </motion.div>

            {/* Right Column: Form (Replaced Google Maps here) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="lg:col-span-7"
            >
              {submitted ? (
                <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-xl flex flex-col items-center justify-center min-h-[420px] text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-3">
                    {isEn ? "Thank you for your message!" : "Bedankt voor uw bericht!"}
                  </h3>
                  <p className="font-body text-slate-600 text-base max-w-md">
                    {isEn
                      ? "We have received your details and will respond as soon as possible via WhatsApp or email."
                      : "Wij hebben uw gegevens ontvangen en reageren zo snel mogelijk via WhatsApp of e-mail."}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-zinc-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 space-y-6 text-white"
                >
                  <div>
                    <label htmlFor="name" className="block font-display font-semibold text-sm mb-2 text-white/90">
                      {isEn ? "Your Name" : "Uw Naam"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder={isEn ? "e.g. Jan van den Berg" : "bijv. Jan van den Berg"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-display font-semibold text-sm mb-2 text-white/90">
                      {isEn ? "Phone Number" : "Telefoonnummer"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+31 6 1234 5678"
                      pattern="^\+31\s?([0-9]\s?){9}$"
                      title={isEn
                        ? "Please enter a valid Dutch phone number (e.g. +31 6 1234 5678)"
                        : "Vul a.b.b. een geldig Nederlands telefoonnummer in (bijv. +31 6 1234 5678)"
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block font-display font-semibold text-sm mb-2 text-white/90">
                      {isEn ? "Desired Service" : "Gewenste Dienst"}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all appearance-none"
                    >
                      <option value="">{isEn ? "Select a service" : "Kies een dienst"}</option>
                      <option value="Painting">{isEn ? "Interior Painting" : "Binnenschilderwerk"}</option>
                      <option value="Exterior Painting">{isEn ? "Exterior Painting" : "Buitenschilderwerk"}</option>
                      <option value="Spray Painting">{isEn ? "Spray Painting" : "Spuitwerk"}</option>
                      <option value="Other">{isEn ? "Other / Maintenance" : "Overig / Onderhoud"}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-display font-semibold text-sm mb-2 text-white/90">
                      {isEn ? "Tell us about your project" : "Vertel ons over uw project"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder={isEn 
                        ? "Describe your project, space, and specific wishes..." 
                        : "Beschrijf uw project, ruimte en eventuele specifieke wensen..."
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-display font-bold text-base tracking-tight transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isEn ? "Start Your Transformation" : "Start Uw Transformatie"}</span>
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Dedicated Google Maps Section Below ── */}
      <LocationSection />

      {/* ── Footer & Floating WhatsApp ── */}
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Contact;
