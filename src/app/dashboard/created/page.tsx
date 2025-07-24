"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@heroui/react";
import { Task } from "@/types/task.type";
import { useUserStore } from "@/store/userStore";
import { getUserCreatedTasks } from "@/services/taskService";
import { format } from "date-fns";
import { getPriorityColor, getPriorityLabel } from "@/utils/uiTools";
import { useDrawerStore } from "@/store/drawerStore";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "assignee",
    label: "ASSIGNEE",
  },
  {
    key: "created",
    label: "CREATED",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "priority",
    label: "PRIORITY",
  },
];
function page() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const user = useUserStore((state) => state.user);
  const { onOpen } = useDrawerStore();

  const updateTaskInList = useCallback((updatedTask: Task) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  useEffect(() => {
    if (user) {
      getUserCreatedTasks(user.id)
        .then((response) => {
          setAllTasks(response.data.tasks);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [user]);

  return (
    <div>
      <h1 className="font-semibold text-2xl text-gray-900 mb-4 sm:mb-6">
        Created Tasks
      </h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {allTasks.map((task) => (
              <TableRow
                key={task.id}
                onClick={() => onOpen(task, updateTaskInList)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${task.assignee.fname}+${task.assignee.lname}`}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium text-sm">
                        {task.assignee.fname} {task.assignee.lname}{" "}
                        {user?.id === task.assignee.id ? "(You)" : ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.assignee.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(task.createdAt), "PPP 'at' h:mm a")}
                </TableCell>
                <TableCell>
                  {task.deadlines.length > 0
                    ? format(
                        new Date(task.deadlines[0].dueDate),
                        "PPP 'at' h:mm a"
                      )
                    : "No Deadline"}
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {getPriorityLabel(task.priority)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default page;
