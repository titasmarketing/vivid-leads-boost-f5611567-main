import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const TrustBar = () => {
  const { t } = useTranslation();

  const items = [
    { icon: Clock, label: t.trust.exp },
    { icon: MapPin, label: t.trust.based },
    { icon: Sparkles, label: t.trust.quality },
  ];

  return (
    <section className="border-y border-border bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
              className="flex items-center justify-center gap-3 py-6 md:py-8"
            >
              <item.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="font-display font-semibold text-sm md:text-base tracking-tight text-foreground">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
