// RootProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { StylesProvider } from "./StylesContext";
import { OrdersProvider } from "./OrdersContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <StylesProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </StylesProvider>
    </AuthProvider>
  );
}
