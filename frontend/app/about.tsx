import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Projeto</Text>

      <Text style={styles.text}>
        O TG Supplements é uma mini loja de suplementos desenvolvida com React Native,
        Expo Router, Zustand e integração planejada com backend Flask.
      </Text>

      <Text style={styles.text}>
        O projeto possui autenticação, CRUD de produtos, categorias e relacionamento
        entre produto e categoria.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24, justifyContent: "center" },
  title: { color: "#22c55e", fontSize: 32, fontWeight: "bold", marginBottom: 24 },
  text: { color: "#fff", fontSize: 16, lineHeight: 24, marginBottom: 16 },
  button: { backgroundColor: "#22c55e", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 24 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});