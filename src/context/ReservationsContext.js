import React, { createContext, useState, useContext } from "react";

const ReservationsContext = createContext();

export function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState([]);

  // ➕ Agregar nueva reserva
  const addReservation = (reservation) => {
    setReservations((prev) => [
      ...prev,
      {
        ...reservation,
        id: Date.now(),
        status: "Pendiente", // valores posibles: Pendiente, Completada, Cancelada
      },
    ]);
  };

  // ❌ Cancelar reserva
  const cancelReservation = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "Cancelada" } : res
      )
    );
  };

  // ✔ Completar reserva
  const completeReservation = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "Completada" } : res
      )
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
