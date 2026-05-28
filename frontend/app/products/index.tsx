import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useProductStore } from "../../store/productStore";
import { categories } from "../../data/mockData";
import { useEffect } from "react";

export default function Products() {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore(
  (state) => state.deleteProduct
);

const fetchProducts = useProductStore(
  (state) => state.fetchProducts
);

  

  function getCategoryName(categoryId: number) {
    return categories.find((cat) => cat.id === categoryId)?.name || "Sem categoria";
  }

  function handleDelete(id: number) {
    Alert.alert("Excluir produto", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => deleteProduct(id) },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Produtos</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/products/create")}>
        <Text style={styles.buttonText}>Adicionar produto</Text>
      </TouchableOpacity>

      {products.map((product) => (
        <View key={product.id} style={styles.card}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.category}>{getCategoryName(product.categoryId)}</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          <Text style={styles.stock}>Estoque: {product.stock}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/products/details?id=${product.id}`)}
            >
              <Text style={styles.actionText}>Detalhes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/products/edit?id=${product.id}`)}
            >
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(product.id)}
            >
              <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24, paddingTop: 60 },
  title: { color: "#22c55e", fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#22c55e", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  productName: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  category: { color: "#22c55e", marginTop: 6 },
  price: { color: "#fff", fontSize: 18, marginTop: 8, fontWeight: "bold" },
  stock: { color: "#aaa", marginTop: 4 },
  actions: { flexDirection: "row", gap: 8, marginTop: 16, flexWrap: "wrap" },
  actionButton: { backgroundColor: "#333", padding: 10, borderRadius: 8 },
  deleteButton: { backgroundColor: "#ef4444", padding: 10, borderRadius: 8 },
  actionText: { color: "#fff", fontWeight: "bold" },
  backButton: { backgroundColor: "#333", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 40 },
});