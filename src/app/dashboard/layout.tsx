"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { Button, useDisclosure } from "@heroui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import TaskDrawer from "@/components/Dashboard/TaskDrawer";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    const isHydrated = useAuthStore.getState().isHydrated;

    if (isHydrated) {
      if (user) {
        setHasAccess(true);
      }
      setLoading(false);
    }
  }, [user, router, useAuthStore.getState().isHydrated]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!hasAccess) {
    return (
      <div className="text-center mt-20">
        You do not have access to this page.
      </div>
    );
  }

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
