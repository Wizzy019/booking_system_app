import api from "../../../lib/api";

export type CreateBookingPayload = {
  name: string;
  email: string;
  date: string; // "2026-06-14"
  time_slot: string; // ISO string
};

export type updateBookingPayload = {
  date: string;
  time_slot: string;
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

export const updateBooking = async (id: string, data: updateBookingPayload) => {
  const res = await api.patch(`/booking/${id}`, data);
  return res.data;
};

export const deleteBooking = async (id: string) => {
  const res = await api.delete(`/booking/${id}`);
  return res.data;
};
