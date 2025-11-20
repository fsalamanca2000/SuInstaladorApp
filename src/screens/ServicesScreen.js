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
  // Categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("Instalación");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Cortinas");

  // CATEGORÍAS REALES
  const categories = ["Instalación", "Mantenimiento", "Reparación"];

  // SUBCATEGORÍAS REALES DE SU INSTALADOR
  const subCategories = {
    Instalación: [
      "Cortinas",
      "Persianas",
      "Soportes TV",
      "Espejos",
      "Aires Acondicionados",
      "Lámparas",
      "Cámaras de Seguridad",
      "Organizadores",
    ],
    Mantenimiento: ["Eléctrico", "Plomería", "Aires Acondicionados"],
    Reparación: ["Cortinas", "Persianas", "Aires Acondicionados"],
  };

  // SERVICIOS REALES
  const services = [
    // 📌 INSTALACIÓN – CORTINAS
    {
      id: 1,
      category: "Instalación",
      subcategory: "Cortinas",
      title: "Instalación de Cortinas Tradicionales",
      description: "Perfectas para salas, cuartos y comedores",
      price: "70.000",
      installers: "1–2",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    },
    {
      id: 2,
      category: "Instalación",
      subcategory: "Cortinas",
      title: "Instalación de Barras y Cenefas",
      description: "Montaje profesional y nivelado",
      price: "60.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a12?w=800",
    },

    // 📌 INSTALACIÓN – PERSIANAS
    {
      id: 3,
      category: "Instalación",
      subcategory: "Persianas",
      title: "Instalación de Persianas Enrollables",
      description: "Blackout, sunscreen y decorativas",
      price: "85.000",
      installers: "1–2",
      image:
        "https://images.unsplash.com/photo-1600573472599-90c7a4a2b3f1?w=800",
    },
    {
      id: 4,
      category: "Instalación",
      subcategory: "Persianas",
      title: "Instalación de Persianas Shangri-La",
      description: "Sistema premium con acabado suave",
      price: "120.000",
      installers: "1–2",
      image:
        "https://images.unsplash.com/photo-1600047509807-329f43f2bfff?w=800",
    },

    // 📌 INSTALACIÓN – SOPORTES TV
    {
      id: 5,
      category: "Instalación",
      subcategory: "Soportes TV",
      title: "Instalación de Soporte Fijo",
      description: "Montaje seguro y nivelado",
      price: "55.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1587825140708-8da8f90b635f?w=800",
    },
    {
      id: 6,
      category: "Instalación",
      subcategory: "Soportes TV",
      title: "Instalación de Soporte Articulado",
      description: "Sistema móvil con brazos reforzados",
      price: "95.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1600170311833-33a9d143f8d3?w=800",
    },

    // 📌 INSTALACIÓN – ESPEJOS
    {
      id: 7,
      category: "Instalación",
      subcategory: "Espejos",
      title: "Instalar Espejo Mediano",
      description: "Fijación segura con nivelación",
      price: "60.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    },
    {
      id: 8,
      category: "Instalación",
      subcategory: "Espejos",
      title: "Instalar Espejo Grande",
      description: "Ideal para salas, gimnasios y habitaciones",
      price: "90.000",
      installers: "2",
      image:
        "https://images.unsplash.com/photo-1578898888476-8c70e9af3672?w=800",
    },

    // 📌 INSTALACIÓN – AIRES
    {
      id: 9,
      category: "Instalación",
      subcategory: "Aires Acondicionados",
      title: "Instalación de Aire Mini Split",
      description: "Incluye drenaje, nivelación y soporte",
      price: "250.000",
      installers: "2",
      image:
        "https://images.unsplash.com/photo-1626233921797-1b9bc0bb5725?w=800",
    },

    // 📌 INSTALACIÓN – LÁMPARAS
    {
      id: 10,
      category: "Instalación",
      subcategory: "Lámparas",
      title: "Instalar Lámpara de Techo",
      description: "Montaje eléctrico seguro",
      price: "45.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    },

    // 📌 INSTALACIÓN – CÁMARAS DE SEGURIDAD
    {
      id: 11,
      category: "Instalación",
      subcategory: "Cámaras de Seguridad",
      title: "Instalación de Cámara IP",
      description: "Configuración remota incluida",
      price: "80.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1581092919535-6b4e6f3f6c64?w=800",
    },

    // 📌 INSTALACIÓN – ORGANIZADORES
    {
      id: 12,
      category: "Instalación",
      subcategory: "Organizadores",
      title: "Instalación de Repisas y Estanterías",
      description: "Fijación profesional y alineada",
      price: "50.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1616627980124-7183b3ae1e9f?w=800",
    },

    // 📌 MANTENIMIENTO – ELÉCTRICO
    {
      id: 13,
      category: "Mantenimiento",
      subcategory: "Eléctrico",
      title: "Revisión de Instalación Eléctrica",
      description: "Prevención de fallas y riesgos",
      price: "80.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1581092919535-6b4e6f3f6c64?w=800",
    },

    // 📌 MANTENIMIENTO – PLOMERÍA
    {
      id: 14,
      category: "Mantenimiento",
      subcategory: "Plomería",
      title: "Mantenimiento de Tuberías",
      description: "Elimina fugas y obstrucciones",
      price: "70.000",
      installers: "1–2",
      image:
        "https://images.unsplash.com/photo-1580281657330-1dc43aaf4c88?w=800",
    },

    // 📌 MANTENIMIENTO – AIRES
    {
      id: 15,
      category: "Mantenimiento",
      subcategory: "Aires Acondicionados",
      title: "Mantenimiento preventivo aire Mini Split",
      description: "Limpieza, gas y verificación eléctrica",
      price: "90.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1626233921797-1b9bc0bb5725?w=800",
    },

    // 📌 REPARACIÓN – CORTINAS
    {
      id: 16,
      category: "Reparación",
      subcategory: "Cortinas",
      title: "Reparación de cortinas",
      description: "Ajustes, reposición y nivelación",
      price: "50.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    },

    // 📌 REPARACIÓN – PERSIANAS
    {
      id: 17,
      category: "Reparación",
      subcategory: "Persianas",
      title: "Reparación de persianas",
      description: "Enrollable, vertical y panel japonés",
      price: "65.000",
      installers: "1",
      image:
        "https://images.unsplash.com/photo-1600047509807-329f43f2bfff?w=800",
    },

    // 📌 REPARACIÓN – AIRES
    {
      id: 18,
      category: "Reparación",
      subcategory: "Aires Acondicionados",
      title: "Reparación de aire Mini Split",
      description: "Diagnóstico + repuesto (si aplica)",
      price: "120.000",
      installers: "1–2",
      image:
        "https://images.unsplash.com/photo-1626233921797-1b9bc0bb5725?w=800",
    },
  ];

  // Filtrar los servicios según la categoría y subcategoría
  const filteredServices = services.filter(
    (s) =>
      s.category === selectedCategory &&
      s.subcategory === selectedSubCategory
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
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onPress={() =>
              navigation.navigate("ServiceInfo", { service })
            }
          />
        ))}
      </ScrollView>

      <View style={styles.footerSpace} />
    </View>
  );
}

/* 🔥 NO MODIFIQUÉ NI UN SOLO ESTILO */
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
