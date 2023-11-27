import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverEndpointSwitch } from "../utils/common";

const StylesContext = createContext();

const StylesProvider = ({ children }) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [uniqueStyleNamesWithColors, setUniqueStyleNamesWithColors] = useState(
    [],
  );

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get(
          `${serverEndpointSwitch}/api/v1/styles`,
        );
        setStyles(response.data);
      } catch (error) {
        console.error("Error fetching styles:", error);
      }
    };

    fetchStyles();
  }, []); // Run the effect only once on component mount

  useEffect(() => {
    if (styles.length) {
      const uniqueNamesMap = new Map();

      // Loop through the array and organize names and colors in a Map
      styles.forEach((item) => {
        const { name, color } = item;

        if (!uniqueNamesMap.has(name)) {
          uniqueNamesMap.set(name, [color]);
        } else {
          const colors = uniqueNamesMap.get(name);
          colors.push(color);
          uniqueNamesMap.set(name, colors);
        }
      });

      // Convert the Map to an array of objects
      const result = Array.from(uniqueNamesMap).map(([name, colors]) => ({
        name,
        colors,
      }));
      setUniqueStyleNamesWithColors(result);
    }
  }, [styles]);

  const addStyle = async (newStyle) => {
    try {
      const response = await axios.post("/api/v1/styles", newStyle); // Update the API endpoint as needed
      setStyles((prevStyles) => [...prevStyles, response.data]);
    } catch (error) {
      console.error("Error adding style:", error);
    }
  };

  const selectStyle = (passedStyle) => {
    const style = styles.filter((s) => s.name === passedStyle.name);
    setSelectedStyle(style);
  };

  const filterStylesByName = (name) => {
    return styles.filter((style) =>
      style.name.toLowerCase().includes(name.toLowerCase()),
    );
  };

  const filterStylesByColor = (color) => {
    return styles.filter((style) =>
      style.color.toLowerCase().includes(color.toLowerCase()),
    );
  };

  return (
    <StylesContext.Provider
      value={{
        styles,
        addStyle,
        selectedStyle,
        selectStyle,
        uniqueStyleNamesWithColors,
        filterStylesByName,
        filterStylesByColor,
      }}
    >
      {children}
    </StylesContext.Provider>
  );
};

const useStylesContext = () => {
  const context = useContext(StylesContext);
  if (!context) {
    throw new Error(
      "useStylesContext must be used within a YourContextProvider",
    );
  }
  return context;
};

export { StylesProvider, useStylesContext };
