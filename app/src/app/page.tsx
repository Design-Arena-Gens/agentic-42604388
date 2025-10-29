import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Footer } from "@/components/home/Footer";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";
import { CTA_TEXT, BRAND_COLORS } from "@/config/business";

export default function Home() {
  return (
    <div className="space-y-16 pb-14">
      <Hero />
      <IntroStrip />
      <Highlights />
      <ExperienceTiles />
      <Footer />
    </div>
  );
}

const IntroStrip = () => (
  <div className="flex flex-col gap-4 rounded-[2.75rem] border border-neutral-200 bg-white px-6 py-6 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.5)] md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
        Mobile-first care
      </p>
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        Seamless booking & pickup in under a minute.
      </h2>
    </div>
    <div className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500 sm:flex-row">
      <Link
        href="/book"
        className="flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5"
      >
        <CalendarCheck className="h-4 w-4" />
        {CTA_TEXT.book}
      </Link>
      <Link
        href="/menu"
        className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
      >
        <Sparkles className="h-4 w-4" />
        {CTA_TEXT.order}
      </Link>
    </div>
  </div>
);

const ExperienceTiles = () => (
  <section className="space-y-6">
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
        Why guests love us
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
        Designed for calm, delivered with heart
      </h2>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {tiles.map((tile) => (
        <div
          key={tile.title}
          className="group flex flex-col justify-between rounded-[2.75rem] border border-neutral-200 bg-white p-5 text-neutral-600 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.55)] transition hover:-translate-y-1"
        >
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-400">
              {tile.badge}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
              {tile.title}
            </h3>
            <p className="text-sm">{tile.description}</p>
          </div>
          <Link
            href={tile.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition hover:translate-x-1"
            style={{ color: BRAND_COLORS.accent1 }}
          >
            {tile.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  </section>
);

const tiles = [
  {
    badge: "Live status",
    title: "Warm, real-time communication",
    description:
      "Bookings sync with WhatsApp instantly so you always speak to the same person who knows your tastes.",
    cta: "Manage bookings",
    href: "/book",
  },
  {
    badge: "Elevated pickup",
    title: "Orders that travel beautifully",
    description:
      "Packaging designed for the journey-temperature controlled, with tasting instructions for home.",
    cta: "Explore the menu",
    href: "/menu",
  },
  {
    badge: "Community",
    title: "Reviews with a local heartbeat",
    description:
      "See what neighbors loved and add your own story after your evening or pickup experience.",
    cta: "Read reviews",
    href: "/reviews",
  },
];
