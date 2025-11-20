// src/context/UserContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { ref, get, set, update, remove } from "firebase/database";
import { uploadImage } from "../firebase/storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ---------------------------------------------------------
  // 🔥 Mantener sesión activa (Firebase Auth Listener)
  // ---------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoadingUser(false);
        return;
      }

      const snapshot = await get(ref(database, `users/${user.uid}`));
      const data = snapshot.val();

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        name: data?.name || "",
        phone: data?.phone || "",
        address: data?.address || "",
        image: data?.image || null,
      });

      setLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  // ---------------------------------------------------------
  // ✔ REGISTRAR USUARIO
  // ---------------------------------------------------------
  const register = async ({ name, email, password, phone, address, image }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      let imageURL = null;

      if (image) {
        imageURL = await uploadImage(image, `profilePictures/${uid}.jpg`);
      }

      await set(ref(database, `users/${uid}`), {
        name,
        phone,
        address,
        email,
        image: imageURL,
      });

      return true;
    } catch (error) {
      console.log("❌ Error registro:", error);
      return false;
    }
  };

  // ---------------------------------------------------------
  // ✔ LOGIN
  // ---------------------------------------------------------
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      return false;
    }
  };

  // ---------------------------------------------------------
  // ✔ LOGOUT
  // ---------------------------------------------------------
  const logout = async () => {
    await signOut(auth);
  };

  // ---------------------------------------------------------
  // ✔ ELIMINAR CUENTA COMPLETA
  // ---------------------------------------------------------
  const deleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await remove(ref(database, `users/${user.uid}`));
      await deleteUser(user);

      setCurrentUser(null);
    } catch (error) {
      console.log("❌ Error eliminando cuenta:", error);
    }
  };

  // ---------------------------------------------------------
  // ✔ ACTUALIZAR DATOS NO SENSIBLES (nombre, teléfono, dirección, imagen)
  // ---------------------------------------------------------
  const updateUser = async (updatedData) => {
    if (!auth.currentUser) return;

    const uid = auth.currentUser.uid;
    let imageURL = currentUser.image;

    // Subir imagen si cambió
    if (updatedData.image && updatedData.image !== currentUser.image) {
      imageURL = await uploadImage(updatedData.image, `profilePictures/${uid}.jpg`);
    }

    const updates = {
      name: updatedData.name,
      phone: updatedData.phone,
      address: updatedData.address,
      image: imageURL,
    };

    await update(ref(database, `users/${uid}`), updates);

    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  // ---------------------------------------------------------
  // 🔥 Cambiar Email (requiere reautenticación)
  // ---------------------------------------------------------
  const changeEmail = async (currentPassword, newEmail) => {
    try {
      const user = auth.currentUser;
      if (!user) return { ok: false, message: "No hay usuario activo." };

      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);

      // actualizar también en la DB
      await update(ref(database, `users/${user.uid}`), { email: newEmail });

      return { ok: true };
    } catch (error) {
      console.log("❌ Error changeEmail:", error);
      return { ok: false, error, message: error.message };
    }
  };

  // ---------------------------------------------------------
  // 🔥 Cambiar Contraseña (requiere reautenticación)
  // ---------------------------------------------------------
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      if (!user) return { ok: false, message: "No hay usuario activo." };

      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      return { ok: true };
    } catch (error) {
      console.log("❌ Error changePassword:", error);
      return { ok: false, error, message: error.message };
    }
  };

  // ---------------------------------------------------------
  // EXPORTAR CONTEXTO
  // ---------------------------------------------------------
  return (
    <UserContext.Provider
      value={{
        currentUser,
        loadingUser,
        register,
        login,
        logout,
        updateUser,
        deleteAccount,
        changeEmail,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
