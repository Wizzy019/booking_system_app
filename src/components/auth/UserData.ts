import api from "../../lib/api";

type UUID = string;

export interface UserData {
  id: UUID;
  email: string;
  role: string;
}

export const getUser = async (): Promise<UserData[]> => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log("Failed to get user:", error);
    throw error;
  }
};
