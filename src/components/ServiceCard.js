import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function ServiceCard({ service, onPress }) {
  if (!service) {
    return (
      <View style={styles.errorCard}>
        <Text style={{ color: "red" }}>Servicio no disponible</Text>
      </View>
    );
  }

  // 🔥 Como el ServicesContext ya garantiza require(), NO necesitamos uri
  const imageSource = service.image; 

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={14} color={Colors.dark} />
          <Text style={styles.infoText}>Desde {service.price} COP</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={14} color={Colors.dark} />
          <Text style={styles.infoText}>De {service.installers} Instaladores</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  errorCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 130,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  infoText: {
    fontSize: 12,
    color: Colors.dark,
    marginLeft: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
