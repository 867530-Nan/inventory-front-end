import React, { useState } from "react";
import QRScanner from "./QRScanner";
import { useQRCodesManager } from "../contexts/QRCodesContext";

const QRCodeManager = () => {
  const [qrCodeInput, setQRCodeInput] = useState("");
  const [scannedQRCode, setScannedQRCode] = useState("");
  const [isQRCodeManagerVisible, setQRCodeManagerVisibility] = useState("");
  const { addQRCode, stylesByQRArray, deleteQRCode } = useQRCodesManager();

  const handleInputChange = (event) => {
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
    // createOrder({ qr_code: scannedCode });
  };

  const handleDelete = (qr) => {
    deleteQRCode(qr);
  };

  const toggleQRCodeManager = () => {
    setQRCodeManagerVisibility(!isQRCodeManagerVisible);
  };
  return (
    <div>
      {/* Single-Input Form */}
      <div className="flex items-center justify-center align-middle">
        <label className="mr-2">
          Enter QR Code:
          <input
            type="text"
            value={qrCodeInput}
            onChange={handleInputChange}
            className="py-2 px-3 border border-gray-300 rounded-md"
          />
        </label>
        <button
          className="mt-2.5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveQRCode}
        >
          Add
        </button>
      </div>

      {/* QR Scanner */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleQRCodeManager}
        >
          {!isQRCodeManagerVisible ? "Scan QR Code" : "Close"}
        </button>
        {/* Assuming you have a QRScanner component that takes handleScanQRCode as a prop */}
        <QRScanner
          onNewScanResult={handleScanQRCode}
          scanning={isQRCodeManagerVisible}
        />
        {scannedQRCode && <p>Scanned QR Code: {scannedQRCode}</p>}
      </div>

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
            {stylesByQRArray.map((order) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QRCodeManager;
