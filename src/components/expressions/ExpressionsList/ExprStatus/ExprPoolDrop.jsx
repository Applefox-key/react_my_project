import React from "react";
import { Dropdown } from "react-bootstrap";
// import { statusIcons } from "../../../../constants/statusConst";

const ExprPoolDrop = ({ val, onValueChange, list }) => {
  return (
    <Dropdown
      onSelect={(updatedData) => onValueChange && onValueChange(updatedData)}
      className="drop">
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

export default ExprPoolDrop;
