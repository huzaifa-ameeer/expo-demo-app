import { router } from "expo-router";
import { useEffect, useState } from "react";

import { AuthInput } from "@/components/auth-input";
import { AuthScreen } from "@/components/auth-screen";
import { useAuthStore } from "@/store/use-auth-store";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearError();
  }, [clearError]);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleSubmit = async () => {
    const success = await login(email.trim(), password);
    if (success) {
      router.replace("/profile");
    }
  };

  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Sign in to continue shopping."
      submitLabel="Sign in"
      onSubmit={handleSubmit}
      submitDisabled={!canSubmit}
      loading={isSubmitting}
      error={error}
      footerPrompt="New here?"
      footerActionLabel="Create an account"
      onFooterPress={() => router.replace("/register")}
    >
      <AuthInput
        label="Email"
        icon="mail-outline"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
      />
      <AuthInput
        label="Password"
        icon="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
    </AuthScreen>
  );
}
