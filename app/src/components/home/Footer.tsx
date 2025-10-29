"use client";

import Link from "next/link";
import { OWNER_PHONE, LOCATION, CTA_TEXT, BRAND_COLORS } from "@/config/business";
import { cleanPlaceholder } from "@/lib/placeholders";

const sanitizedPhone = OWNER_PHONE.replace(/[^+\d]/g, "");
const locationLabel = cleanPlaceholder(LOCATION, "Your City");

export const Footer = () => (
  <footer className="mt-20 flex flex-col items-center gap-2 rounded-3xl bg-white px-6 py-8 text-center text-sm text-neutral-500 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)]">
    <span>{locationLabel}</span>
    <div className="flex items-center gap-3 text-xs">
      <Link
        href={sanitizedPhone ? `tel:${sanitizedPhone}` : "#"}
        className="rounded-full border border-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
      >
        Call us
      </Link>
      <a
        href={sanitizedPhone ? `https://wa.me/${sanitizedPhone}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full px-4 py-2 font-semibold text-neutral-900"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        {CTA_TEXT.whatsapp}
      </a>
    </div>
    <p className="text-xs text-neutral-400">
      Crafted for moments worth savoring. Warmth from our kitchen to yours.
    </p>
  </footer>
);
