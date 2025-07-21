import { create } from "zustand";

type DrawerStore = {
  isOpen: boolean;
  taskId?: number;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  taskId: undefined,
  onOpen: (id) => set({ isOpen: true, taskId: id }),
  onClose: () => set({ isOpen: false, taskId: undefined }),
}));
