import React, { useState } from "react";
import MyTable from "../UI/table/MyTable";

const ModalPasteBody = ({ dataArr, dataStr, setDataStr, setDataArr }) => {
  const [editMode, setEditMode] = useState(null);

  const editOn = (content) => {
    if (editMode) return;
    setEditMode({
      content: content,
      names: ["expression", "phrase"],
      edit: editOk,
    });
  };

  const editOk = (newV) => {
    let arr = [...dataArr];
    let ind = arr.findIndex(
      (item) => item.id.toString() === newV.id.toString()
    );
    let expression = arr[ind];
    if (newV.expression) expression.expression = newV.expression;
    if (newV.phrase) expression.phrase = newV.phrase;
    setDataArr(arr);
    setEditMode(null);
  };

  return (
    <div className="h-100">
      {!dataArr ? (
        <textarea
          value={dataStr}
          placeholder="expression ; phrase"
          onChange={(e) => {
            setDataStr(e.target.value);
          }}
          className="w-100 h-100 fs-4"
        />
      ) : (
        <MyTable
          edit={editMode}
          dataArray={dataArr}
          namesArray={["expression", "phrase"]}
          onRowClick={editOn}
        />
      )}
    </div>
  );
};

export default ModalPasteBody;
