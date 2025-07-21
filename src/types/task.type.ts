export type CreateTask = {
  title: string;
  description: string;
  dueDate?: string;
  assigneeId: number;
};
