import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import cl from "./Labels.module.scss";
import SelectLabelBody from "./SelectLabelBody";

const SelectLabel = ({
  onSelect,
  colCat = "",
  isOne,
  disabled,
  lgSize = false,
}) => {
  const [selected, setSelected] = useState(colCat);
  const [mode, setMode] = useState(false);

  const onSelectLabel = (value = "") => {
    if (selected.id === value.id) return;
    setSelected(value);
    onSelect(value);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "labelBox" && mode) {
        setMode(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-100" id="labelBox">
      <Dropdown show={mode} onToggle={(val) => setMode(val)}>
        <Dropdown.Toggle
          disabled={disabled}
          id="dropdown-custom-components"
          size="lg"
          variant="light">
          {selected.name ? (
            <span className={cl["labeltext" + (lgSize ? "Lg" : "")]}>
              {selected.name}
            </span>
          ) : (
            <span className={cl["labelEmpty" + (lgSize ? "Lg" : "")]}>🏷️</span>
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
