import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email.trim()) {
      return Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
    }

    Alert.alert(
      "Simulación exitosa",
      "Se envió un enlace de restablecimiento (ficticio) a tu correo."
    );

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: Colors.dark,
  },
  input: {
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
