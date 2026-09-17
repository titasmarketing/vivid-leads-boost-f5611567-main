import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { type GoogleReview, relativeReviewDate } from "@/data/reviews";

/** Official Google "G" mark, used to attribute the reviews. */
export const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.21-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.73z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.26a12 12 0 0 0 0 10.78l4.01-3.11z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.18 15.23 0 12 0A12 12 0 0 0 1.26 6.61l4.01 3.11C6.22 6.87 8.87 4.75 12 4.75z" />
  </svg>
);

export const Stars = ({ size = "sm" }: { size?: "sm" | "lg" }) => (
  <div className="flex items-center gap-0.5" aria-hidden="true">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={cn("fill-amber-400 text-amber-400", size === "lg" ? "w-5 h-5" : "w-4 h-4")} />
    ))}
  </div>
);

interface ReviewCardProps {
  review: GoogleReview;
  locale: "nl" | "en";
  /** Number of lines before the text is clamped. */
  clamp?: 3 | 4 | 6;
}

const ReviewCard = ({ review, locale, clamp = 4 }: ReviewCardProps) => (
  <article className="h-full bg-white rounded-2xl border border-zinc-200 p-5 flex flex-col gap-3 shadow-sm">
    <header className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-zinc-900 text-primary flex items-center justify-center font-display font-bold text-xs shrink-0">
        {review.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-sm text-zinc-900 truncate">{review.name}</p>
        <p className="font-body text-xs text-zinc-400">{relativeReviewDate(review.publishedAt, locale)}</p>
      </div>
      <GoogleG className="w-4 h-4 shrink-0" />
    </header>
    <Stars />
    <p
      className={cn(
        "font-body text-sm text-zinc-600 leading-relaxed",
        clamp === 3 && "line-clamp-3",
        clamp === 4 && "line-clamp-4",
        clamp === 6 && "line-clamp-6",
      )}
    >
      {review[locale]}
    </p>
  </article>
);

export default ReviewCard;
