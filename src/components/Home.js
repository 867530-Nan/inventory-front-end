import React from "react";
import QRCodeScanner from "./QRCodeScanner";
import SampleList from "./SampleList";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";

function Home() {
  const [text, setText] = React.useState(undefined);
  const [res, setRes] = React.useState();
  const [scanning, setScanning] = React.useState(false);

  const startScan = () => {
    setScanning(true);
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    if (decodedText) {
      axios
        .get(`${serverEndpointSwitch}/api/v1/qr-singles/${decodedText}`)
        .then((response) => {
          console.log("POST request successful:", response.data[0]);
          setText(response.data[0]);
          setScanning(false);
        })
        .catch((error) => {
          console.error("POST request failed:", error);
          setScanning(false);
        })
        .finally(() => {
          setScanning(false);
        });
    } else setText("no decode");
    if (decodedResult) {
      setRes(decodedResult);
      console.log("resresresres", decodedResult);
    } else setRes("no bueno my guy");
  };

  const displayObjectInfo = (obj) => {
    let info = "";
    for (const key in obj) {
      info += `${key}: ${obj[key]}\n`;
    }
    return info;
  };

  console.log("the always", text);

  return (
    <div className="App">
      <button onClick={startScan}>fart scanner</button>
      <hr />
      <hr />
      {scanning && (
        <div style={{ height: "300px", width: 300 }}>
          <QRCodeScanner
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </div>
      )}
      <div style={{ marginTop: 200 }}>
        <h1>Is text?: {text ? "yes" : "no"}</h1>
        {text && <h1>The decoded text: {displayObjectInfo(text)}</h1>}
      </div>
      <SampleList />
    </div>
  );
}

export default Home;

// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';

// function QRScanner({ onScan }) {
//   const [scanning, setScanning] = useState(false);

//   const handleScan = (data) => {
//     if (data) {
//       // QR code was successfully scanned
//       setScanning(false); // Close the scanner
//       onScan(data); // Callback on success
//     }
//   };

//   const handleError = (error) => {
//     console.error(error);
//     // Handle the error as needed
//     setScanning(false); // Close the scanner
//     // You can also trigger a callback on failure if desired
//   };

//   const startScan = () => {
//     setScanning(true);
//   };

//   return (
//     <div>
//       <button onClick={startScan}>Open QR Scanner</button>
//       {scanning && (
//         <QrReader
//           delay={300} // Delay between scans (in milliseconds)
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: '100%' }} // Adjust the style as needed
//         />
//       )}
//     </div>
//   );
// }

// export default QRScanner;
