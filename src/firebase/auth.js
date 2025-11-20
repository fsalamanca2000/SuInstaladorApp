// src/firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";

import { auth, database } from "./firebaseConfig";
import { ref, set } from "firebase/database";

// Registrar usuario
export async function registerUser({ name, email, password, phone, address, image }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Actualizar perfil en Firebase Auth
  await updateProfile(user, {
    displayName: name,
    photoURL: image || null,
  });

  // Guardar datos en la Realtime Database
  await set(ref(database, `users/${user.uid}`), {
    name,
    email,
    phone,
    address,
    image: image || null,
  });

  return user;
}

// Login
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Eliminar usuario
export async function removeUser() {
  if (auth.currentUser) {
    return await deleteUser(auth.currentUser);
  }
}

// Logout
export function logoutUser() {
  return auth.signOut();
}
