import React from "react";
import cl from "./MyProgressBar.module.css";

const MyProgressBar = ({ stage = 0, color }) => {
  const progr1 = 315 + (stage * 40 < 180 ? stage * 40 : 180); //315 - 495
  const progr2 = 315 + (stage * 40 < 180 ? 0 : stage * 40 - 180); //315 - 495

  return (
    <div className={cl.wrap}>
      <div>
        {" "}
        <div className={cl.outer}>
          {" "}
          <div
            className={cl.inner + " " + cl[color]}
            style={{ transform: "rotate(" + progr1 + "deg)" }}></div>
        </div>
      </div>{" "}
      <p className={cl.stage}> {stage}/9</p>
      <div>
        <div className={cl.outer1}>
          {" "}
          <div
            className={cl.inner + " " + cl[{ color }]}
            style={{ transform: "rotate(" + progr2 + "deg)" }}></div>
        </div>
      </div>
    </div>
  );
};

export default MyProgressBar;
