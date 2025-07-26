import React from "react";
import { Dropdown } from "react-bootstrap";
import cl from "./Labels.module.scss";
const LabelLink = ({ onSelectItem, formForSet }) => {
  return (
    <Dropdown.Item
      className={cl.link}
      key={"first"}
      eventKey={"first"}
      onClick={() => {
        onSelectItem();
      }}>
      {!formForSet ? "...set no tag ❌" : "...show all tags ♾️"}
    </Dropdown.Item>
  );
};

export default LabelLink;
