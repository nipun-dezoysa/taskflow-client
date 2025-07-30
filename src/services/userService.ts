import { UserStatus } from "@/types/user.type";
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

export const updateUserStatus = async (userId: string, status: UserStatus) => {
  return axiosInstance.put(`/user/${userId}/status`, { status });
};

export const getUserById = async (userId: number) => {
  return axiosInstance.get(`/user/${userId}`);
};
