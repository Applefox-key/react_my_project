import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";

const MyCardExtra = ({ item, mode = "0", flip, clc = true }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (flip !== flipped && flip !== undefined) setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);

  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => {
            if (clc) setFlipped(!flipped);
          }}>
          <CSSTransition in={!flipped} timeout={1000} classNames="cardFront">
            <div className={cl["card-front"]}>
              {/* <h1 className="display-1"> */}
              <h1 className={["display-1", cl.text1].join(" ")}>
                {mode === "0" ? item.question : item.answer}
              </h1>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              {/* <h1 className="display-1"> */}
              <h1 className={["display-4", cl.text1].join(" ")}>
                {mode === "0" ? item.answer : item.question}
              </h1>
              <p className="display-5">{item.note}</p>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

export default MyCardExtra;
