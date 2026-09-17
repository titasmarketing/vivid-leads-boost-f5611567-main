import { useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, FileCheck2, ShieldCheck, Star } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import QuoteWizard from "@/components/QuoteWizard";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useTranslation } from "@/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { WHATSAPP_URL } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;

const Offerte = ({ lang }: { lang?: "en" | "nl" }) => {
  const { t, setLocale, locale } = useTranslation();

  useEffect(() => {
    setLocale(lang ?? "nl");
  }, [lang, setLocale]);

  const isEn = locale === "en";
  usePageMeta(
    isEn ? "Free painting quote in Amsterdam | SP Schilders" : "Gratis offerte schilder Amsterdam | SP Schilders",
    t.quote.pageSub,
  );

  const expect = isEn
    ? [
        { icon: ClipboardList, title: "1 minute", desc: "Answer a few short questions about your job." },
        { icon: Clock, title: "Within 24 hours", desc: "We call or message you to discuss the details." },
        { icon: FileCheck2, title: "Free tailored quote", desc: "Clear fixed price. No obligations, no surprises." },
      ]
    : [
        { icon: ClipboardList, title: "1 minuut", desc: "Beantwoord een paar korte vragen over je klus." },
        { icon: Clock, title: "Binnen 24 uur", desc: "We bellen of appen je om de details door te nemen." },
        { icon: FileCheck2, title: "Gratis offerte op maat", desc: "Duidelijke vaste prijs. Vrijblijvend, geen verrassingen." },
      ];

  return (
    <main className="bg-slate-50 min-h-screen text-zinc-900">
      <SiteNav variant="minimal" />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="font-display font-semibold text-xs text-zinc-500 ml-1">Google</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-[1.05] mb-4">
              {t.quote.pageTitle}
            </h1>
            <p className="font-body text-zinc-600 text-base md:text-lg">{t.quote.pageSub}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="lg:col-span-7 xl:col-span-8"
            >
              <QuoteWizard />
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="lg:col-span-5 xl:col-span-4 space-y-5"
            >
              <div className="bg-white rounded-3xl p-6 md:p-7 border border-zinc-200 shadow-sm">
                <h2 className="font-display font-bold text-lg tracking-tight mb-5">
                  {isEn ? "What to expect" : "Wat je kunt verwachten"}
                </h2>
                <ol className="space-y-5">
                  {expect.map((item, i) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-primary flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-zinc-900">
                          <span className="text-zinc-400 mr-1.5">{i + 1}.</span>{item.title}
                        </p>
                        <p className="font-body text-sm text-zinc-500">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-zinc-900 text-white rounded-3xl p-6 md:p-7 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <p className="font-display font-bold text-base">{isEn ? "4-year warranty" : "4 jaar garantie"}</p>
                </div>
                <p className="font-body text-sm text-white/70 mb-5">
                  {isEn
                    ? "Over 10 years of experience, 200+ projects in Amsterdam and Sikkens premium paint."
                    : "Ruim 10 jaar ervaring, 200+ projecten in Amsterdam en Sikkens premium verf."}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display font-bold text-sm text-primary hover:text-white transition-colors"
                >
                  {isEn ? "Prefer WhatsApp? Chat with us →" : "Liever WhatsApp? Chat direct met ons →"}
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Offerte;
