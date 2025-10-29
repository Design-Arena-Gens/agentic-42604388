"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { GALLERY_IMAGES } from "@/data/gallery";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const GalleryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClose = () => setActiveIndex(null);
  const handlePrev = () =>
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1;
    });
  const handleNext = () =>
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % GALLERY_IMAGES.length;
    });

  return (
    <section className="space-y-5 pb-28 pt-24">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          Inside the space
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Gallery
        </h1>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_IMAGES.map((image, index) => (
          <motion.button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            whileHover={{ y: -4 }}
            className={cn(
              "group relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-neutral-100 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.6)]",
              index % 4 === 0 ? "sm:row-span-2" : "",
            )}
          >
            <div className="relative h-60 w-full">
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/80 px-4 py-3 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                {image.category}
              </p>
              <h3 className="text-sm font-semibold tracking-tight text-neutral-900">
                {image.title}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
      <Lightbox
        activeIndex={activeIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

const Lightbox = ({
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    trackMouse: true,
  });

  if (activeIndex === null) return null;

  const image = GALLERY_IMAGES[activeIndex];

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...swipeHandlers}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-white">
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-[2.75rem] border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="flex w-full max-w-3xl justify-between text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {image.category}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">{image.title}</h3>
              <p className="mt-1 text-white/70">{image.description}</p>
            </div>
            <div className="flex gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
              <button
                onClick={onPrev}
                className="rounded-full bg-white/20 px-4 py-2 backdrop-blur hover:bg-white/30"
              >
                Prev
              </button>
              <button
                onClick={onNext}
                className="rounded-full bg-white/20 px-4 py-2 backdrop-blur hover:bg-white/30"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
