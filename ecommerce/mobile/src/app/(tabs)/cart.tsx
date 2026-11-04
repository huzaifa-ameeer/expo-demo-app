import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/screen";
import { PRODUCTS } from "@/data/products";
import { useShopStore } from "@/store/use-shop-store";
import { useToastStore } from "@/store/use-toast-store";

export default function CartScreen() {
  const cart = useShopStore((state) => state.cart);
  const addToCart = useShopStore((state) => state.addToCart);
  const decrementFromCart = useShopStore((state) => state.decrementFromCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const showToast = useToastStore((state) => state.showToast);

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
          <Ionicons name="cart-outline" size={32} color="#9CA3AF" />
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
                  <Ionicons name="remove" size={14} color="#111827" />
                </Pressable>
                <Text style={styles.quantity}>{quantity}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Increase ${product.name} quantity`}
                  onPress={() => addToCart(product.id)}
                  style={styles.stepButton}
                  hitSlop={6}
                >
                  <Ionicons name="add" size={14} color="#111827" />
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
              <Ionicons name="trash-outline" size={18} color="#6B7280" />
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

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingBottom: 48,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F2F4",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  price: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    color: "#111827",
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
    backgroundColor: "#F3F4F6",
  },
  quantity: {
    minWidth: 16,
    textAlign: "center",
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#111827",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F2F4",
  },
  totalLabel: {
    fontSize: 14,
    color: "#374151",
  },
  totalValue: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
    color: "#111827",
  },
});
