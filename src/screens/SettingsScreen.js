import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Linking } from "react-native";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" address="*Dirección*" showSearch={false} />

      <View style={styles.content}>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>
          Personaliza tu experiencia y ajusta la información de tu cuenta.
        </Text>

        <CustomButton title="Editar Perfil" icon="person-circle-outline" backgroundColor={Colors.primary} color={Colors.dark} fullWidth onPress={() => alert("Funcionalidad en desarrollo")} />
        <CustomButton title="Notificaciones" icon="notifications-outline" backgroundColor="#fff" color={Colors.dark} fullWidth onPress={() => alert("Configurar notificaciones")} />
      </View>

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
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: Colors.dark, marginBottom: 10 },
  subtitle: { color: Colors.gray, marginBottom: 25, textAlign: "center" },
  footer: { paddingHorizontal: 20, paddingBottom: 10, marginBottom: 25 },
});
