import React, { useState } from "react";
import { useEffect } from "react";
import ColumnInput from "./ColumnInput";

import ColumnWithBtns from "./ColumnWithBtns";

const RowContent = ({ content, i, btnsArray, namesArray, edit }) => {
  const [editValue, setEditValue] = useState({ ...content });
  const editNames = edit ? edit.names : [];

  const editOk = () => {
    edit.edit(editValue);
  };
  const editCancel = () => {
    edit.edit();
  };
  useEffect(() => {
    if (!editValue.id) {
      setEditValue({ id: content.id });
    }
  }, []);
  const btnsColumn = edit
    ? [
        { name: "OK", callback: editOk },
        { name: "Cancel", callback: editCancel },
      ]
    : btnsArray;

  const editVal = (e) => {
    e.stopPropagation();
    const col = e.target.ariaLabel;
    const nv = { ...editValue, [col]: e.target.value };
    setEditValue(nv);
  };
  // .toISOString().slice(0, 10)}
  return (
    <>
      <td key="cln">{i + 1}</td>
      {namesArray.map((column) =>
        editNames.includes(column) ? (
          <ColumnInput
            edit={edit}
            col={column}
            editVal={editVal}
            key={column}
          />
        ) : Object.prototype.toString.call(content[column]) ===
          "[object Date]" ? (
          <td key={column}>{content[column].toISOString().slice(0, 10)}</td>
        ) : (
          <td key={column}>{content[column]}</td>
        )
      )}
      {btnsArray && (
        <ColumnWithBtns btnsArray={btnsColumn} content={content} edit={edit} />
      )}
    </>
  );
};

export default RowContent;

{
  /* <td key={column}>{content[column]}</td>; */
}
