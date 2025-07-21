import React, { useState } from "react";
import cl from "./ExpressionsList.module.scss";
import { TbListCheck } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const ApplyMode = ({ applyMode, checkAll, children }) => {
  // const [checkAll, setCheckAll] = useState(false);

  // const [applyMode, setApplyMode] = useState({
  //   isOn: false,
  //   list: [],
  //   label: "",
  //   title: "",
  //   btnName: "",
  //   btnFn: "",
  //   checkAll: false,
  // });

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
      <div>
        {/* <button
          onClick={() => {
            applyMode.btnFn({ list: applyMode.list, label: applyMode.label });
          }}>
          {applyMode.btnName}
        </button> */}
        <button onClick={applyMode.applyOnOF}>
          <IoMdClose />
        </button>
        <button
          className={cl["selectAll" + applyMode.checkAll]}
          onClick={checkAll}>
          <TbListCheck />
        </button>
      </div>
    </div>
  );
};

export default ApplyMode;
