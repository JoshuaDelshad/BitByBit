import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryBar, { Category } from "../../components/CategoryBar";

/** ----- Hardcoded data ----- */
type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: "Consoles" | "Accessories";
};

const consoles: Product[] = [
  {
    id: "c1",
    title: "PlayStation 5",
    price: 499.99,
    imageUrl:
      "https://www.billboard.com/wp-content/uploads/2023/07/Marvel-s-Spider-Man-2-Limited-Edition-cr-Sony-billboard-1548.png?w=942&h=628&crop=1",
    category: "Consoles",
  },
  {
    id: "c2",
    title: "Xbox Series X",
    price: 499.99,
    imageUrl:
      "https://assets.xboxservices.com/assets/59/10/5910d098-6cb4-459e-a3bf-10972df27ac7.jpg?n=Xbox-Wireless-Controller_Image-Hero_1084_Blue_1920x831_01.jpg",
    category: "Consoles",
  },
];

const accessories: Product[] = [
  {
    id: "a1",
    title: "DualSense Controller",
    price: 69.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-76b3b302b5c8?q=80&w=1200&auto=format&fit=crop",
    category: "Accessories",
  },
  {
    id: "a2",
    title: "Xbox Wireless Headset",
    price: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1610382991935-1cf7e2c1c3e9?q=80&w=1200&auto=format&fit=crop",
    category: "Accessories",
  },
];

export default function SearchScreen() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [loading] = useState(false);

  const visible = useMemo(() => {
    let base: Product[] = [];
    if (category === "Consoles") base = consoles;
    else if (category === "Accessories") base = accessories;
    else if (category === "All") base = [...consoles, ...accessories];
    else if (category === "Games") base = [];

    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter((p) => p.title.toLowerCase().includes(q));
  }, [category, query]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>GameStart Search</Text>

          {/* <TouchableOpacity onPress={() => router.push("/signIn")}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}>Cart (0)</Text>
          </TouchableOpacity> */}
        </View>

        {/* Search bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search games, consoles, accessories..."
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
      </View>

      {/* Category bar with spacing below */}
      <View style={styles.categoryWrapper}>
        <CategoryBar
          categories={["All", "Games", "Consoles", "Accessories"]}
          value={category}
          onChange={setCategory}
        />
      </View>

      {category === "Games" && (
        <Text style={styles.notice}>
          Games API is disabled. Choose Consoles or Accessories.
        </Text>
      )}

      {/* Product grid */}
      {loading ? (
        <ActivityIndicator color="#00ffff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(i) => i.id}
          numColumns={2}
          columnWrapperStyle={{ columnGap: 14 }}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.cta}>
                <Text style={styles.ctaText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No items match your search.</Text>
          }
        />
      )}
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    backgroundColor: "#000",
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    width: "95%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  logo: { color: "#00ffff", fontSize: 28, fontWeight: "bold" },
  signInText: { color: "#00ffff", fontWeight: "600", fontSize: 14 },
  cartButton: {
    backgroundColor: "#00ffff",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  cartText: { color: "#000", fontWeight: "bold" },

  searchBar: {
    width: "95%",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#2b2b2b",
    marginBottom: 6,
  },

  categoryWrapper: {
    marginBottom: 8,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },

  card: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    padding: 12,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { color: "#e9eef5", fontWeight: "800" },
  price: { color: "#84e6ff", marginVertical: 6, fontWeight: "800" },
  cta: {
    backgroundColor: "#00ffff",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  ctaText: { color: "#000", fontWeight: "900" },
  empty: { color: "#9bb2c9", textAlign: "center", marginTop: 16 },
  notice: { color: "#9bb2c9", paddingHorizontal: 16, marginBottom: 6 },
});
