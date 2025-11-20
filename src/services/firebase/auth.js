import { auth } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password, nombre, apellido) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  // Guardar nombre y apellido en el perfil del usuario
  await updateProfile(result.user, {
    displayName: `${nombre} ${apellido}`,
  });
  return result.user;
};

export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};
