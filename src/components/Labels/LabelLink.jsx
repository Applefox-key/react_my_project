import React from "react";
import { Dropdown } from "react-bootstrap";
import cl from "./Labels.module.scss";
const LabelLink = ({ onSelectItem, isOne }) => {
  return (
    <Dropdown.Item
      className={cl.link}
      key={"first"}
      eventKey={"first"}
      onClick={() => {
        onSelectItem();
      }}>
      {isOne ? "...set no Label ❌" : "...show all Labels ♾️"}
    </Dropdown.Item>
  );
};

export default LabelLink;
