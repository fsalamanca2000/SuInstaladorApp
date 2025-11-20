// src/screens/MisReportesScreen.js

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import Header from "../components/Header";
import Colors from "../constants/Colors";
import { useUser } from "../context/UserContext";

import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

export default function MisReportesScreen({ navigation }) {
  const { currentUser } = useUser();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Todos");

  /** 🔥 Cargar reportes desde Firebase */
  const loadReports = () => {
    if (!currentUser?.uid) return;

    setLoading(true);

    const reportsRef = ref(database, `reportsByUser/${currentUser.uid}`);

    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const parsed = Object.values(data).sort(
          (a, b) => b.createdAt - a.createdAt // más recientes arriba
        );
        setReports(parsed);
      } else {
        setReports([]);
      }

      setLoading(false);
    });
  };

  /** 🔥 Cargar al entrar */
  useEffect(() => {
    loadReports();
  }, [currentUser]);

  /** 🔍 Filtro */
  const filteredReports =
    filter === "Todos"
      ? reports
      : reports.filter((r) => r.status === filter);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name}
        address={currentUser?.address}
        userImage={currentUser?.image}
      />

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadReports} />
        }
      >
        <Text style={styles.title}>Mis Reportes</Text>

        {/* FILTRO POR ESTADO */}
        <View style={styles.filterRow}>
          {["Todos", "Pendiente", "En revisión", "Resuelto", "Rechazado"].map(
            (f) => (
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
            )
          )}
        </View>

        {/* LISTA */}
        {filteredReports.length === 0 ? (
          <Text style={{ marginTop: 20, color: "#666" }}>
            No hay reportes {filter !== "Todos" ? `(${filter})` : ""}.
          </Text>
        ) : (
          filteredReports.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.type}</Text>
              <Text style={styles.cardMessage}>{item.message}</Text>

              <Text style={styles.status}>Estado: {item.status}</Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() =>
                  navigation.navigate("ReportDetails", {
                    report: item,
                  })
                }
              >
                <Text style={styles.detailsText}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.dark,
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 4,
  },
  cardMessage: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  status: {
    color: Colors.primary,
    fontWeight: "600",
    marginBottom: 10,
  },
  detailsButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.dark,
    borderRadius: 8,
  },
  detailsText: {
    color: "#fff",
    fontWeight: "600",
  },
});
