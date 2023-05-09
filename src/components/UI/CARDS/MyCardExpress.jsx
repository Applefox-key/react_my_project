import React from "react";
import { useState } from "react";
import cl from "./MyCardExpress.module.scss";

import { CSSTransition } from "react-transition-group";
import { addSpanToExpInPrase } from "../../../utils/texts";
import Plan from "../../expressions/PlanAndHistory/Plan";

const MyCardExpress = ({ item, hint }) => {
  const [flipped, setFlipped] = useState(false);
  const generateClass = (item) => {
    if (item.phrase.length < 190) return "display-1";
    if (item.phrase.length < 240) return "display-2";
    if (item.phrase.length < 350) return "display-3";
    if (item.phrase.length < 400) return "display-4";
  };
  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => setFlipped(!flipped)}>
          <CSSTransition in={!flipped} timeout={1000} classNames="cardFront">
            <div className={cl["card-front"]}>
              <div className={generateClass(item)}>
                {!item.expression ? item.phrase : addSpanToExpInPrase(item)}
              </div>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              <h1 className="display-4 mb-2 mt-0">Study plan</h1>
              <Plan expression={item} />
              <h1 className="mt-5">{hint}</h1>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

export default MyCardExpress;
