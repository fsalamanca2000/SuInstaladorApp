import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email.trim()) {
      return Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
    }

    try {
      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        "Correo enviado",
        "Te hemos enviado un enlace para restablecer tu contraseña."
      );

      navigation.goBack();
    } catch (error) {
      console.log("❌ Error reset:", error);

      let msg = "No se pudo enviar el correo. Verifica que esté registrado.";
      if (error.code === "auth/invalid-email") msg = "El formato del correo no es válido.";
      if (error.code === "auth/user-not-found") msg = "No existe un usuario con este correo.";

      Alert.alert("Error", msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>

        {/* 📌 Logo */}
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Restablecer contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomButton
          title="Enviar enlace"
          backgroundColor={Colors.primary}
          onPress={handleReset}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* 🎨 ESTILOS — NO SE MODIFICARON */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: Colors.dark,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 20,
    fontSize: 16,
  },
  back: {
    marginTop: 18,
    color: Colors.dark,
    textAlign: "center",
    fontSize: 15,
  },
});
