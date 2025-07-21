import axiosInstance from "@/utils/axiosInstance";

export const getUserDetails = async () => {
  return axiosInstance.get("/user");
};
