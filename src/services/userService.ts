import axiosInstance from "@/utils/axiosInstance";

export const getUserDetails = async () => {
  return axiosInstance.get("/user");
};

export const getAllUsers = async () => {
  return axiosInstance.get("/user/all");
};

export const getAllUsersWithDetails = async () => {
  return axiosInstance.get("/user/details");
};
