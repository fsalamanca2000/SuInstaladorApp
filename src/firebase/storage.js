// src/firebase/storage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const storage = getStorage(app);

export async function uploadImage(uri, path) {
  try {
    // Convertir imagen a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, path);

    // Subir archivo
    await uploadBytes(imageRef, blob);

    // Obtener URL
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  } catch (error) {
    console.error("🔥 Error subiendo imagen:", error);
    return null;
  }
}
