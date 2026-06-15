import api from "../../../lib/api";

export const getBookings = async () => {
  const { data } = await api.get("/bookings");
  return data;
};
