import React from "react";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import cl from "./BtnIsChecked.module.scss";
const BtnIsChecked = ({ isChecked, onClick, className }) => {
  return (
    <button onClick={onClick} className={className || " "}>
      {isChecked ? (
        <GrCheckboxSelected className={cl.checked} />
      ) : (
        <GrCheckbox className={cl.unchecked} />
      )}
    </button>
  );
};

export default BtnIsChecked;
