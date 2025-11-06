import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Linking } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

export default function ServiceInfoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      <View style={styles.content}>
        <Text style={styles.title}>Detalles del servicio</Text>
        <Text style={styles.text}>
          Aquí se mostrarán los detalles del servicio, instaladores disponibles, precios, etc.
        </Text>

        <CustomButton
          title="Reservar Servicio"
          backgroundColor={Colors.primary}
          fullWidth
          onPress={() => alert("Funcionalidad en desarrollo")}
        />
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
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: Colors.dark },
  text: { color: Colors.gray, marginBottom: 20 },
  footer: { paddingHorizontal: 20, paddingBottom: 10, marginBottom: 25 },
});
