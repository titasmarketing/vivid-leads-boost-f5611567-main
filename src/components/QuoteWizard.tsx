import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Home, Loader2, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { WEBHOOK_URL, localePath, whatsappWithText } from "@/lib/links";
import { DUTCH_PHONE_PATTERN, formatDutchPhone } from "@/lib/phone";

type StepKey = "work" | "property" | "scope" | "timing" | "location" | "contact";
const STEPS: StepKey[] = ["work", "property", "scope", "timing", "location", "contact"];
type Option = { v: string; l: string; d?: string };

export interface QuoteAnswers {
  work: string;
  property: string;
  scope: string[];
  timing: string;
  postcode: string;
  city: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const EMPTY: QuoteAnswers = {
  work: "", property: "", scope: [], timing: "", postcode: "", city: "", name: "", phone: "", email: "", message: "",
};

declare global {
  interface Window { dataLayer?: unknown[] }
}

const ease = [0.23, 1, 0.32, 1] as const;
const inputClass =
  "w-full bg-white border-2 border-zinc-200 rounded-xl px-4 py-3.5 font-body text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all";
const labelClass = "block font-display font-bold text-sm text-zinc-800 mb-2";

const OptionCard = ({ opt, selected, multi, onClick }: { opt: Option; selected: boolean; multi?: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      "flex items-center gap-4 w-full text-left rounded-2xl border-2 px-5 py-4 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30",
      selected ? "border-primary bg-primary/10 shadow-[var(--shadow-gold)]" : "border-zinc-200 bg-white hover:border-zinc-400 hover:-translate-y-0.5",
    )}
  >
    <span
      className={cn(
        "w-6 h-6 shrink-0 flex items-center justify-center border-2 transition-colors",
        multi ? "rounded-md" : "rounded-full",
        selected ? "bg-primary border-primary text-zinc-900" : "border-zinc-300 text-transparent",
      )}
    >
      <Check className="w-4 h-4" strokeWidth={3} />
    </span>
    <span>
      <span className="block font-display font-bold text-base text-zinc-900">{opt.l}</span>
      {opt.d && <span className="block font-body text-sm text-zinc-500">{opt.d}</span>}
    </span>
  </button>
);

