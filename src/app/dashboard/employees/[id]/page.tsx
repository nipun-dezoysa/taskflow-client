"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardBody,
  Avatar,
  Button,
  Chip,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Link,
} from "@heroui/react";
import {
  FiMail,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiClock as FiPending,
  FiTarget,
  FiUsers,
  FiFileText,
  FiAward,
  FiEye,
} from "react-icons/fi";
import { UserProfile, UserStatus, UserRole } from "@/types/user.type";
import { getUserById } from "@/services/userService";
import { Task } from "@/types/task.type";
import LoadingPage from "@/components/LoadingPage";
import { useUserStore } from "@/store/userStore";
import UserDetailCard from "@/components/Dashboard/UserDetailCard";
import { useDrawerStore } from "@/store/drawerStore";

const mockStats = {
  totalTasksAssigned: 15,
  completedTasks: 12,
  pendingTasks: 2,
  inProgressTasks: 1,
  averageCompletionTime: "3.2 days",
  todo: 12,
};

function page() {
  const params = useParams();
  const userId = params.id as string;
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [selectedTab, setSelectedTab] = useState("assigned");
  const { onOpen } = useDrawerStore();
  
  const stats = useMemo(() => {
    const total = assignedTasks.length;
    const completed = assignedTasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    const inProgress = assignedTasks.filter(
      (task) => task.status === "IN_PROGRESS"
    ).length;
    const pending = assignedTasks.filter(
      (task) => task.status === "PENDING"
    ).length;

    return {
      totalTasksAssigned: total,
      completedTasks: completed,
      inProgressTasks: inProgress,
      pendingTasks: pending,
    };
  }, [assignedTasks]);

  const updateLists = useCallback((updatedTask: Task) => {
      setAssignedTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setCreatedTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    }, []);

  useEffect(() => {
    getUserById(+userId)
      .then((response) => {
        setUserData(response.data.user);
        setAssignedTasks(response.data.assignedTasks);
        setCreatedTasks(response.data.createdTasks);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "IN_PROGRESS":
        return "primary";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string | number) => {
    const priorityValue =
      typeof priority === "string" ? parseInt(priority) : priority;
    switch (priorityValue) {
      case 2:
        return "danger";
      case 1:
        return "warning";
      case 0:
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 2:
        return "HIGH";
      case 1:
        return "MEDIUM";
      case 0:
        return "LOW";
      default:
        return "UNKNOWN";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!userData) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
      <Card className="w-full lg:w-[350px]">
        <CardBody className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4 w-full">
              <Avatar
                src={`https://ui-avatars.com/api/?name=${userData.fname}+${userData.lname}&size=120`}
                className="w-15 h-15"
              />
              <div className="flex flex-col space-y-1">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.fname} {userData.lname}
                  </h1>
                </div>

                <div className="flex gap-2">
                  <Chip
                    color={
                      userData.status === UserStatus.ACTIVE
                        ? "success"
                        : "danger"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {userData.status}
                  </Chip>
                  <Chip
                    color={
                      userData.role === UserRole.MANAGER ? "primary" : "default"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {userData.role}
                  </Chip>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <FiMail className="text-gray-400" size={16} />
                <span className="text-gray-700">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiCalendar className="text-gray-400" size={16} />
                <span className="text-gray-700">
                  Joined {formatDate(userData.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiClock className="text-gray-400" size={16} />
                <span className="text-gray-700">
                  Last active {formatDate(userData.lastLogin)}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-6 w-full">
        <Card>
          <CardBody>
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as string)}
              variant="underlined"
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-0 h-12",
                panel: "pt-6",
              }}
            >
              <Tab
                key="assigned"
                title={
                  <div className="flex items-center space-x-2">
                    <FiTarget size={16} />
                    <span>Assigned Tasks ({assignedTasks.length})</span>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FiTarget className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Tasks</p>
                            <p className="text-xl font-semibold">
                              {stats.totalTasksAssigned}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FiCheckCircle
                              className="text-green-600"
                              size={20}
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-xl font-semibold">
                              {stats.completedTasks}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <FiPending className="text-orange-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">In Progress</p>
                            <p className="text-xl font-semibold">
                              {stats.inProgressTasks}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FiAward className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">To Do</p>
                            <p className="text-xl font-semibold">
                              {stats.pendingTasks}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <Card>
                    <CardBody className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Overall Progress
                          </span>
                          <span className="text-sm font-medium">
                            {stats.completedTasks}/{stats.totalTasksAssigned}{" "}
                            tasks completed
                          </span>
                        </div>
                        <Progress
                          value={
                            stats.completedTasks / stats.totalTasksAssigned
                          }
                          color="primary"
                          size="sm"
                        />
                      </div>
                    </CardBody>
                  </Card>
                  <Table aria-label="Assigned tasks table">
                    <TableHeader>
                      <TableColumn>TASK</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>PRIORITY</TableColumn>
                      <TableColumn>ASSIGNED BY</TableColumn>
                      <TableColumn>DUE DATE</TableColumn>
                      <TableColumn>CREATED AT</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {assignedTasks.map((task) => (
                        <TableRow
                          key={task.id}
                          onClick={() => onOpen(task, updateLists)}
                        >
                          <TableCell>
                            <p className="font-medium">{task.title}</p>
                          </TableCell>
                          <TableCell>
                            <Chip
                              color={getStatusColor(task.status)}
                              variant="flat"
                              size="sm"
                            >
                              {task.status.replace("_", " ")}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip
                              color={getPriorityColor(task.priority)}
                              variant="flat"
                              size="sm"
                            >
                              {getPriorityText(task.priority)}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <UserDetailCard userDetails={task.creator} />
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">
                              {task.deadlines && task.deadlines.length > 0
                                ? formatDate(task.deadlines[0].dueDate)
                                : "No deadline"}
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">
                              {formatDate(task.createdAt)}
                            </p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Tab>

              <Tab
                key="created"
                title={
                  <div className="flex items-center space-x-2">
                    <FiFileText size={16} />
                    <span>Created Tasks ({createdTasks.length})</span>
                  </div>
                }
              >
                <Table aria-label="Created tasks table">
                  <TableHeader>
                    <TableColumn>TASK</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>PRIORITY</TableColumn>
                    <TableColumn>ASSIGNED TO</TableColumn>
                    <TableColumn>DUE DATE</TableColumn>
                    <TableColumn>CREATED AT</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {assignedTasks.map((task) => (
                      <TableRow
                        key={task.id}
                        onClick={() => onOpen(task, updateLists)}
                      >
                        <TableCell>
                          <p className="font-medium">{task.title}</p>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={getStatusColor(task.status)}
                            variant="flat"
                            size="sm"
                          >
                            {task.status.replace("_", " ")}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={getPriorityColor(task.priority)}
                            variant="flat"
                            size="sm"
                          >
                            {getPriorityText(task.priority)}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <UserDetailCard userDetails={task.assignee} />
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">
                            {task.deadlines && task.deadlines.length > 0
                              ? formatDate(task.deadlines[0].dueDate)
                              : "No deadline"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">
                            {formatDate(task.createdAt)}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default page;
