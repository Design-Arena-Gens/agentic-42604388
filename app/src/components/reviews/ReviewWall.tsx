"use client";

import { useMemo, useState } from "react";
import { INITIAL_REVIEWS, Review } from "@/data/reviews";
import { useBookingStore } from "@/providers/booking-store";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type FormState = {
  bookingId: string;
  rating: number;
  comment: string;
  photo: string;
};

export const ReviewWall = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [form, setForm] = useState<FormState>({
    bookingId: "",
    rating: 5,
    comment: "",
    photo: "",
  });
  const [moderatedIds, setModeratedIds] = useState<string[]>([]);

  const { bookings } = useBookingStore();
  const eligibleBookings = bookings.filter((booking) => booking.status === "Completed");

  const ratingSummary = useMemo(() => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length > 0 ? total / reviews.length : 0;
    return { average, count: reviews.length };
  }, [reviews]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.bookingId) return;
    const booking = bookings.find((item) => item.id === form.bookingId);
    if (!booking) return;
    const newReview: Review = {
      id: crypto.randomUUID(),
      name: booking.name,
      rating: form.rating,
      timestamp: new Date().toISOString(),
      comment: form.comment,
      photo: form.photo || undefined,
      moderated: false,
    };
    setReviews((prev) => [newReview, ...prev]);
    setForm({ bookingId: "", rating: 5, comment: "", photo: "" });
  };

  const toggleModeration = (id: string) => {
    setModeratedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="space-y-8 pb-24 pt-24">
      <header className="flex flex-col gap-4 rounded-[2.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
            Guest voices
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Reviews
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            We invite feedback after every completed experience. Share your story and help neighbors discover us.
          </p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-center shadow-inner shadow-black/5">
          <div className="flex items-center justify-center gap-1 text-3xl font-semibold tracking-tight text-neutral-900">
            <Star className="h-6 w-6 text-amber-400" />
            {ratingSummary.average.toFixed(1)}
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            {ratingSummary.count} reviews
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-[2.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          Share a note
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
            Completed booking
            <select
              value={form.bookingId}
              onChange={(event) => setForm((prev) => ({ ...prev, bookingId: event.target.value }))}
              className="h-12 rounded-3xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 focus:border-neutral-900 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a booking
              </option>
              {eligibleBookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.id} - {booking.service}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
            Rating
            <input
              type="range"
              min={3}
              max={5}
              step={0.5}
              value={form.rating}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, rating: Number(event.target.value) }))
              }
              className="accent-amber-400"
            />
            <span className="text-sm font-semibold text-neutral-700">
              {form.rating.toFixed(1)} stars
            </span>
          </label>
        </div>
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
          Review
          <textarea
            value={form.comment}
            onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
            required
            className="h-28 rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            placeholder="Share how the experience made you feel."
          />
        </label>
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
          Optional photo URL
          <input
            type="url"
            value={form.photo}
            onChange={(event) => setForm((prev) => ({ ...prev, photo: event.target.value }))}
            placeholder="https://"
            className="h-12 rounded-3xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 focus:border-neutral-900 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-3xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 disabled:opacity-60"
          disabled={!eligibleBookings.length}
        >
          Post review
        </button>
      </form>

      <div className="space-y-3">
        <AnimatePresence>
          {reviews.map((review) => {
            const hidden = moderatedIds.includes(review.id);
            return (
              <motion.article
                key={review.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: hidden ? 0.4 : 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-[2.75rem] border border-neutral-200 bg-white p-5 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.55)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                        {review.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={cn(
                              "h-4 w-4",
                              index < Math.round(review.rating) ? "fill-current" : "opacity-40",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                      {format(new Date(review.timestamp), "EEE - MMM d, yyyy")}
                    </p>
                    <p className="mt-3 text-sm text-neutral-600">{review.comment}</p>
                    {review.photo && (
                      <div className="mt-3 overflow-hidden rounded-3xl border border-neutral-200">
                        <Image
                          src={review.photo}
                          alt={`${review.name} review`}
                          width={640}
                          height={420}
                          className="h-48 w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleModeration(review.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em]",
                      hidden
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border border-neutral-200 bg-neutral-100 text-neutral-500",
                    )}
                  >
                    {hidden ? "Show" : "Hide"}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
