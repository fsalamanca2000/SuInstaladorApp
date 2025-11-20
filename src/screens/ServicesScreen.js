import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";

import { useServices } from "../context/ServicesContext";
import { CATEGORIES } from "../data/servicesData";

// 🔥 Normalizador mágico: evita problemas con acentos y mayúsculas
const normalize = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function ServicesScreen({ navigation }) {
  const { services, loadingServices } = useServices();

  const [selectedCategory, setSelectedCategory] = useState("Instalación");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  /** 🔥 Inicializar subcategorías al montar */
  useEffect(() => {
    const subs = CATEGORIES.instalacion.subcategories;
    setSelectedSubCategory(subs[0]);
  }, []);

  if (loadingServices) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.dark }}>Cargando servicios...</Text>
      </View>
    );
  }

  /** 🔥 Categorías */
  const categories = ["Instalación", "Reparación", "Adicionales"];

  /** 🔥 Subcategorías segun categoría seleccionada */
  const subCategories =
    CATEGORIES[
      normalize(selectedCategory)
    ].subcategories;

  /** 🔥 Convertir servicios a array */
  const servicesList = Object.values(services || {});

  /** 🔥 Filtrar usando normalización */
  const filteredServices = servicesList.filter(
    (s) =>
      normalize(s.category) === normalize(selectedCategory) &&
      normalize(s.subcategory) === normalize(selectedSubCategory) &&
      s.isActive === true
  );

  return (
    <View style={styles.container}>
      <Header userName="User" address="*" />

      {/* Categorías */}
      <View style={styles.fixedMenus}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => {
                setSelectedCategory(cat);

                const newSubs =
                  CATEGORIES[
                    normalize(cat)
                  ].subcategories;

                setSelectedSubCategory(newSubs[0]);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Subcategorías */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.subCategoryScroll}
        >
          {subCategories.map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[
                styles.subCategoryButton,
                selectedSubCategory === sub &&
                  styles.subCategoryButtonActive,
              ]}
              onPress={() => setSelectedSubCategory(sub)}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  selectedSubCategory === sub &&
                    styles.subCategoryTextActive,
                ]}
              >
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Servicios */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.servicesScroll}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.length === 0 ? (
          <Text style={{ color: Colors.dark }}>
            No hay servicios disponibles.
          </Text>
        ) : (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() =>
                navigation.navigate("ServiceInfo", { service })
              }
            />
          ))
        )}
      </ScrollView>

      <View style={styles.footerSpace} />
    </View>
  );
}

/* ⭐ Estilos sin cambios */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fixedMenus: {
    backgroundColor: Colors.background,
    paddingBottom: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  categoryScroll: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.dark,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  subCategoryScroll: {
    marginTop: 6,
    paddingHorizontal: 15,
  },
  subCategoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginRight: 8,
  },
  subCategoryButtonActive: {
    backgroundColor: Colors.dark,
  },
  subCategoryText: {
    color: Colors.dark,
  },
  subCategoryTextActive: {
    color: "#fff",
  },
  servicesScroll: {
    padding: 15,
    paddingBottom: 80,
  },
  footerSpace: {
    height: 60,
  },
});
