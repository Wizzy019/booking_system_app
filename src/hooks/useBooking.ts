import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/bookingService";

export const useBooking = () => {
  return useQuery({
    queryKey: ["Bookings"],
    queryFn: getBookings,
  });
};
