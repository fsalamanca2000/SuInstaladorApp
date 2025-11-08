import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function PromoCard({ title = "¿Listos para tu nuevo servicio?" }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Services"); // Redirige a la pantalla de servicios
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Servicios</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: "600",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
