// QRCodesManagerContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { serverEndpointSwitch } from "../utils/common";
import axios from "axios";

// Create the context
const QRCodesManagerContext = createContext();

// Create a provider component
export const QRCodesManagerProvider = ({ children }) => {
  const [qrCodes, setQRCodes] = useState([]);
  const [stylesByQR, setStylesByQR] = useState({});

  const updateStylesByQR = (newQRCode) => {
    if (stylesByQR[newQRCode]) {
      delete stylesByQR[newQRCode];
    } else {
      console.log("");
      axios
        .get(
          `${serverEndpointSwitch}/api/v1/qr-singles/${newQRCode}/style-by-qr`,
        )
        .then((res) => setStylesByQR({ ...stylesByQR, [newQRCode]: res.data }))
        .catch((err) => console.error("error fetching the style by QR", err));
    }
  };

  // Create a new QR code
  const addQRCode = (newQRCode) => {
    setQRCodes((prevQRCodes) => [...prevQRCodes, newQRCode]);
    updateStylesByQR(newQRCode);
  };

  // Update a QR code
  const updateQRCode = (id, updatedQRCode) => {
    setQRCodes((prevQRCodes) =>
      prevQRCodes.map((qrCode) => (qrCode.id === id ? updatedQRCode : qrCode)),
    );
  };

  // Delete a QR code
  const deleteQRCode = (id) => {
    setQRCodes((prevQRCodes) =>
      prevQRCodes.filter((qrCode) => qrCode.id !== id),
    );
  };

  // Read: Get all QR codes
  const getAllQRCodes = () => qrCodes;

  // Read: Get a specific QR code by ID
  const getQRCodeById = (id) => qrCodes.find((qrCode) => qrCode.id === id);

  const stylesByQRArray = Object.values(stylesByQR);

  // Context value
  const contextValue = {
    stylesByQRArray,
    qrCodes,
    addQRCode,
    stylesByQR,
    updateQRCode,
    deleteQRCode,
    getAllQRCodes,
    getQRCodeById,
  };

  return (
    <QRCodesManagerContext.Provider value={contextValue}>
      {children}
    </QRCodesManagerContext.Provider>
  );
};

// Custom hook for using the context
export const useQRCodesManager = () => {
  const context = useContext(QRCodesManagerContext);
  if (!context) {
    throw new Error("useQRCodes must be used within a QRCodesProvider");
  }
  return context;
};
