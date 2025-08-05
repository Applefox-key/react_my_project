import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OneCardE from "./OneCardE";
import NoWork from "./NoWork";
import { getSettings, setSettings } from "../../../utils/settings";
import CountBtns from "./CountBtn";
import HintCount from "./HintCount";
import SpecialEffect from "../../UI/SpecialEffect/SpecialEffect";

const TrainingCards = ({ items = [], expressionUpdate }) => {
  const [num, setNum] = useState(0);
  const [direction, setDirection] = useState(0);
  const [anim, setShowAnim] = useState(false);
  const [showBtn, setshowBtn] = useState(getSettings("countBtn", 0));
  const [showEffect, setShowEffect] = useState(false);
  const setSett = (e) => {
    setshowBtn(1 - showBtn);
    setSettings("countBtn", 1 - showBtn);
  };

  const next = () => {
    if (direction !== 0) setDirection(0);
    setShowAnim(!anim);
    setNum(Math.min(num + 1, items.length - 1));
  };

  const prew = () => {
    if (direction !== 1) setDirection(1);
    setShowAnim(!anim);
    setNum(Math.max(num - 1, 0));
  };

  const update = (expr) => {
    if (expr.stage === 8) {
      setShowEffect(true);
    } else {
      if (direction !== 2) setDirection(2);
      setShowAnim(!anim);
      expressionUpdate(expr);
    }
  };
  const handleCloseEffect = (expr) => {
    setShowEffect(false);
    if (direction !== 2) setDirection(2);
    setShowAnim(!anim);
    expressionUpdate(expr);
    if (items.length > num) setNum(0);
  };
  // const hintForUser = item[num] ? item[num].hintForReading : "";
  return (
    <>
      {!!showBtn && items[num] && (
        <CountBtns
          item={items[num]}
          // count={items[num] ? items[num].hintForReading[2] : ""}
          doneFn={(e) => {
            update(items[num]);
          }}
        />
      )}
      <div style={{ overflow: "hidden" }}>
        {items.length ? (
          <>
            <HintCount
              hint={items[num] ? items[num].hintForReading : ""}
              phrase={items[num] ? items[num].phrase : ""}
              setSett={setSett}
            />

            <OneCardE anim={anim} dir={direction} item={items[num]} />
            <div className="training-btn">
              {" "}
              <Button onClick={prew} disabled={num === 0 || !items.length}>
                {"❰ PREW"}
              </Button>{" "}
              <Button
                className="color_button"
                onClick={(e) => {
                  update(items[num]);
                }}>
                {"has been read"}
              </Button>{" "}
              <Button
                onClick={next}
                disabled={items.length - 1 === num || !items.length}>
                {"NEXT ❱"}
              </Button>
            </div>
          </>
        ) : (
          <NoWork />
        )}
      </div>{" "}
      {showEffect && (
        <SpecialEffect
          message="Awesome! You reached the final stage! Keep it up!"
          onClose={() => handleCloseEffect(items[num])}
        />
      )}
    </>
  );
};

export default TrainingCards;
