import { IconType } from "react-icons";
export interface SummaryCard {
  title: string;
  value: number;
  icon: IconType;
  color: string;
  textColor: string;
  bgColor: string;
}

export interface SummaryData {
  assignedTasksCount: number;
  completedTasksCount: number;
  pendingTasksCount: number;
  inProgressTasksCount: number;
  overdueTasksCount: number;
  teamCount: number;
}
