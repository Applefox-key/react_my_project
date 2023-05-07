import React from "react";

import cl from "./ExpressionsList.module.scss";
const InfoWindow = ({ setVisible, expression }) => {
  let studyPlan = expression.studyPlan.map((el) => el.split(":"));
  let history = expression.userHistory;
  console.log(studyPlan);
  const stylecss = (item) => {
    if (item.includes("skipped")) return { color: "red", fontWeight: "600" };
    if (item.includes("new try")) return { color: "green", fontWeight: "800" };
    if (item.includes("add")) return { color: "green", fontWeight: "800" };
    return {};
  };
  return (
    <div
      className={cl["modal-wrap"]}
      onClick={(e) => {
        if (e.target === e.currentTarget) setVisible("");
      }}>
      <div className={cl["modal-info"]}>
        <div>
          <div className={cl.plan}>
            {studyPlan.map((item, i) => (
              <div key={i} className={cl.planDay}>
                <p>{item[0]}</p>
                {item[1].split(" ").map((el) => (
                  <span>{el}</span>
                ))}
              </div>
            ))}
          </div>
          <div className={cl.history}>
            {history.map((item, i) => (
              <div key={i} className={cl.historyRow}>
                <div style={stylecss(item)}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindow;
