import React from "react";
import cl from "./Labels.module.scss";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { HiOutlineFolderRemove } from "react-icons/hi";

const LabelItems = ({ noTag, list, add, selected, onSelect }) => {
  const classGenerator = (item) => {
    const active_id = !selected ? "" : selected.id;
    const item_id = item.id;

    return [cl["drop-item"], active_id === item_id ? cl["active"] : ""].join(
      " "
    );
  };

  return (
    <>
      {noTag && (
        <div
          className={classGenerator({ name: "no tag", id: "null" })}
          onClick={(e) => {
            e.stopPropagation();
            onSelect({ name: "no tag", id: "null" });
          }}>
          <div>
            <HiOutlineFolderRemove />
            no tag
          </div>
        </div>
      )}

      {list.length ? (
        list.map((item) => (
          <DropdownItem
            key={item.id}
            className={classGenerator(item)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}>
            {item.name}
          </DropdownItem>
        ))
      ) : (
        <div className={cl["add-cat-btn"]} variant="light" onClick={add}>
          + add new tag
        </div>
      )}
    </>
  );
};

export default LabelItems;
