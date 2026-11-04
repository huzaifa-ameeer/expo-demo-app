import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";

import { useTheme } from "@/theme/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];
type IconColor = ComponentProps<typeof Ionicons>["color"];

function tabIcon(activeIcon: IconName, inactiveIcon: IconName) {
  return ({
    color,
    size,
    focused,
  }: {
    color: unknown;
    size: number;
    focused: boolean;
  }) => (
    <Ionicons
      name={focused ? activeIcon : inactiveIcon}
      size={size}
      color={color as IconColor}
    />
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 62,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "SpaceGrotesk_700Bold",
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: tabIcon("home", "home-outline"),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: tabIcon("heart", "heart-outline"),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: tabIcon("cart", "cart-outline"),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: tabIcon("receipt", "receipt-outline"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: tabIcon("person", "person-outline"),
        }}
      />
    </Tabs>
  );
}
