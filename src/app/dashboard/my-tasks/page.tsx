"use client";
import { getUserAssignedTasks } from "@/services/taskService";
import { useUserStore } from "@/store/userStore";
import { useDrawerStore } from "@/store/drawerStore";
import { Task, TaskStatus } from "@/types/task.type";
import { getPriorityColor, getPriorityLabel } from "@/utils/uiTools";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { format } from "date-fns";

function TasksPage() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const updateTaskInList = useCallback((updatedTask: Task) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

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

  const [categorizedTasks, setCategorizedTasks] = useState<{
    todo: Task[];
    inProgress: Task[];
    completed: Task[];
  }>({
    todo: [],
    inProgress: [],
    completed: [],
  });

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

  const TaskColumn = ({
    title,
    tasks,
    bgColor,
  }: {
    title: string;
    tasks: Task[];
    bgColor: string;
  }) => {
    const { onOpen } = useDrawerStore();

    return (
      <div
        className={`md:flex-1 max-md:w-full p-3 sm:p-4 ${bgColor} rounded-lg`}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          {title}
        </h2>
        <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {tasks.map((task) => (
            <div
              onClick={() => onOpen(task, updateTaskInList)}
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
                  <FaRegClock />{" "}
                  {task.deadlines.length > 0 &&
                    format(
                      new Date(task.deadlines[0].dueDate),
                      "MMMM do, yyyy 'at' h:mm a"
                    )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
