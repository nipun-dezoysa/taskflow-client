"use client";
import TasksBoard from "@/components/Dashboard/TaskBoard";
import { getUserAssignedTasks } from "@/services/taskService";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task.type";
import React, { useEffect, useState } from "react";

function Page() {
  const user = useUserStore((state) => state.user);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
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
  return <TasksBoard allTasks={allTasks} setAllTasks={setAllTasks} />;
}

export default Page;
