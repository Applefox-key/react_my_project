import React from "react";

const HintCount = ({ hint }) => {
  const [hintForUser, od, count] = hint;
  const cl1 = od ? "circle bg-danger" : "circle bg-warning";
  const cl2 = od ? "circle bg-dark" : "circle bg-primary";

  return (
    <div className="hint1 ">
      {" "}
      <h5 className="">{hintForUser}</h5>
      <div className="d-flex circles-hint hintAnim">
        <div>{count} times</div>
        <button className={cl1}></button>
        <button className={cl2}></button>
        {count === 3 && <button className={cl1}></button>}
      </div>
    </div>
  );
};

export default HintCount;
