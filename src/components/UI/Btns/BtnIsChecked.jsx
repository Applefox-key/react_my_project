import React from "react";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import cl from "./BtnIsChecked.module.scss";
const BtnIsChecked = ({ isChecked, onClick }) => {
  return (
    <button onClick={onClick}>
      {isChecked ? (
        <GrCheckboxSelected className={cl.checked} />
      ) : (
        <GrCheckbox />
      )}
    </button>
  );
};

export default BtnIsChecked;
