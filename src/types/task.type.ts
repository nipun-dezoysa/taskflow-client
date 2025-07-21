export type CreateTask = {
  title: string;
  description: string;
  dueDate?: string;
  assigneeId: number;
};

export type TaskCard = {
  id: number;
  title: string;
  priority: 0 | 1 | 2;
  dueDate: string | null;
  status: TaskStatus;
  updatedAt: string;
};

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
