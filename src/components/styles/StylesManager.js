import React from "react";

const SampleList = ({ samples, onAddSample, onDeleteSample }) => (
  <ul className="space-y-4">
    {samples.map((sample) => (
      <li
        key={sample.id}
        className="flex items-center justify-between border p-2"
      >
        <span>
          Sample ID: {sample.id} - Checkout Date: {sample.checkout_date}
        </span>
        <button
          onClick={() => onDeleteSample(sample.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    ))}
    <li>
      <button
        onClick={onAddSample}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Sample
      </button>
    </li>
  </ul>
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
  console.log("the data", data);
  const handleAddSample = (style, color) => {
    // Handle adding a sample for the given style and color
    console.log(`Add sample for ${style} - ${color}`);
  };

  const handleDeleteSample = (sampleId) => {
    // Handle deleting the sample with the given ID
    console.log(`Delete sample with ID: ${sampleId}`);
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
