import { AuthState } from "@/types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token, user) => set({ token, user }),
      clearToken: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-token-storage",
    }
  )
);
