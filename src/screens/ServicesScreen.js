import React, { useState } from "react";
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

export default function ServicesScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Instalación");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Cortinas");

  const categories = ["Instalación", "Mantenimiento", "Reparación"];

  const subCategories = {
    Instalación: ["Cortinas", "Soporte TV", "Espejos", "Aires Acondicionados"],
    Mantenimiento: ["Eléctrico", "Fontanería", "Gasodomésticos"],
    Reparación: ["Muebles", "Puertas", "Electrodomésticos"],
  };

  const services = [
    {
      id: 1,
      category: "Instalación",
      subcategory: "Cortinas",
      title: "Instalación de Cortinas Tradicionales",
      description: "Espacios cálidos e iluminados",
      price: "70.000",
      installers: "1 a 2",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    },
    {
      id: 2,
      category: "Instalación",
      subcategory: "Cortinas",
      title: "Instalación de Cortinas Modernas",
      description: "Diseño minimalista y elegante",
      price: "85.000",
      installers: "1 a 2",
      image:
        "https://images.unsplash.com/photo-1600573472599-90c7a4a2b3f1?w=800",
    },
  ];

  const filteredServices = services.filter(
    (s) =>
      s.category === selectedCategory &&
      s.subcategory === selectedSubCategory
  );

  return (
    <View style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      {/* 🔝 Menús fijos */}
      <View style={styles.fixedMenus}>
        {/* Categorías */}
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
                setSelectedSubCategory(subCategories[cat][0]);
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
          {subCategories[selectedCategory].map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[
                styles.subCategoryButton,
                selectedSubCategory === sub && styles.subCategoryButtonActive,
              ]}
              onPress={() => setSelectedSubCategory(sub)}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  selectedSubCategory === sub && styles.subCategoryTextActive,
                ]}
              >
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 🧩 Servicios con scroll vertical */}
      <ScrollView
        contentContainerStyle={styles.servicesScroll}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            installers={service.installers}
            image={service.image}
          />
        ))}
      </ScrollView>

      {/* Espacio para footer */}
      <View style={styles.footerSpace} />
    </View>
  );
}

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
