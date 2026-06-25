import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createAvailability,
  deleteAvailability,
  getAvailability,
  getSlots,
  updateAvailability,
  type CreateAvailabilityPayload,
  type UpdateAvailabilityPayload,
} from "../services/availabilityService";

export const useAvailability = () => {
  return useQuery({
    queryKey: ["Availability"],
    queryFn: getAvailability,
  });
};

export const useSlots = (date: string) => {
  return useQuery({
    queryKey: ["Slots", date],
    queryFn: () => getSlots(date),
    enabled: !!date,
  });
};

export const useCreateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAvailabilityPayload) =>
      createAvailability(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
};

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateAvailabilityPayload;
    }) => updateAvailability(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
};

export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteAvailability(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
};
