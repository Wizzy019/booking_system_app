import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBookings,
  createBooking,
  type CreateBookingPayload,
} from "../services/bookingService";

export const useBooking = () => {
  return useQuery({
    queryKey: ["Bookings"],
    queryFn: getBookings,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
