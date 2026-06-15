import api from "../../../lib/api";

export const getAvailability = async () => {
  const { data } = await api.get("/availability");
  return data;
};

export const getSlots = async (date: string) => {
  const { data } = await api.get(`/availability/available-slots/${date}`);
  return data;
};
