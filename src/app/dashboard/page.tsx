"use client";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import { SummaryCard, SummaryData } from "@/types/dashbord.type";
import React, { useCallback, useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiUsers,
  FiBarChart,
  FiPlus,
} from "react-icons/fi";
import { format } from "date-fns";
import { useUserStore } from "@/store/userStore";
import { UserRole } from "@/types/user.type";
import { Task } from "@/types/task.type";
import { getUserUpcomingTasks } from "@/services/taskService";
import TaskColumn from "@/components/Dashboard/TaskColumn";
import { getDashboardData } from "@/services/dashboardService";

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const dateString = format(new Date(), "EEEE, d MMMM yyyy");

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData>({
    assignedTasksCount: 0,
    completedTasksCount: 0,
    pendingTasksCount: 0,
    overdueTasksCount: 0,
    teamCount: 0,
    inProgressTasksCount: 0,
  });

  const updateTaskInList = useCallback((updatedTask: Task) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  useEffect(() => {
    if (user) {
      getUserUpcomingTasks(user.id)
        .then((response) => {
          setAllTasks(response.data.tasks);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });

      getDashboardData()
        .then((response) => {
          setSummaryData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [user]);

  const getCardsForRole = (): SummaryCard[] => {
    const baseCards: SummaryCard[] = [
      {
        title: "Total Tasks",
        value: summaryData.assignedTasksCount,
        icon: FiBarChart,
        color: "bg-blue-500",
        textColor: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Completed",
        value: summaryData.completedTasksCount,
        icon: FiCheckCircle,
        color: "bg-green-500",
        textColor: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "In Progress",
        value: summaryData.inProgressTasksCount,
        icon: FiClock,
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
      {
        title: "Todo",
        value: summaryData.pendingTasksCount,
        icon: FiPlus,
        color: "bg-indigo-500",
        textColor: "text-indigo-600",
        bgColor: "bg-indigo-50",
      },
      {
        title: "Overdue",
        value: summaryData.overdueTasksCount,
        icon: FiAlertTriangle,
        color: "bg-red-500",
        textColor: "text-red-600",
        bgColor: "bg-red-50",
      },
    ];

    const managerCards: SummaryCard[] = [
      {
        title: "Team Members",
        value: summaryData.teamCount,
        icon: FiUsers,
        color: "bg-purple-500",
        textColor: "text-purple-600",
        bgColor: "bg-purple-50",
      },
    ];

    return user?.role === UserRole.MANAGER
      ? [...baseCards, ...managerCards]
      : baseCards;
  };

  const summaryCards: SummaryCard[] = getCardsForRole();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl text-gray-900">
          Good Morning, {user?.fname || "User"}!
        </h1>
        <p className="text-gray-600">it's {dateString}</p>
      </div>
      <SummaryCards summaryCards={summaryCards} />
      <div>
        <TaskColumn
          title="Upcoming Deadlines"
          tasks={allTasks}
          bgColor="bg-gray-50"
          updateTaskInList={updateTaskInList}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
