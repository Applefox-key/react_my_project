import React from "react";

import cl from "./ExpressionsEdit.module.scss";
import Plan from "../../PlanAndHistory/Plan";
import History from "../../PlanAndHistory/History";
import { addSpanToExpInPrase } from "../../../../utils/texts";
import { IoMdClose } from "react-icons/io";
import ExprStatusInf from "../ExprStatus/ExprStatusInf";
const InfoWindow = ({ setVisible, expression }) => {
  return (
    <div
      className={cl["modal-edit-wrap"]}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) setVisible("");
      }}>
      <div className={cl["modal-info"]}>
        <div className={cl["head-edit-box"]}>
          <div>PHRASE PLAN AND HISTORY</div>
          <button
            className={cl["edit-close-btn"]}
            title="Clouse without changes"
            onClick={() => setVisible("")}>
            <IoMdClose />
          </button>
        </div>
        <div className={cl["modal-plan"]}>
          <div className={cl.modalExp}>
            <div>
              <span>Sentence:</span>
              {addSpanToExpInPrase(expression)}
            </div>
          </div>
          <Plan expression={expression} />
        </div>
        <div className={cl["history-status-box"]}>
          <div className={cl["history-box"]}>
            <History expression={expression} />
          </div>

          <ExprStatusInf
            stat={expression.status}
            inQueue={expression.inQueue}
            textForm
          />
        </div>
      </div>
    </div>
  );
};

export default InfoWindow;
