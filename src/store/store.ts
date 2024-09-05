import { create } from "zustand";

const useStore = create((set) => ({
  refresh: false,
  setRefresh: (value: boolean) => set({ refresh: value }),
}));

export default useStore;
