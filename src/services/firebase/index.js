// Base de datos FALSA compartida entre todas las pantallas
export const fakeUsersDB = [
  {
    email: "test@correo.com",
    password: "123456",
    nombre: "Usuario",
    apellido: "Demo",
  },
];

// Función para agregar un nuevo usuario
export const addFakeUser = (user) => {
  fakeUsersDB.push(user);
};
