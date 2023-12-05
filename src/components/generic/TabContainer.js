import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

const TabContainer = ({ initialKey, tabs, forcedKey }) => {
  const [key, setKey] = useState(tabs[0].eventKey);

  React.useEffect(() => {
    if (key !== forcedKey) {
      setKey(forcedKey);
    }
  }, [forcedKey]);

  React.useEffect(() => {
    setKey(initialKey);
  }, []);

  return (
    <div className=" h-screen m-2 mt-2 mb-0">
      <Tab.Container
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Row>
          <Col>
            <Nav variant="tabs" id="flextabs" className="flex">
              {tabs.map((tab) => (
                <Nav.Item>
                  <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <Tab.Content className="">
              {tabs.map((tab) => (
                <Tab.Pane eventKey={tab.eventKey}>{tab.component}</Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default TabContainer;
