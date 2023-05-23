import React, { useEffect, useState } from "react";

import Draggable from "react-draggable";

const CountBtns = ({ doneFn, item }) => {
  const [countValue, setCountValue] = useState(item.hintForReading[2]);
  const countDec = (e) => {
    e.preventDefault();
    const val = countValue - 1;
    setCountValue(val);
    if (val === 0) doneFn();
  };
  useEffect(() => {
    setCountValue(item.hintForReading[2]);
  }, [item]);
  return (
    <Draggable
      cancel="#cbtn"
      defaultPosition={{
        x: window.visualViewport.width * 0.7,
        y: window.visualViewport.height * 0.05,
      }}>
      <div className="countBtns">
        {" "}
        <div />
        <button id="cbtn" onClick={countDec}>
          {countValue}
        </button>{" "}
      </div>
    </Draggable>
  );
};

export default CountBtns;
