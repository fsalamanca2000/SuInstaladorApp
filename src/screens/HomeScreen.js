import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Linking } from "react-native";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      <View style={styles.content}>
        <Text style={styles.title}>¡Hola, *User*!</Text>
        <Text style={styles.subtitle}>¿Listos para tu nuevo servicio?</Text>

        <CustomButton
          title="Ver Servicios"
          icon="construct-outline"
          backgroundColor={Colors.primary}
          color={Colors.dark}
          fullWidth
          onPress={() => navigation.navigate("Services")}
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
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: Colors.dark },
  subtitle: { marginTop: 10, color: Colors.gray, marginBottom: 20 },
  footer: { paddingHorizontal: 20, paddingBottom: 10, marginBottom: 25  },
});
