import React, { useMemo, useState } from "react";
import { addSpanToExpInPrase } from "../../../utils/texts";
import { expressionStateIcon } from "../../../utils/expressions";
import cl from "./ExpressionsList.module.scss";
import InfoWindow from "./ModalPartsExpression/InfoWindow";
import SelectLabel from "../../Labels/SelectLabel";
import ProgressColumn from "../../UI/MyProgressBar/ProgressColumn";
import BtnIsChecked from "../../UI/Btns/BtnIsChecked";
import ExprStatusInf from "./ExprStatus/ExprStatusInf";

const ExpressionItemSimple = ({ actions, expression, modes, num }) => {
  const { editMode, applyMode } = modes;

  // const [editMode, setEditMode] = useState(false);
  const { expressionActions, handleDrop } = actions;
  const [elInfo, setElInfo] = useState(false);
  const isChecked = useMemo(() => {
    return applyMode.isOn && applyMode.isSelected(expression.id);
  }, [applyMode, expression]);
  const classGenerator = () => {
    // let part1 = view === 1 ? cl["oneItemCard"] : cl["oneItemRow" + view];
    let arrStyle = [cl["oneItemRow2"]];
    // let part0 = cl["oneItemRow2"];
    if (applyMode.isOn) arrStyle.push(isChecked ? cl["divIsChecked"] : cl["divIsUnchecked"]);

    // if (!isChecked) return part1;
    // let part2 = cl["divIsChecked"];

    return arrStyle.join(" ");
  };

  const dropEventsPrevent = {
    onDragEnter: (e) => e.preventDefault(),
    onDragOver: (e) => e.preventDefault(),
    onDragLeave: (e) => e.preventDefault(),
  };
  const addEl = (el) => {
    if (applyMode.isOn) applyMode.addToApply(el);
  };

  return (
    <>
      {elInfo && <InfoWindow setVisible={setElInfo} expression={expression} />}
      <div
        className={cl["rowsContainer"]}
        onClick={(e) => {
          e.stopPropagation();
          if (!applyMode.isOn) editMode.setEdit(expression);
          else addEl(expression);
        }}>
        {!applyMode.isOn && (
          <button
            className={cl.btnSimpleClose}
            onClick={(e) => {
              e.stopPropagation();
              expressionActions.expressionsDelete(expression);
            }}>
            ❌
          </button>
        )}
        <div
          className={classGenerator()}
          key={"ex" + expression.id}
          {...dropEventsPrevent}
          onDrop={(e) => {
            if (applyMode.isOn) return;
            e.stopPropagation();
            handleDrop(e, expression);
          }}>
          {applyMode.isOn && (
            <BtnIsChecked
              isChecked={isChecked}
              className={cl.btnChk}
              onClick={(e) => {
                e.stopPropagation();
                if (applyMode.isOn) addEl(expression);
              }}
            />
          )}
          <div className={cl.expInfo}>
            <ExprStatusInf
              stat={expression.status}
              inQueue={expression.inQueue}
              // notStarted={expression.notStartedActive}
            />

            <div className={cl["exp-row-btns"]}>
              <div className={cl.label_wrap}>
                <SelectLabel
                  id={"labelBox" + expression.id}
                  disabled={applyMode.isOn}
                  colCat={{ id: expression.labelid, name: expression.label }}
                  onSelect={(val) =>
                    expressionActions.contentQuickEdit({
                      id: expression.id,
                      labelid: val ? val.id : "",
                    })
                  }
                />
              </div>
            </div>
            <div className={cl.atr}>
              <div
                className={cl.progress}
                onClick={(e) => {
                  if (applyMode.isOn) return;
                  setElInfo(!elInfo);
                  e.stopPropagation();
                }}>
                <ProgressColumn stage={expression.stage} icon={expressionStateIcon(expression)} />
              </div>{" "}
            </div>
          </div>

          <div
            className={cl["rowPhrase"]}
            onClick={(e) => {
              if (applyMode.isOn) return;
              e.stopPropagation();
              editMode.setEdit(expression);
            }}>
            {addSpanToExpInPrase(expression, applyMode.isOn ? "simplebold" : "")}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpressionItemSimple;
