import React from "react";
import { onBlurCheck } from "../../../utils/domeElemFunc";
import MyInputTbl from "../MyInput/MyInputTbl";

const ColumnInput = ({
  edit,
  col,
  editVal,
  autofocus,
  editCancel,
  onEnter,
}) => {
  return (
    <td>
      <MyInputTbl
        onEnter={onEnter}
        onblur={(e) => {
          if (!onBlurCheck(e, "tr")) editCancel();
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
