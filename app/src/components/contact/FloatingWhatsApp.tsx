"use client";

import { MessageCircle } from "lucide-react";
import { OWNER_PHONE, CTA_TEXT } from "@/config/business";

const sanitizedPhone = OWNER_PHONE.replace(/[^+\\d]/g, "");
const phoneUrl =
  sanitizedPhone.length > 0 ? `https://wa.me/${sanitizedPhone}` : "#";

export const FloatingWhatsApp = () => (
  <a
    href={phoneUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-5 w-5" />
    <span>{CTA_TEXT.whatsapp}</span>
  </a>
);
