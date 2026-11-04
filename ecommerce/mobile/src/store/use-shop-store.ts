import { create } from "zustand";

type ShopState = {
  likedIds: Record<string, boolean>;
  cart: Record<string, number>;
  toggleLike: (productId: string) => void;
  addToCart: (productId: string) => void;
  decrementFromCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  likedIds: {},
  cart: {},
  toggleLike: (productId) =>
    set((state) => ({
      likedIds: {
        ...state.likedIds,
        [productId]: !state.likedIds[productId],
      },
    })),
  addToCart: (productId) =>
    set((state) => ({
      cart: { ...state.cart, [productId]: (state.cart[productId] ?? 0) + 1 },
    })),
  decrementFromCart: (productId) =>
    set((state) => {
      const quantity = (state.cart[productId] ?? 0) - 1;
      if (quantity > 0) {
        return { cart: { ...state.cart, [productId]: quantity } };
      }

      const cart = { ...state.cart };
      delete cart[productId];
      return { cart };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const cart = { ...state.cart };
      delete cart[productId];
      return { cart };
    }),
}));
