import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    direccion: "",
    celular: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = () => {
    alert("Registro temporal. Pronto se conectará con Firebase.");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Crear cuenta</Text>

        <TextInput placeholder="Nombre" style={styles.input} onChangeText={(t) => handleChange("nombre", t)} />
        <TextInput placeholder="Apellido" style={styles.input} onChangeText={(t) => handleChange("apellido", t)} />
        <TextInput placeholder="Usuario" style={styles.input} onChangeText={(t) => handleChange("usuario", t)} />
        <TextInput placeholder="Dirección" style={styles.input} onChangeText={(t) => handleChange("direccion", t)} />
        <TextInput placeholder="Número de celular" keyboardType="phone-pad" style={styles.input} onChangeText={(t) => handleChange("celular", t)} />
        <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} onChangeText={(t) => handleChange("contraseña", t)} />
        <TextInput placeholder="Confirmar contraseña" secureTextEntry style={styles.input} onChangeText={(t) => handleChange("confirmarContraseña", t)} />

        <CustomButton title="Registrar" backgroundColor={Colors.primary} fullWidth onPress={handleRegister} />
        <CustomButton title="Volver al inicio de sesión" backgroundColor={Colors.dark} fullWidth onPress={() => navigation.navigate("Login")} />
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Servicio al cliente"
          backgroundColor={Colors.dark}
          icon="logo-whatsapp"
          color="#fff"
          onPress={() =>
            Linking.openURL("https://api.whatsapp.com/send/?phone=573235050110&text&type=phone_number&app_absent=0")
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 30, alignItems: "center" },
  logo: { width: 180, height: 100, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: Colors.dark },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
    width: "100%",
  },
  footer: { paddingHorizontal: 20, paddingBottom: 10, marginBottom: 25 },
});
