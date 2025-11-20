import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView as HorizontalScroll
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

export default function HomeScreen({ navigation }) {
  const { reservations } = useReservations();
  const { currentUser } = useUser();

  /** -----------------------------
   *  ⭐ Servicios destacados (quemados)
   *  ----------------------------- */
  const featuredServices = [
    {
      id: 1,
      title: "Instalación Cortinas Tradicionales",
      description: "Espacios cálidos e iluminados",
      price: "70.000",
      installers: "1 a 2",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      category: "Instalación",
      subcategory: "Cortinas"
    },
    {
      id: 4,
      title: "Instalar Soporte Fijo",
      description: "Seguridad y estabilidad",
      price: "55.000",
      installers: "1",
      image: "https://images.unsplash.com/photo-1587825140708-8da8f90b635f?w=800",
      category: "Instalación",
      subcategory: "Soporte TV"
    },
    {
      id: 8,
      title: "Instalación Aire Mini Split",
      description: "Servicio completo con soporte técnico",
      price: "250.000",
      installers: "2",
      image: "https://images.unsplash.com/photo-1626233921797-1b9bc0bb5725?w=800",
      category: "Instalación",
      subcategory: "Aires Acondicionados"
    }
  ];

  /** -----------------------------
   *  🕒 Historial: reservas recientes
   *  ----------------------------- */
  const recentReservations = useMemo(() => {
    return reservations.slice(-10).reverse(); // últimos 10 en orden reciente
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
            <View key={service.id} style={{ width: 260, marginRight: 12 }}>
              <ServiceCard
                service={service}
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
              <View key={res.id} style={{ width: 260, marginRight: 12 }}>
                <ServiceCard
                  service={{
                    id: res.id,
                    title: res.title,
                    description: res.description,
                    price: res.totalPrice.toLocaleString("es-CO"),
                    installers: res.installersNeeded.toString(),
                    image: res.image,
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
                "https://api.whatsapp.com/send/?phone=573235050110&text&type=phone_number&app_absent=0"
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
