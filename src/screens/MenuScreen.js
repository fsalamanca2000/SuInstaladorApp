import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";


export default function MenuScreen({ navigation }) {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header con logo y carrito */}
            <Header userName="User" address="*Dirección*" />
            {/* Información del usuario */}
            <View style={styles.userSection}>
                <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={40} color={Colors.dark} />
                </View>

                <View style={styles.nameRow}>
                    <Text style={styles.userName}>*User*</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="pencil-outline" size={18} color={Colors.dark} />
                    </TouchableOpacity>
                </View>
            </View>


            {/* Opciones del menú */}
            <View style={styles.menuOptions}>
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Main")}
                >
                    <Text style={styles.optionText}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate("Main", { screen: "Servicios" })}
                >
                    <Text style={styles.optionText}>Servicios</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Mis Reservas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
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

            {/* Botón de servicio al cliente */}
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 40,
    },
    userSection: {
        alignItems: "center",
        marginBottom: 25,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.dark,
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
        marginBottom: 25
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6, // separa un poco el texto del ícono (solo funciona en React Native 0.71+)
    },
    editButton: {
        marginLeft: -12, // si no tienes gap
        padding: 4,
    },

});
