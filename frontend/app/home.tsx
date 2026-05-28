import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/productStore";
import { categories } from "../data/mockData";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const products = useProductStore((state) => state.products);

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Olá, {user?.name || "usuário"} 👋</Text>
      <Text style={styles.title}>TG Supplements</Text>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/products")}>
          <Text style={styles.cardTitle}>Produtos</Text>
          <Text style={styles.cardText}>{products.length} cadastrados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/categories")}>
          <Text style={styles.cardTitle}>Categorias</Text>
          <Text style={styles.cardText}>{categories.length} disponíveis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/about")}>
          <Text style={styles.cardTitle}>Sobre</Text>
          <Text style={styles.cardText}>Conheça o projeto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/team/vini")}>
          <Text style={styles.cardTitle}>Integrante</Text>
          <Text style={styles.cardText}>Tela individual</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24 },
  welcome: { color: "#aaa", fontSize: 16, marginTop: 40 },
  title: { color: "#22c55e", fontSize: 34, fontWeight: "bold", marginBottom: 24 },
  menu: { gap: 16 },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  cardText: { color: "#aaa", marginTop: 8 },
  logoutButton: {
    marginTop: 32,
    marginBottom: 40,
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});