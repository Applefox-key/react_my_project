import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import cl from "./Labels.module.scss";
import SelectLabelBody from "./SelectLabelBody";
import { useOutsideClick } from "../../hooks/useOutSideClick";

import { HiOutlineFolderRemove } from "react-icons/hi";
import { TbFolders } from "react-icons/tb";

const SelectLabel = ({
  onSelect,
  colCat = "",
  disabled,
  addTitle,
  lgSize = false,
  selectForm = "one",
}) => {
  const [selected, setSelected] = useState(colCat);
  const [mode, setMode] = useState(false);
  //   {!formForSet ? "...set no tag ❌" : "...show all tags ♾️"}
  const labelForms = {
    "one": {
      link: "...clear tag ❌",
      noTag: false,
      emptyclassName: cl["labelEmpty" + (lgSize ? "Lg" : "")],
      emptyIcon: <HiOutlineFolderRemove />,
    },

    "filter": {
      link: "...clear filter ❌",
      noTag: true,
      emptyclassName: cl["labelEmptyFilter" + (lgSize ? "Lg" : "")],
      emptyIcon: <TbFolders />,
    },
  };
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
            <span className={labelForms[selectForm].emptyclassName}>
              {labelForms[selectForm].emptyIcon}
            </span>
          )}
        </Dropdown.Toggle>
        {mode && (
          <SelectLabelBody
            selected={selected}
            onSelect={onSelectLabel}
            closeFn={setMode}
            selectFormVal={labelForms[selectForm]}
          />
        )}
      </Dropdown>
    </div>
  );
};

export default SelectLabel;
