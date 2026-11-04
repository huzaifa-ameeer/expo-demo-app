import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PRODUCTS } from "@/data/products";
import { apiRequest } from "@/lib/api";
import { useShopStore } from "@/store/use-shop-store";
import { useToastStore } from "@/store/use-toast-store";

const GAP = 12;

const BANNERS = [
  {
    id: "1",
    uri: "https://picsum.photos/seed/summer-sale/1200/600",
  },
  {
    id: "2",
    uri: "https://picsum.photos/seed/new-arrivals/1200/600",
  },
  {
    id: "3",
    uri: "https://picsum.photos/seed/flash-deals/1200/600",
  },
  {
    id: "4",
    uri: "https://picsum.photos/seed/free-shipping/1200/600",
  },
];

type Category = {
  _id: string;
  name: string;
  icon: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { _id: "electronics", name: "Electronics", icon: "phone-portrait-outline" },
  { _id: "fashion", name: "Fashion", icon: "shirt-outline" },
  { _id: "groceries", name: "Groceries", icon: "basket-outline" },
  { _id: "home", name: "Home", icon: "home-outline" },
  { _id: "beauty", name: "Beauty", icon: "sparkles-outline" },
  { _id: "sports", name: "Sports", icon: "football-outline" },
  { _id: "toys", name: "Toys", icon: "game-controller-outline" },
  { _id: "books", name: "Books", icon: "book-outline" },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;
  const bannerListRef = useRef<FlatList<(typeof BANNERS)[number]>>(null);
  const activeIndex = useRef(0);
  const likedIds = useShopStore((state) => state.likedIds);
  const cart = useShopStore((state) => state.cart);
  const toggleLike = useShopStore((state) => state.toggleLike);
  const addToCart = useShopStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const [categories, setCategories] =
    useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    let active = true;

    apiRequest<Category[]>("/api/categories")
      .then((data) => {
        if (active) {
          setCategories(data);
        }
      })
      .catch(() => {
        // Keep the default categories if the API is unreachable.
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeIndex.current + 1) % BANNERS.length;
      activeIndex.current = next;
      bannerListRef.current?.scrollToOffset({
        offset: next * (cardWidth + GAP),
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [cardWidth]);

  const handleBannerScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    activeIndex.current = Math.round(
      event.nativeEvent.contentOffset.x / (cardWidth + GAP),
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.homeTitle}>Home</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search products"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        <FlatList
          ref={bannerListRef}
          data={BANNERS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + GAP}
          decelerationRate="fast"
          onMomentumScrollEnd={handleBannerScrollEnd}
          contentContainerStyle={styles.bannerList}
          renderItem={({ item }) => (
            <Image
              source={item.uri}
              style={[styles.banner, { width: cardWidth }]}
              contentFit="cover"
              transition={200}
            />
          )}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categorySection}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => (
            <View key={category._id} style={styles.category}>
              <View style={styles.categoryIcon}>
                <Ionicons
                  name={
                    category.icon as ComponentProps<typeof Ionicons>["name"]
                  }
                  size={22}
                  color="#FF5A1F"
                />
              </View>
              <Text style={styles.categoryLabel}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.productGrid}>
          {PRODUCTS.map((product) => {
            const quantity = cart[product.id] ?? 0;
            const liked = Boolean(likedIds[product.id]);

            return (
              <View
                key={product.id}
                style={[styles.productCard, { width: (width - 52) / 2 }]}
              >
                <View>
                  <Image
                    source={product.image}
                    style={styles.productImage}
                    contentFit="cover"
                    transition={200}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      liked
                        ? `Remove ${product.name} from favourites`
                        : `Add ${product.name} to favourites`
                    }
                    onPress={() => {
                      toggleLike(product.id);
                      showToast(
                        liked
                          ? "Removed from favourites"
                          : "Added to favourites",
                        "favourite",
                      );
                    }}
                    style={styles.likeButton}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={liked ? "heart" : "heart-outline"}
                      size={18}
                      color={liked ? "#EF4444" : "#374151"}
                    />
                  </Pressable>
                </View>

                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    addToCart(product.id);
                    showToast(`${product.name} added to cart`, "cart");
                  }}
                  style={[
                    styles.addButton,
                    quantity > 0 && styles.addButtonActive,
                  ]}
                >
                  <Ionicons
                    name={quantity > 0 ? "checkmark" : "cart-outline"}
                    size={14}
                    color="#FFFFFF"
                  />
                  <Text style={styles.addButtonText}>
                    {quantity > 0 ? `In cart · ${quantity}` : "Add to cart"}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    paddingBottom: 24,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 48,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  bannerList: {
    paddingHorizontal: 20,
    gap: GAP,
  },
  banner: {
    height: 180,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
  },
  homeTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 26,
    color: "#111827",
    textAlign: "center",
  },
  categorySection: {
    marginTop: 20,
  },
  categoryRow: {
    paddingHorizontal: 20,
    gap: 16,
  },
  category: {
    alignItems: "center",
    width: 76,
    gap: 8,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF1EA",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 28,
  },
  productCard: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F1F2F4",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
  },
  likeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  productName: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  productPrice: {
    marginTop: 2,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 15,
    color: "#111827",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 36,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#111827",
  },
  addButtonActive: {
    backgroundColor: "#FF5A1F",
  },
  addButtonText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
