import React from "react";
import { Dropdown } from "react-bootstrap";
import { statusIcons } from "../../../../constants/statusConst";

const ExprStatus = ({ stat, onStatusChange }) => {
  const current = statusIcons[stat];
  const allowedNext = current?.possible || [];
  return (
    <Dropdown
      onSelect={(newStatus) => onStatusChange && onStatusChange(newStatus)}>
      <Dropdown.Toggle variant="light" id="dropdown-status">
        {stat}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {allowedNext.map((s) => (
          <Dropdown.Item key={s} eventKey={s}>
            {s}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExprStatus;
