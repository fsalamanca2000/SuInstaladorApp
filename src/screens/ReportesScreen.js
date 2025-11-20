import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";

import Header from "../components/Header";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

import * as ImagePicker from "expo-image-picker";
import { ref, push, set } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { useUser } from "../context/UserContext";

export default function ReportesScreen({ navigation }) {
  const { currentUser } = useUser();

  const [type, setType] = useState("Fallo en la aplicación");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  /** 📸 Seleccionar imagen */
  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!perm.granted) {
      return Alert.alert("Permiso requerido", "Debes permitir acceso a la galería.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /** 📌 Enviar Reporte */
  const submitReport = async () => {
    if (!message.trim()) {
      return Alert.alert("Error", "Por favor describe el problema.");
    }

    try {
      const reportId = push(ref(database, "reports")).key;

      const payload = {
        id: reportId,
        userId: currentUser?.uid || "anon",
        type,
        message,
        image: null, // Por ahora no se sube
        createdAt: Date.now(),
        status: "Pendiente",
      };

      // Guardar global
      await set(ref(database, `reports/${reportId}`), payload);

      // Guardar por usuario
      await set(
        ref(database, `reportsByUser/${currentUser?.uid}/${reportId}`),
        payload
      );

      Alert.alert("Enviado", "Tu reporte fue enviado correctamente.");

      setMessage("");
      setImage(null);

      navigation.goBack();
    } catch (err) {
      console.log("❌ Error al enviar reporte:", err);
      Alert.alert("Error", "No se pudo enviar el reporte.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name}
        address={currentUser?.address}
        userImage={currentUser?.image}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Reportes & Informes</Text>

          {/* BOTÓN → Mis Reportes */}
          <TouchableOpacity
            style={styles.myReportsButton}
            onPress={() => navigation.navigate("MisReportes")}
          >
            <Text style={styles.myReportsText}>Mis Reportes</Text>
          </TouchableOpacity>
        </View>

        {/* TIPO DE REPORTE */}
        <Text style={styles.label}>Tipo de reporte:</Text>

        <View style={styles.typeSelector}>
          {["Fallo en la aplicación", "Servicio mal ejecutado", "Otro"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.typeButton,
                  type === item && styles.typeButtonActive,
                ]}
                onPress={() => setType(item)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === item && styles.typeButtonTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* DESCRIPCIÓN */}
        <Text style={styles.label}>Descripción del problema:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe detalladamente..."
          placeholderTextColor="#888"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        {/* IMAGEN OPCIONAL */}
        <Text style={styles.label}>Adjuntar imagen (opcional)</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={{ color: "#666" }}>Seleccionar imagen</Text>
          )}
        </TouchableOpacity>

        <CustomButton
          title="Enviar reporte"
          backgroundColor={Colors.primary}
          onPress={submitReport}
        />
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  myReportsButton: {
    backgroundColor: Colors.dark,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  myReportsText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
    color: Colors.dark,
  },
  typeSelector: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 12,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary,
  },
  typeButtonText: {
    color: Colors.dark,
  },
  typeButtonTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  textArea: {
    backgroundColor: "#eee",
    borderRadius: 12,
    height: 120,
    padding: 12,
    textAlignVertical: "top",
  },
  imagePicker: {
    backgroundColor: "#f1f1f1",
    height: 150,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
