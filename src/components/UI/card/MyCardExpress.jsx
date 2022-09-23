import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";

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
              <h1 className="display-4">{item.expression}</h1>
              <h1 className="display-1">{item.phrase}</h1>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              <div className="d-flex justify-content-around w-100">
                <div className="w-50 d-flex flex-column  justify-content-between">
                  <h1 className="display-4 mb-5">Study plan</h1>
                  <p>{hint}</p>
                </div>
                <div className="text-start">
                  {studyPlan.map((el, i) => (
                    <p key={i}>{el}</p>
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
