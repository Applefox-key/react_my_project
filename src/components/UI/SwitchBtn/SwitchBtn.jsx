import React from "react";
import cl from "./SwitchBtn.module.scss";

const SwitchBtn = ({ value, setValue, disabled }) => {
  return (
    <label className={cl["btnSwitch"]}>
      <input
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={(e) => {
          e.stopPropagation();
          setValue(!value);
          // handleChange(e);
        }}
      />
      <span className={cl["slider"]}></span>
    </label>
  );
};

export default SwitchBtn;
