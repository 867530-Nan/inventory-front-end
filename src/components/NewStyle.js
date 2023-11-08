import React, { useState } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";
const SampleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    texture: "",
    price: "",
    availability: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    axios
      .post(`${serverEndpointSwitch}/styles`, formData)
      .then((response) => {
        // Handle the successful response
        console.log("Style created:", response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error creating style:", error);
      });
  };

  return (
    <div>
      <h2>Sample Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Texture:</label>
          <input
            type="text"
            name="texture"
            value={formData.texture}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Availability:</label>
          <input
            type="number"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SampleForm;
