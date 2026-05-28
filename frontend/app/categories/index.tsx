import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { categories } from "../../data/mockData";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>

      {categories.map((category) => (
        <View key={category.id} style={styles.card}>
          <Text style={styles.cardText}>{category.name}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24, paddingTop: 60 },
  title: { color: "#22c55e", fontSize: 32, fontWeight: "bold", marginBottom: 24 },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  button: { backgroundColor: "#22c55e", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 24 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});