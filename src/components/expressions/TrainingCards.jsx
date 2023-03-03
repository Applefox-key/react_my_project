import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OneCardE from "./OneCardE";

import NoWork from "./NoWork";
const TrainingCards = ({ items = [], expressionUpdate }) => {
  const [num, setNum] = useState(0);
  const [direction, setDirection] = useState(0);
  const [anim, setShowAnim] = useState(false);

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
    if (direction !== 2) setDirection(2);
    setShowAnim(!anim);
    expressionUpdate(expr);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {items.length ? (
        <>
          <OneCardE anim={anim} dir={direction} item={items[num]} />
          <div className="mt-3">
            <Button onClick={prew} disabled={num === 0 || !items.length}>
              {"❰ PREW"}
            </Button>{" "}
            <Button
              variant="warning"
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
    </div>
  );
};

export default TrainingCards;
