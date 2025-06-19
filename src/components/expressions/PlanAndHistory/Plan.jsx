import React from "react";
import cl from "./PlanAndHistory.module.scss";

const Plan = ({ expression }) => {
  let studyPlan = expression.studyPlan.map((el) => el.split(":"));

  return (
    <div className={[cl.planWrap, "planFont"].join(" ")}>
      <div className={cl.plan}>
        {studyPlan.map((item, i) => (
          <div key={i} className={cl.planDay}>
            <p>{item[0]}</p>
            {item[1].split(" ").map((el, j) => (
              <span key={i + "_" + j}>{el}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
