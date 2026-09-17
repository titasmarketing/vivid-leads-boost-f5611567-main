/**
 * Real Google reviews for SP Schilders, mirrored from the Google Business Profile.
 * Dutch text is the customer's original where they wrote in Dutch, otherwise a
 * faithful translation of the English review.
 */
export interface GoogleReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  /** ISO date the review was published on Google. */
  publishedAt: string;
  nl: string;
  en: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "pedro-n",
    name: "Pedro N.",
    initials: "PN",
    rating: 5,
    publishedAt: "2026-07-30T11:10:16.000Z",
    nl: "Ik ben ontzettend tevreden over het werk van SP Schilders. Vanaf het eerste contact verliep alles prettig en duidelijk. Het team werkte netjes, professioneel en hield zich aan de gemaakte afspraken. Het eindresultaat is echt prachtig geworden.",
    en: "I am extremely satisfied with the work of SP Schilders. From the first contact, everything went smoothly and clearly. The team worked neatly and professionally and adhered to the agreements made. The end result is truly beautiful.",
  },
  {
    id: "clara-v",
    name: "Clara V.",
    initials: "CV",
    rating: 5,
    publishedAt: "2026-07-18T11:54:02.000Z",
    nl: "Mijn man en ik zijn ontzettend blij met het werk dat Charles en zijn team bij ons thuis hebben gedaan. Waterschade hersteld, het interieur en de deuren geschilderd en het houtwerk van de trap prachtig afgelakt. Charles heeft een uitstekend oog voor detail en de afwerking is vlekkeloos.",
    en: "My husband and I couldn't be happier with the work Charles and his team did in our home. They repaired water damage, painted our interior and doors, and beautifully varnished the woodwork in our stairs. Charles has an excellent eye for detail and the finishing of his work is flawless.",
  },
  {
    id: "stephan-c",
    name: "Stephan C.",
    initials: "SC",
    rating: 5,
    publishedAt: "2026-06-18T11:13:42.000Z",
    nl: "Bedankt Charles voor de hoogwaardige afwerking van ons schilderproject! Ik kan jullie iedereen aanraden!",
    en: "Thank you Charles for the high end finish of our painting project! I can recommend you to everyone!",
  },
  {
    id: "brunno-p",
    name: "Brunno P.",
    initials: "BP",
    rating: 5,
    publishedAt: "2026-05-19T19:27:53.000Z",
    nl: "Zeer tevreden over het geleverde werk. Professioneel team, duidelijke communicatie en alles netjes afgewerkt. Zeker een aanrader!",
    en: "Very satisfied with the work delivered. Professional team, clear communication, and everything finished neatly. Definitely recommended!",
  },
];

export const GOOGLE_RATING = 5.0;

/** "Write a review" link for this Google Business Profile. */
export const GOOGLE_WRITE_REVIEW_URL =
  "https://www.google.com/maps/place//data=!4m3!3m2!1s0x2ddd3e45c46a2b9b:0xce8739df0505b1fd!12e1";

/** Relative age of a review ("2 maanden geleden" / "2 months ago"). */
export const relativeReviewDate = (iso: string, locale: "nl" | "en"): string => {
  const then = new Date(iso).getTime();
  const days = Math.max(0, Math.round((Date.now() - then) / 86_400_000));
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (days < 30) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.round(days / 30), "month");
  return rtf.format(-Math.round(days / 365), "year");
};
