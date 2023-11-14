import React from "react";
import QRCodeScanner from "./QRCodeScanner";
import SampleList from "./SampleList";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";
import ScannedModal from "./scannedModal";
import moment from "moment";
import { Alert } from "react-bootstrap";

function MobileScanner() {
  const [scanning, setScanning] = React.useState(false);
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [successfulCheckout, setSuccessfullCheckout] = React.useState(false);
  const [scannedID, setScannedID] = React.useState(undefined);
  const [scannedObj, setScannedObj] = React.useState(undefined);
  const [customerEmail, setCustomerEmail] = React.useState(undefined);
  const [foundCheckout, setFoundCheckout] = React.useState(undefined);
  const [successfulCheckin, setSuccessfulCheckin] = React.useState(false);
  React.useEffect(() => {
    if (successfulCheckout) {
      setTimeout(() => {
        setSuccessfullCheckout(false);
      }, 5000);
    }
  }, [successfulCheckout]);

  React.useEffect(() => {
    if (successfulCheckin) {
      setTimeout(() => {
        setSuccessfulCheckin(false);
      }, 5000);
    }
  }, [successfulCheckin]);

  const startScan = () => {
    setScanning(true);
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    if (decodedText) {
      setScannedID(decodedText);
      axios
        .get(`${serverEndpointSwitch}/api/v1/qr-singles/${decodedText}`)
        .then((response) => {
          axios
            .get(
              `${serverEndpointSwitch}/api/v1/checkouts/qr-check/${decodedText}`,
            )
            .then((res) => {
              setFoundCheckout(res.data);
            })
            .catch((err) => console.error("no luck on the checkout", err));
          setScannedObj(response.data[0]);
          setShowInfoModal(true);
        })
        .catch((error) => {
          console.error("POST request failed:", error);
        })
        .finally(() => {
          setScanning(false);
        });
    }
  };

  console.log("setFoundCheckout", foundCheckout);

  const onCheckOut = () => {
    setScannedObj(undefined);
    const currentDateTime = moment();
    const checkOutData = {
      customer_email: customerEmail,
      qr_single_id: scannedID,
      checkout_date: currentDateTime.format("YYYY-MM-DD HH:mm:ss"),
    };

    axios
      .post(`${serverEndpointSwitch}/api/v1/checkouts`, checkOutData)
      .then((res) => {
        console.log("checkout successful", res);
        setSuccessfullCheckout(true);
      })
      .catch((err) => {
        console.log("new checkout err", err);
      })
      .finally(() => {
        handleModalClose();
      });
  };

  const onCheckIn = () => {
    setScannedObj(undefined);
    const currentDateTime = moment();
    const checkOutData = {
      checkin_date: currentDateTime.format("YYYY-MM-DD HH:mm:ss"),
    };

    axios
      .put(
        `${serverEndpointSwitch}/api/v1/checkouts/${foundCheckout.id}`,
        checkOutData,
      )
      .then((res) => {
        setSuccessfulCheckin(true);
      })
      .catch((err) => {
        console.error("new checkout err", err);
      })
      .finally(() => {
        handleModalClose();
      });
  };

  function handleModalClose() {
    setScannedObj(undefined);
    setCustomerEmail(undefined);
    setFoundCheckout(false);
  }

  return (
    <div className="App">
      {successfulCheckout && (
        <Alert variant="success">Checkout Successful</Alert>
      )}
      {successfulCheckin && <Alert variant="success">Checkin Successful</Alert>}
      <button onClick={startScan}>Scan Sample</button>
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
      {scannedObj && (
        <>
          <ScannedModal
            showModal={showInfoModal}
            setShowModal={setShowInfoModal}
            infoObj={scannedObj}
            onCheckInClick={() => {
              onCheckIn();
            }}
            onCheckoutClick={() => {
              onCheckOut();
            }}
            disableCheckout={foundCheckout}
            customerEmail={
              foundCheckout ? foundCheckout.customer_email : customerEmail
            }
            setCustomerEmail={setCustomerEmail}
            handleModalClose={handleModalClose}
          />
        </>
      )}
    </div>
  );
}

export default MobileScanner;
