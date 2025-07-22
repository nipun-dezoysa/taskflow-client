import { Task } from "@/types/task.type";
import { create } from "zustand";

type DrawerStore = {
  isOpen: boolean;
  task?: Task;
  onOpen: (task: Task) => void;
  onClose: () => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  taskId: undefined,
  onOpen: (task) => set({ isOpen: true, task }),
  onClose: () => set({ isOpen: false, task: undefined }),
}));
