import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

const TabPills = ({ children, tabsArr }) => {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="el0">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {tabsArr.map((el, i) => (
              <Nav.Item key={i}>
                <Nav.Link eventKey={"el" + i} href="#">
                  {el}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        <Col sm={9}>
          <Tab.Content>
            {tabsArr.map((_, i) => (
              <Tab.Pane key={i} eventKey={"el" + i}>
                {children[i]}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default TabPills;
