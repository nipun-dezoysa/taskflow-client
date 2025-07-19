import axiosInstance from "@/utils/axiosInstance";

export const loginToAccount = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const registerAccount = async (payload: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};
