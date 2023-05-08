import React from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const MyToggleBtnGroup = ({ checked, arr, onChange, ...props }) => {
  return (
    <ToggleButtonGroup
      type="radio"
      size="lg"
      defaultValue={checked + 1}
      className="toggleBtn"
      {...props}>
      {arr.map((item, i) => (
        <ToggleButton
          variant="light"
          checked={checked === i}
          id={item + (i + 1)}
          key={i}
          value={i + 1}
          onChange={onChange}>
          {item}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default MyToggleBtnGroup;
