import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/screen";
import { useAuthStore } from "@/store/use-auth-store";
import { type ThemeColors, useTheme } from "@/theme/theme";

const initialsFor = (name: string) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return initials || "U";
};

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!user) {
    return (
      <Screen title="Profile" subtitle="Manage your account and preferences.">
        <View style={styles.center}>
          <View style={styles.guestAvatar}>
            <Ionicons name="person-outline" size={34} color={colors.accent} />
          </View>
          <Text style={styles.guestTitle}>You're not signed in</Text>
          <Text style={styles.guestText}>
            Sign in to view your account details and manage your preferences.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/login")}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/register")}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>Create an account</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="Profile" subtitle="Manage your account and preferences.">
      <View style={styles.center}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initialsFor(user.name)}</Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>

        <View style={styles.emailRow}>
          <Ionicons name="mail-outline" size={15} color={colors.textMuted} />
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={logout}
          disabled={isSubmitting}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.buttonPressed,
            isSubmitting && styles.buttonDisabled,
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.danger} />
          ) : (
            <>
              <Ionicons
                name="log-out-outline"
                size={18}
                color={colors.danger}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingBottom: 48,
    },
    guestAvatar: {
      width: 88,
      height: 88,
      borderRadius: 44,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accentSoft,
      marginBottom: 6,
    },
    guestTitle: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 18,
      color: colors.text,
    },
    guestText: {
      maxWidth: 280,
      fontSize: 14,
      lineHeight: 20,
      color: colors.textMuted,
      textAlign: "center",
      marginBottom: 10,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent,
      marginBottom: 6,
    },
    initials: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 34,
      color: colors.onAccent,
    },
    name: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 22,
      color: colors.text,
      textAlign: "center",
    },
    emailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 18,
    },
    email: {
      fontSize: 14,
      color: colors.textMuted,
    },
    primaryButton: {
      alignSelf: "stretch",
      maxWidth: 320,
      width: "100%",
      height: 50,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent,
    },
    primaryButtonText: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 15,
      color: colors.onAccent,
    },
    secondaryButton: {
      alignSelf: "stretch",
      maxWidth: 320,
      width: "100%",
      height: 50,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryButtonText: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 15,
      color: colors.text,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      alignSelf: "stretch",
      maxWidth: 320,
      width: "100%",
      height: 50,
      borderRadius: 14,
      backgroundColor: colors.dangerSoft,
      borderWidth: 1,
      borderColor: colors.dangerBorder,
    },
    logoutText: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 15,
      color: colors.danger,
    },
    buttonPressed: {
      opacity: 0.85,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
  });