/** Multi-step quote request: 6 short questions → webhook → thank-you with WhatsApp CTA. */
const QuoteWizard = () => {
  const { t, locale } = useTranslation();
  const q = t.quote;
  const cardRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<QuoteAnswers>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const key = STEPS[step];
  const total = STEPS.length;

  const set = <K extends keyof QuoteAnswers>(k: K, v: QuoteAnswers[K]) => {
    setAnswers((a) => ({ ...a, [k]: v }));
    setError(null);
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    setError(null);
    const el = cardRef.current;
    if (el && typeof el.scrollIntoView === "function" && window.innerWidth < 1024) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const choose = (k: "work" | "property" | "timing", v: string) => {
    set(k, v);
    window.setTimeout(() => go(step + 1), 220);
  };

  const toggleScope = (v: string) => {
    set("scope", answers.scope.includes(v) ? answers.scope.filter((s) => s !== v) : [...answers.scope, v]);
  };

  const validate = (): string | null => {
    switch (key) {
      case "scope":
        return answers.scope.length > 0 ? null : q.required;
      case "location":
        return answers.postcode.trim() && answers.city.trim() ? null : q.required;
      case "contact":
        if (!answers.name.trim()) return q.required;
        if (!DUTCH_PHONE_PATTERN.test(answers.phone.trim())) return q.phoneInvalid;
        return null;
      default:
        return answers[key] ? null : q.required;
    }
  };

  const submit = async () => {
    setSubmitting(true);
    const summary = [
      answers.work, answers.property, answers.scope.join(", "), answers.timing, `${answers.postcode} ${answers.city}`.trim(),
    ].filter(Boolean).join(" · ");

    const payload = {
      name: answers.name.trim(),
      phone: answers.phone.trim(),
      email: answers.email.trim(),
      service: answers.work,
      property: answers.property,
      scope: answers.scope.join(", "),
      timing: answers.timing,
      postcode: answers.postcode.trim(),
      city: answers.city.trim(),
      message: [summary, answers.message.trim()].filter(Boolean).join("\n"),
      remarks: answers.message.trim(),
      source: "offerte-wizard",
      locale,
    };

    try {
      await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {
      // Webhook failures must never block the thank-you screen; the WhatsApp fallback is shown regardless.
    }
    window.dataLayer?.push({ event: "quote_request", service: answers.work, timing: answers.timing });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    if (step < total - 1) { go(step + 1); return; }
    void submit();
  };

  if (submitted) {
    const firstName = answers.name.trim().split(" ")[0];
    const waText = `${q.thanks.waMessage} ${answers.name.trim()} · ${answers.work} · ${answers.property} · ${answers.scope.join(", ")} · ${answers.timing} · ${answers.postcode} ${answers.city}`;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="bg-white text-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-zinc-200 text-center"
        data-testid="quote-thanks"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center mb-6 shadow-[var(--shadow-gold)]">
          <CheckCircle2 className="w-10 h-10 text-zinc-900" />
        </div>
        <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-3">
          {q.thanks.title.replace("{name}", firstName)}
        </h2>
        <p className="font-body text-zinc-600 text-base md:text-lg max-w-md mx-auto mb-8">{q.thanks.desc}</p>

        <div className="bg-zinc-900 text-white rounded-2xl p-6 md:p-8 mb-6">
          <p className="font-display font-bold text-lg mb-1">{q.thanks.waTitle}</p>
          <p className="font-body text-white/70 text-sm mb-5">{q.thanks.waDesc}</p>
          <a
            href={whatsappWithText(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-xl font-display font-extrabold text-base md:text-lg shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {q.thanks.waBtn}
          </a>
        </div>

        <Link to={localePath(locale, "/")} className="inline-flex items-center gap-2 font-display font-semibold text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
          <Home className="w-4 h-4" />
          {q.thanks.home}
        </Link>
      </motion.div>
    );
  }

  const progress = ((step + 1) / total) * 100;
  const isAuto = key === "work" || key === "property" || key === "timing";

  return (
    <div ref={cardRef} className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-zinc-200 scroll-mt-28">
      <div className="mb-7">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-xs uppercase tracking-[0.18em] text-zinc-500">
            {q.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(total))}
          </span>
          <span className="font-display font-bold text-xs text-zinc-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-100 overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={key}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.25, ease }}
          >
            {key === "work" && (
              <fieldset>
                <legend className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-6">{q.steps.work.q}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.steps.work.options.map((o) => (
                    <OptionCard key={o.v} opt={o} selected={answers.work === o.v} onClick={() => choose("work", o.v)} />
                  ))}
                </div>
              </fieldset>
            )}

            {key === "property" && (
              <fieldset>
                <legend className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-6">{q.steps.property.q}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.steps.property.options.map((o) => (
                    <OptionCard key={o.v} opt={o} selected={answers.property === o.v} onClick={() => choose("property", o.v)} />
                  ))}
                </div>
              </fieldset>
            )}

            {key === "scope" && (
              <fieldset>
                <legend className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-1">{q.steps.scope.q}</legend>
                <p className="font-body text-sm text-zinc-500 mb-6">{q.steps.scope.hint}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.steps.scope.options.map((o) => (
                    <OptionCard key={o.v} opt={o} multi selected={answers.scope.includes(o.v)} onClick={() => toggleScope(o.v)} />
                  ))}
                </div>
              </fieldset>
            )}

            {key === "timing" && (
              <fieldset>
                <legend className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-6">{q.steps.timing.q}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.steps.timing.options.map((o) => (
                    <OptionCard key={o.v} opt={o} selected={answers.timing === o.v} onClick={() => choose("timing", o.v)} />
                  ))}
                </div>
              </fieldset>
            )}

            {key === "location" && (
              <fieldset>
                <legend className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-6">{q.steps.location.q}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postcode" className={labelClass}>{q.steps.location.postcode}</label>
                    <input id="postcode" name="postcode" autoComplete="postal-code" autoFocus value={answers.postcode} onChange={(e) => set("postcode", e.target.value.toUpperCase())} placeholder={q.steps.location.postcodePlace} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>{q.steps.location.city}</label>
                    <input id="city" name="city" autoComplete="address-level2" value={answers.city} onChange={(e) => set("city", e.target.value)} placeholder={q.steps.location.cityPlace} className={inputClass} />
                  </div>
                </div>
              </fieldset>
            )}

            {key === "contact" && (
              <fieldset>
                <legend className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter mb-6">{q.steps.contact.q}</legend>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className={labelClass}>{q.steps.contact.name}</label>
                    <input id="name" name="name" autoComplete="name" autoFocus value={answers.name} onChange={(e) => set("name", e.target.value)} placeholder={q.steps.contact.namePlace} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>{q.steps.contact.phone}</label>
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={answers.phone} onChange={(e) => set("phone", formatDutchPhone(e.target.value))} placeholder={q.steps.contact.phonePlace} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>{q.steps.contact.email}</label>
                    <input id="email" name="email" type="email" autoComplete="email" value={answers.email} onChange={(e) => set("email", e.target.value)} placeholder={q.steps.contact.emailPlace} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>{q.steps.contact.message}</label>
                    <textarea id="message" name="message" rows={3} value={answers.message} onChange={(e) => set("message", e.target.value)} placeholder={q.steps.contact.messagePlace} className={`${inputClass} resize-none`} />
                  </div>
                  <p className="font-body text-xs text-zinc-500">{q.steps.contact.privacy}</p>
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p role="alert" className="mt-5 font-body text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div className={cn("flex items-center gap-3 mt-8", step > 0 ? "justify-between" : "justify-end")}>
          {step > 0 && (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="inline-flex items-center gap-2 font-display font-bold text-sm text-zinc-500 hover:text-zinc-900 px-3 py-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {q.back}
            </button>
          )}

          {!isAuto && (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-primary text-zinc-900 px-7 py-4 rounded-xl font-display font-extrabold text-base tracking-tight shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-gold)] disabled:opacity-60 disabled:hover:scale-100"
            >
              {step === total - 1 ? (
                <>
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {submitting ? q.sending : q.submit}
                </>
              ) : (
                <>
                  {q.next}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuoteWizard;
