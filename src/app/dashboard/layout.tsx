"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { useEffect, useState } from "react";
import TaskDrawer from "@/components/Dashboard/TaskDrawer";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useDrawerStore } from "@/store/drawerStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onClose } = useDrawerStore();
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

  if (!hasAccess || !user) {
    return (
      <div className="text-center mt-20">
        You do not have access to this page.
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 h-screen">
      <DashboardSidebar userRole={user?.role} />

      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-8">{children}</div>
      </main>
      <TaskDrawer isOpen={isOpen} onOpenChange={onClose} />
    </div>
  );
}
