import { router } from "expo-router";
import { useEffect, useState } from "react";

import { AuthInput } from "@/components/auth-input";
import { AuthScreen } from "@/components/auth-screen";
import { useAuthStore } from "@/store/use-auth-store";

export default function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearError();
  }, [clearError]);

  const canSubmit =
    name.trim().length > 0 && email.trim().length > 0 && password.length >= 6;

  const handleSubmit = async () => {
    const success = await register(name.trim(), email.trim(), password);
    if (success) {
      router.replace("/profile");
    }
  };

  return (
    <AuthScreen
      title="Create account"
      subtitle="Join us and start shopping in seconds."
      submitLabel="Create account"
      onSubmit={handleSubmit}
      submitDisabled={!canSubmit}
      loading={isSubmitting}
      error={error}
      footerPrompt="Already have an account?"
      footerActionLabel="Sign in"
      onFooterPress={() => router.replace("/login")}
    >
      <AuthInput
        label="Full name"
        icon="person-outline"
        value={name}
        onChangeText={setName}
        placeholder="Jane Doe"
        autoCapitalize="words"
      />
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
        placeholder="At least 6 characters"
        secureTextEntry
      />
    </AuthScreen>
  );
}
