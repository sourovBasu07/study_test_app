"use client";

import { createContext, useContext, useState } from "react";

type PaymentContextType = {
  paymentLink: string | null;
  setPaymentLink: React.Dispatch<React.SetStateAction<string | null>>;
};

const PaymentContext = createContext<PaymentContextType | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  return (
    <PaymentContext.Provider value={{ paymentLink, setPaymentLink }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentLink = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
