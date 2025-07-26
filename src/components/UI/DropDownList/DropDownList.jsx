import React from "react";
import { Dropdown } from "react-bootstrap";
import cl from "./DropDownList.module.scss";

const DropDownList = ({ val, onValueChange, list, className }) => {
  return (
    <Dropdown
      onSelect={(updatedData) => {
        onValueChange && onValueChange(updatedData);
      }}
      className={[cl.drop, className].join(" ")}>
      <Dropdown.Toggle variant="light" id="dropdown-status">
        {val}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {list.map((s) => (
          <Dropdown.Item key={s} eventKey={s}>
            {s}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default DropDownList;
