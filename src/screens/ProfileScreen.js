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
  const { currentUser, updateUser } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
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

  /** 📸 Cambiar imagen */
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  /** Guardar cambios */
  const handleSave = () => {
    if (!name || !email || !phone || !address) {
      Alert.alert("Error", "Todos los campos excepto contraseña son obligatorios.");
      return;
    }

    const newData = {
      name,
      email,
      phone,
      address,
      image: userImage,
    };

    if (password.trim() !== "") {
      newData.password = password;
    }

    updateUser(newData);

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

        <Text style={styles.label}>Cambiar contraseña (opcional)</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          placeholder="Nueva contraseña"
          onChangeText={setPassword}
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
