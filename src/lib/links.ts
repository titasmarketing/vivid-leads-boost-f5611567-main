export const WHATSAPP_URL =
  "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/f07ca4cf-f49c-4dd7-9f01-2a0c6403c8b9";
const WHATSAPP_PREFILL_BASE =
  "https://tintim.link/whatsapp/27ec1702-33f6-457f-a432-2e2a2f8a6c1c/56a2411b-16a7-4389-9c1e-985497266eaa";
export const WEBHOOK_URL = "https://hook.eu1.make.com/oafy4ddxvh1kjshlv2h1ok5rzw9widm9";

export const PHONE_DISPLAY = "+31 6 87545046";
export const PHONE_TEL = "tel:+31687545046";
export const EMAIL = "spschilders@outlook.com";
export const ADDRESS_LINE1 = "Nicolaas Anslijnstraat 82";
export const ADDRESS_LINE2 = "1068 WR Amsterdam";

export type Locale = "en" | "nl";

/** Prefix a path with /en for the English locale; Dutch is the root. */
export const localePath = (locale: Locale, path: string) => {
  if (locale !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
};

export const quotePath = (locale: Locale) => localePath(locale, "/offerte");

export const whatsappWithText = (text: string) =>
  `${WHATSAPP_PREFILL_BASE}?text=${encodeURIComponent(text)}`;
