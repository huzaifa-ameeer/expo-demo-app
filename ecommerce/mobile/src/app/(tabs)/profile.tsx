import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/screen";
import { useAuthStore } from "@/store/use-auth-store";

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

  if (!user) {
    return (
      <Screen title="Profile" subtitle="Manage your account and preferences.">
        <View style={styles.center}>
          <View style={styles.guestAvatar}>
            <Ionicons name="person-outline" size={34} color="#FF5A1F" />
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
          <Ionicons name="mail-outline" size={15} color="#6B7280" />
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
            <ActivityIndicator color="#EF4444" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FFF1EA",
    marginBottom: 6,
  },
  guestTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
    color: "#111827",
  },
  guestText: {
    maxWidth: 280,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5A1F",
    marginBottom: 6,
  },
  initials: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 34,
    color: "#FFFFFF",
  },
  name: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 22,
    color: "#111827",
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
    color: "#6B7280",
  },
  primaryButton: {
    alignSelf: "stretch",
    maxWidth: 320,
    width: "100%",
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5A1F",
  },
  primaryButtonText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    color: "#FFFFFF",
  },
  secondaryButton: {
    alignSelf: "stretch",
    maxWidth: 320,
    width: "100%",
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryButtonText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    color: "#111827",
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
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    color: "#EF4444",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
