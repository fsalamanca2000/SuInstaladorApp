import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { useUser } from "../context/UserContext";

export default function ProfileScreen({ navigation }) {
  const { currentUser, updateUser, changeEmail, changePassword } = useUser();

  // Estados del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setAddress(currentUser.address);
      setUserImage(currentUser.image || null);
    }
  }, [currentUser]);

  /** 📸 Seleccionar imagen */
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permiso requerido", "Se necesita acceso a tus fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  };

  /** 🔥 Guardar cambios */
  const handleSave = async () => {
    if (!name || !email || !phone || !address) {
      Alert.alert(
        "Error",
        "Todos los campos excepto la contraseña nueva son obligatorios."
      );
      return;
    }

    /** 🔥 1. Actualizar datos normales */
    await updateUser({
      name,
      phone,
      address,
      image: userImage,
    });

    /** 🔥 2. Cambio de correo */
    if (email !== currentUser.email) {
      if (!currentPassword) {
        Alert.alert(
          "Atención",
          "Debes ingresar tu contraseña actual para cambiar el correo."
        );
        return;
      }

      const result = await changeEmail(currentPassword, email);

      if (!result.ok) {
        console.log("❌ Error al cambiar correo:", result.error);
        Alert.alert("Error", result.message || "No se pudo cambiar el correo.");
        return;
      }
    }

    /** 🔥 3. Cambio de contraseña */
    if (newPassword.trim() !== "") {
      if (!currentPassword) {
        Alert.alert(
          "Atención",
          "Debes ingresar tu contraseña actual para cambiar la contraseña."
        );
        return;
      }

      const result = await changePassword(currentPassword, newPassword);

      if (!result.ok) {
        console.log("❌ Error al cambiar contraseña:", result.error);
        Alert.alert(
          "Error",
          result.message || "No se pudo cambiar la contraseña."
        );
        return;
      }
    }

    Alert.alert("Éxito", "Tu información fue actualizada.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name}
        address={currentUser?.address}
        userImage={currentUser?.image}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Información Personal</Text>

        <View style={styles.center}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={{ fontSize: 30, color: Colors.dark }}>+</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.changePhoto}>Cambiar Foto</Text>
        </View>

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} />

        <Text style={styles.label}>
          Contraseña actual (requerida para cambios sensibles)
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Contraseña actual"
        />

        <Text style={styles.label}>Nueva contraseña (opcional)</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nueva contraseña"
        />

        <CustomButton
          title="Guardar cambios"
          backgroundColor={Colors.primary}
          fullWidth
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🎨 ESTILOS — NO SE MODIFICARON */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 15,
    color: Colors.dark,
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
  },

  center: {
    alignItems: "center",
    marginBottom: 15,
  },

  imageContainer: {
    marginBottom: 5,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  changePhoto: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
