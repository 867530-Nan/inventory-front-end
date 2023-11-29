import React, { useState } from "react";
import { useOrders } from "../contexts/OrdersContext"; // Replace with the actual path to your ordersContext
import QRScanner from "./QRScanner";

const QRCodeManager = () => {
  const { orders, createOrder } = useOrders();
  const [qrCodeInput, setQRCodeInput] = useState("");
  const [scannedQRCode, setScannedQRCode] = useState("");
  const [isQRCodeManagerVisible, setQRCodeManagerVisibility] = useState("");

  const handleInputChange = (event) => {
    setQRCodeInput(event.target.value);
  };

  const handleSaveQRCode = () => {
    if (qrCodeInput.trim() !== "") {
      createOrder({ qr_code: qrCodeInput });
      setQRCodeInput("");
    }
  };

  const handleScanQRCode = (scannedCode) => {
    setScannedQRCode(scannedCode);
    createOrder({ qr_code: scannedCode });
  };

  const toggleQRCodeManager = () => {
    setQRCodeManagerVisibility(!isQRCodeManagerVisible);
  };

  return (
    <div>
      {/* Single-Input Form */}
      <div>
        <label>
          Enter QR Code:
          <input type="text" value={qrCodeInput} onChange={handleInputChange} />
        </label>
        <button onClick={handleSaveQRCode}>Add</button>
      </div>

      {/* QR Scanner */}
      <div>
        <button onClick={toggleQRCodeManager}>
          {!isQRCodeManagerVisible ? "Scan QR Code" : ""}
        </button>
        {/* Assuming you have a QRScanner component that takes handleScanQRCode as a prop */}
        <QRScanner
          onNewScanResult={handleScanQRCode}
          scanning={!isQRCodeManagerVisible}
        />
        {scannedQRCode && <p>Scanned QR Code: {scannedQRCode}</p>}
      </div>

      {/* Table for Displaying QR Codes */}
      <div>
        <h3>Collected QR Codes</h3>
        <table>
          <thead>
            <tr>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.qr_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save and Close Buttons */}
      <div>
        <button onClick={handleSaveQRCode}>Save</button>
        {/* You might want to implement a function for closing, depending on your requirements */}
        <button onClick={() => console.log("Close button clicked")}>
          Close
        </button>
      </div>
    </div>
  );
};

export default QRCodeManager;
