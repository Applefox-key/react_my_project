import React from "react";

const HintCount = ({ hint }) => {
  const [hintForUser, od, count] = hint;
  const cl1 = od ? "circle bg-danger" : "circle bg-warning";
  const cl2 = od ? "circle bg-dark" : "circle bg-primary";

  return (
    <div className="hint1">
      <div className="d-flex circles-hint">
        <button className={cl1}></button>
        <button className={cl2}></button>
        {/* <button className="circle bg-primary"></button> */}
        {count === 3 && <button className={cl1}></button>}
      </div>
      <h5 className="">{hintForUser}</h5>
    </div>
  );
};

export default HintCount;
