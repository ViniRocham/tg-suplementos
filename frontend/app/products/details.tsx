import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useProductStore } from "../../store/productStore";
import { categories } from "../../data/mockData";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = useProductStore((state) => state.getProductById(Number(id)));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Produto não encontrado</Text>
      </View>
    );
  }

  const category = categories.find((cat) => cat.id === product.categoryId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.category}>{category?.name}</Text>

      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

      <Text style={styles.stock}>Estoque disponível: {product.stock}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24, justifyContent: "center" },
  title: { color: "#22c55e", fontSize: 32, fontWeight: "bold", marginBottom: 12 },
  category: { color: "#22c55e", fontSize: 16, marginBottom: 24 },
  description: { color: "#fff", fontSize: 18, lineHeight: 26, marginBottom: 24 },
  price: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  stock: { color: "#aaa", fontSize: 16, marginBottom: 32 },
  button: { backgroundColor: "#22c55e", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});