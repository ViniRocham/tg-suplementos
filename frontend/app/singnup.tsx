import { View, Text, StyleSheet } from "react-native";

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tela de Cadastro
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});