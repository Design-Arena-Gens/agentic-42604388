export const BUSINESS_NAME = "{BUSINESS_NAME}";
export const LOCATION = "{LOCATION}";
export const BUSINESS_TYPE = "{BUSINESS_TYPE}";
export const OWNER_PHONE = "{OWNER_PHONE}";

export const BRAND_COLORS = {
  primary: "{PRIMARY_HEX}",
  accent1: "{ACCENT1_HEX}",
  accent2: "{ACCENT2_HEX}",
  neutral: "{NEUTRAL_HEX}",
  background: "{BACKGROUND_HEX}",
} as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "{MENU}", href: "/menu" },
  { label: "Book", href: "/book" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

export const CTA_TEXT = {
  book: "Book Now",
  order: "Order Pickup",
  whatsapp: "Chat on WhatsApp",
} as const;

export const BUSINESS_COPY = {
  heroTagline:
    "World-class flavor meets local warmth. Thoughtfully crafted experiences every time.",
  specialsHeading: "Today's Highlights",
  bookingsHeading: "Reserve your experience in seconds.",
  reviewsHeading: "Loved by our community",
  galleryHeading: "Inside the experience",
  menuHeading: "Signature {BUSINESS_TYPE} selections",
};
