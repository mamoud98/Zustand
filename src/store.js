import produce from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,

  addTask: (title, state) =>
    set(
      produce((store) => {
        store.tasks.push({ title, state });
      }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set((store) => ({ draggedTask: title })),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

export const useStore = create(persist(store, { name: "store" }));
