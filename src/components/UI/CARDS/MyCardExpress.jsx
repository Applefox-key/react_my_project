import React from "react";
import { useState } from "react";
import cl from "./MyCardExpress.module.scss";

import { CSSTransition } from "react-transition-group";
import { addSpanToExpInPrase } from "../../../utils/texts";
import Plan from "../../expressions/PlanAndHistory/Plan";
import { useStretchingText } from "../../../hooks/useStretchingText";

const MyCardExpress = ({ item, hint }) => {
  const [flipped, setFlipped] = useState(false);
  useStretchingText("planFont");
  useStretchingText("relativeF");

  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => setFlipped(!flipped)}>
          <CSSTransition
            in={!flipped}
            timeout={1000}
            classNames="cardFront"
            key="front">
            <div className={cl["card-front"]}>
              <div className={"relativeF"}>
                {!item.expression ? item.phrase : addSpanToExpInPrase(item)}
              </div>
            </div>
          </CSSTransition>
          <CSSTransition
            in={flipped}
            timeout={1000}
            classNames="cardBack"
            key="back">
            <div className={cl["card-back"]}>
              <h1 className="plan-back">Study plan</h1>
              <div className={cl.back}>
                <Plan expression={item} />
              </div>
              <div className="back-hint">{hint}</div>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

export default MyCardExpress;
