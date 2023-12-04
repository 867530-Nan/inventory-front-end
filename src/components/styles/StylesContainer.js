import React, { useState } from "react";
import StylesDashboard from "./StylesDashboard";
import StylesForm from "./StylesForm";
import StylesReview from "./StylesReview";
import { useStylesContext } from "../../contexts/StylesContext";
import TabContainer from "../generic/TabContainer";

function StylesContainer() {
  const [forcedKey, setForcedKey] = useState("dashboard");
  const [passedStyle, setPassedStyle] = useState(null);
  const { onSelectStyle } = useStylesContext();

  const handleStyleClick = (style) => {
    onSelectStyle(style);
    setForcedKey("single");
    setPassedStyle(style.id);
  };

  const tabs = [
    {
      eventKey: "dashboard",
      title: "Dashboard",
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
    <TabContainer initialKey="dashboard" tabs={tabs} forcedKey={forcedKey} />
  );
}

export default StylesContainer;
