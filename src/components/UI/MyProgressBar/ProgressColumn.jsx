import React from "react";
import cl from "./ProgressColumn.module.scss";

const ProgressColumn = ({ stage = 0, icon }) => {
  const pr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <div className={cl.wrapProgress}>
        {pr.map((el) => (
          <div
            key={el}
            className={el > stage ? cl.oneStage0 : cl.oneStage}></div>
        ))}
      </div>{" "}
      {icon}
    </div>
  );
};

export default ProgressColumn;
