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
  const [styleColorsAndQRs, setStyleColorsAndQRs] = useState([]);

  const fetchAndSetQRCodes = async () => {
    if (selectedStyle) {
      try {
        const response = await axios.post(
          `${serverEndpointSwitch}/api/v1/styles/get-style-info-by-name`,
          { name: selectedStyle[0].name },
        );
        setStyleColorsAndQRs(response.data);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
      }
    }
  };

  useEffect(() => {
    fetchAndSetQRCodes();
  }, [selectedStyle]);

  const fetchStyles = async () => {
    try {
      const response = await axios.get(`${serverEndpointSwitch}/api/v1/styles`);
      setStyles(response.data);
    } catch (error) {
      console.error("Error fetching styles:", error);
    }
  };

  useEffect(() => {
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

  const addNewQrToStyle = () => {};

  const addStyle = async (newStyle) => {
    try {
      const response = await axios.post("/api/v1/styles", newStyle); // Update the API endpoint as needed
      setStyles((prevStyles) => [...prevStyles, response.data]);
    } catch (error) {
      console.error("Error adding style:", error);
    }
  };

  const onSelectStyle = (passedStyle) => {
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

  function getUniqueNames() {
    // Use Set to store unique names
    const uniqueNamesSet = new Set();

    // Iterate through the list and add names to the Set
    styles.forEach((item) => {
      uniqueNamesSet.add(item.name);
    });

    // Convert Set back to an array for the final result
    const uniqueNamesArray = Array.from(uniqueNamesSet);

    const sorted = uniqueNamesArray.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      else return 0;
    });

    return sorted;
  }

  const deleteQRByStyle = (qr_single_id, color, name) => {
    setStyleColorsAndQRs((prev) => {
      const updatedState = { ...prev };
      if (updatedState[name] && updatedState[name][color]) {
        updatedState[name][color] = updatedState[name][color].filter(
          (item) => item.qr_single_id !== qr_single_id,
        );

        // Remove the color key if the array becomes empty
        if (updatedState[name][color].length === 0) {
          delete updatedState[name][color];
        }

        // Remove the name key if all colors are removed
        if (Object.keys(updatedState[name]).length === 0) {
          delete updatedState[name];
        }
      }

      return updatedState;
    });
  };

  return (
    <StylesContext.Provider
      value={{
        uniqueStylesArray: getUniqueNames(),
        styles,
        addStyle,
        selectedStyle,
        onSelectStyle,
        uniqueStyleNamesWithColors,
        filterStylesByName,
        styleColorsAndQRs,
        filterStylesByColor,
        deleteQRByStyle,
        fetchAndSetQRCodes,
        addNewQrToStyle,
        fetchStyles,
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
