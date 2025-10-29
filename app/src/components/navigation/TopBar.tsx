"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAVIGATION, BUSINESS_NAME, LOCATION, CTA_TEXT } from "@/config/business";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileDrawer } from "./mobile-drawer";
import { cleanPlaceholder } from "@/lib/placeholders";

const businessName = cleanPlaceholder(BUSINESS_NAME, "Our House");
const locationLabel = cleanPlaceholder(LOCATION, "Your City");

export const TopBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-3xl items-center justify-between rounded-3xl border border-white/10 bg-background/70 px-5 py-3 shadow-xl shadow-black/5 backdrop-blur-xl lg:max-w-6xl"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-white/60 p-2 text-neutral-700 shadow-sm shadow-black/5 transition hover:scale-95 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="group flex flex-col">
            <span className="text-sm font-medium tracking-tight text-neutral-900 transition group-hover:text-neutral-700">
              {businessName}
            </span>
            <span className="text-xs text-neutral-500">{locationLabel}</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-3 text-sm lg:flex">
          {NAVIGATION.map((item) => {
            const label = cleanPlaceholder(item.label, item.label);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 font-medium tracking-tight transition",
                  pathname === item.href
                    ? "bg-neutral-950 text-white shadow-lg shadow-black/15"
                    : "text-neutral-500 hover:text-neutral-900",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/book"
            className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
          >
            {CTA_TEXT.book}
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-300"
          >
            {CTA_TEXT.order}
          </Link>
        </div>
      </motion.header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
};
