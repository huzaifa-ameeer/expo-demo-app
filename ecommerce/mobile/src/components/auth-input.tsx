import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { type ThemeColors, useTheme } from "@/theme/theme";

type AuthInputProps = {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: ComponentProps<typeof TextInput>["keyboardType"];
  autoCapitalize?: ComponentProps<typeof TextInput>["autoCapitalize"];
};

export function AuthInput({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}: AuthInputProps) {
  const [hidden, setHidden] = useState(true);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={colors.textSubtle} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSubtle}
          secureTextEntry={secureTextEntry && hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            onPress={() => setHidden((current) => !current)}
            hitSlop={8}
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={colors.textSubtle}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    field: {
      gap: 6,
    },
    label: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textMuted,
    },
    inputWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      height: 50,
      paddingHorizontal: 14,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
  });
