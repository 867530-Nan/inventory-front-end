// RootProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { StylesProvider } from "./StylesContext";

export default function RootProvider({ children }) {
  return (
    <AuthProvider>
      <StylesProvider>{children}</StylesProvider>
    </AuthProvider>
  );
}
