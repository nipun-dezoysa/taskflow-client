import axiosInstance from "@/utils/axiosInstance";

export const getDashboardData = async () => {
  return axiosInstance.get("/dashboard");
};