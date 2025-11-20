import React, { createContext, useState, useContext } from "react";

const PaymentMethodsContext = createContext();

export function PaymentMethodsProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const addCard = (card) => {
    setCards((prev) => [...prev, { ...card, id: Date.now() }]);
  };

  const removeCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const addTransfer = (account) => {
    setTransfers((prev) => [...prev, { ...account, id: Date.now() }]);
  };

  const removeTransfer = (id) => {
    setTransfers((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <PaymentMethodsContext.Provider
      value={{
        cards,
        transfers,
        addCard,
        removeCard,
        addTransfer,
        removeTransfer,
      }}
    >
      {children}
    </PaymentMethodsContext.Provider>
  );
}

export const usePaymentMethods = () => useContext(PaymentMethodsContext);
