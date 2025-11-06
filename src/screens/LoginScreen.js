import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Logo principal */}
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={Colors.gray}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.gray}
          secureTextEntry
        />

        {/* Botón de inicio de sesión */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Opciones adicionales */}
        <TouchableOpacity>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Botón de soporte */}
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
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: { width: 200, height: 200, marginBottom: 40 },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  button: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: Colors.dark, fontWeight: "bold" },
  forgot: { marginTop: 10, color: Colors.gray, fontSize: 13 },
  register: { marginTop: 5, color: Colors.dark, fontWeight: "500" },
  footer: { paddingHorizontal: 20, paddingBottom: 10, marginBottom: 25},
});
