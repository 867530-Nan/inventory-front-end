import React from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";

const StyleList = () => {
  const [styles, setStyles] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${serverEndpointSwitch}/api/v1/styles`)
      .then((response) => {
        setStyles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching styles:", error);
      });
  }, [serverEndpointSwitch]);

  return (
    <div>
      <h2>All Styles</h2>
      <ul>
        {styles.map((style) => (
          <li key={style.id}>
            name: {style.name}
            color: {style.color}
            texture: {style.texture}
            price: {style.price}
            availability: {style.availability}
            image_url: {style.image_url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StyleList;
