// ==============================
// 📦 SERVICES DATA GLOBAL
// ==============================

// ---------------------------------------
// CATEGORIES (con subcategorías organizadas)
// ---------------------------------------

export const CATEGORIES = {
  instalacion: {
    key: "instalacion",
    name: "Instalación",
    subcategories: [
      "Cortinas",
      "Persianas",
      "Soportes TV",
      "Espejos",
      "Aires Acondicionados",
      "Lámparas",
      "Cámaras de Seguridad",
      "Repisas",
      "Papel Colgadura",
      "Cuadros",
      "Decorativos",
      "Hamacas",
      "Gimnasios",
      "Modulares",
      "Muebles",
      "Vinilo Decorativo",
      "Tendederos",
      "Cables Ocultos",
    ],
  },

  reparacion: {
    key: "reparacion",
    name: "Reparación",
    subcategories: [
      "Cortinas",
      "Persianas",
      "Aires Acondicionados",
      "Soportes TV",
      "Repisas",
      "Muebles",
    ],
  },

  adicionales: {
    key: "adicionales",
    name: "Adicionales",
    subcategories: [
      "Decorativos",
      "Hamacas",
      "Gimnasios",
      "Modulares",
      "Vinilo Decorativo",
      "Papel Colgadura",
      "Muebles",
    ],
  },
};

// ---------------------------------------
// SUBCATEGORIES MAP (para filtros globales)
// ---------------------------------------

export const SUBCATEGORIES = {
  Cortinas: { key: "cortinas", parent: "instalacion" },
  Persianas: { key: "persianas", parent: "instalacion" },
  "Soportes TV": { key: "soportes_tv", parent: "instalacion" },
  Espejos: { key: "espejos", parent: "instalacion" },
  "Aires Acondicionados": { key: "aires", parent: "instalacion" },
  Lámparas: { key: "lamparas", parent: "instalacion" },
  "Cámaras de Seguridad": { key: "camaras", parent: "instalacion" },
  Repisas: { key: "repisas", parent: "instalacion" },
  "Papel Colgadura": { key: "papelcolgadura", parent: "instalacion" },
  Cuadros: { key: "cuadros", parent: "instalacion" },
  Decorativos: { key: "decorativos", parent: "instalacion" },
  Hamacas: { key: "hamacas", parent: "instalacion" },
  Gimnasios: { key: "gimnasios", parent: "instalacion" },
  Modulares: { key: "modulares", parent: "instalacion" },
  Muebles: { key: "muebles", parent: "instalacion" },
  "Vinilo Decorativo": { key: "vinilos", parent: "instalacion" },
  Tendederos: { key: "tendederos", parent: "instalacion" },
  "Cables Ocultos": { key: "cables", parent: "instalacion" },

  // Reparación
  ReparacionCortinas: { key: "cortinas", parent: "reparacion" },
  ReparacionPersianas: { key: "persianas", parent: "reparacion" },
  ReparacionAires: { key: "aires", parent: "reparacion" },
  ReparacionSoportes: { key: "soportes_tv", parent: "reparacion" },
  ReparacionRepisas: { key: "repisas", parent: "reparacion" },
  ReparacionMuebles: { key: "muebles", parent: "reparacion" },

  // Adicionales
  AdicionalDecorativos: { key: "decorativos", parent: "adicionales" },
  AdicionalHamacas: { key: "hamacas", parent: "adicionales" },
  AdicionalGimnasios: { key: "gimnasios", parent: "adicionales" },
  AdicionalModulares: { key: "modulares", parent: "adicionales" },
  AdicionalVinilos: { key: "vinilos", parent: "adicionales" },
  AdicionalPapelColgadura: { key: "papelcolgadura", parent: "adicionales" },
  AdicionalMuebles: { key: "muebles", parent: "adicionales" },
};

// ---------------------------------------
// LISTA DE SERVICIOS FINAL
// ---------------------------------------

export const SERVICES = [
  // INSTALACIÓN – CORTINAS
  {
    id: 1,
    category: "Instalación",
    subcategory: "Cortinas",
    title: "Instalación de Cortinas Tradicionales",
    description: "Perfectas para salas, cuartos y comedores",
    price: 70000,
    installers: "1-2",
    image: require("../../assets/cortinas1.jpg"),
  },
  {
    id: 2,
    category: "Instalación",
    subcategory: "Cortinas",
    title: "Instalación de Barras y Cenefas",
    description: "Montaje profesional y nivelado",
    price: 60000,
    installers: "1",
    image: require("../../assets/cortinas2.jpg"),
  },

  // INSTALACIÓN – PERSIANAS
  {
    id: 3,
    category: "Instalación",
    subcategory: "Persianas",
    title: "Instalación de Persianas Enrollables",
    description: "Blackout, sunscreen y decorativas",
    price: 85000,
    installers: "1-2",
    image: require("../../assets/persianas1.jpg"),
  },
  {
    id: 4,
    category: "Instalación",
    subcategory: "Persianas",
    title: "Instalación de Persianas Shangri-La",
    description: "Sistema premium con acabado suave",
    price: 120000,
    installers: "1-2",
    image: require("../../assets/persianas2.jpg"),
  },

  // INSTALACIÓN – SOPORTES TV
  {
    id: 5,
    category: "Instalación",
    subcategory: "Soportes TV",
    title: "Instalación de Soporte Fijo",
    description: "Montaje seguro y nivelado",
    price: 55000,
    installers: "1",
    image: require("../../assets/soporte_fijo.jpg"),
  },
  {
    id: 6,
    category: "Instalación",
    subcategory: "Soportes TV",
    title: "Instalación de Soporte Articulado",
    description: "Sistema móvil con brazos reforzados",
    price: 95000,
    installers: "1",
    image: require("../../assets/soporte_articulado.jpg"),
  },

  // INSTALACIÓN – ESPEJOS
  {
    id: 7,
    category: "Instalación",
    subcategory: "Espejos",
    title: "Instalar Espejo Mediano",
    description: "Fijación segura con nivelación",
    price: 60000,
    installers: "1",
    image: require("../../assets/espejo1.jpg"),
  },
  {
    id: 8,
    category: "Instalación",
    subcategory: "Espejos",
    title: "Instalar Espejo Grande",
    description: "Ideal para salas, gimnasios y habitaciones",
    price: 90000,
    installers: "2",
    image: require("../../assets/espejo2.jpg"),
  },

  // INSTALACIÓN – REPISAS
  {
    id: 9,
    category: "Instalación",
    subcategory: "Repisas",
    title: "Instalación de Repisas y Estanterías",
    description: "Fijación profesional y alineada",
    price: 50000,
    installers: "1",
    image: require("../../assets/repisas1.jpg"),
  },

  // REPARACIÓN – CORTINAS
  {
    id: 10,
    category: "Reparación",
    subcategory: "Cortinas",
    title: "Reparación de cortinas",
    description: "Ajustes, reposición y nivelación",
    price: 50000,
    installers: "1",
    image: require("../../assets/cortinas_reparacion.jpg"),
  },

  // REPARACIÓN – PERSIANAS
  {
    id: 11,
    category: "Reparación",
    subcategory: "Persianas",
    title: "Reparación de persianas",
    description: "Enrollable, vertical y panel japonés",
    price: 65000,
    installers: "1",
    image: require("../../assets/persianas_reparacion.jpg"),
  },
];
