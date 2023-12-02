import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export const useCartStore = create((set) => ({
  products: [],
  setProducts: (products) => set((state) => ({ ...state, products })),
  addProduct: (product) =>
    set((state) => ({ ...state, products: [product, ...state.products] })),
  emptyProducts: () => set((state) => ({ ...state, products: [] })),
}));
