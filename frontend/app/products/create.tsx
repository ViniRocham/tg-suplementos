import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import { useProductStore } from "../../store/productStore";
import { categories } from "../../data/mockData";

export default function CreateProduct() {
  const addProduct = useProductStore((state) => state.addProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  function handleSave() {
    if (!name || !description || !price || !stock) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    addProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      imageUrl: "https://via.placeholder.com/300",
      categoryId,
    });

    router.back();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Produto</Text>

      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#999" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Descrição" placeholderTextColor="#999" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Preço" placeholderTextColor="#999" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Estoque" placeholderTextColor="#999" keyboardType="numeric" value={stock} onChangeText={setStock} />

      <Text style={styles.label}>Categoria</Text>

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.categoryButton, categoryId === category.id && styles.categorySelected]}
          onPress={() => setCategoryId(category.id)}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar produto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24, paddingTop: 60 },
  title: { color: "#22c55e", fontSize: 32, fontWeight: "bold", marginBottom: 24 },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#333",
  },
  label: { color: "#fff", fontSize: 18, fontWeight: "bold", marginVertical: 12 },
  categoryButton: {
    backgroundColor: "#1f1f1f",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 10,
  },
  categorySelected: { borderColor: "#22c55e", backgroundColor: "#12351f" },
  categoryText: { color: "#fff", fontWeight: "bold" },
  button: { backgroundColor: "#22c55e", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 20 },
  backButton: { backgroundColor: "#333", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 12, marginBottom: 40 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});