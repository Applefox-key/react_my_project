import React from "react";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
const BtnIsChecked = ({ isChecked, onClick }) => {
  return (
    <button onClick={onClick}>
      {isChecked ? <GrCheckboxSelected /> : <GrCheckbox />}
    </button>
  );
};

export default BtnIsChecked;
