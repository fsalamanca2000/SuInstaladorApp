import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { useUser } from "./UserContext";

const PaymentMethodsContext = createContext();

export function PaymentMethodsProvider({ children }) {
  const { currentUser } = useUser();
  const [cards, setCards] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [defaultMethod, setDefaultMethod] = useState(null);

  // 🔥 Cargar métodos de pago del usuario
  useEffect(() => {
    if (!currentUser?.uid) return;

    const userRef = ref(database, `users/${currentUser.uid}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val() || {};

      setCards(data.cards ? Object.values(data.cards) : []);
      setTransfers(data.transfers ? Object.values(data.transfers) : []);
      setDefaultMethod(data.defaultPayment || null);
    });

    return unsubscribe;
  }, [currentUser]);

  // ➕ Agregar tarjeta (SIN CVV)
  const addCard = async ({ cardNumber, expDate }) => {
    const id = push(ref(database, `users/${currentUser.uid}/cards`)).key;

    const card = {
      id,
      cardNumber,
      expDate,
      type: "Tarjeta",
    };

    await set(ref(database, `users/${currentUser.uid}/cards/${id}`), card);
  };

  // ❌ Eliminar tarjeta
  const deleteCard = async (id) => {
    await remove(ref(database, `users/${currentUser.uid}/cards/${id}`));
  };

  // ➕ Agregar transferencia
  const addTransfer = async ({ bank, account }) => {
    const id = push(ref(database, `users/${currentUser.uid}/transfers`)).key;

    const transfer = {
      id,
      bank,
      account,
      type: "Transferencia",
    };

    await set(
      ref(database, `users/${currentUser.uid}/transfers/${id}`),
      transfer
    );
  };

  // ❌ Eliminar transferencia
  const deleteTransfer = async (id) => {
    await remove(ref(database, `users/${currentUser.uid}/transfers/${id}`));
  };

  // ⭐ Guardar método default
  const saveDefaultMethod = async (methodId, methodType) => {
    const payload = { id: methodId, type: methodType };

    await update(ref(database, `users/${currentUser.uid}`), {
      defaultPayment: payload,
    });

    setDefaultMethod(payload);
  };

  return (
    <PaymentMethodsContext.Provider
      value={{
        cards,
        transfers,
        addCard,
        deleteCard,
        addTransfer,
        deleteTransfer,
        defaultMethod,
        setDefaultMethod: saveDefaultMethod,
      }}
    >
      {children}
    </PaymentMethodsContext.Provider>
  );
}

export const usePaymentMethods = () => useContext(PaymentMethodsContext);
