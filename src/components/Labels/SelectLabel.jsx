import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import cl from "./Labels.module.scss";
import SelectLabelBody from "./SelectLabelBody";
import { useOutsideClick } from "../../hooks/useOutSideClick";

const SelectLabel = ({
  onSelect,
  colCat = "",
  isOne,
  disabled,
  id = "labelBox",
  lgSize = false,
}) => {
  const [selected, setSelected] = useState(colCat);
  const [mode, setMode] = useState(false);
  console.log("colCat ", colCat);

  const onSelectLabel = (value = "") => {
    if (selected.id === value.id) return;
    setSelected(value);
    onSelect(value);
  };

  const ref = useRef();
  useOutsideClick(ref, () => setMode(false));
  useEffect(() => {
    if (!colCat) setSelected("");
  }, [colCat]);
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     event.stopPropagation();
  //     if (event.target.id !== id && mode) {
  //       setMode(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className="w-100" id={id} ref={ref}>
      <Dropdown show={mode} onToggle={(val) => setMode(val)}>
        <Dropdown.Toggle
          disabled={disabled}
          className="dropdown-custom-components"
          // id={"dropdown-custom-components" + id}
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
