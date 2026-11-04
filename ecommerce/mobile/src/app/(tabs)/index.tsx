import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const CATEGORIES: {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
}[] = [
  { label: "Electronics", icon: "phone-portrait-outline" },
  { label: "Fashion", icon: "shirt-outline" },
  { label: "Groceries", icon: "basket-outline" },
  { label: "Home", icon: "home-outline" },
  { label: "Beauty", icon: "sparkles-outline" },
  { label: "Sports", icon: "football-outline" },
  { label: "Toys", icon: "game-controller-outline" },
  { label: "Books", icon: "book-outline" },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;
  const bannerListRef = useRef<FlatList<(typeof BANNERS)[number]>>(null);
  const activeIndex = useRef(0);

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

        <Text style={styles.homeTitle}>Home</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((category) => (
            <View key={category.label} style={styles.category}>
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={22} color="#FF5A1F" />
              </View>
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </View>
          ))}
        </ScrollView>
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
    marginTop: 24,
    marginBottom: 16,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 26,
    color: "#111827",
    textAlign: "center",
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
});
