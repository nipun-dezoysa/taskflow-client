"use client";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import { SummaryCard } from "@/types/dashbord.type";
import React, { useEffect, useState } from "react";
import { FiBarChart, FiCheckCircle } from "react-icons/fi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@heroui/react";
import { UserProfile } from "@/types/user.type";
import { useUserStore } from "@/store/userStore";
import { getAllUsersWithDetails } from "@/services/userService";

const columns = [
  {
    key: "employee",
    label: "Employee",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "createdAt",
    label: "JOINED ON",
  },
  {
    key: "lastlogin",
    label: "LAST LOGIN",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];
function page() {
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user) {
      getAllUsersWithDetails()
        .then((response) => {
          setAllUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [user]);
  const baseCards: SummaryCard[] = [
    {
      title: "Total Employees",
      value: 12,
      icon: FiBarChart,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Employees",
      value: 12,
      icon: FiCheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "In-active Employees",
      value: 12,
      icon: FiBarChart,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Suspended",
      value: 12,
      icon: FiBarChart,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl text-gray-900">
          Manage Employees
        </h1>
        <p className="text-gray-600">
          Manage your team members, track their performance and control access
          permissions.
        </p>
      </div>
      <SummaryCards summaryCards={baseCards} />
      <div className="md:flex-1 max-md:w-full p-3 sm:p-4 bg-white rounded-lg">
        <div></div>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${user.fname}+${user.lname}`}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium text-sm">
                        {user.fname} {user.lname}{" "}
                        {user?.id === user.id ? "(You)" : ""}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>test</TableCell>
                <TableCell>test</TableCell>
                <TableCell>test</TableCell>
                <TableCell>test</TableCell>
                <TableCell>test</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default page;
