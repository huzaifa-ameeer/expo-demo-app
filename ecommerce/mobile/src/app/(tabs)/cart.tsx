import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/screen";
import { PRODUCTS } from "@/data/products";
import { useShopStore } from "@/store/use-shop-store";
import { useToastStore } from "@/store/use-toast-store";
import { type ThemeColors, useTheme } from "@/theme/theme";

export default function CartScreen() {
  const cart = useShopStore((state) => state.cart);
  const addToCart = useShopStore((state) => state.addToCart);
  const decrementFromCart = useShopStore((state) => state.decrementFromCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const showToast = useToastStore((state) => state.showToast);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const items = PRODUCTS.filter((product) => cart[product.id]).map(
    (product) => ({ product, quantity: cart[product.id] }),
  );
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <Screen title="Cart" subtitle="Review the items you are ready to buy.">
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={32} color={colors.textSubtle} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="Cart" subtitle="Review the items you are ready to buy.">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items.map(({ product, quantity }) => (
          <View key={product.id} style={styles.card}>
            <Image
              source={product.image}
              style={styles.image}
              contentFit="cover"
              transition={150}
            />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <View style={styles.stepper}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Decrease ${product.name} quantity`}
                  onPress={() => decrementFromCart(product.id)}
                  style={styles.stepButton}
                  hitSlop={6}
                >
                  <Ionicons name="remove" size={14} color={colors.text} />
                </Pressable>
                <Text style={styles.quantity}>{quantity}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Increase ${product.name} quantity`}
                  onPress={() => addToCart(product.id)}
                  style={styles.stepButton}
                  hitSlop={6}
                >
                  <Ionicons name="add" size={14} color={colors.text} />
                </Pressable>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${product.name} from cart`}
              onPress={() => {
                removeFromCart(product.id);
                showToast(`${product.name} removed from cart`, "cart");
              }}
              style={styles.removeButton}
              hitSlop={6}
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color={colors.textMuted}
              />
            </Pressable>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    empty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingBottom: 48,
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSubtle,
    },
    list: {
      gap: 12,
      paddingBottom: 24,
    },
    card: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      padding: 10,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.borderSoft,
    },
    image: {
      width: 72,
      height: 72,
      borderRadius: 12,
      backgroundColor: colors.imagePlaceholder,
    },
    info: {
      flex: 1,
      gap: 2,
    },
    name: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    price: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 14,
      color: colors.text,
    },
    stepper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 6,
    },
    stepButton: {
      width: 26,
      height: 26,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceMuted,
    },
    quantity: {
      minWidth: 16,
      textAlign: "center",
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 13,
      color: colors.text,
    },
    removeButton: {
      padding: 4,
    },
    totalRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.borderSoft,
    },
    totalLabel: {
      fontSize: 14,
      color: colors.textMuted,
    },
    totalValue: {
      fontFamily: "SpaceGrotesk_700Bold",
      fontSize: 18,
      color: colors.text,
    },
  });
