import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import Header from "../components/Header";
import Colors from "../constants/Colors";
import { useUser } from "../context/UserContext";

export default function ReportDetailsScreen({ route, navigation }) {
  const { currentUser } = useUser();
  const { report } = route.params; // ⬅ Recibimos los datos completos

  const formattedDate = new Date(report.createdAt).toLocaleString("es-CO");

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name}
        address={currentUser?.address}
        userImage={currentUser?.image}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Detalles del Reporte</Text>

        {/* Tipo */}
        <Text style={styles.label}>Tipo de reporte</Text>
        <Text style={styles.value}>{report.type}</Text>

        {/* Mensaje */}
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.message}>{report.message}</Text>

        {/* Imagen si existe */}
        {report.image ? (
          <>
            <Text style={styles.label}>Imagen adjunta</Text>
            <Image
              source={{ uri: report.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Imagen adjunta</Text>
            <Text style={{ color: "#666", marginBottom: 15 }}>
              No hay imagen adjunta
            </Text>
          </>
        )}

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{formattedDate}</Text>

        {/* Estado */}
        <Text style={styles.label}>Estado</Text>
        <View
          style={[
            styles.statusBox,
            report.status === "Pendiente" && { backgroundColor: "#ffcc80" },
            report.status === "En revisión" && { backgroundColor: "#81d4fa" },
            report.status === "Resuelto" && { backgroundColor: "#a5d6a7" },
            report.status === "Rechazado" && { backgroundColor: "#ef9a9a" },
          ]}
        >
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
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
  backButton: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 15,
    color: Colors.dark,
  },
  value: {
    fontSize: 15,
    paddingVertical: 4,
    color: "#333",
  },
  message: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 15,
  },
  statusBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  statusText: {
    color: "#000",
    fontWeight: "700",
  },
});
