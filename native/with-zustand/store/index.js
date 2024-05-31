import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  increment: (value) =>
    set((state) => ({ ...state, count: state.count + value })),
  decrement: (value) => set((state) => ({ count: state.count - value })),
}));

export const useTodoStore = create((set) => ({
  todos: [],
  // add: (title) => set((state) => ({ todos: [ {done: false,title, id: state.todos.length}, ...state.todos] })),
  add: (title) =>
    set((state) => ({
      ...state,
      todos: [
        {
          done: false,
          title,
          id: state.todos.length,
        },
        ...state.todos,
      ],
    })),
  update: (id) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((t) => {
        if (t.id === id) return { ...t, done: !t.done };
        return t;
      }),
    })),
}));

export const useUserStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
