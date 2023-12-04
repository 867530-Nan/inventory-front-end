import React from "react";
import QRCodeScanner from "./QRCodeScanner";

const QRScanner = ({ scanning, onNewScanResult }) => {
  return (
    <div className="flex justify-center mt-5">
      {scanning && (
        <div style={{ width: 300 }}>
          <QRCodeScanner
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </div>
      )}
    </div>
  );
};

export default QRScanner;
