import React from "react";
import cl from "./ProgressColumn.module.css";
const ProgressColumn = ({ stage = 0, color }) => {
  const pr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cl.wrapProgress}>
      {pr.map((el) => (
        <div key={el} className={el > stage ? cl.oneStage0 : cl.oneStage}></div>
      ))}
    </div>
  );
};

export default ProgressColumn;
