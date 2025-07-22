import React, { useMemo, useState } from "react";
import { addSpanToExpInPrase } from "../../../utils/texts";
import { expressionStateIcon } from "../../../utils/expressions";
import EditWindow from "./EditWindow";
import cl from "./ExpressionsList.module.scss";
import InfoWindow from "./InfoWindow";
import SelectLabel from "../../Labels/SelectLabel";
import ProgressColumn from "../../UI/MyProgressBar/ProgressColumn";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import BtnIsChecked from "../../UI/Btns/BtnIsChecked";
import ExprStatus from "./ExprStatus";
import { statusArr } from "../../../constants/statusConst";

const ExpressionItemSimple = ({ actions, expression, modes, num }) => {
  const { editMode, applyMode } = modes;
  console.log("num", num);
  console.log("num j", (num % 4) + 1);

  // const [editMode, setEditMode] = useState(false);
  const { expressionsActions, handleDrop } = actions;
  const [elInfo, setElInfo] = useState(false);
  const isChecked = useMemo(() => {
    return applyMode.isOn && applyMode.isSelected(expression.id);
  }, [applyMode, expression]);
  const classGenerator = () => {
    // let part1 = view === 1 ? cl["oneItemCard"] : cl["oneItemRow" + view];
    let part1 = cl["oneItemRow2"];
    if (!isChecked) return part1;
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
      {/* {editMode && (
        <EditWindow
          editMode={editMode}
          expressionsActions={expressionsActions}
        />
      )} */}
      {elInfo && <InfoWindow setVisible={setElInfo} expression={expression} />}
      <div className={cl["rowsContainer"]} onClick={(e) => e.stopPropagation()}>
        <div
          className={classGenerator()}
          key={"ex" + expression.id}
          {...dropEventsPrevent}
          onDrop={(e) => {
            e.stopPropagation();
            handleDrop(e, expression);
          }}>
          {applyMode.isOn && (
            <BtnIsChecked
              isChecked={isChecked}
              onClick={(e) => {
                e.stopPropagation();
                if (applyMode.isOn) addEl(expression);
              }}
            />
          )}
          <div className="d-flex">
            <div className={cl["exp-row-btns"]}>
              <div className={cl.label_wrap}>
                <SelectLabel
                  isOne={true}
                  id={"labelBox" + expression.id}
                  disabled={applyMode.isOn}
                  colCat={{ id: expression.labelid, name: expression.label }}
                  onSelect={(val) =>
                    expressionsActions.contentEdit({
                      id: expression.id,
                      labelid: val ? val.id : "",
                    })
                  }
                />
              </div>
            </div>
            {/* <ExprStatus stat="new" inPool={false} /> */}
            {/* <ExprStatus stat="active" inPool={true} /> */}
            {/* <ExprStatus stat="paused" inPool={false} />*/}

            <div className={cl.atr}>
              {/* <span>{expressionsActions.ordNumber(i + 1)}</span> */}
              <div
                className={cl.progress}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!applyMode.isOn) setElInfo(!elInfo);
                }}>
                <ProgressColumn
                  stage={expression.stage}
                  icon={expressionStateIcon(expression)}
                />
              </div>{" "}
            </div>
          </div>
          <div
            className={cl["rowPhrase"]}
            onClick={(e) => {
              e.stopPropagation();
              if (!applyMode.isOn) editMode.setEdit(expression);
            }}>
            {addSpanToExpInPrase(expression)}
          </div>
          <ExprStatus short stat={statusArr[num % 4]} inPool={num % 2 === 0} />
        </div>
      </div>
    </>
  );
};

export default ExpressionItemSimple;
