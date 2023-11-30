// RootProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { StylesProvider } from "./StylesContext";
import { OrdersProvider } from "./OrdersContext";
import { QRCodesManagerProvider } from "./QRCodesContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <StylesProvider>
        <OrdersProvider>
          <QRCodesManagerProvider>{children}</QRCodesManagerProvider>
        </OrdersProvider>
      </StylesProvider>
    </AuthProvider>
  );
}
