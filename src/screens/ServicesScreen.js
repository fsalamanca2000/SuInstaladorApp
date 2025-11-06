import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Linking } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

export default function ServicesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      <View style={styles.content}>
        <Text style={styles.title}>Servicios Disponibles</Text>

        <CustomButton title="Instalación de aire acondicionado" backgroundColor="#fff" color={Colors.dark} fullWidth onPress={() => navigation.navigate("ServiceInfo")} />
        <CustomButton title="Reparación eléctrica" backgroundColor="#fff" color={Colors.dark} fullWidth onPress={() => navigation.navigate("ServiceInfo")} />
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: Colors.dark },
  footer: { paddingHorizontal: 20, paddingBottom: 10, marginBottom: 25 },
});
