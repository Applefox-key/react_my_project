import React from "react";

const HintCount = ({ count, hintForUser, overdue }) => {
  return (
    <div className="hint1">
      <div className="d-flex circles-hint">
        <button className="circle bg-warning"></button>
        <button className="circle bg-primary"></button>
        {count === 3 && <button className="circle bg-warning"></button>}
      </div>
      <h5 className="">{hintForUser}</h5>
    </div>
  );
};

export default HintCount;
