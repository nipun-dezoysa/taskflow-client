"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { Button, useDisclosure } from "@heroui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import TaskDrawer from "@/components/Dashboard/TaskDrawer";
import { on } from "events";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex bg-gray-100 h-full">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          variant="flat"
          color="primary"
          onPress={() => setSidebarOpen(true)}
        >
          <AiOutlineMenu className="w-5 h-5" />
        </Button>
      </div>

      <DashboardSidebar
        userRole="manager"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-8">{children}</div>
      </main>
      <TaskDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
