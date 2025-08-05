import React from "react";
import { Dropdown } from "react-bootstrap";
import cl from "./Labels.module.scss";
const LabelLink = ({ onSelectItem, link }) => {
  return (
    <Dropdown.Item
      className={cl.link}
      key={"first"}
      eventKey={"first"}
      onClick={() => {
        onSelectItem();
      }}>
      {link}
    </Dropdown.Item>
  );
};

export default LabelLink;
