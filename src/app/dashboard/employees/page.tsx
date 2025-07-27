"use client";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import { SummaryCard } from "@/types/dashbord.type";
import React, { useEffect, useState, useRef } from "react";
import {
  FiBarChart,
  FiCheckCircle,
  FiEdit,
  FiEye,
  FiSearch,
  FiShield,
  FiUsers,
  FiFilter,
} from "react-icons/fi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Input,
  Select,
  SelectItem,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const currentUser = useUserStore((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      getAllUsersWithDetails()
        .then((response) => {
          setAllUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [currentUser]);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || (user.status as any) === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const baseCards: SummaryCard[] = [
    {
      title: "Total Employees",
      value: allUsers.length,
      icon: FiUsers,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Employees",
      value: allUsers.filter((user) => (user.status as any) === "ACTIVE")
        .length,
      icon: FiCheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "In-active Employees",
      value: allUsers.filter((user) => (user.status as any) === "INACTIVE")
        .length,
      icon: FiBarChart,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Suspended",
      value: allUsers.filter((user) => (user.status as any) === "SUSPENDED")
        .length,
      icon: FiShield,
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

      <div className="md:flex-1 max-md:w-full p-3 sm:p-4 bg-white rounded-lg space-y-4">
        <div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                ref={searchInputRef}
                placeholder="Search employees by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<FiSearch className="text-gray-400" size={18} />}
                classNames={{
                  input: "text-sm",
                  inputWrapper: "h-10",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
                variant="faded"
                size="sm"
              />
            </div>

            <div className="w-full sm:w-48">
              <Select
                value={roleFilter}
                onSelectionChange={(value) => setRoleFilter(String(value))}
                placeholder="Filter by role"
                variant="bordered"
                size="sm"
                startContent={<FiFilter className="text-gray-400" size={16} />}
                classNames={{
                  trigger: "h-10",
                  value: "text-sm",
                }}
              >
                <SelectItem key="all">All Roles</SelectItem>
                <SelectItem key="MANAGER">Manager</SelectItem>
                <SelectItem key="EMPLOYEE">Employee</SelectItem>
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <Select
                value={statusFilter}
                onSelectionChange={(value) => setStatusFilter(String(value))}
                placeholder="Filter by status"
                variant="bordered"
                size="sm"
                startContent={<FiFilter className="text-gray-400" size={16} />}
                classNames={{
                  trigger: "h-10",
                  value: "text-sm",
                }}
              >
                <SelectItem key="all">All Status</SelectItem>
                <SelectItem key="ACTIVE">Active</SelectItem>
                <SelectItem key="INACTIVE">Inactive</SelectItem>
                <SelectItem key="SUSPENDED">Suspended</SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredUsers.length} of {allUsers.length} employees
            </span>
            {(searchQuery ||
              roleFilter !== "all" ||
              statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <FiUsers size={48} className="mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">
                      No employees found
                    </h3>
                    <p className="text-sm">
                      {searchQuery ||
                      roleFilter !== "all" ||
                      statusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "No employees available"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
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
                          {currentUser?.id === user.id ? "(You)" : ""}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.role === "MANAGER" ? (
                        <FiShield className="text-blue-500" size={16} />
                      ) : (
                        <FiUsers className="text-green-500" size={16} />
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "MANAGER"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (user.status as any) === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : (user.status as any) === "INACTIVE"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {String(user.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">
                        {new Date(user.lastLogin).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.lastLogin).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 hover:bg-blue-50 rounded-md transition-colors"
                        title="View Profile"
                      >
                        <FiEye className="text-blue-500" size={16} />
                      </button>
                      <button
                        className="p-1 hover:bg-green-50 rounded-md transition-colors"
                        title="Edit Employee"
                      >
                        <FiEdit className="text-green-500" size={16} />
                      </button>
                      <button
                        className="p-1 hover:bg-orange-50 rounded-md transition-colors"
                        title="Manage Permissions"
                      >
                        <FiShield className="text-orange-500" size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default page;
