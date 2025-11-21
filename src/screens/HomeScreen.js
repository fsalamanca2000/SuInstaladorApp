import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Header from "../components/Header";
import SearchBar from "../components/Searchbar";
import PromoCard from "../components/PromoCard";
import ServiceCard from "../components/ServiceCard";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { Linking } from "react-native";

import { useReservations } from "../context/ReservationsContext";
import { useUser } from "../context/UserContext";

// 🔥 Importante: mapa de imágenes locales
import { IMAGE_MAP } from "../data/imageMap";

export default function HomeScreen({ navigation }) {
  const { reservations } = useReservations();
  const { currentUser } = useUser();

  /** -----------------------------
   *  ⭐ Servicios destacados (static)
   *  ----------------------------- */
  const featuredServices = [
    {
      id: "dest-1",
      title: "Instalación Cortinas Tradicionales",
      description: "Espacios cálidos e iluminados",
      price: "70.000",
      installers: "1 a 2",
      image: "cortinas1.jpg",
      category: "Instalación",
      subcategory: "Cortinas",
    },
    {
      id: "dest-4",
      title: "Instalar Soporte Fijo",
      description: "Seguridad y estabilidad",
      price: "55.000",
      installers: "1",
      image: "soporte_fijo.jpg",
      category: "Instalación",
      subcategory: "Soportes TV",
    },
  ];

  /** -----------------------------
   *  🕒 Historial: reservas recientes
   *  ----------------------------- */
  const recentReservations = useMemo(() => {
    return reservations.slice(-10).reverse();
  }, [reservations]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={currentUser?.name || "Usuario"}
        address={currentUser?.address || "*Dirección*"}
        userImage={currentUser?.image}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />

        <PromoCard onPress={() => navigation.navigate("Services")} />

        {/* ⭐ SERVICIOS DESTACADOS */}
        <Text style={styles.sectionTitle}>Servicios destacados</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredServices.map((service) => (
            <View
              key={`${service.id}-${service.title}`}
              style={{ width: 260, marginRight: 12 }}
            >
              <ServiceCard
                service={{
                  ...service,
                  image: IMAGE_MAP[service.image] || service.image,
                }}
                onPress={() => navigation.navigate("ServiceInfo", { service })}
              />
            </View>
          ))}
        </ScrollView>

        {/* 🕒 HISTORIAL */}
        <Text style={styles.sectionTitle}>Historial de servicios</Text>

        {recentReservations.length === 0 ? (
          <Text style={{ color: Colors.gray, marginBottom: 10 }}>
            Aún no has realizado servicios.
          </Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentReservations.map((res) => (
              <View
                key={`${res.id}-${res.date}-${res.hour}`}
                style={{ width: 260, marginRight: 12 }}
              >
                <ServiceCard
                  service={{
                    id: res.id,
                    title: res.title,
                    description: res.description,
                    price: res.totalPrice.toLocaleString("es-CO"),
                    installers: res.installersNeeded.toString(),
                    image: IMAGE_MAP[res.image] || res.image,
                  }}
                  onPress={() =>
                    navigation.navigate("ServiceInfo", { service: res })
                  }
                />
              </View>
            ))}
          </ScrollView>
        )}

        {/* Footer */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
    marginVertical: 10,
  },
  footer: {
    marginBottom: 30,
  },
});
