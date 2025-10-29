"use client";

import { useMemo, useState } from "react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Flame, Plus, X } from "lucide-react";
import Image from "next/image";
import { BRAND_COLORS } from "@/config/business";
import { cn } from "@/lib/utils";

export const MenuExplorer = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = category === "all" || item.categoryId === category;
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const handleQuickAdd = (item: MenuItem) => {
    setToast(`${item.name} is queued. We'll confirm via WhatsApp.`);
    setTimeout(() => setToast(null), 2800);
  };

  return (
    <div className="space-y-6 pb-28 pt-24">
      <div className="sticky top-24 z-10 rounded-3xl border border-neutral-200 bg-white p-4 shadow-[0_18px_44px_-28px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/80 px-4 py-3 shadow-inner shadow-black/5">
          <Search className="h-4 w-4 text-neutral-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search dishes, ingredients, experiences..."
            className="flex-1 bg-transparent text-sm font-medium text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition",
              category === "all"
                ? "bg-neutral-900 text-white shadow-lg shadow-black/20"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200",
            )}
          >
            All
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition",
                category === cat.id
                  ? "bg-neutral-900 text-white shadow-lg shadow-black/20"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <motion.article
            key={item.id}
            layout
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.5)] transition hover:border-neutral-300"
          >
            <div className="relative h-44 overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 300px, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-white/80" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                  {item.prepTimeMinutes} min
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                  {item.name}
                </h3>
                <p className="text-sm text-neutral-500">{item.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
                {item.spiceLevel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-600">
                    <Flame className="h-3 w-3" />
                    {item.spiceLevel}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg font-semibold tracking-tight text-neutral-900">
                ${item.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickAdd(item)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
                  style={{ backgroundColor: BRAND_COLORS.primary }}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
                <button
                  onClick={() => setSelected(item)}
                  className="rounded-2xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Details
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <MenuDrawer item={selected} onClose={() => setSelected(null)} />
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-24 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-3xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl shadow-black/40"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type DrawerProps = {
  item: MenuItem | null;
  onClose: () => void;
};

const MenuDrawer = ({ item, onClose }: DrawerProps) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-3xl rounded-t-[2.75rem] bg-white p-6 shadow-[0_-20px_60px_-30px_rgba(15,23,42,0.7)]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        >
          <div className="mx-auto h-1.5 w-14 rounded-full bg-neutral-200" />
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                {item.name}
              </h3>
              <p className="text-sm text-neutral-500">{item.description}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-200 p-2 text-neutral-400 transition hover:border-neutral-300 hover:text-neutral-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="relative h-52 overflow-hidden rounded-3xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-sm text-neutral-600">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                  Ingredients
                </h4>
                <ul className="mt-2 space-y-1">
                  {item.ingredients.map((ingredient) => (
                    <li key={ingredient}>- {ingredient}</li>
                  ))}
                </ul>
              </div>
              {item.variants && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                    Variants
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.variants.map((variant) => (
                      <span
                        key={variant.id}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500"
                      >
                        {variant.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {item.addOns && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                    Add-ons
                  </h4>
                  <div className="mt-2 space-y-2">
                    {item.addOns.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between rounded-2xl bg-neutral-50 px-3 py-2"
                      >
                        <span>{addon.name}</span>
                        <span className="font-semibold text-neutral-900">
                          +${addon.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-lg font-semibold tracking-tight text-neutral-900">
              ${item.price.toFixed(2)}
            </span>
            <button
              className="flex-1 rounded-3xl px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Add to pickup queue
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
