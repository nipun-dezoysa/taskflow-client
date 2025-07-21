import { create } from "zustand";

export type SideBarState = {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

export const useSideBarStore = create<SideBarState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
}));
