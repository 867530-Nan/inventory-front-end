import React from "react";
import QRCodeScanner from "./QRCodeScanner";
import SampleList from "./SampleList";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";
import ScannedModal from "./scannedModal";
import moment from "moment";
import { Alert } from "react-bootstrap";

const QRScanner = ({ scanning, onNewScanResult }) => {
  //   const [scanning, setScanning] = React.useState(false);
  //   const [showInfoModal, setShowInfoModal] = React.useState(false);
  //   const [successfulOrder, setSuccessfullOrder] = React.useState(false);
  //   const [scannedID, setScannedID] = React.useState(undefined);
  //   const [scannedStyle, setScannedStyle] = React.useState({});
  //   const [customerEmail, setCustomerEmail] = React.useState(undefined);
  //   const [foundOrder, setFoundOrder] = React.useState([]);
  //   const [successfulCheckin, setSuccessfulCheckin] = React.useState(false);
  //   React.useEffect(() => {
  //     if (successfulOrder) {
  //       setTimeout(() => {
  //         setSuccessfullOrder(false);
  //       }, 5000);
  //     }
  //   }, [successfulOrder]);

  //   React.useEffect(() => {
  //     if (successfulCheckin) {
  //       setTimeout(() => {
  //         setSuccessfulCheckin(false);
  //       }, 5000);
  //     }
  //   }, [successfulCheckin]);

  //   const startScan = () => {
  //     setScanning(true);
  //   };

  //   const onNewScanResult = (decodedText, decodedResult) => {
  //     if (decodedText) {
  //       setScannedID(decodedText);
  //       axios
  //         .get(
  //           `${serverEndpointSwitch}/api/v1/qr-singles/${decodedText}/style-and-orders`,
  //         )
  //         .then((response) => {
  //           setScannedStyle(response.data.style[0]);
  //           setShowInfoModal(true);
  //           setFoundOrder(response.data.orders);
  //         })
  //         .catch((error) => {
  //         })
  //         .finally(() => {
  //           setScanning(false);
  //         });
  //     }
  //   };

  //   const onOrder = () => {
  //     setScannedStyle(undefined);
  //     const currentDateTime = moment();
  //     const orerData = {
  //       customer_email: customerEmail,
  //       qr_single_id: scannedID,
  //       order_date: currentDateTime.format("YYYY-MM-DD HH:mm:ss"),
  //       style_id: scannedStyle.id,
  //     };

  //     axios
  //       .post(`${serverEndpointSwitch}/api/v1/orders`, orerData)
  //       .then((res) => {
  //         setSuccessfullOrder(true);
  //       })
  //       .catch((err) => {
  //       })
  //       .finally(() => {
  //         handleModalClose();
  //       });
  //   };

  //   const onCheckIn = () => {
  //     setScannedStyle(undefined);
  //     const currentDateTime = moment();
  //     const orerData = {
  //       checkin_date: currentDateTime.format("YYYY-MM-DD HH:mm:ss"),
  //     };

  //     axios
  //       .put(`${serverEndpointSwitch}/api/v1/orders/${foundOrder.id}`, orerData)
  //       .then((res) => {
  //         setSuccessfulCheckin(true);
  //       })
  //       .catch((err) => {
  //       })
  //       .finally(() => {
  //         handleModalClose();
  //       });
  //   };

  //   function handleModalClose() {
  //     setScannedStyle(undefined);
  //     setCustomerEmail(undefined);
  //     setFoundOrder(false);
  //   }

  return (
    <div className="App">
      {/* {successfulOrder && <Alert variant="success">Order Successful</Alert>}
      {successfulCheckin && <Alert variant="success">Checkin Successful</Alert>}
      <button onClick={startScan}>Scan Sample</button>
      <hr />
      <hr /> */}
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
      {/* {scannedStyle && (
        <>
          <ScannedModal
            showModal={showInfoModal}
            setShowModal={setShowInfoModal}
            infoObj={scannedStyle}
            onCheckInClick={() => {
              onCheckIn();
            }}
            onOrderClick={() => {
              onOrder();
            }}
            disableOrder={foundOrder.length}
            customerEmail={
              foundOrder.length ? foundOrder.customer_email : customerEmail
            }
            setCustomerEmail={setCustomerEmail}
            handleModalClose={handleModalClose}
          />
        </>
      )} */}
    </div>
  );
};

export default QRScanner;
