import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import cl from "./Labels.module.scss";
import SelectLabelBody from "./SelectLabelBody";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import { FaRegFolder } from "react-icons/fa";

const SelectLabel = ({
  onSelect,
  colCat = "",
  formForSet,
  disabled,
  addTitle,
  lgSize = false,
}) => {
  const [selected, setSelected] = useState(colCat);
  const [mode, setMode] = useState(false);

  const onSelectLabel = (value = "") => {
    if (selected.id === value.id) return;
    onSelect(value);
    setSelected(value);
  };

  const ref = useRef();
  useOutsideClick(ref, () => setMode(false));
  useEffect(() => {
    if (!colCat) setSelected("");
  }, [colCat]);

  return (
    <div ref={ref} className={addTitle ? cl.addtitle : "w-100 d-flex"}>
      <Dropdown
        show={mode}
        onToggle={(val) => setMode(val)}
        onClick={(e) => e.stopPropagation()}>
        <Dropdown.Toggle
          disabled={disabled}
          className="dropdown-custom-components"
          size="lg"
          variant="light">
          {selected.name ? (
            <span className={cl["labeltext" + (lgSize ? "Lg" : "")]}>
              {selected.name}
            </span>
          ) : (
            <span className={cl["labelEmpty" + (lgSize ? "Lg" : "")]}>
              <FaRegFolder />
            </span>
          )}
        </Dropdown.Toggle>
        {mode && (
          <SelectLabelBody
            selected={selected}
            onSelect={onSelectLabel}
            formForSet={formForSet}
            closeFn={setMode}
          />
        )}
      </Dropdown>
    </div>
  );
};

export default SelectLabel;
