import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import ReviewCard, { GoogleG, Stars } from "@/components/ReviewCard";
import { GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_WRITE_REVIEW_URL } from "@/data/reviews";

const ease = [0.23, 1, 0.32, 1] as const;
const AUTOPLAY_MS = 6000;

/** Compact Google reviews strip, built from the real reviews (no third-party widget). */
const GoogleReviews = () => {
  const { t, locale } = useTranslation();
  const r = t.home.reviews;
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback((embla: NonNullable<CarouselApi>) => setSelected(embla.selectedScrollSnap()), []);

  useEffect(() => {
    if (!api) return;
    setSnaps(api.scrollSnapList());
    onSelect(api);
    api.on("select", onSelect).on("reInit", (e) => {
      setSnaps(e.scrollSnapList());
      onSelect(e);
    });
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, onSelect]);

  const ratingLabel = GOOGLE_RATING.toFixed(1).replace(".", locale === "nl" ? "," : ".");

  return (
    <section className="bg-slate-50 text-zinc-900 border-y border-slate-200/70 py-10 md:py-12 relative z-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "SP Schilders",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: GOOGLE_RATING,
              reviewCount: GOOGLE_REVIEWS.length,
              bestRating: 5,
            },
            review: GOOGLE_REVIEWS.map((rev) => ({
              "@type": "Review",
              author: { "@type": "Person", name: rev.name },
              datePublished: rev.publishedAt.slice(0, 10),
              reviewRating: { "@type": "Rating", ratingValue: rev.rating, bestRating: 5 },
              reviewBody: rev.en,
            })),
          }),
        }}
      />

      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"
        >
          <div className="flex items-center gap-3">
            <GoogleG className="w-7 h-7 shrink-0" />
            <div>
              <p className="font-display font-bold text-base md:text-lg tracking-tight leading-tight">{r.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars />
                <span className="font-display font-extrabold text-sm text-zinc-900">{ratingLabel}</span>
                <span className="font-body text-xs text-zinc-500">
                  {r.basedOn.replace("{count}", String(GOOGLE_REVIEWS.length))}
                </span>
              </div>
            </div>
          </div>
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-xs text-zinc-500 hover:text-zinc-900 underline underline-offset-4 transition-colors self-start sm:self-auto"
          >
            {r.writeReview}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-4">
              {GOOGLE_REVIEWS.map((review) => (
                <CarouselItem key={review.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <ReviewCard review={review} locale={locale} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {snaps.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-5">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${r.goToReview} ${i + 1}`}
                  aria-current={i === selected}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50",
                    i === selected ? "w-6 bg-zinc-900" : "w-2 bg-zinc-300 hover:bg-zinc-400",
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviews;
