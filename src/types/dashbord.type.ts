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
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  teamMembers: number;
  todayTasks: number;
}
