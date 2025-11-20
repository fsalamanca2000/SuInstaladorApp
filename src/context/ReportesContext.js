// src/context/ReportesContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { useUser } from "./UserContext";

const ReportesContext = createContext();

export function ReportesProvider({ children }) {
  const { currentUser } = useUser();
  const [reports, setReports] = useState([]);

  /* 🔥 Cargar reportes del usuario al iniciar */
  useEffect(() => {
    if (!currentUser) return;

    const reportsRef = ref(database, `reportsByUser/${currentUser.uid}`);
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.values(data);
        setReports(arr);
      } else {
        setReports([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  /* 🔥 Subir reporte a Firebase */
  const addReport = async (report) => {
    if (!currentUser) return { ok: false, error: "No autenticado" };

    try {
      // Clave automática
      const newRef = push(ref(database, `reportsByUser/${currentUser.uid}`));
      const id = newRef.key;

      const reportData = {
        id,
        userId: currentUser.uid,
        type: report.type,
        message: report.message,
        image: report.image || null,
        status: "Pendiente",
        createdAt: Date.now(),
        date: new Date().toLocaleString("es-CO"),
      };

      // Guardar en Firebase
      await set(newRef, reportData);

      return { ok: true };
    } catch (err) {
      console.log("🔥 Error subiendo reporte:", err);
      return { ok: false, error: err };
    }
  };

  return (
    <ReportesContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportesContext.Provider>
  );
}

export const useReportes = () => useContext(ReportesContext);
