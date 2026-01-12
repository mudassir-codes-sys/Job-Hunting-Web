"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type contextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const GlobalContext = createContext<contextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  const value = {
    loading,
    setLoading,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      "useGlobalContext must be used inside GlobalContextProvider"
    );
  return context;
};
