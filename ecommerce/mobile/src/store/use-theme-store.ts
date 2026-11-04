import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
};

const initialMode: ThemeMode =
  Appearance.getColorScheme() === "dark" ? "dark" : "light";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: initialMode,
      toggle: () =>
        set((state) => ({
          mode: state.mode === "dark" ? "light" : "dark",
        })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "theme-mode",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
