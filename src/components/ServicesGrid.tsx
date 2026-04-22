import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import paintingImg from "@/assets/service-painting-v2.jpg";
import microcementImg from "@/assets/service-microcement-v2.jpg";
import cleaningImg from "@/assets/service-cleaning-v2.png";
import maintenanceImg from "@/assets/service-maintenance-v2.png";
import { useTranslation } from "@/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

const ServicesGrid = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t.services.items.painting.title,
      description: t.services.items.painting.desc,
      image: paintingImg,
    },
    {
      title: t.services.items.exterior.title,
      description: t.services.items.exterior.desc,
      image: microcementImg,
    },
    {
      title: t.services.items.interior.title,
      description: t.services.items.interior.desc,
      image: cleaningImg,
    },
    {
      title: t.services.items.spray.title,
      description: t.services.items.spray.desc,
      image: maintenanceImg,
    },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-4 text-center"
        >
          {t.services.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display font-bold text-3xl md:text-5xl tracking-tighter leading-[0.95] mb-16 text-center"
        >
          {t.services.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-transparent transition-all duration-300 hover:border-foreground/10 hover:scale-[1.02]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="font-body text-foreground/60 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <motion.a
            href="https://wa.me/31687545046?text=Hello%2C%20I%27m%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-base tracking-tight"
          >
            <MessageCircle className="w-5 h-5" />
            {t.services.btn}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
