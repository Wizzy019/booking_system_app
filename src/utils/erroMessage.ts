import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong";
  }

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail[0]?.msg;
  }

  return "Something went wrong";
};
