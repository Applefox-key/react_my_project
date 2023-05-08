import React from "react";

import cl from "./ExpressionsList.module.scss";
import Plan from "../PlanAndHistory/Plan";
import History from "../PlanAndHistory/History";
const InfoWindow = ({ setVisible, expression }) => {
  return (
    <div
      className={cl["modal-wrap"]}
      onClick={(e) => {
        if (e.target === e.currentTarget) setVisible("");
      }}>
      <div className={cl["modal-info"]}>
        <div>
          <Plan expression={expression} />
          <div className={cl["history-box"]}>
            <History expression={expression} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindow;
