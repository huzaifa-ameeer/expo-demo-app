import { create } from "zustand";

import { apiRequest } from "@/lib/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  message: string;
  user: AuthUser;
  token: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isSubmitting: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isSubmitting: false,
  error: null,
  clearError: () => set({ error: null }),
  login: async (email, password) => {
    set({ isSubmitting: true, error: null });
    try {
      const data = await apiRequest<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      set({ user: data.user, token: data.token, isSubmitting: false });
      return true;
    } catch (error) {
      set({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Unable to sign in",
      });
      return false;
    }
  },
  register: async (name, email, password) => {
    set({ isSubmitting: true, error: null });
    try {
      const data = await apiRequest<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      set({ user: data.user, token: data.token, isSubmitting: false });
      return true;
    } catch (error) {
      set({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Unable to register",
      });
      return false;
    }
  },
  logout: async () => {
    set({ isSubmitting: true });
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
        token: get().token,
      });
    } catch {
      // The local session is cleared even if the request fails.
    } finally {
      set({ user: null, token: null, isSubmitting: false, error: null });
    }
  },
}));
