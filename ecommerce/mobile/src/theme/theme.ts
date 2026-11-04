import { useThemeStore } from "@/store/use-theme-store";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderSoft: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  accentSoft: string;
  onAccent: string;
  danger: string;
  dangerSoft: string;
  dangerBorder: string;
  primary: string;
  onPrimary: string;
  imagePlaceholder: string;
  toast: string;
  onToast: string;
};

const light: ThemeColors = {
  background: "#FAFAFA",
  surface: "#FFFFFF",
  surfaceMuted: "#F3F4F6",
  border: "#E5E7EB",
  borderSoft: "#F1F2F4",
  text: "#111827",
  textMuted: "#6B7280",
  textSubtle: "#9CA3AF",
  accent: "#FF5A1F",
  accentSoft: "#FFF1EA",
  onAccent: "#FFFFFF",
  danger: "#EF4444",
  dangerSoft: "#FEF2F2",
  dangerBorder: "#FEE2E2",
  primary: "#111827",
  onPrimary: "#FFFFFF",
  imagePlaceholder: "#E5E7EB",
  toast: "#111827",
  onToast: "#FFFFFF",
};

const dark: ThemeColors = {
  background: "#0B0F17",
  surface: "#141A24",
  surfaceMuted: "#1F2733",
  border: "#2A3444",
  borderSoft: "#1B2330",
  text: "#F3F4F6",
  textMuted: "#A1A8B5",
  textSubtle: "#6B7280",
  accent: "#FF7A45",
  accentSoft: "#2A1A12",
  onAccent: "#FFFFFF",
  danger: "#F87171",
  dangerSoft: "#2A1616",
  dangerBorder: "#3A1D1D",
  primary: "#E5E7EB",
  onPrimary: "#111827",
  imagePlaceholder: "#1F2733",
  toast: "#F3F4F6",
  onToast: "#111827",
};

export const palettes = { light, dark };

export function useTheme() {
  const mode = useThemeStore((state) => state.mode);
  const toggle = useThemeStore((state) => state.toggle);

  return {
    mode,
    isDark: mode === "dark",
    colors: palettes[mode],
    toggle,
  };
}
