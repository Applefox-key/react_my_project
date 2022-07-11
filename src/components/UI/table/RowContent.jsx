import React, { useState } from "react";
import MyInput from "../../UI/input/MyInput";

import ColumnWithBtns from "./ColumnWithBtns";

const RowContent = ({ content, i, btnsArray, namesArray, editMode }) => {
  let columnForInput = editMode.element ? editMode.col : [""];

  return (
    <>
      <td key="cln">{i + 1}</td>
      {namesArray.map((column) => (
        <td key={column}>
          {columnForInput.includes(column) ? (
            <MyInput
              name={column}
              content={content[column]}
              callback={(col, val) => {
                editMode.callbackElement(col, val);
              }}
            />
          ) : (
            content[column]
          )}
        </td>
      ))}
      {btnsArray && <ColumnWithBtns btnsArray={btnsArray} content={content} />}
    </>
  );
};

export default RowContent;
