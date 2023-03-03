import React from "react";
import { useState } from "react";
import cl from "./MyCardExpress.module.css";

import { CSSTransition } from "react-transition-group";
import { addSpanToExpInPrase } from "../../../utils/texts";

const MyCardExpress = ({ item, hint }) => {
  const [flipped, setFlipped] = useState(false);
  let studyPlan = item.studyPlan;

  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => setFlipped(!flipped)}>
          <CSSTransition in={!flipped} timeout={1000} classNames="cardFront">
            <div className={cl["card-front"]}>
              <div className="display-1 ">
                {!item.expression
                  ? item.phrase
                  : addSpanToExpInPrase(item).map((row, i) => row)}
              </div>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              <div className="d-flex justify-content-around w-100">
                <div className="w-50 d-flex flex-column  justify-content-between">
                  <h1 className="display-4 mb-5">Study plan 🠒</h1>
                  <h1>{hint}</h1>
                </div>
                <div className="text-start">
                  {studyPlan.map((el, i) => (
                    <div key={i}>{el}</div>
                  ))}
                </div>
              </div>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

export default MyCardExpress;
