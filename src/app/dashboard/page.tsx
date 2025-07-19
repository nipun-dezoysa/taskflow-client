import SummaryCards from "@/components/Dashboard/SummaryCards";
import { SummaryCard, SummaryData } from "@/types/dashbord.type";
import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiUsers,
  FiBarChart,
  FiPlus,
} from "react-icons/fi";

// Type definitions
interface Trend {
  value: number;
  isPositive: boolean;
}

type UserRole = "manager" | "employee";

const DashboardPage: React.FC = () => {
  // This would come from your auth context or API
  const userRole: UserRole = "manager"; // or "employee"

  const summaryData: SummaryData = {
    totalTasks: 24,
    completedTasks: 18,
    pendingTasks: 4,
    overdueTasks: 2,
    teamMembers: 8,
    todayTasks: 6,
  };

  const getCardsForRole = (): SummaryCard[] => {
    const baseCards: SummaryCard[] = [
      {
        title: "Total Tasks",
        value: summaryData.totalTasks,
        icon: FiBarChart,
        color: "bg-blue-500",
        textColor: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Completed",
        value: summaryData.completedTasks,
        icon: FiCheckCircle,
        color: "bg-green-500",
        textColor: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "In Progress",
        value: summaryData.pendingTasks,
        icon: FiClock,
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
      {
        title: "Overdue",
        value: summaryData.overdueTasks,
        icon: FiAlertTriangle,
        color: "bg-red-500",
        textColor: "text-red-600",
        bgColor: "bg-red-50",
      },
    ];

    const managerCards: SummaryCard[] = [
      {
        title: "Team Members",
        value: summaryData.teamMembers,
        icon: FiUsers,
        color: "bg-purple-500",
        textColor: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        title: "Today's Tasks",
        value: summaryData.todayTasks,
        icon: FiPlus,
        color: "bg-indigo-500",
        textColor: "text-indigo-600",
        bgColor: "bg-indigo-50",
      },
    ];

    return userRole === "manager" ? [...baseCards, ...managerCards] : baseCards;
  };

  const summaryCards: SummaryCard[] = getCardsForRole();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl text-gray-900">
          Good Morning, Nipun
        </h1>
        <p className="text-gray-600">it's Monday, 12 October 2025</p>
      </div>
      <SummaryCards summaryCards={summaryCards} />
    </div>
  );
};

export default DashboardPage;
