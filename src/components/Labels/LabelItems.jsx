import React from "react";
import cl from "./Labels.module.scss";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const LabelItems = ({ list, add, selected, onSelect }) => {
  const classGenerator = (item) => {
    const active_id = !selected ? "" : selected.id;
    const item_id = item.id;

    return [
      cl["drop-item"],
      active_id === item_id ? cl["active"] : "",
      "fs-4",
    ].join(" ");
  };

  return (
    <>
      {list.length ? (
        list.map((item) => (
          <DropdownItem
            className={classGenerator(item)}
            key={item.id}
            onClick={() => {
              onSelect(item);
            }}>
            {item.name}
          </DropdownItem>
        ))
      ) : (
        <div className={cl["add-cat-btn"]} variant="light" onClick={add}>
          + add new label
        </div>
      )}
    </>
  );
};

export default LabelItems;
