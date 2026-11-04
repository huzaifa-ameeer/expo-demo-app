import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/screen";
import { PRODUCTS } from "@/data/products";
import { useShopStore } from "@/store/use-shop-store";
import { useToastStore } from "@/store/use-toast-store";

export default function FavouritesScreen() {
  const likedIds = useShopStore((state) => state.likedIds);
  const toggleLike = useShopStore((state) => state.toggleLike);
  const addToCart = useShopStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  const favourites = PRODUCTS.filter((product) => likedIds[product.id]);

  return (
    <Screen title="Favourites" subtitle="Products you have saved for later.">
      {favourites.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={32} color="#9CA3AF" />
          <Text style={styles.emptyText}>No favourites yet</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {favourites.map((product) => (
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
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${product.name} from favourites`}
                onPress={() => {
                  toggleLike(product.id);
                  showToast("Removed from favourites", "favourite");
                }}
                style={styles.iconButton}
                hitSlop={6}
              >
                <Ionicons name="heart" size={18} color="#EF4444" />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Add ${product.name} to cart`}
                onPress={() => {
                  addToCart(product.id);
                  showToast(`${product.name} added to cart`, "cart");
                }}
                style={styles.cartButton}
                hitSlop={6}
              >
                <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
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
    alignItems: "center",
    gap: 12,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F2F4",
  },
  image: {
    width: 60,
    height: 60,
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
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
  },
  cartButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },
});
