import api from "../../../lib/api";

export type CreateBookingPayload = {
  name: string;
  email: string;
  date: string; // "2026-06-14"
  time_slot: string; // ISO string
};

export const getBookings = async () => {
  const { data } = await api.get("/bookings");
  return data;
};

export const createBooking = async (payload: CreateBookingPayload) => {
  const { data } = await api.post("/bookings", payload);
  console.log(payload);
  return data;
};
