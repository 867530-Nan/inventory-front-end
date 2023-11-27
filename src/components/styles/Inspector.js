import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { serverEndpointSwitch } from "../../utils/common";
import { useStylesContext } from "../../contexts/StylesContext";

const Inspector = ({}) => {
  const [checkouts, setCheckouts] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);

  const { styles, selectStyle, selectedStyle } = useStylesContext();

  useEffect(() => {
    // Fetch QR codes when the selected style changes
    const fetchQRCodes = async () => {
      if (selectedStyle) {
        try {
          const response = await axios.post(
            `${serverEndpointSwitch}/api/v1/styles/get-style-info-by-name`,
            { name: selectedStyle[0].name },
          );
          console.log("the response");
        } catch (error) {
          console.error("Error fetching QR codes:", error);
        }
      }
    };

    fetchQRCodes();
  }, [selectedStyle]);

  const handleStyleChange = (event) => {
    selectStyle(event.target.value);
  };

  return (
    <div>
      <label>Select a style:</label>
      <select onChange={handleStyleChange} value={selectedStyle?.id}>
        <option value={null}>Select a style</option>
        {styles.length &&
          styles.map((style) => (
            <option key={style.id} value={style.id}>
              {style.name}
            </option>
          ))}
      </select>

      {selectedStyle && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Style ID</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {qrCodes.map((qrCode) => (
              <tr key={qrCode.id}>
                <td>{qrCode.id}</td>
                <td>{qrCode.style_id}</td>
                <td>
                  <QRCode
                    size={120}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 120 120`}
                    value={qrCode.id.toString()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* {checkouts.length && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((qrCode) => (
              <tr key={qrCode.id}>
                <td>{qrCode.id}</td>
                <td>{qrCode.style_id}</td>
                <td>
                  <QRCode
                    size={120}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 120 120`}
                    value={qrCode.id.toString()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
};

export default Inspector;
