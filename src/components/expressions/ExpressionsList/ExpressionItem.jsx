import React, { useState } from "react";
import { addSpanToExpInPrase } from "../../../utils/texts";
import { expressionStateIcon } from "../../../utils/expressions";

import EditWindow from "./EditWindow";

import cl from "./ExpressionsList.module.scss";
import InfoWindow from "./InfoWindow";
import SelectLabel from "../../Labels/SelectLabel";
import ProgressColumn from "../../UI/MyProgressBar/ProgressColumn";

const ExpressionItem = ({
  handleDrop,
  expressions,
  editElem,
  expressionsActions,
  editOn,
  view,
  applyMode,
}) => {
  const [elInfo, setElInfo] = useState("");

  const classGenerator = (el) => {
    let part1 = view ? cl["oneItemCard"] : cl["oneItemRow"];
    if (!applyMode.isOn || !applyMode.list.includes(el.id)) return part1;
    let part2 = cl["divIsChecked"];
    return [part1, part2].join(" ");
  };

  console.log(
    [
      view ? cl["cardsContainer"] : cl["rowsContainer"],
      applyMode.isOn ? cl.applyMode : "",
    ].join(" ")
  );
  console.log(applyMode.isOn);

  return (
    <>
      {editElem && (
        <EditWindow
          editElem={editElem}
          expressionsActions={expressionsActions}
          editOn={editOn}
        />
      )}
      {elInfo && <InfoWindow setVisible={setElInfo} expression={elInfo} />}
      <div
        className={
          (view ? cl["cardsContainer"] : cl["rowsContainer"]) +
          (applyMode.isOn ? " " + cl.listApply : "")
        }>
        {expressions.map((el, i) => (
          <div
            key={el.id}
            className={classGenerator(el)}
            onDrop={(e) => handleDrop(e, el)}
            // onDragEnter={(e) => handleDrop(e, el)}
            onDragEnter={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            // onDragOver={(e) => handleDrop(e, el)}
            onDragLeave={(e) => e.preventDefault()}
            onClick={(e) => {
              if (applyMode.isOn) expressionsActions.addForApply(el);
            }}>
            <div className={cl.atr}>
              <div className={cl.label_wrap}>
                <SelectLabel
                  disabled={applyMode.isOn}
                  onSelect={(val) =>
                    expressionsActions.contentEdit({
                      id: el.id,
                      labelid: val ? val.id : "",
                    })
                  }
                  colCat={{ id: el.labelid, name: el.label }}
                  isOne={true}
                />
              </div>
              <div
                onClick={(e) => {
                  if (!applyMode.isOn) setElInfo(el);
                }}
                className={cl.progress}>
                <ProgressColumn
                  stage={el.stage}
                  icon={expressionStateIcon(el)}
                />
              </div>
            </div>
            <div
              className={cl["rowPhrase"]}
              onClick={(e) => {
                if (!applyMode.isOn) editOn(el);
              }}>
              {addSpanToExpInPrase(el)}
            </div>
            <div className={cl["exp-row-btns"]}>
              {!applyMode.isOn && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    expressionsActions.expressionsDelete(el);
                  }}>
                  ❌
                </button>
              )}
              <span>{expressionsActions.ordNumber(i + 1)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpressionItem;
