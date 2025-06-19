import React from "react";

import cl from "./ExpressionsList.module.scss";
import Plan from "../PlanAndHistory/Plan";
import History from "../PlanAndHistory/History";
import { addSpanToExpInPrase } from "../../../utils/texts";
const InfoWindow = ({ setVisible, expression }) => {
  return (
    <div
      className={cl["modal-wrap"]}
      onClick={(e) => {
        if (e.target === e.currentTarget) setVisible("");
      }}>
      <div className={cl["modal-info"]}>
        {/* <div className={[cl1["card-container"], cl["modal-info"]].join(" ")}> */}
        <div className={cl["modal-plan"]}>
          {/* <div className={"modal-plan"}> */}
          <div className={cl.modalExp}>
            {/* <div>Expression: {expression.expression}</div> */}
            {/* <div>
              <span>Expression:</span> {expression.expression}
            </div> */}
            <div>
              <span>Sentence:</span>
              {addSpanToExpInPrase(expression)}
            </div>
          </div>
          <Plan expression={expression} />
        </div>
        <div className={cl["history-box"]}>
          <History expression={expression} />
        </div>
      </div>
    </div>
  );
};

export default InfoWindow;
