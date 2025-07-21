import { CreateTask } from "@/types/task.type";
import axiosInstance from "@/utils/axiosInstance";

export const getTaskDetails = async (taskId: string) => {
  return axiosInstance.get(`/task/${taskId}`);
};

export const createTask = async (taskData: CreateTask) => {
  return axiosInstance.post("/task", taskData);
};
