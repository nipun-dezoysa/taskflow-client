"use client";
import { Task, TaskStatus } from "@/types/task.type";
import React, { useCallback, useEffect, useState } from "react";
import TaskColumn from "@/components/Dashboard/TaskColumn";

function TasksBoard({
  allTasks,
  setAllTasks,
  title = "My Tasks",
}: {
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  title?: string;
}) {
  const updateTaskInList = useCallback((updatedTask: Task) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

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

  return (
    <div>
      <h1 className="font-semibold text-2xl text-gray-900 mb-4 sm:mb-6">
        {title}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:space-x-4 items-start">
        <TaskColumn
          title="To Do"
          tasks={categorizedTasks.todo}
          bgColor="bg-gray-50"
          updateTaskInList={updateTaskInList}
        />
        <TaskColumn
          title="In Progress"
          tasks={categorizedTasks.inProgress}
          bgColor="bg-blue-50"
          updateTaskInList={updateTaskInList}
        />
        <TaskColumn
          title="Completed"
          tasks={categorizedTasks.completed}
          bgColor="bg-green-50"
          updateTaskInList={updateTaskInList}
        />
      </div>
    </div>
  );
}

export default TasksBoard;
