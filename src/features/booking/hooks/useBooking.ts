import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBookings,
  createBooking,
  updateBooking,
  type CreateBookingPayload,
  type updateBookingPayload,
  deleteBooking,
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

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateBookingPayload }) =>
      updateBooking(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
