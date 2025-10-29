"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import { addDays, format, isBefore, isSameDay } from "date-fns";
import { CalendarDays, Clock, MapPin, MessageCircle, RefreshCw, Trash2 } from "lucide-react";
import { useBookingStore, formatWhatsAppMessage } from "@/providers/booking-store";
import { Booking, TimeSlot } from "@/types";
import { BRAND_COLORS, BUSINESS_NAME, LOCATION, OWNER_PHONE } from "@/config/business";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cleanPlaceholder } from "@/lib/placeholders";

const businessName = cleanPlaceholder(BUSINESS_NAME, "Our House");
const locationLabel = cleanPlaceholder(LOCATION, "Your City");

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  partySize: number;
  seating: Booking["seating"];
  notes: string;
};

const SERVICES = [
  "Chef's Tasting - 5 course",
  "Signature Table - a la carte",
  "Lounge Experience",
  "Curated Takeaway",
];

const SEATING_OPTIONS: Booking["seating"][] = ["Indoor", "Outdoor", "Chef's Counter"];

export const BookingExperience = () => {
  const { addBooking, bookings, cancelBooking, updateBooking, markCompleted } =
    useBookingStore();
  const [form, setForm] = useState<FormState>(() => ({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0],
    date: format(new Date(), "yyyy-MM-dd"),
    time: generateTimeSlots()[0]?.value ?? "",
    partySize: 2,
    seating: "Indoor",
    notes: "",
  }));
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<Booking | null>(null);
  const [reschedule, setReschedule] = useState<Booking | null>(null);

  const dates = useMemo(() => {
    return Array.from({ length: 14 }).map((_, index) => addDays(new Date(), index));
  }, []);

  const slots = useMemo(() => generateTimeSlots(form.date, form.service), [form.date, form.service]);

  const handleChange = (key: keyof FormState, value: FormState[typeof key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const booking = addBooking({
      ...form,
    });
    setConfirmation(booking);
    setSubmitting(false);
  };

  const whatsappNumber = OWNER_PHONE.replace(/[^+\\d]/g, "");

  return (
    <div className="space-y-10 pb-36 pt-24">
      <section className="rounded-[2.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
            Book in moments
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Reserve your table
          </h1>
          <p className="text-sm text-neutral-500">
            Availability updates live. We confirm instantly via WhatsApp and follow up with a warm call if needed.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <FieldGroup title="Guest details">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Name"
                  required
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  placeholder="Your full name"
                />
                <Input
                  label="Mobile number"
                  required
                  value={form.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  placeholder="WhatsApp number"
                />
                <Input
                  label="Email (optional)"
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  placeholder="For confirmations"
                />
                <Select
                  label="Experience"
                  value={form.service}
                  onChange={(event) => handleChange("service", event.target.value)}
                  options={SERVICES}
                />
              </div>
            </FieldGroup>

            <FieldGroup title="When would you like to dine?">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {dates.map((date) => {
                  const value = format(date, "yyyy-MM-dd");
                  const active = value === form.date;
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => handleChange("date", value)}
                      className={cn(
                        "min-w-[98px] rounded-3xl border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.3em] transition",
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-black/25"
                          : "border-neutral-200 bg-neutral-100 text-neutral-500 hover:border-neutral-300 hover:text-neutral-800",
                      )}
                    >
                      <span className="block text-[11px]">
                        {format(date, "EEE").toUpperCase()}
                      </span>
                      <span className="text-base tracking-tight">
                        {format(date, "MMM d")}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {slots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => handleChange("time", slot.value)}
                    className={cn(
                      "rounded-3xl border px-3 py-3 text-sm font-semibold tracking-tight transition",
                      slot.value === form.time
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-black/20"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900",
                      !slot.available && "cursor-not-allowed opacity-40",
                    )}
                    disabled={!slot.available}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup title="Party preferences">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <Clock className="h-4 w-4 text-neutral-400" />
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={form.partySize}
                    onChange={(event) =>
                      handleChange("partySize", Number(event.target.value))
                    }
                    className="ml-3 w-full bg-transparent text-sm font-semibold text-neutral-800 focus:outline-none"
                  />
                  <span className="text-xs text-neutral-400">Guests</span>
                </div>
                <div className="flex gap-2">
                  {SEATING_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleChange("seating", option)}
                      className={cn(
                        "flex-1 rounded-3xl border px-3 py-3 text-xs font-semibold uppercase tracking-[0.28em] transition",
                        option === form.seating
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-black/20"
                          : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-900",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Tell us about allergies, celebrations, or seating notes."
                value={form.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
                className="h-28 w-full rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
              />
            </FieldGroup>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-3xl px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              <MessageCircle className="h-4 w-4" />
              {submitting ? "Sending to WhatsApp..." : "Confirm & WhatsApp"}
            </button>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-inner shadow-black/5">
              <h3 className="text-sm font-semibold tracking-tight text-neutral-900">
                Availability outlook
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Times update in real-time. Premium seating holds for 10 minutes after you submit.
              </p>
              <div className="mt-4 space-y-3">
                {slots.slice(0, 3).map((slot) => (
                  <div
                    key={slot.value}
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 text-sm text-neutral-600"
                  >
                    <span>{slot.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em]",
                        slot.available ? "bg-emerald-100 text-emerald-600" : "bg-neutral-200 text-neutral-500",
                      )}
                    >
                      {slot.available ? "Open" : "Held"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_15px_35px_-30px_rgba(15,23,42,0.4)]">
              <h3 className="text-sm font-semibold tracking-tight text-neutral-900">
                Location
              </h3>
              <div className="mt-3 flex items-center gap-3 text-sm text-neutral-500">
                <MapPin className="h-4 w-4 text-neutral-400" />
                <span>{locationLabel}</span>
              </div>
              <iframe
                title="Map"
                className="mt-3 h-44 w-full overflow-hidden rounded-2xl border border-neutral-200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${businessName} ${locationLabel}`,
                )}&output=embed`}
              />
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat instantly
                </a>
              )}
            </div>
          </aside>
        </form>
      </section>

      <section className="space-y-4 rounded-[2.75rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
              Your reservations
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Manage bookings
            </h2>
          </div>
          <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
            Syncs via WhatsApp
          </span>
        </header>
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 px-5 py-8 text-center text-sm text-neutral-500">
              Confirmed bookings will appear here for easy rescheduling or sharing.
            </div>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white px-4 py-4 shadow-[0_18px_44px_-32px_rgba(15,23,42,0.5)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">
                    {booking.service}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-neutral-900">
                    {booking.name}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {format(new Date(booking.date), "EEE, MMM d")} - {booking.time} -{" "}
                    {booking.partySize} guests - {booking.seating}
                  </p>
                  {booking.notes && (
                    <p className="mt-1 text-xs text-neutral-400">{booking.notes}</p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em]">
                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() => setReschedule(booking)}
                      className="flex items-center gap-1 rounded-full border border-neutral-200 px-4 py-2 text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reschedule
                    </button>
                  )}
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-500 transition hover:border-red-300 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                  {booking.status === "Upcoming" && (
                    <button
                      onClick={() => markCompleted(booking.id)}
                      className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-600 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Complete
                    </button>
                  )}
                  {whatsappNumber && (
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatWhatsAppMessage(booking))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-2 text-white transition hover:-translate-y-0.5"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <RescheduleSheet
        booking={reschedule}
        onClose={() => setReschedule(null)}
        onSave={(updates) => {
          if (reschedule) {
            updateBooking(reschedule.id, updates);
            setReschedule(null);
          }
        }}
      />

      <ConfirmationModal booking={confirmation} onClose={() => setConfirmation(null)} />
    </div>
  );
};

type FieldGroupProps = {
  title: string;
  children: ReactNode;
};

const FieldGroup = ({ title, children }: FieldGroupProps) => (
  <div className="space-y-3 rounded-[2.5rem] border border-neutral-100 bg-white/80 p-4 shadow-inner shadow-black/5">
    <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-400">
      {title}
    </h3>
    {children}
  </div>
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, ...props }: InputProps) => (
  <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
    {label}
    <input
      {...props}
      className={cn(
        "h-12 rounded-3xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none",
        props.className,
      )}
    />
  </label>
);

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
};

const Select = ({ label, options, ...props }: SelectProps) => (
  <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
    {label}
    <select
      {...props}
      className="h-12 rounded-3xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 focus:border-neutral-900 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

const RescheduleSheet = ({
  booking,
  onClose,
  onSave,
}: {
  booking: Booking | null;
  onClose: () => void;
  onSave: (updates: Partial<Booking>) => void;
}) => {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const slots = useMemo(
    () =>
      booking
        ? generateTimeSlots(booking.date, booking.service)
        : [],
    [booking],
  );

  return (
    <AnimatePresence>
      {booking && (
        <>
          <motion.button
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-3xl rounded-t-[2.75rem] bg-white p-6 shadow-[0_-25px_60px_-30px_rgba(15,23,42,0.65)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          >
            <div className="mx-auto h-1.5 w-14 rounded-full bg-neutral-200" />
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                Reschedule {booking.name}
              </h3>
              <button
                onClick={onClose}
                className="text-sm font-semibold text-neutral-400"
              >
                Close
              </button>
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              Select a new date and time. We&apos;ll follow up through the same WhatsApp thread.
            </p>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {Array.from({ length: 10 }).map((_, index) => {
                const day = addDays(new Date(), index);
                const value = format(day, "yyyy-MM-dd");
                const active = date ? date === value : isSameDay(new Date(booking.date), day);
                return (
                  <button
                    key={value}
                    onClick={() => setDate(value)}
                    className={cn(
                      "min-w-[90px] rounded-3xl border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.3em]",
                      active
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-black/20"
                        : "border-neutral-200 bg-neutral-100 text-neutral-500",
                    )}
                  >
                    <span className="block text-[11px]">
                      {format(day, "EEE").toUpperCase()}
                    </span>
                    <span className="text-base tracking-tight">
                      {format(day, "MMM d")}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.value}
                  onClick={() => setTime(slot.value)}
                  disabled={!slot.available}
                  className={cn(
                    "rounded-3xl border px-3 py-3 text-sm font-semibold tracking-tight",
                    slot.value === (time ?? booking.time)
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-600",
                    !slot.available && "cursor-not-allowed opacity-40",
                  )}
                >
                  {slot.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                onSave({
                  date: date ?? booking.date,
                  time: time ?? booking.time,
                });
              }}
              className="mt-6 w-full rounded-3xl px-4 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              Save changes
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ConfirmationModal = ({
  booking,
  onClose,
}: {
  booking: Booking | null;
  onClose: () => void;
}) => {
  if (!booking) return null;
  const whatsappNumber = OWNER_PHONE.replace(/[^+\\d]/g, "");
  const waLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatWhatsAppMessage(booking))}`
    : "#";
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md rounded-[2.75rem] border border-neutral-200 bg-white p-6 text-neutral-700 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.65)]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
            You&apos;re all set
          </h3>
          <button onClick={onClose} className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
            Close
          </button>
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          Booking <span className="font-semibold text-neutral-900">{booking.id}</span> confirmed. Share to WhatsApp to keep the conversation going.
        </p>
        <div className="mt-4 space-y-3 rounded-3xl border border-neutral-100 bg-neutral-50 px-4 py-4 text-sm">
          <div className="flex items-center justify-between">
            <span>Date</span>
            <strong>{format(new Date(booking.date), "EEE, MMM d")}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Time</span>
            <strong>{booking.time}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Guests</span>
            <strong>{booking.partySize}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Seating</span>
            <strong>{booking.seating}</strong>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Share on WhatsApp
          </a>
          <a
            href={createCalendarLink(booking)}
            download={`${booking.id}-${businessName.replace(/\\s+/g, "-")}.ics`}
            className="flex items-center justify-center gap-2 rounded-3xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
          >
            <CalendarDays className="h-4 w-4" />
            Add to calendar
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${businessName} ${locationLabel}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-3xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <MapPin className="h-4 w-4" />
            Open in Maps
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const generateTimeSlots = (date?: string, service?: string): TimeSlot[] => {
  const base = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
  return base.map((time) => {
    const label = formatSlotLabel(time);
    const available = determineAvailability(time, date, service);
    return { value: time, label, available };
  });
};

const formatSlotLabel = (slot: string) => {
  const [hour, minute] = slot.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return format(date, "h:mm a");
};

const determineAvailability = (time: string, date?: string, service?: string) => {
  if (!date) return true;
  const selected = new Date(`${date}T${time}:00`);
  if (isBefore(selected, new Date())) return false;
  if (service?.includes("Chef's") && (time === "17:00" || time === "20:30")) {
    return false;
  }
  return true;
};

const createCalendarLink = (booking: Booking) => {
  const start = new Date(`${booking.date}T${booking.time}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const formatICS = (date: Date) => format(date, "yyyyMMdd'T'HHmmss'Z'");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Agentic//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.id}@agentic`,
    `DTSTAMP:${formatICS(new Date())}`,
    `DTSTART:${formatICS(start)}`,
    `DTEND:${formatICS(end)}`,
    `SUMMARY:${businessName} - ${booking.service}`,
    `DESCRIPTION:${formatWhatsAppMessage(booking)}`,
    `LOCATION:${businessName} - ${locationLabel}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\\n");
  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
};
