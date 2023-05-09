import React from "react";

import NewExpressionsList from "./NewExpressionsList";

const ModalPasteBody = ({ dataArr, dataStr, setDataStr, setDataArr }) => {
  return (
    <div className="h-100">
      {!dataArr ? (
        <textarea
          value={dataStr}
          placeholder="phrase"
          onChange={(e) => {
            setDataStr(e.target.value);
          }}
          className="w-100 h-100 fs-4"
        />
      ) : (
        <NewExpressionsList dataArr={dataArr} setDataArr={setDataArr} />
      )}
    </div>
  );
};

export default ModalPasteBody;
