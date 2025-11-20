import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { useUser } from "../context/UserContext";

export default function RegisterScreen({ navigation }) {
  const { register } = useUser();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    celular: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleRegister = () => {
    const {
      nombre,
      apellido,
      email,
      direccion,
      celular,
      contraseña,
      confirmarContraseña,
    } = form;

    if (!nombre || !apellido || !email || !contraseña)
      return Alert.alert("Error", "Completa los campos obligatorios.");

    if (contraseña !== confirmarContraseña)
      return Alert.alert("Error", "Las contraseñas no coinciden.");

    register({
      name: `${nombre} ${apellido}`,
      email,
      address: direccion,
      phone: celular,
      password: contraseña,
      image,
    });

    Alert.alert("Registro exitoso", "Tu cuenta fue creada.");

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
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

        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={{ fontSize: 32 }}>+</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Nombre"
          style={styles.input}
          onChangeText={(t) => handleChange("nombre", t)}
          value={form.nombre}
        />
        <TextInput
          placeholder="Apellido"
          style={styles.input}
          onChangeText={(t) => handleChange("apellido", t)}
          value={form.apellido}
        />
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(t) => handleChange("email", t)}
          value={form.email}
        />
        <TextInput
          placeholder="Dirección"
          style={styles.input}
          onChangeText={(t) => handleChange("direccion", t)}
          value={form.direccion}
        />
        <TextInput
          placeholder="Número de celular"
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={(t) => handleChange("celular", t)}
          value={form.celular}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          onChangeText={(t) => handleChange("contraseña", t)}
          value={form.contraseña}
        />
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          onChangeText={(t) => handleChange("confirmarContraseña", t)}
          value={form.confirmarContraseña}
        />

        <CustomButton
          title="Registrar"
          backgroundColor={Colors.primary}
          fullWidth
          onPress={handleRegister}
        />

        <CustomButton
          title="Volver al inicio de sesión"
          backgroundColor={Colors.dark}
          fullWidth
          onPress={() => navigation.navigate("Login")}
        />
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Servicio al cliente"
          backgroundColor={Colors.dark}
          icon="logo-whatsapp"
          color="#fff"
          onPress={() =>
            Linking.openURL("https://api.whatsapp.com/send/?phone=573235050110")
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.dark,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
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
