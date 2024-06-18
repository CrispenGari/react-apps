import { create } from "zustand";

export const useMeStore = create((set) => ({
  login: (me) => set({ me }),
  me: null,
  logout: () => set({ me: null }),
}));
