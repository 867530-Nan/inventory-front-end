import React, { useState } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../../utils/common";

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    texture: "",
    price: "",
    inventory: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API with the form data
      const response = await axios.post(
        `${serverEndpointSwitch}/api/v1/styles`,
        formData,
      );
      console.log("Form data submitted: ", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Style</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="text"
            name="color"
            id="color"
            value={formData.color}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="texture"
            className="block text-sm font-medium text-gray-700"
          >
            Texture
          </label>
          <input
            type="text"
            name="texture"
            id="texture"
            value={formData.texture}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="inventory"
            className="block text-sm font-medium text-gray-700"
          >
            Inventory
          </label>
          <input
            type="number"
            name="inventory"
            id="inventory"
            value={formData.inventory}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-lg"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
