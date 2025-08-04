"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Divider, Card, CardBody, useDisclosure } from "@heroui/react";
import {
  AiOutlineHome,
  AiOutlineCheckSquare,
  AiOutlineTeam,
  AiOutlineUserSwitch,
  AiOutlineBarChart,
  AiOutlineClose,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import CreateTaskModal from "./CreateTaskModal";
import { useSideBarStore } from "@/store/dashStore";
import { UserRole } from "@/types/user.type";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";

const iconMap = {
  Home: AiOutlineHome,
  CheckSquare: AiOutlineCheckSquare,
  Plus: MdOutlineEdit,
  Users: AiOutlineTeam,
  UserCog: AiOutlineUserSwitch,
  BarChart: AiOutlineBarChart,
};

export default function DashboardSidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();

  const { isOpen: isDisclosureOpen, onOpen, onOpenChange } = useDisclosure();
  const sidebarOpen = useSideBarStore((state) => state.sidebarOpen);
  const setSidebarOpen = useSideBarStore((state) => state.setSidebarOpen);

  const onClose = () => {
    setSidebarOpen(false);
  };

  const commonMenuItems = [
    { href: "/dashboard", label: "Overview", icon: "Home" },
    { href: "/dashboard/my-tasks", label: "My Tasks", icon: "CheckSquare" },
    { href: "/dashboard/created", label: "Created Tasks", icon: "Plus" },
  ];

  const managerOnlyItems = [
    { href: "/dashboard/team-tasks", label: "Team Tasks", icon: "Users" },
    {
      href: "/dashboard/employees",
      label: "Manage Employees",
      icon: "UserCog",
    },
  ];

  const menuItems =
    userRole === "MANAGER"
      ? [...commonMenuItems, ...managerOnlyItems]
      : commonMenuItems;

  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 max-lg:z-50
          w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <Card className="h-full rounded-none shadow-none">
          <CardBody className="p-0">
            {/* Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {userRole === "MANAGER"
                    ? "Manager Dashboard"
                    : "Employee Dashboard"}
                </h2>
                <Button
                  isIconOnly
                  variant="light"
                  className="lg:hidden"
                  onPress={onClose}
                >
                  <AiOutlineClose className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="px-4">
              <Button
                onPress={onOpen}
                className="w-full justify-start h-12 px-4"
                color="primary"
                startContent={<BiPlus className="w-5 h-5" />}
              >
                Create Task
              </Button>
            </div>
            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const IconComponent =
                    iconMap[item.icon as keyof typeof iconMap];
                  const isActive = pathname === item.href;

                  return (
                    <Button
                      key={item.href}
                      as={Link}
                      href={item.href}
                      variant={isActive ? "flat" : "light"}
                      color={isActive ? "primary" : "default"}
                      className={`
                        w-full justify-start h-12 px-4
                        ${
                          isActive
                            ? "bg-primary-50 border-r-3 border-primary"
                            : "hover:bg-gray-100"
                        }
                      `}
                      startContent={
                        IconComponent && <IconComponent className="w-5 h-5" />
                      }
                      onClick={() => {
                        // Close sidebar on mobile when item is clicked
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                    >
                      <span className="text-left flex-1">{item.label}</span>
                    </Button>
                  );
                })}
              </div>

              <Divider className="my-4" />

              {/* Additional Actions */}
              <div className="space-y-2">
                <Button
                  as={Link}
                  href="/dashboard/settings"
                  variant="light"
                  className="w-full justify-start h-10 px-4 text-gray-600"
                  startContent={<AiOutlineSetting className="w-4 h-4" />}
                >
                  Settings
                </Button>
                <Button
                  variant="light"
                  color="danger"
                  className="w-full justify-start h-10 px-4"
                  startContent={<AiOutlineLogout className="w-4 h-4" />}
                  onClick={() => {
                    useAuthStore.getState().clearToken();
                    useUserStore.getState().clearUser();
                  }}
                >
                  Logout
                </Button>
              </div>
            </nav>
          </CardBody>
        </Card>
      </aside>
      <CreateTaskModal isOpen={isDisclosureOpen} onOpenChange={onOpenChange} />
    </>
  );
}
