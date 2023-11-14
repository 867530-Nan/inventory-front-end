import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { serverEndpointSwitch } from "../../utils/common";

const Inspector = ({ passedStyle }) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [checkouts, setCheckouts] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${serverEndpointSwitch}/api/v1/styles`)
        .then((res) => {
          console.log("all styles", res);
          setStyles(res.data);
        })
        .catch((err) => console.error("all styles error", err));
    } catch (error) {
      console.error("Error fetching QR codes:", error);
    }
  }, []);

  useEffect(() => {
    console.log("the passed style", passedStyle);
    setSelectedStyleId(passedStyle);
  }, [passedStyle]);

  useEffect(() => {
    // Fetch QR codes when the selected style changes
    const fetchQRCodes = async () => {
      if (selectedStyleId) {
        try {
          const response = await axios.get(
            `${serverEndpointSwitch}/api/v1/styles/get-style-info/${selectedStyleId}`,
          );
          setQrCodes(response.data.qrSingles);
          setCheckouts(response.data.checkouts);
        } catch (error) {
          console.error("Error fetching QR codes:", error);
        }
      }
    };

    fetchQRCodes();
  }, [selectedStyleId]);

  const handleStyleChange = (event) => {
    setSelectedStyleId(event.target.value);
  };

  return (
    <div>
      <label>Select a style:</label>
      <select onChange={handleStyleChange} value={selectedStyleId}>
        <option value={null}>Select a style</option>
        {styles.length &&
          styles.map((style) => (
            <option key={style.id} value={style.id}>
              {style.name}
            </option>
          ))}
      </select>

      {selectedStyleId && (
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
