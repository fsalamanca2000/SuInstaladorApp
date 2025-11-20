import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import Colors from "../constants/Colors";
import { useReservations } from "../context/ReservationsContext";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

// 🔥 IMPORTANTE: para cargar imágenes locales
import { IMAGE_MAP } from "../data/imageMap";

export default function MyReservationsScreen() {
  const { reservations, cancelReservation, completeReservation } =
    useReservations();

  const [filter, setFilter] = useState("Pendiente");

  // Filtrar según estado
  const filteredReservations = reservations.filter((r) => {
    if (filter === "Finalizadas") return r.status === "Completada";
    return r.status === filter;
  });

  return (
    <View style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Mis Reservas</Text>

        {/* 🔽 Filtros */}
        <View style={styles.filterRow}>
          {["Pendiente", "Finalizadas", "Cancelada"].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sin reservas */}
        {filteredReservations.length === 0 && (
          <Text style={styles.empty}>No hay reservas en esta categoría.</Text>
        )}

        {/* Tarjetas */}
        {filteredReservations.map((res) => (
          <View key={res.id} style={styles.card}>
            <Image
              source={
                IMAGE_MAP[res.image]
                  ? IMAGE_MAP[res.image]
                  : typeof res.image === "number"
                  ? res.image
                  : { uri: res.image }
              }
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.service}>{res.title}</Text>

              <Text style={styles.line}>📅 Fecha: {res.date}</Text>
              <Text style={styles.line}>⏰ Hora: {res.hour}</Text>
              <Text style={styles.line}>🔧 Cantidad: {res.quantity}</Text>
              <Text style={styles.line}>
                👷 Instaladores: {res.installersNeeded}
              </Text>
              <Text style={styles.line}>
                💰 Total: ${res.totalPrice.toLocaleString("es-CO")}
              </Text>

              {/* Estado */}
              <Text
                style={[
                  styles.status,
                  res.status === "Pendiente" && styles.statusPending,
                  res.status === "Cancelada" && styles.statusCanceled,
                  res.status === "Completada" && styles.statusCompleted,
                ]}
              >
                Estado: {res.status}
              </Text>

              {/* Botones según estado */}
              {res.status === "Pendiente" && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => completeReservation(res.id)}
                  >
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color="#fff"
                    />
                    <Text style={styles.actionText}>Marcar Finalizada</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => cancelReservation(res.id)}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color="#fff"
                    />
                    <Text style={styles.actionText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.dark,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: Colors.gray,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
  },

  filterButtonActive: {
    backgroundColor: Colors.primary,
  },

  filterText: {
    color: Colors.dark,
    fontWeight: "500",
  },

  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  image: {
    width: "100%",
    height: 120,
  },

  info: {
    padding: 15,
  },

  service: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 10,
  },

  line: {
    fontSize: 14,
    color: Colors.dark,
    marginBottom: 4,
  },

  status: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 13,
  },

  statusPending: {
    backgroundColor: "#ffdd57",
    color: "#5a4800",
  },

  statusCanceled: {
    backgroundColor: "#ff6b6b",
    color: "#fff",
  },

  statusCompleted: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  completeButton: {
    flex: 1,
    backgroundColor: "#4caf50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#d9534f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
