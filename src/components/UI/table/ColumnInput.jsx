import React from "react";
import MyInput from "../input/MyInput";

const ColumnInput = ({ edit, col, editVal }) => {
  return (
    <td>
      <MyInput name={col} content={edit.content[col]} callback={editVal} />
    </td>
  );
};

export default ColumnInput;
