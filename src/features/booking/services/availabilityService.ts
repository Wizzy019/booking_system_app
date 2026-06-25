import api from "../../../lib/api";

export type CreateAvailabilityPayload = {
  day_of_week: number;
  start_time: string;
  end_time: string;
};

export const getAvailability = async () => {
  const { data } = await api.get("/availability");
  return data;
};

export const getSlots = async (date: string) => {
  const { data } = await api.get(`/availability/available-slots/${date}`);
  return data;
};

export const createAvailability = async (
  payload: CreateAvailabilityPayload,
) => {
  const { data } = await api.post("/availability", payload);
  console.log(payload);
  return data;
};

export const deleteAvailability = async (id: string) => {
  const res = await api.patch(`/availability/${id}`);
  return res.data;
};
