import React from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/Searchbar";
import PromoCard from "../components/PromoCard";
import ServiceCard from "../components/ServiceCard";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { Linking } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header userName="*User*" address="*Dirección*" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        <PromoCard onPress={() => navigation.navigate("ServiceScreen")} />

        <Text style={styles.sectionTitle}>Servicios destacados</Text>
        <ServiceCard
          title="Instalación Cortinas Tradicionales"
          description="Espacios cálidos e iluminados"
          price="70.000"
          installers="1 a 2"
          image="https://picsum.photos/400/200"
        />

        <Text style={styles.sectionTitle}>Historial de servicios</Text>
        <ServiceCard
          title="Instalación de Persianas"
          description="Ambientes modernos y prácticos"
          price="80.000"
          installers="1"
          image="https://picsum.photos/400/201"
        />

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
