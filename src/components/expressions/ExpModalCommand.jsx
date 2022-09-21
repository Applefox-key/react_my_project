import React from "react";
import ModalFileExp from "./addExpressions/ModalFileExp";
import ModalPasteList from "./addExpressions/ModalPasteList";

const ModalCommand = ({ mod, setMod, setExpressions }) => {
  return (
    <div>
      {mod === "list" && (
        <ModalPasteList
          visible={mod === "list"}
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

export default ModalCommand;
