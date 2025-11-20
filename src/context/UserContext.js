import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Lista de usuarios registrados (por ahora quemados o añadidos desde Register)
  const [users, setUsers] = useState([]);

  // Usuario logueado actualmente
  const [currentUser, setCurrentUser] = useState(null);

  /** 🔹 Registrar usuario */
  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  /** 🔹 Login (muy simple para ahora) */
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  /** 🔹 Logout */
  const logout = () => {
    setCurrentUser(null);
  };

  /** 🔹 Eliminar cuenta */
  const deleteAccount = () => {
    if (!currentUser) return;

    setUsers((prev) => prev.filter((u) => u.id !== currentUser.id));
    setCurrentUser(null); // cerrar sesión automáticamente
  };

  /** 🔹 Editar datos del usuario actual */
  const updateUser = (updatedData) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedData };

    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );

    setCurrentUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        register,
        login,
        logout,
        deleteAccount,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
