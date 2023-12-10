import React from "react";
import { useStylesContext } from "../../contexts/StylesContext";
import SampleManagementComponent from "./StylesManager";

const StylesReview = ({}) => {
  const { uniqueStylesArray, onSelectStyle, selectedStyle, styleColorsAndQRs } =
    useStylesContext();

  const handleStyleChange = (event) => {
    onSelectStyle({ name: event.target.value });
  };

  return (
    <div className="flex flex-column">
      <label>Select a Style:</label>
      <select
        onChange={handleStyleChange}
        value={selectedStyle?.id}
        className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value={null} className="text-gray-500">
          Name
        </option>
        {uniqueStylesArray.length &&
          uniqueStylesArray.map((style) => (
            <option key={style} value={style} className="text-black">
              {style}
            </option>
          ))}
      </select>

      {selectedStyle && <SampleManagementComponent data={styleColorsAndQRs} />}
    </div>
  );
};

export default StylesReview;
