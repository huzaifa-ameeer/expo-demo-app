import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { useTheme } from "@/theme/theme";

export function ThemeToggle() {
  const { isDark, toggle, colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onPress={toggle}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={20}
        color={colors.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
