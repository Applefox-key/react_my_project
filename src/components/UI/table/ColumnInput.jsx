import React from "react";
import MyInput from "../input/MyInput";

const ColumnInput = ({ edit, col, editVal, autofocus, editCancel }) => {
  return (
    <td>
      <MyInput
        onblur={(e) => {
          if (!e.relatedTarget) {
            editCancel();
          } else if (
            e.target.parentElement.parentElement !==
            e.relatedTarget.parentElement.parentElement
          )
            editCancel();
        }}
        name={col}
        content={edit.content[col]}
        callback={editVal}
        autoFocus={autofocus}
      />
    </td>
  );
};

export default ColumnInput;
