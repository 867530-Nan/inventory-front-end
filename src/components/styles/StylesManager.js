import React, { useState } from "react";
import QRCode from "react-qr-code";
import { serverEndpointSwitch } from "../../utils/common";
import axios from "axios";
import { useQRCodesManager } from "../../contexts/QRCodesContext";
import { useStylesContext } from "../../contexts/StylesContext";

const SampleItem = ({ sample, onDeleteSample }) => {
  const [isHovered, setIsHovered] = useState(false);
  const determineCheckoutStatus = () => {
    if (sample.checkout_date && sample.checkin_date == null) return true;
    else return false;
  };
  return (
    <li
      className="flex flex-col align-middle justify-between border p-2 rounded mr-2"
      style={{ width: "125px" }}
    >
      <span className="text-center my-2">
        #{sample.qr_code}
        <hr />
        <span className="font-bold">
          {determineCheckoutStatus() ? "Checked Out" : " - "}
        </span>
      </span>
      <div>
        <QRCode size={100} value={sample.qr_code.toString()} />
      </div>
      <button
        onClick={() => onDeleteSample(sample)}
        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      >
        Archive
      </button>
    </li>
  );
};

const SampleList = ({ samples, onAddSample, onDeleteSample }) => (
  <div>
    <ul className="flex flex-wrap">
      {samples.map((sample) => {
        return <SampleItem onDeleteSample={onDeleteSample} sample={sample} />;
      })}
    </ul>
    <button
      onClick={() => onAddSample(samples[0].style_id)}
      className="bg-green-500 text-white px-4 py-2 rounded mt-3"
    >
      Add Sample
    </button>
  </div>
);

const StyleColorList = ({ styleColorData, onAddSample, onDeleteSample }) => (
  <div className="space-y-4">
    {Object.entries(styleColorData).map(([color, samples]) => (
      <div key={color} className="border p-4">
        <h3 className="text-lg font-bold">{color}</h3>
        <SampleList
          samples={samples}
          onAddSample={onAddSample}
          onDeleteSample={onDeleteSample}
        />
      </div>
    ))}
  </div>
);

const StyleList = ({ styleData, onAddSample, onDeleteSample }) => (
  <div className="space-y-8">
    {Object.entries(styleData).map(([style, colorData]) => (
      <div key={style}>
        <h2 className="text-2xl font-bold">{style}</h2>
        <StyleColorList
          styleColorData={colorData}
          onAddSample={onAddSample}
          onDeleteSample={onDeleteSample}
        />
      </div>
    ))}
  </div>
);

const SampleManagementComponent = ({ data }) => {
  const { deleteQRByStyle, fetchAndSetQRCodes } = useStylesContext();

  const handleAddSample = async (style_id) => {
    await axios
      .post(`${serverEndpointSwitch}/api/v1/qr-singles`, {
        style_id: style_id,
      })
      .then((res) => fetchAndSetQRCodes())
      .catch((err) => console.log("error deleting", err));
  };

  const handleDeleteSample = async (sample) => {
    const { qr_single_id, color, name } = sample;
    await axios
      .post(
        `${serverEndpointSwitch}/api/v1/qr-singles/updateIsArchive/${qr_single_id}`,
      )
      .then(() => deleteQRByStyle(qr_single_id, color, name))
      .catch((err) => console.log("error deleting", err));
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Sample Management</h1>
      <StyleList
        styleData={data}
        onAddSample={handleAddSample}
        onDeleteSample={handleDeleteSample}
      />
    </div>
  );
};

export default SampleManagementComponent;
