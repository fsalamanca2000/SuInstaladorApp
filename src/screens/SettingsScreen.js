import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { Linking } from "react-native";

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header userName="User" address="*Dirección*" />

      {/* Título */}
      <Text style={styles.title}>Ajustes</Text>

      {/* Opciones de configuración */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={22} color={Colors.dark} />
          <Text style={styles.optionText}>Información Personal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Payments")}
        >
          <Ionicons name="card-outline" size={22} color={Colors.dark} />
          <Text style={styles.optionText}>Métodos de Pago</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => alert("Función de eliminar cuenta próximamente")}
        >
          <Ionicons name="close-outline" size={22} color={Colors.dark} />
          <Text style={styles.optionText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Footer con botón de servicio al cliente */}
      <View style={styles.footer}>
        <CustomButton
          title="Servicio al cliente"
          backgroundColor={Colors.dark}
          icon="logo-whatsapp"
          color="#fff"
          onPress={() =>
            Linking.openURL(
              "https://api.whatsapp.com/send/?phone=573235050110&text&type=phone_number&app_absent=0"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
    marginVertical: 15,
    marginLeft: 5,
  },
  optionsContainer: {
    marginTop: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    color: Colors.dark,
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: "auto",
    marginBottom: 25,
  },
});
