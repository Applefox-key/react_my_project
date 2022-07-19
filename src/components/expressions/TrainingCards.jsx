import React, { useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import ExpressionInfo from "./ExpressionInfo";
import OneCardE from "./OneCardE";

const TrainingCards = ({ items = [], expressionUpdate }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [contentModal, setContentModal] = useState("");
  const [itemNum, setItemNum] = useState(0);

  const [direction, setDirection] = useState(0);
  const [anim, setShowAnim] = useState(false);

  const expressionInfo = (expression) => {
    setVisibleModal(true);
    setContentModal(expression);
  };

  const next = () => {
    if (direction !== 0) setDirection(0);
    setShowAnim(!anim);
    setItemNum(Math.min(itemNum + 1, items.length - 1));
  };

  const prew = () => {
    if (direction !== 1) setDirection(1);
    setShowAnim(!anim);
    setItemNum(Math.max(itemNum - 1, 0));
  };
  const update = (expr) => {
    if (direction !== 2) setDirection(2);
    setShowAnim(!anim);
    expressionUpdate(expr);

    // setItemNum(Math.max(itemNum - 1, 0));
  };

  return (
    <>
      <ExpressionInfo
        visible={visibleModal}
        setVisible={setVisibleModal}
        expression={contentModal}
      />
      <h6 className="mt-3">you have {items.length} expressions to read</h6>

      <div>
        {/* <Button variant="secondary" onClick={back}>
          {"❰ Back"}
        </Button> */}
        <div>
          {/* <p>{items.length}</p> */}
          {items.length ? (
            <OneCardE anim={anim} dir={direction} item={items[itemNum]} />
          ) : (
            <h1 className="display-1">GOOD JOB!</h1>
          )}
          <div className="mt-5">
            <Button
              variant="primary"
              onClick={prew}
              disabled={itemNum === 0 || !items.length}
            >
              {"❰ PREW"}
            </Button>{" "}
            <Button
              variant="warning"
              onClick={(e) => {
                update(items[itemNum]);
              }}
              disabled={!items.length}
            >
              {"has been read"}
            </Button>{" "}
            <Button
              variant="primary"
              onClick={next}
              disabled={items.length - 1 === itemNum || !items.length}
            >
              {"NEXT ❱"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingCards;
