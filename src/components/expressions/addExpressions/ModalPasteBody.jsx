import React from "react";
import cl from "./addExpressions.module.scss";
import NewExpressionsList from "./NewExpressionsList";

const ModalPasteBody = ({ dataArr, dataStr, setDataStr, setDataArr }) => {
  return (
    <div className={cl["modal-paste"]}>
      {!dataArr ? (
        <textarea
          value={dataStr}
          placeholder="phrase"
          onChange={(e) => {
            setDataStr(e.target.value);
          }}
          className="w-100 fs-4 vh80"
        />
      ) : (
        <NewExpressionsList dataArr={dataArr} setDataArr={setDataArr} />
      )}
    </div>
  );
};

export default ModalPasteBody;
