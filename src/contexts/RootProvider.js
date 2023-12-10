// RootProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { StylesProvider } from "./StylesContext";
import { OrdersProvider } from "./OrdersContext";
import { QRCodesManagerProvider } from "./QRCodesContext";
import { BannerAlertProvider } from "./BannerAlertContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <StylesProvider>
        <OrdersProvider>
          <QRCodesManagerProvider>
            <BannerAlertProvider>{children}</BannerAlertProvider>
          </QRCodesManagerProvider>
        </OrdersProvider>
      </StylesProvider>
    </AuthProvider>
  );
}
