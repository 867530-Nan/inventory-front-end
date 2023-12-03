import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { serverEndpointSwitch } from "../../utils/common";
import { useStylesContext } from "../../contexts/StylesContext";
import SampleManagementComponent from "./StylesManager";

const StylesReview = ({}) => {
  const [orders, setOrders] = useState([]);
  const [styleColorsAndQRs, setStyleColorsAndQRs] = useState([]);

  const { uniqueStylesArray, onSelectStyle, selectedStyle } =
    useStylesContext();
  useEffect(() => {
    const fetchQRCodes = async () => {
      console.log("from the component", selectedStyle);
      if (selectedStyle) {
        try {
          const response = await axios.post(
            `${serverEndpointSwitch}/api/v1/styles/get-style-info-by-name`,
            { name: selectedStyle[0].name },
          );
          setStyleColorsAndQRs(response.data);
        } catch (error) {
          console.error("Error fetching QR codes:", error);
        }
      }
    };

    fetchQRCodes();
  }, [selectedStyle]);

  const handleStyleChange = (event) => {
    onSelectStyle({ name: event.target.value });
  };

  return (
    <div>
      <label>Select a style:</label>
      <select onChange={handleStyleChange} value={selectedStyle?.id}>
        <option value={null}>Select a style</option>
        {uniqueStylesArray.length &&
          uniqueStylesArray.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
      </select>

      {selectedStyle && <SampleManagementComponent data={styleColorsAndQRs} />}
      {/* {orders.length && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((qrCode) => (
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

export default StylesReview;
