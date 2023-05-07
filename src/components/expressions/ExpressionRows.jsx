import React, { useState } from "react";
import { addSpanToExpInPrase } from "../../utils/texts";
import { expressionState } from "../../utils/expressions";

import EditWindow from "./EditWindow";
import cl from "./ExpressionsList.module.scss";
import InfoWindow from "./InfoWindow";
import SelectLabel from "../Labels/SelectLabel";
import ProgressColumn from "../UI/MyProgressBar/ProgressColumn";

const ExpressionRows = ({
  expressions,
  editElem,
  expressionsActions,
  editOn,
  view,
}) => {
  const [elInfo, setElInfo] = useState("");

  return (
    <div>
      {editElem && (
        <EditWindow
          editElem={editElem}
          expressionsActions={expressionsActions}
          editOn={editOn}
        />
      )}
      {elInfo && <InfoWindow setVisible={setElInfo} expression={elInfo} />}

      <div className={view ? cl["cardsContainer"] : cl["rowsContainer"]}>
        {expressions.map((el, i) => (
          <div
            key={el.id}
            className={view ? cl["oneItemCard"] : cl["oneItemRow"]}>
            <div className={cl.atr}>
              <div className={cl.label_wrap}>
                <SelectLabel
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

              <div onClick={(e) => setElInfo(el)} className={cl.progress}>
                <ProgressColumn stage={el.stage} color={expressionState(el)} />
              </div>
            </div>
            <div
              className={cl["rowPhrase"]}
              onClick={(e) => {
                editOn(el);
              }}>
              {addSpanToExpInPrase(el)}
            </div>
            <div className={cl["exp-row-btns"]}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  expressionsActions.expressionsDelete(el);
                }}>
                ❌
              </button>{" "}
              <span>{expressionsActions.ordNumber(i + 1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpressionRows;
