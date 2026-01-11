"use client";
import { store } from "@/app/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const ClientOnly = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default ClientOnly;
