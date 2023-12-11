// RootProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { StylesProvider } from "./StylesContext";
import { OrdersProvider } from "./OrdersContext";
import { QRCodesManagerProvider } from "./QRCodesContext";
import { BannerAlertProvider } from "./BannerAlertContext";
import { DashboardProvider } from "./DashboardContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <StylesProvider>
        <OrdersProvider>
          <QRCodesManagerProvider>
            <BannerAlertProvider>
              <DashboardProvider>{children}</DashboardProvider>
            </BannerAlertProvider>
          </QRCodesManagerProvider>
        </OrdersProvider>
      </StylesProvider>
    </AuthProvider>
  );
}
