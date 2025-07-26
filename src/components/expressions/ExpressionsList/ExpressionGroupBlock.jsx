import React from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import BtnIsChecked from "../../UI/Btns/BtnIsChecked";
import { CSSTransition } from "react-transition-group";
import ExpressionItemSimple from "./ExpressionItemSimple";
import cl from "./ExpressionsList.module.scss";
const ExpressionGroupBlock = ({
  group,
  isShown,
  toggleShow,
  onCheck,
  actions,
  modes,
}) => (
  <div
    key={group.labelid}
    className={cl.oneFolder}
    onClick={(e) => toggleShow(e, group)}>
    <div className={cl.folderName}>
      <div>
        {isShown ? <FaRegFolderOpen /> : <FaRegFolder />} {group.labelname}
      </div>
      {modes.applyMode.isOn && (
        <BtnIsChecked
          isChecked={modes.applyMode.isSelectedGr(group.labelid)}
          onClick={(e) => onCheck(e, group)}
        />
      )}
    </div>
    {isShown && (
      <CSSTransition
        key={group.labelid}
        appear
        in
        timeout={500}
        classNames="page">
        <div className="w-100 mt-1">
          {group.items.map((ex, j) => (
            <ExpressionItemSimple
              key={ex.id}
              actions={actions}
              expression={ex}
              modes={modes}
              num={j}
            />
          ))}
        </div>
      </CSSTransition>
    )}
  </div>
);

export default ExpressionGroupBlock;
