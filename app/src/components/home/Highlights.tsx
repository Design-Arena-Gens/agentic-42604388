"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND_COLORS, BUSINESS_COPY } from "@/config/business";
import { cleanPlaceholder } from "@/lib/placeholders";

const highlights = [
  {
    id: "special",
    title: "Chef's Spotlight",
    description:
      "Caramelized scallops with charred citrus sabayon, served with garden fennel.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    badge: "Tonight only",
  },
  {
    id: "pairing",
    title: "Wine & Dine",
    description:
      "Complimentary sommelier pairing on bookings before 7 PM, curated to your taste.",
    image:
      "https://images.unsplash.com/photo-1516214104705-6b4e4db551af?auto=format&fit=crop&w=1200&q=80",
    badge: "Add-on",
  },
  {
    id: "pickup",
    title: "Golden Hour Pickup",
    description:
      "Order ahead for curbside handoff, with insulated packaging to keep every note perfect.",
    image:
      "https://images.unsplash.com/photo-1521302080334-4bebac276b7d?auto=format&fit=crop&w=1200&q=80",
    badge: "New",
  },
];

export const Highlights = () => (
  <section className="mt-14 space-y-6">
    <div className="flex items-baseline justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          {cleanPlaceholder(BUSINESS_COPY.specialsHeading, BUSINESS_COPY.specialsHeading)}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Crafted for the moment
        </h2>
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.4)]"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 768px) 350px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-900"
              style={{ backgroundColor: BRAND_COLORS.accent2 }}
            >
              {item.badge}
            </span>
          </div>
          <div className="space-y-3 p-5">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-500">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);
