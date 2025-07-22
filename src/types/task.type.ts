import { User } from "./user.type";

export type CreateTask = {
  title: string;
  description: string;
  dueDate?: string;
  assigneeId: number;
  priority: Priority;
};

export type TaskCard = {
  id: number;
  title: string;
  priority: Priority;
  dueDate: string | null;
  status: TaskStatus;
  updatedAt: string;
};

export type Priority = 0 | 1 | 2;

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  priority: Priority;
  assignee: User;
  creator: User;
  deadlines: Array<{
    id: number;
    taskId: number;
    dueDate: string;
    createdAt: string;
  }>;
};
