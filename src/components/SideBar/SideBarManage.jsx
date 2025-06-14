import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { TbTextPlus } from "react-icons/tb";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FiUploadCloud, FiDownloadCloud } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ExpModalCommand from "./ExpModalCommand";
import cl from "./SideBar.module.scss";

const SideBarManage = ({ expressionsActions }) => {
  const [mod, setMod] = useState(false);
  const modal = (el) => {
    setMod(el);
  };
  const router = useNavigate();

  return (
    <div className={cl.sideM}>
      {mod ? (
        <ExpModalCommand
          mod={mod}
          setMod={setMod}
          setExpressions={expressionsActions.setExpressions}
        />
      ) : (
        <></>
      )}
      <button title="add one" onClick={expressionsActions.addNew}>
        <GoPlus /> ADD ONE PHRASE
      </button>
      <button title="add some" onClick={() => modal("list")}>
        <TbTextPlus /> ADD FROM LIST
      </button>
      <button title="Add from the file" onClick={() => modal("file")}>
        <FiUploadCloud /> ADD FROM FILE
      </button>{" "}
      <button title="Delete" onClick={expressionsActions.deleteMode}>
        <AiOutlineDelete /> DELETE PRASES
      </button>{" "}
      <button title="Download" onClick={expressionsActions.downloadMode}>
        <FiDownloadCloud />
        DOWNLOAD PRASES
      </button>{" "}
    </div>
  );
};
export default SideBarManage;
