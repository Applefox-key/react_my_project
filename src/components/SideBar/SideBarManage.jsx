import React from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { TbTextPlus } from "react-icons/tb";
import { FiUploadCloud, FiDownloadCloud } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ExpModalCommand from "./ExpModalCommand";
import cl from "./SideBar.module.scss";

const SideBarManage = ({ expressionActions }) => {
  const [mod, setMod] = useState(false);
  const modal = (el) => {
    setMod(el);
  };
  return (
    <div className={cl.sideM}>
      {mod && (
        <ExpModalCommand
          mod={mod}
          setMod={setMod}
          setExpressions={expressionActions.setExpressions}
        />
      )}
      <button title="add one" onClick={expressionActions.addNew}>
        <GoPlus /> ADD ONE PHRASE
      </button>
      <button title="add some" onClick={() => modal("list")}>
        <TbTextPlus /> ADD FROM LIST
      </button>
      <button title="Add from the file" onClick={() => modal("file")}>
        <FiUploadCloud /> ADD FROM FILE
      </button>
      <button title="Delete" onClick={expressionActions.deleteMode}>
        <AiOutlineDelete /> DELETE PRASES
      </button>{" "}
      <button title="Download" onClick={expressionActions.downloadMode}>
        <FiDownloadCloud />
        DOWNLOAD PRASES
      </button>{" "}
    </div>
  );
};
export default SideBarManage;
