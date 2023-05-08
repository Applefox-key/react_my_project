import React from "react";
import ModalFileExp from "../expressions/addExpressions/ModalFileExp";
import ModalPasteList from "../expressions/addExpressions/ModalPasteList";

const ExpModalCommand = ({ mod, setMod, setExpressions }) => {
  return (
    <div>
      {mod === "list" && (
        <ModalPasteList
          //  visible={mod === "list"}
          setVisible={setMod}
          onClick={setExpressions}
        />
      )}{" "}
      {mod === "file" && (
        <ModalFileExp
          // visible={mod === "file"}
          setVisible={setMod}
          setExpressions={setExpressions}
        />
      )}{" "}
    </div>
  );
};

export default ExpModalCommand;
