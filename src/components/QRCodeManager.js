import React, { useState } from "react";
import QRScanner from "./QRScanner";
import { useQRCodesManager } from "../contexts/QRCodesContext";
import { serverEndpointSwitch } from "../utils/common";
import axios from "axios";

const QRCodeManager = () => {
  const [qrCodeInput, setQRCodeInput] = useState("");
  const [scannedQRCode, setScannedQRCode] = useState("");
  const [isQRCodeManagerVisible, setQRCodeManagerVisibility] = useState(false);
  const { addQRCode, stylesByQRArray, deleteQRCode } = useQRCodesManager();

  const handleInputChange = (event) => {
    event.preventDefault();
    setQRCodeInput(event.target.value);
  };

  const handleSaveQRCode = async () => {
    if (qrCodeInput.trim() !== "") {
      await axios
        .get(
          `${serverEndpointSwitch}/api/v1/qr-singles/${qrCodeInput.trim()}/check-has-inventory`,
        )
        .then(() => {
          addQRCode(qrCodeInput);
          setQRCodeInput("");
        })
        .catch((err) =>
          alert(
            `ZERO inventory for the style with QR ID: ${qrCodeInput.trim()}`,
          ),
        );
    }
  };

  const handleScanQRCode = async (scannedCode) => {
    await axios
      .get(
        `${serverEndpointSwitch}/api/v1/qr-singles/${scannedCode}/check-has-inventory`,
      )
      .then(() => {
        addQRCode(scannedCode);
        setScannedQRCode(scannedCode);
        setQRCodeManagerVisibility(false);
      })
      .catch((err) =>
        alert(`ZERO inventory for the style with QR ID: ${scannedCode}`),
      );
  };

  const handleDelete = (qr) => {
    console.log("handle delete", qr);
    deleteQRCode(qr);
  };

  const toggleQRCodeManager = (manualEntry) => {
    setQRCodeManagerVisibility(manualEntry);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Trigger the click event
      document.getElementById("addButton").click();
    }
  };

  return (
    <div>
      {/* Buttons for Manual Entry and Scan QR Code */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className={`py-2 px-4 rounded text-white font-bold bg-blue-400 bg-blue-300 ${
            !isQRCodeManagerVisible ? "bg-blue-900" : ""
          }`}
          onClick={() => toggleQRCodeManager(false)}
        >
          Manual Entry
        </button>

        <button
          type="button"
          className={`mx-3 py-2 px-4 rounded text-white font-bold bg-blue-400 ${
            isQRCodeManagerVisible ? "bg-blue-900" : ""
          }`}
          onClick={() => toggleQRCodeManager(true)}
        >
          Scan QR Code
        </button>
      </div>

      {/* Render Manual Entry Input and "Add" Button */}
      {!isQRCodeManagerVisible && (
        <div className="flex items-center justify-center mt-4">
          <label className="mr-2">
            Enter QR Code:
            <input
              type="number"
              value={qrCodeInput}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              className="py-2 px-3 border border-gray-300 rounded-md"
            />
          </label>
          <button
            type="button"
            className="mt-2.5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            id="addButton"
            onClick={() => handleSaveQRCode()}
            onKeyUp={handleKeyPress}
          >
            Add
          </button>
        </div>
      )}

      {/* Render QR Scanner */}
      {isQRCodeManagerVisible && (
        <div>
          {/* Assuming you have a QRScanner component that takes handleScanQRCode as a prop */}
          <QRScanner
            onNewScanResult={handleScanQRCode}
            scanning={isQRCodeManagerVisible}
          />
          {scannedQRCode && <p>Scanned QR Code: {scannedQRCode}</p>}
        </div>
      )}

      {/* Table for Displaying QR Codes */}
      {stylesByQRArray.length ? (
        <div>
          <h3 className="my-3">Scanned Samples</h3>
          <table style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "50px" }}></th>
                <th>ID</th>
                <th>Style</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {stylesByQRArray.map((order) => {
                console.log("the order", order.qr_code);
                return (
                  <tr key={order.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.qr_code)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline"
                      >
                        X
                      </button>
                    </td>

                    <td>{order.qr_code}</td>
                    <td>{order.name} </td>
                    <td>{order.color} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default QRCodeManager;
