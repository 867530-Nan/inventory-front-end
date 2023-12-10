import React, { useState } from "react";
import StylesDashboard from "./StylesDashboard";
import StylesForm from "./StylesForm";
import StylesReview from "./StylesReview";
import { useStylesContext } from "../../contexts/StylesContext";
import TabContainer from "../generic/TabContainer";

function StylesContainer() {
  const [forcedKey, setForcedKey] = useState("dashboard");
  const [passedStyle, setPassedStyle] = useState(null);
  const { onSelectStyle, fetchStyles } = useStylesContext();

  const handleStyleClick = (style) => {
    onSelectStyle(style);
    setForcedKey("single");
    setPassedStyle(style.id);
  };

  const resetForced = (key) => {
    setForcedKey(key);
  };

  const handleLandingAtHome = () => {
    fetchStyles();
  };

  const tabs = [
    {
      eventKey: "dashboard",
      title: "All Styles",
      component: <StylesDashboard onRowClick={handleStyleClick} />,
    },
    {
      eventKey: "single",
      title: "Review",
      component: <StylesReview passedStyle={passedStyle} />,
    },
    {
      eventKey: "form",
      title: "Form",
      component: <StylesForm />,
    },
  ];

  return (
    <TabContainer
      initialKey="dashboard"
      tabs={tabs}
      forcedKey={forcedKey}
      resetForced={resetForced}
      onHomeLand={handleLandingAtHome}
    />
  );
}

export default StylesContainer;
