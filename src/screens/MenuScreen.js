import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";

export default function MenuScreen({ navigation }) {
    const [userImage, setUserImage] = useState(null);

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    // 📸 Función para seleccionar imagen
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

    return (
        <SafeAreaView style={styles.container}>
            <Header userName="User" address="*Dirección*" userImage={userImage} />

            {/* Opciones del menú */}
            <View style={styles.menuOptions}>
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.optionText}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Services")}
                >
                    <Text style={styles.optionText}>Servicios</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("MyReservations")}
                >
                    <Text style={styles.optionText}>Mis Reservas</Text>
                </TouchableOpacity>

                {/* 🔥 Aquí el fix */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Reports")}
                >
                    <Text style={styles.optionText}>Reporte e Informes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Text style={styles.optionText}>Ajustes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={handleLogout}>
                    <Text style={[styles.optionText, { color: "red" }]}>
                        Cerrar Sesión
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Botón WhatsApp */}
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
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 25,
        paddingTop: 40,
    },
    userSection: {
        alignItems: "center",
        marginBottom: 25,
    },
    avatarContainer: {
        marginBottom: 8,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.dark,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    editButton: {
        marginLeft: 5,
        padding: 4,
    },
    menuOptions: {
        flex: 1,
    },
    option: {
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 15,
        color: Colors.dark,
    },
    footer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginBottom: 25,
    },
});
