import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Vini() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vinicius Rocha</Text>

      <Text style={styles.text}>
        Responsável pelo desenvolvimento do app mobile, estruturação das telas,
        navegação com Expo Router, gerenciamento global com Zustand e integração
        com backend.
      </Text>

      <Text style={styles.badge}>React Native + Expo</Text>
      <Text style={styles.badge}>Zustand</Text>
      <Text style={styles.badge}>Flask API</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 24, justifyContent: "center" },
  title: { color: "#22c55e", fontSize: 32, fontWeight: "bold", marginBottom: 24 },
  text: { color: "#fff", fontSize: 16, lineHeight: 24, marginBottom: 24 },
  badge: {
    color: "#fff",
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#22c55e",
  },
  button: { backgroundColor: "#22c55e", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 24 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});