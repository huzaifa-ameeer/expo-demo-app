import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useToastStore } from "@/store/use-toast-store";
import { type ThemeColors, useTheme } from "@/theme/theme";

export function ToastHost() {
  const toast = useToastStore((state) => state.toast);
  const hideToast = useToastStore((state) => state.hideToast);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-16)).current;
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    opacity.setValue(0);
    translateY.setValue(-16);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          hideToast(toast.id);
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast, opacity, translateY, hideToast]);

  if (!toast) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        {
          top: insets.top + 10,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View
        style={[
          styles.icon,
          toast.kind === "favourite" ? styles.iconFavourite : styles.iconCart,
        ]}
      >
        <Ionicons
          name={toast.kind === "favourite" ? "heart" : "cart"}
          size={14}
          color="#FFFFFF"
        />
      </View>
      <Text style={styles.message} numberOfLines={1}>
        {toast.message}
      </Text>
    </Animated.View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    toast: {
      position: "absolute",
      left: 20,
      right: 20,
      zIndex: 1000,
      elevation: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: colors.toast,
    },
    icon: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    iconCart: {
      backgroundColor: colors.accent,
    },
    iconFavourite: {
      backgroundColor: colors.danger,
    },
    message: {
      flexShrink: 1,
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 13,
      color: colors.onToast,
    },
  });
