// BannerAlertContext.js

import React, { createContext, useContext, useState } from "react";
import ToastAlert from "../components/alerts/ToastAlerts";

const BannerAlertContext = createContext();

export const BannerAlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("success"); // or 'fail'

  const showSuccessAlert = (text) => {
    setShowAlert(true);
    setAlertText(text);
    setAlertType("success");
  };

  const showFailAlert = (text) => {
    setShowAlert(true);
    setAlertText(text);
    setAlertType("fail");
  };

  const hideAlert = () => {
    setShowAlert(false);
    setAlertText("");
    setAlertType("success"); // Reset to default
  };

  const value = {
    showAlert,
    alertText,
    alertType,
    showSuccessAlert,
    showFailAlert,
    hideAlert,
  };

  return (
    <BannerAlertContext.Provider value={value}>
      {showAlert ? (
        <ToastAlert alertText={alertText} alertType={alertType} />
      ) : null}
      {children}
    </BannerAlertContext.Provider>
  );
};

export const useBannerAlert = () => {
  return useContext(BannerAlertContext);
};
