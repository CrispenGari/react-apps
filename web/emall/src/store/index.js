import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export const useCartStore = create((set) => ({
  products: [],
  setProducts: (products) => set((state) => ({ ...state, products })),
  removeProduct: (product) =>
    set((state) => {
      const _products = state.products.filter((p) => p.id === product.id);
      _products.pop();
      const _rest = state.products.filter((p) => p.id !== product.id);
      return {
        ...state,
        products: [..._rest, ..._products],
      };
    }),
  addProduct: (product) =>
    set((state) => ({ ...state, products: [product, ...state.products] })),
  emptyProducts: () => set((state) => ({ ...state, products: [] })),
}));
