import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeToggle } from "@/components/theme-toggle";
import { type ThemeColors, useTheme } from "@/theme/theme";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  onSubmit: () => void;
  submitDisabled?: boolean;
  loading?: boolean;
  error?: string | null;
  footerPrompt: string;
  footerActionLabel: string;
  onFooterPress: () => void;
  children: ReactNode;
};

export function AuthScreen({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  submitDisabled = false,
  loading = false,
  error,
  footerPrompt,
  footerActionLabel,
  onFooterPress,
  children,
}: AuthScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <ThemeToggle />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.heading}>
            <View style={styles.badge}>
              <Ionicons
                name="shield-checkmark-outline"
                size={30}
                color={colors.accent}
              />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.form}>
            {children}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              accessibilityRole="button"
              onPress={onSubmit}
              disabled={submitDisabled || loading}
              style={({ pressed }) => [
                styles.submit,
                (submitDisabled || loading) && styles.submitDisabled,
                pressed && !submitDisabled && !loading && styles.submitPressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.accent} />
              ) : (
                <Text
                  style={[
                    styles.submitText,
                    submitDisabled && styles.submitTextDisabled,
                  ]}
                >
                  {submitLabel}
                </Text>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerPrompt}>{footerPrompt}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={onFooterPress}
              hitSlop={6}
            >
              <Text style={styles.footerAction}>{footerActionLabel}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 32,
    },
    heading: {
      alignItems: "center",
      gap: 8,
      marginBottom: 28,
    },
    badge: {
      width: 64,
      height: 64,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accentSoft,
      marginBottom: 4,
    },
    title: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 28,
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: "center",
    },
    form: {
      gap: 16,
    },
    submit: {
      height: 52,
      marginTop: 8,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent,
    },
    submitPressed: {
      opacity: 0.88,
    },
    submitDisabled: {
      backgroundColor: colors.surfaceMuted,
    },
    submitText: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 15,
      color: colors.onAccent,
    },
    submitTextDisabled: {
      color: colors.textSubtle,
    },
    error: {
      fontSize: 13,
      color: colors.danger,
      textAlign: "center",
    },
    footer: {
      marginTop: "auto",
      paddingTop: 28,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    footerPrompt: {
      fontSize: 14,
      color: colors.textMuted,
    },
    footerAction: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 14,
      color: colors.accent,
    },
  });
