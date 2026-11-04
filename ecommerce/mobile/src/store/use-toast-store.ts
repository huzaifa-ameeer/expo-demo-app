import { create } from "zustand";

export type ToastKind = "cart" | "favourite";

export type Toast = {
  id: number;
  message: string;
  kind: ToastKind;
};

type ToastState = {
  toast: Toast | null;
  showToast: (message: string, kind?: ToastKind) => void;
  hideToast: (id: number) => void;
};

let nextToastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message, kind = "cart") =>
    set({ toast: { id: ++nextToastId, message, kind } }),
  hideToast: (id) =>
    set((state) => (state.toast?.id === id ? { toast: null } : state)),
}));
