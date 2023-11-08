import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
} from "tw-elements-react";

export default function ScannedModal({
  showModal,
  setShowModal,
  infoObj,
  onCheckInClick,
  onCheckoutClick,
  disableCheckout,
  customerEmail,
  setCustomerEmail,
  handleModalClose,
}) {
  const [error, setError] = React.useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  function renderInfoRows(obj) {
    const divs = [];

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === "name") {
          continue; // Skip the 'name' key
        }
        const value = obj[key];
        const divText = `${key}: ${value}`;
        divs.push(<div key={key}>{divText}</div>);
      }
    }
    return divs;
  }

  const handleOnCheckOut = () => {
    if (!customerEmail) {
      setError("Email required for check-out");
      return;
    } else onCheckoutClick();
  };
  console.log("chips", customerEmail);
  return (
    <div>
      <TEModal
        show={showModal}
        setShow={setShowModal}
        onHide={handleModalClose}
      >
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {infoObj.name}
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <div className="p-2">{renderInfoRows(infoObj)}</div>
            <TEModalFooter className="flex-col">
              {error && (
                <Alert variant="danger" className="w-full">
                  {error}
                </Alert>
              )}
              <TEInput
                type="text"
                placeholder="Customer Email"
                value={customerEmail}
                autoFocus={true}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <hr />
              <div className="flex justify-around w-full m-2">
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className={`${
                      disableCheckout
                        ? ""
                        : "hover:bg-primary-accent-100 transition focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    } inline-block rounded bg-green-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 duration-150 ease-in-out`}
                    onClick={handleOnCheckOut}
                    disabled={disableCheckout}
                  >
                    Check-Out
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className={`${
                      disableCheckout
                        ? "hover:bg-primary-accent-100 transition focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        : ""
                    } inline-block rounded bg-green-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 duration-150 ease-in-out`}
                    onClick={() => onCheckInClick()}
                    disabled={!disableCheckout}
                  >
                    Check-In
                  </button>
                </TERipple>
              </div>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
