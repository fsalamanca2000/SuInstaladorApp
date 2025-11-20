import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { useReportes } from "../context/ReportesContext";
import { useUser } from "../context/UserContext";

export default function ReportesScreen() {
  const { addReport } = useReportes();
  const { currentUser } = useUser();

  const [type, setType] = useState("Servicio");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSend = () => {
    if (!category || !description) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }

    addReport({
      userId: currentUser?.id,
      type,
      category,
      description,
      image,
    });

    Alert.alert("Enviado", "Tu reporte fue registrado.");
    setCategory("");
    setDescription("");
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name}
        address={currentUser?.address}
        userImage={currentUser?.image}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Reportes e Informes</Text>

        {/* Selector tipo */}
        <Text style={styles.label}>Tipo de reporte</Text>
        <View style={styles.selectorRow}>
          {["Servicio", "Aplicación"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.selectorBtn, type === t && styles.selectorActive]}
              onPress={() => setType(t)}
            >
              <Text
                style={[
                  styles.selectorText,
                  type === t && styles.selectorTextActive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categoría */}
        <Text style={styles.label}>Categoría</Text>
        <TextInput
          style={styles.input}
          placeholder={
            type === "Servicio"
              ? "Ej: Instalador no llegó, daño parcial..."
              : "Ej: Error en la app, pantallas congeladas..."
          }
          value={category}
          onChangeText={setCategory}
        />

        {/* Descripción */}
        <Text style={styles.label}>Descripción detallada</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          multiline
          textAlignVertical="top"
          placeholder="Describe lo ocurrido..."
          value={description}
          onChangeText={setDescription}
        />

        {/* Imagen */}
        <Text style={styles.label}>Adjuntar imagen (opcional)</Text>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: Colors.gray }}>Seleccionar imagen</Text>
            </View>
          )}
        </TouchableOpacity>

        <CustomButton
          title="Enviar reporte"
          backgroundColor={Colors.primary}
          fullWidth
          onPress={handleSend}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.dark,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 8,
    marginTop: 10,
  },

  selectorRow: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },

  selectorBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  selectorActive: {
    backgroundColor: Colors.primary,
  },

  selectorText: {
    color: Colors.dark,
  },

  selectorTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },

  imagePlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
