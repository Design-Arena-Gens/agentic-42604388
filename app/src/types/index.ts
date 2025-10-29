export type Booking = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  partySize: number;
  seating: "Indoor" | "Outdoor" | "Chef's Counter";
  notes?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  createdAt: string;
};

export type TimeSlot = {
  label: string;
  value: string;
  available: boolean;
};
