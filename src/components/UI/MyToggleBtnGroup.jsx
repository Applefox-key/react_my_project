import React from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const MyToggleBtnGroup = ({ checked, arr, onChange, ...props }) => {
  console.log(arr);
  return (
    <ToggleButtonGroup
      type="radio"
      defaultValue={checked + 1}
      className="h-100 m-auto"
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
