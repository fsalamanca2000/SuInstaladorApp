import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { Linking } from "react-native";
import { useUser } from "../context/UserContext";

export default function SettingsScreen({ navigation }) {
  const { deleteAccount, currentUser, logout } = useUser();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            deleteAccount();
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name}
        address={currentUser?.address}
        userImage={currentUser?.image}
      />

      <Text style={styles.title}>Ajustes</Text>

      <View style={styles.optionsContainer}>
        {/* Información personal */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={22} color={Colors.dark} />
          <Text style={styles.optionText}>Información Personal</Text>
        </TouchableOpacity>

        {/* Métodos de pago */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Payments")}
        >
          <Ionicons name="card-outline" size={22} color={Colors.dark} />
          <Text style={styles.optionText}>Métodos de Pago</Text>
        </TouchableOpacity>

        {/* Eliminar cuenta */}
        <TouchableOpacity
          style={styles.option}
          onPress={handleDeleteAccount}
        >
          <Ionicons name="close-outline" size={22} color={Colors.dark} />
          <Text style={styles.optionText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Servicio al cliente"
          backgroundColor={Colors.dark}
          icon="logo-whatsapp"
          color="#fff"
          onPress={() =>
            Linking.openURL(
              "https://api.whatsapp.com/send/?phone=573235050110"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark,
    marginVertical: 15,
    marginLeft: 5,
  },
  optionsContainer: {
    marginTop: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    color: Colors.dark,
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: "auto",
    marginBottom: 25,
  },
});
