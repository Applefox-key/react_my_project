import React from "react";
import cl from "./ExpressionsList.module.scss";
import { TbListCheck } from "react-icons/tb";

const ApplyPannel = ({ applyMode, checkAll }) => {
  return (
    <div className={cl.applyBtn}>
      <span>{applyMode.title}</span>

      <button
        onClick={() =>
          applyMode.btnFn({ list: applyMode.list, label: applyMode.label })
        }>
        {applyMode.btnName}
      </button>
      <button
        className={cl["selectAll" + applyMode.checkAll]}
        onClick={checkAll}>
        <TbListCheck />
      </button>
      <button onClick={applyMode.applyOnOF}>CANCEL</button>
    </div>
  );
};

export default ApplyPannel;
