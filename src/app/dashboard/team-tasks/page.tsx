"use client";
import TasksBoard from "@/components/Dashboard/TaskBoard";
import Unauthorized from "@/components/Unauthorized";
import { getAllTasks } from "@/services/taskService";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task.type";
import { UserRole } from "@/types/user.type";
import React, { useEffect, useState } from "react";

function page() {
  const user = useUserStore((state) => state.user);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isAunthorized, setIsAuthorized] = useState(true);
  useEffect(() => {
    if (user) {
      if (user.role != UserRole.MANAGER) {
        setIsAuthorized(false);
        return;
      }
      getAllTasks()
        .then((response) => {
          setAllTasks(response.data.tasks);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [user]);

  if (!isAunthorized) return <Unauthorized />;
  return (
    <TasksBoard
      allTasks={allTasks}
      setAllTasks={setAllTasks}
      title="Team Tasks"
    />
  );
}

export default page;
