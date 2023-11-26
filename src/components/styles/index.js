import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dashboard from "./Dashboard";
import StylesForm from "./StylesForm";
import React, { useState } from "react";
import Inspector from "./Inspector";

function Index() {
  const [key, setKey] = useState("dashboard");
  const [passedStyle, setPassedStyle] = useState(null);

  const handleStyleClick = (styleId) => {
    setKey("single");
    setPassedStyle(styleId);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="dashboard" title="Dashboard">
        <Dashboard onRowClick={handleStyleClick} />
      </Tab>
      <Tab eventKey="single" title="Inspector">
        <Inspector passedStyle={passedStyle} />
      </Tab>
      <Tab eventKey="form" title="Form">
        <StylesForm />
      </Tab>
    </Tabs>
  );
}

export default Index;
