"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BUSINESS_NAME,
  BUSINESS_TYPE,
  LOCATION,
  CTA_TEXT,
  BRAND_COLORS,
} from "@/config/business";
import { cleanPlaceholder } from "@/lib/placeholders";

const businessName = cleanPlaceholder(BUSINESS_NAME, "Our House");
const businessType = cleanPlaceholder(BUSINESS_TYPE, "Restaurant");
const location = cleanPlaceholder(LOCATION, "Your City");

const heroImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";

export const Hero = () => {
  return (
    <section className="relative mt-20 overflow-hidden rounded-[2.75rem] border border-white/15 bg-neutral-900 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${BUSINESS_NAME} hero`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 900px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      </div>
      <div className="relative flex flex-col justify-between gap-10 px-6 py-16 md:flex-row md:px-12 lg:px-16">
        <div className="max-w-xl space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur"
          >
            {location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {businessName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-white/70 sm:text-lg"
          >
            A {businessType.toLowerCase()} experience where refined design meets
            heartfelt hospitality. Reserve your evening or order a comforting plate
            to savor at home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/book"
              className="group flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/30 transition hover:-translate-y-0.5"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              <span>{CTA_TEXT.book}</span>
              <motion.span
                layout
                className="rounded-full border border-black/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.4em]"
              >
                Instant
              </motion.span>
            </Link>
            <Link
              href="/menu"
              className="group flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5"
            >
              {CTA_TEXT.order}
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white/10 p-6 backdrop-blur"
        >
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>Now accepting bookings</span>
            <span className="rounded-full bg-white/15 px-2 py-1 font-semibold uppercase tracking-[0.25em]">
              Tonight
            </span>
          </div>
          <div className="space-y-3">
            {HERO_SLOTS.map((slot) => (
              <div
                key={slot.time}
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white/80 shadow-inner shadow-black/30"
              >
                <div>
                  <p className="font-semibold tracking-tight text-white">
                    {slot.service}
                  </p>
                  <p className="text-xs text-white/60">{slot.time}</p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]"
                  style={{ backgroundColor: BRAND_COLORS.accent2, color: "#1b1b1b" }}
                >
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HERO_SLOTS = [
  { service: "Chef's tasting", time: "6:30 PM - 2 seats", status: "Open" },
  { service: "Lounge table", time: "7:15 PM - 4 seats", status: "Few" },
  { service: "Takeaway window", time: "Ready in 25 min", status: "Now" },
];
