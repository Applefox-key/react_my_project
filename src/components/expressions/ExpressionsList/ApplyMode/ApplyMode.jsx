import React from "react";
import cl from "../ExpressionsList.module.scss";
import { TbListCheck } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const ApplyMode = ({ applyMode, checkAll, children }) => {
  return (
    <div className={cl.applybox}>
      <div className={cl.applyModeChildren}>
        {applyMode.btnFn ? (
          <button
            onClick={() => {
              applyMode.btnFn({ list: applyMode.list, label: applyMode.label });
            }}>
            {applyMode.btnName}
          </button>
        ) : (
          children
        )}
      </div>
      {applyMode.btnFn && <div>{applyMode.title}</div>}
      <div className={cl.applyManagerBtn}>
        {applyMode.list.length}
        <button
          className={cl["selectAll" + applyMode.checkAll]}
          onClick={checkAll}>
          <TbListCheck />
        </button>
        <button onClick={applyMode.applyOnOF}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default ApplyMode;
