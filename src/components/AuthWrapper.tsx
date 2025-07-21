"use client";
import { getUserDetails } from "@/services/userService";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getUserDetails()
        .then((response) => {
          useUserStore.getState().setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return <>{children}</>;
}
