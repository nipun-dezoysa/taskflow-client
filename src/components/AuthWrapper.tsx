"use client";
import { getUserDetails } from "@/services/userService";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

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
    return <LoadingPage />;
  }

  return <>{children}</>;
}
