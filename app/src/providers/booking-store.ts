"use client";

import { format } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Booking } from "@/types";

type BookingState = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => Booking;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  markCompleted: (id: string) => void;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => {
        const id = `BK${Date.now().toString().slice(-6)}`;
        const newBooking: Booking = {
          id,
          createdAt: new Date().toISOString(),
          status: "Upcoming",
          ...booking,
        };
        set({ bookings: [newBooking, ...get().bookings] });
        return newBooking;
      },
      updateBooking: (id, updates) =>
        set({
          bookings: get().bookings.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking,
          ),
        }),
      cancelBooking: (id) =>
        set({
          bookings: get().bookings.map((booking) =>
            booking.id === id
              ? {
                  ...booking,
                  status: "Cancelled",
                }
              : booking,
          ),
        }),
      markCompleted: (id) =>
        set({
          bookings: get().bookings.map((booking) =>
            booking.id === id
              ? {
                  ...booking,
                  status: "Completed",
                }
              : booking,
          ),
        }),
    }),
    {
      name: "booking-store",
      partialize: ({ bookings }) => ({ bookings }),
    },
  ),
);

export const formatWhatsAppMessage = (booking: Booking) => {
  const date = format(new Date(booking.date), "EEEE, MMM d");
  return `Hi! I'd love to confirm a booking.\\n\\nName: ${booking.name}\\nContact: ${booking.phone}${
    booking.email ? `\\nEmail: ${booking.email}` : ""
  }\\nService: ${booking.service}\\nDate: ${date}\\nTime: ${booking.time}\\nParty: ${
    booking.partySize
  } guests\\nSeating: ${booking.seating}${
    booking.notes ? `\\nNotes: ${booking.notes}` : ""
  }\\n\\nBooking ID: ${booking.id}`;
};
