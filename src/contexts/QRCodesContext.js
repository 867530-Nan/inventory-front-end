// QRCodesManagerContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { serverEndpointSwitch } from "../utils/common";
import axios from "axios";

// Create the context
const QRCodesManagerContext = createContext();

// Create a provider component
export const QRCodesManagerProvider = ({ children }) => {
  const [stylesByQR, setStylesByQR] = useState({});

  const updateStylesByQR = (newQRCode) => {
    if (stylesByQR[newQRCode]) {
      setStylesByQR((prev) => {
        const updatedState = { ...prev };
        delete updatedState[newQRCode];
        return updatedState;
      });
    } else {
      axios
        .get(
          `${serverEndpointSwitch}/api/v1/qr-singles/${newQRCode}/style-by-qr`,
        )
        .then((res) => setStylesByQR({ ...stylesByQR, [newQRCode]: res.data }))
        .catch((err) => {
          delete stylesByQR[newQRCode];
          alert(`Sample not found for QR: ${newQRCode}`);
          console.error("error fetching the style by QR", err);
        });
    }
  };

  const setBulkStylesByQr = (codesAndStyles) => {
    const reduced = codesAndStyles.reduce((acc, cv) => {
      return { ...acc, [cv.qr_code]: cv };
    }, {});
    setStylesByQR(reduced);
  };

  // Create a new QR code
  const addQRCode = (newQRCode) => {
    updateStylesByQR(newQRCode);
  };

  // Update a QR code
  // const updateQRCode = (id, updatedQRCode) => {
  //   setQRCodes((prevQRCodes) =>
  //     prevQRCodes.map((qrCode) => (qrCode.id === id ? updatedQRCode : qrCode)),
  //   );
  // };

  // Delete a QR code
  const deleteQRCode = (qr) => {
    updateStylesByQR(qr);
  };

  // Read: Get all QR codes
  const getAllQRCodes = () => stylesByQR.map((s) => s.qr_code);

  const getQRCodeIDs = () => Object.values(stylesByQR).map((s) => s.id);

  // Read: Get a specific QR code by ID
  const getQRCodeById = (id) => stylesByQR[id];

  const stylesByQRArray = Object.values(stylesByQR);

  // Context value
  const contextValue = {
    stylesByQRArray,
    addQRCode,
    stylesByQR,
    getQRCodeIDs,
    deleteQRCode,
    getAllQRCodes,
    getQRCodeById,
    setBulkStylesByQr,
    setStylesByQR,
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
