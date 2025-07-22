import { CreateTask, TaskStatus } from "@/types/task.type";
import axiosInstance from "@/utils/axiosInstance";

export const getTaskDetails = async (taskId: number) => {
  return axiosInstance.get(`/task/${taskId}`);
};

export const createTask = async (taskData: CreateTask) => {
  return axiosInstance.post("/task", taskData);
};

export const getUserAssignedTasks = async (userId: string) => {
  return axiosInstance.get(`/task/user/${userId}/assigned`);
};

export const updateTaskStatus = async (taskId: number, status: TaskStatus) => {
  return axiosInstance.patch(`/task/${taskId}/status`, { status });
};
