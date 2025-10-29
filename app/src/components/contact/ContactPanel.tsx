"use client";

import { OWNER_PHONE, CTA_TEXT, BUSINESS_NAME, LOCATION, BRAND_COLORS } from "@/config/business";
import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { cleanPlaceholder } from "@/lib/placeholders";

const sanitizedPhone = OWNER_PHONE.replace(/[^+\d]/g, "");
const businessName = cleanPlaceholder(BUSINESS_NAME, "Our House");
const locationLabel = cleanPlaceholder(LOCATION, "Your City");

const hours = [
  { day: "Monday - Thursday", time: "5:00 PM - 10:00 PM" },
  { day: "Friday", time: "5:00 PM - 11:00 PM" },
  { day: "Saturday", time: "4:00 PM - 11:00 PM" },
  { day: "Sunday", time: "4:00 PM - 9:00 PM" },
];

export const ContactPanel = () => (
  <section className="grid gap-6 pb-28 pt-24 lg:grid-cols-[1.1fr_0.9fr]">
    <div className="space-y-6 rounded-[2.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          Get in touch
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Contact & directions
        </h1>
        <p className="text-sm text-neutral-500">
          Our concierge team is available all day on WhatsApp to help with reservations, private dining, and curated orders.
        </p>
      </header>
      <div className="space-y-4 text-sm text-neutral-600">
        <div className="flex items-center gap-3 rounded-[2.25rem] border border-neutral-200 bg-neutral-50 px-4 py-3">
          <Phone className="h-4 w-4 text-neutral-400" />
          <a href={sanitizedPhone ? `tel:${sanitizedPhone}` : "#"} className="font-semibold text-neutral-900">
            {OWNER_PHONE}
          </a>
        </div>
        <div className="flex items-center gap-3 rounded-[2.25rem] border border-neutral-200 bg-neutral-50 px-4 py-3">
          <MessageCircle className="h-4 w-4 text-neutral-400" />
          <a
            href={sanitizedPhone ? `https://wa.me/${sanitizedPhone}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neutral-900"
          >
            {CTA_TEXT.whatsapp}
          </a>
        </div>
        <div className="flex items-start gap-3 rounded-[2.25rem] border border-neutral-200 bg-neutral-50 px-4 py-3">
          <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
          <div>
            <p className="font-semibold text-neutral-900">{businessName}</p>
            <p>{locationLabel}</p>
        </div>
      </div>
        <div className="rounded-[2.25rem] border border-neutral-200 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-neutral-400">
            <Clock className="h-4 w-4" />
            Hours
          </div>
          <ul className="mt-3 space-y-2">
            {hours.map((item) => (
              <li key={item.day} className="flex items-center justify-between text-sm font-medium text-neutral-700">
                <span>{item.day}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a
        href={sanitizedPhone ? `https://wa.me/${sanitizedPhone}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        <MessageCircle className="h-4 w-4" />
        Chat with us now
      </a>
    </div>
    <div className="space-y-4">
      <div className="h-[420px] overflow-hidden rounded-[2.75rem] border border-neutral-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
        <iframe
          title="Map"
          className="h-full w-full"
          loading="lazy"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${businessName} ${locationLabel}`,
          )}&output=embed`}
        />
      </div>
      <p className="text-sm text-neutral-500">
        Need arrangements for private dining or large celebrations? Leave a note when you book and our guest relations team will tailor the experience.
      </p>
    </div>
  </section>
);
