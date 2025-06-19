import React, { useState } from "react";
import { addSpanToExpInPrase } from "../../../utils/texts";
import { expressionStateIcon } from "../../../utils/expressions";
import EditWindow from "./EditWindow";
import cl from "./ExpressionsList.module.scss";
import InfoWindow from "./InfoWindow";
import SelectLabel from "../../Labels/SelectLabel";
import ProgressColumn from "../../UI/MyProgressBar/ProgressColumn";

const ExpressionItem = ({ modes, actions, expressions }) => {
  const { editMode, view, applyMode } = modes;
  const { expressionsActions, handleDrop } = actions;
  const [elInfo, setElInfo] = useState("");

  const classGenerator = (el) => {
    // let part1 = view === 1 ? cl["oneItemCard"] : cl["oneItemRow" + view];
    let part1 = view === 0 ? cl["oneItemCard"] : cl["oneItemRow2"];
    if (!applyMode.isOn || !applyMode.list.includes(el.id)) return part1;
    let part2 = cl["divIsChecked"];
    return [part1, part2].join(" ");
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
      {editMode.editElem && (
        <EditWindow
          editMode={editMode}
          expressionsActions={expressionsActions}
        />
      )}
      {elInfo && <InfoWindow setVisible={setElInfo} expression={elInfo} />}
      <div
        className={
          (view === 1 ? cl["cardsContainer"] : cl["rowsContainer"]) +
          (applyMode.isOn ? " " + cl.listApply : "")
        }>
        {expressions.map((el, i) => (
          <div
            className={classGenerator(el)}
            key={"ex" + el.id}
            {...dropEventsPrevent}
            onDrop={(e) => handleDrop(e, el)}
            onClick={(e) => addEl(e, el)}>
            <div className={cl.atr}>
              <span>{expressionsActions.ordNumber(i + 1)}</span>
              {/* <div className={cl.label_wrap}>
                <SelectLabel
                  isOne={true}
                  disabled={applyMode.isOn}
                  colCat={{ id: el.labelid, name: el.label }}
                  onSelect={(val) =>
                    expressionsActions.contentEdit({
                      id: el.id,
                      labelid: val ? val.id : "",
                    })
                  }
                />
              </div> */}
              <div
                className={cl.progress}
                onClick={(e) => {
                  if (!applyMode.isOn) setElInfo(el);
                }}>
                <ProgressColumn
                  stage={el.stage}
                  icon={expressionStateIcon(el)}
                />
              </div>
            </div>
            <div
              className={cl["rowPhrase"]}
              onClick={(e) => {
                if (!applyMode.isOn) editMode.setEdit(el);
              }}>
              {addSpanToExpInPrase(el)}
            </div>
            <div className={cl["exp-row-btns"]}>
              {!applyMode.isOn && (
                <button
                  className={cl.btnClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    expressionsActions.expressionsDelete(el);
                  }}>
                  ❌
                </button>
              )}{" "}
              <div className={cl.label_wrap}>
                <SelectLabel
                  isOne={true}
                  disabled={applyMode.isOn}
                  colCat={{ id: el.labelid, name: el.label }}
                  onSelect={(val) =>
                    expressionsActions.contentEdit({
                      id: el.id,
                      labelid: val ? val.id : "",
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpressionItem;
