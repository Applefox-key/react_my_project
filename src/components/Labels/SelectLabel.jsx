import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import cl from "./Labels.module.scss";
import SelectLabelBody from "./SelectLabelBody";
// import { IoPricetagOutline } from "react-icons/io5";
const SelectLabel = ({ onSelect, colCat = "", isOne, disabled }) => {
  const [selected, setSelected] = useState(colCat);
  const [mode, setMode] = useState(false);

  const onSelectLabel = (value = "") => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="w-100">
      <Dropdown show={mode} onToggle={(val) => setMode(val)}>
        <Dropdown.Toggle
          disabled={disabled}
          id="dropdown-custom-components"
          size="lg"
          variant="light">
          {selected.name ? (
            <div className={cl["labeltext"]}>{selected.name}</div>
          ) : (
            <div className={cl["labelEmpty"]}>
              🏷️
              {/* <IoPricetagOutline /> */}
            </div>
          )}{" "}
        </Dropdown.Toggle>
        {mode && (
          <SelectLabelBody
            selected={selected}
            onSelect={onSelectLabel}
            isOne={isOne}
            closeFn={setMode}
          />
        )}
      </Dropdown>
    </div>
  );
};

export default SelectLabel;
