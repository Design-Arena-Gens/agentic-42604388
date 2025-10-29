"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  GalleryHorizontalEnd,
  Home as HomeIcon,
  MessageCircle,
  ScrollText,
  UtensilsCrossed,
} from "lucide-react";
import { NAVIGATION } from "@/config/business";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { cleanPlaceholder } from "@/lib/placeholders";

const ICONS: Record<string, ReactNode> = {
  "/": <HomeIcon className="h-5 w-5" />,
  "/menu": <UtensilsCrossed className="h-5 w-5" />,
  "/book": <CalendarClock className="h-5 w-5" />,
  "/gallery": <GalleryHorizontalEnd className="h-5 w-5" />,
  "/reviews": <ScrollText className="h-5 w-5" />,
  "/contact": <MessageCircle className="h-5 w-5" />,
};

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-5 bottom-5 z-40 flex items-center justify-around rounded-3xl border border-white/20 bg-white/70 px-3 py-2 text-xs font-medium text-neutral-500 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:hidden">
      {NAVIGATION.map((item) => {
        const label = cleanPlaceholder(item.label, item.label);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 transition",
              pathname === item.href
                ? "bg-neutral-900 text-white shadow-lg shadow-black/20"
                : "hover:text-neutral-900",
            )}
          >
            <span>{ICONS[item.href] ?? <HomeIcon className="h-5 w-5" />}</span>
            <span className="tracking-tight">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
