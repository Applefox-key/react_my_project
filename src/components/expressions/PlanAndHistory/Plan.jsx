import React from "react";
import cl from "./PlanAndHistory.module.scss";

const Plan = ({ expression, short }) => {
  let studyPlan = expression.studyPlan.map((el) => el.split(":"));

  let elem = (item, i) => {
    return (
      <>
        <p> {item[0]}</p>
        <p> {item.length === 4 ? <mark>{item[1]}</mark> : item[1]}</p>
        {item[2].split(" ").map((el, j) => (
          <span key={i + "_" + j}>{el}</span>
        ))}
      </>
    );
  };
  return (
    <div className={[cl.planWrap, "planFont"].join(" ")}>
      <div className={short ? cl.planshort : cl.plan}>
        {studyPlan.map((item, i) =>
          short ? (
            <p key={i}>{item[0]}</p>
          ) : (
            <div key={i} className={cl.planDay}>
              {elem(item, i)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Plan;
