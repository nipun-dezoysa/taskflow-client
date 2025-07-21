"use client";
import { getUserAssignedTasks } from "@/services/taskService";
import { useUserStore } from "@/store/userStore";
import { useDrawerStore } from "@/types/drawerStore";
import { TaskCard, TaskStatus } from "@/types/task.type";
import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";

function TasksPage() {
  const [allTasks, setAllTasks] = useState<TaskCard[]>([]);
  const [categorizedTasks, setCategorizedTasks] = useState<{
    todo: TaskCard[];
    inProgress: TaskCard[];
    completed: TaskCard[];
  }>({
    todo: [],
    inProgress: [],
    completed: [],
  });
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      getUserAssignedTasks(user.id)
        .then((response) => {
          setAllTasks(response.data.tasks);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    setCategorizedTasks({
      todo: allTasks
        .filter((task) => task.status === TaskStatus.PENDING)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
      inProgress: allTasks
        .filter((task) => task.status === TaskStatus.IN_PROGRESS)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
      completed: allTasks
        .filter((task) => task.status === TaskStatus.COMPLETED)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
    });
  }, [allTasks]);

  return (
    <div>
      <h1 className="font-semibold text-2xl text-gray-900 mb-4 sm:mb-6">
        My Tasks
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:space-x-4 items-start">
        <TaskColumn
          title="To Do"
          tasks={categorizedTasks.todo}
          bgColor="bg-gray-50"
        />
        <TaskColumn
          title="In Progress"
          tasks={categorizedTasks.inProgress}
          bgColor="bg-blue-50"
        />
        <TaskColumn
          title="Completed"
          tasks={categorizedTasks.completed}
          bgColor="bg-green-50"
        />
      </div>
    </div>
  );
}

export default TasksPage;

const TaskColumn = ({
  title,
  tasks,
  bgColor,
}: {
  title: string;
  tasks: TaskCard[];
  bgColor: string;
}) => {
  const { onOpen } = useDrawerStore();
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 2:
        return "bg-red-100 text-red-800";
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 0:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 2:
        return "High";
      case 1:
        return "Medium";
      case 0:
        return "Low";
      default:
        return "Unknown";
    }
  };
  return (
    <div className={`flex-1 p-3 sm:p-4 ${bgColor} rounded-lg`}>
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{title}</h2>
      <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {tasks.map((task) => (
          <div
            onClick={() => onOpen(task.id)}
            key={task.id}
            className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="font-medium mb-2">{task.title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityLabel(task.priority)}
              </span>
              <span className="text-gray-500 flex px-2 py-1 rounded-full items-center bg-gray-100 gap-2">
                <FaRegClock /> {task.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
