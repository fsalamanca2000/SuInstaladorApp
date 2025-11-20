import React, { createContext, useState, useContext, useEffect } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, push, set, onValue, update } from "firebase/database";
import { useUser } from "./UserContext";

const ReservationsContext = createContext();

export function ReservationsProvider({ children }) {
  const { currentUser } = useUser();

  const [reservations, setReservations] = useState([]);

  /** ------------------------------
   * 🔥 1. Cargar reservas desde Firebase
   * ------------------------------*/
  useEffect(() => {
    if (!currentUser?.uid) return;

    const userResRef = ref(database, `users/${currentUser.uid}/reservations`);

    const unsubscribe = onValue(userResRef, (snapshot) => {
      const data = snapshot.val() || {};
      setReservations(Object.values(data));
    });

    return unsubscribe;
  }, [currentUser]);

  /** ------------------------------
   * 🔥 2. Agregar reserva
   * ------------------------------*/
  const addReservation = async (reservation) => {
    const id = push(
      ref(database, `users/${currentUser.uid}/reservations`)
    ).key;

    const payload = {
      ...reservation,
      id,
      status: "Pendiente",
    };

    await set(
      ref(database, `users/${currentUser.uid}/reservations/${id}`),
      payload
    );
  };

  /** ------------------------------
   * 🔥 3. Cancelar reserva
   * ------------------------------*/
  const cancelReservation = async (id) => {
    await update(
      ref(database, `users/${currentUser.uid}/reservations/${id}`),
      { status: "Cancelada" }
    );
  };

  /** ------------------------------
   * 🔥 4. Completar reserva
   * ------------------------------*/
  const completeReservation = async (id) => {
    await update(
      ref(database, `users/${currentUser.uid}/reservations/${id}`),
      { status: "Completada" }
    );
  };

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        addReservation,
        cancelReservation,
        completeReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export const useReservations = () => useContext(ReservationsContext);
