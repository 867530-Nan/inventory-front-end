import React, { useState } from "react";
import QRScanner from "./QRScanner";
import { useQRCodesManager } from "../contexts/QRCodesContext";

const QRCodeManager = () => {
  const [qrCodeInput, setQRCodeInput] = useState("");
  const [scannedQRCode, setScannedQRCode] = useState("");
  const [isQRCodeManagerVisible, setQRCodeManagerVisibility] = useState(false);
  const { addQRCode, stylesByQRArray, deleteQRCode } = useQRCodesManager();

  const handleInputChange = (event) => {
    event.preventDefault();
    setQRCodeInput(event.target.value);
  };

  const handleSaveQRCode = () => {
    if (qrCodeInput.trim() !== "") {
      addQRCode(qrCodeInput);
      setQRCodeInput("");
    }
  };

  const handleScanQRCode = (scannedCode) => {
    addQRCode(scannedCode);
    setScannedQRCode(scannedCode);
    setQRCodeManagerVisibility(false);
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
          className={`py-2 px-4 rounded text-white font-bold bg-blue-400 ${
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
      <div>
        <h3 className="my-3">Scanned Samples</h3>
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>Style</th>
              <th>Color</th>
              <th>ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stylesByQRArray.map((order) => {
              console.log("the order", order.qr_code);
              return (
                <tr key={order.id}>
                  <td>{order.name} </td>
                  <td>{order.color} </td>
                  <td>{order.qr_code}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(order.qr_code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QRCodeManager;
