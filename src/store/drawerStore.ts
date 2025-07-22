import { Task } from "@/types/task.type";
import { create } from "zustand";

type DrawerStore = {
  isOpen: boolean;
  task?: Task;
  callBack: (updatedTask: Task) => void;
  setTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  onOpen: (task: Task, callback?: (updatedTask: Task) => void) => void;
  onClose: () => void;
};

export const useDrawerStore = create<DrawerStore>((set, get) => ({
  isOpen: false,
  task: undefined,
  callBack: () => {},
  setTask: (task) => set({ task }),
  updateTask: (updatedTask) => {
    set({ task: updatedTask });
    get().callBack(updatedTask); 
  },
  onOpen: (task, callBack = () => {}) => set({ isOpen: true, task, callBack }),
  onClose: () => set({ isOpen: false, task: undefined, callBack: () => {} }),
}));
