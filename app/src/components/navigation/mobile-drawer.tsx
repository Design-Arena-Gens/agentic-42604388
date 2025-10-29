"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION, CTA_TEXT } from "@/config/business";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cleanPlaceholder } from "@/lib/placeholders";

type MobileDrawerProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export const MobileDrawer = ({ open, onClose, pathname }: MobileDrawerProps) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        />
        <motion.div
          className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col justify-between rounded-r-3xl bg-white p-6 shadow-xl shadow-black/25"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold tracking-tight text-neutral-900">
              Navigate
            </span>
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-200 p-2 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-2">
            {NAVIGATION.map((item) => {
              const label = cleanPlaceholder(item.label, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-medium tracking-tight transition duration-150",
                    pathname === item.href
                      ? "bg-neutral-950 text-white shadow-lg shadow-black/20"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100",
                  )}
                  onClick={onClose}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10 space-y-3">
            <Link
              href="/book"
              className="flex items-center justify-between rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
              onClick={onClose}
            >
              {CTA_TEXT.book}
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                Priority
              </span>
            </Link>
            <Link
              href="/menu"
              className="flex items-center justify-between rounded-2xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-300"
              onClick={onClose}
            >
              {CTA_TEXT.order}
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Pickup
              </span>
            </Link>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
