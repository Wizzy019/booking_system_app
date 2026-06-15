import { useQuery } from "@tanstack/react-query";
import { getAvailability, getSlots } from "../services/availabilityService";

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
