import React from "react";

import cl from "./AnimatedBtn.module.css";
const AnimatedBtn = ({ title, ...props }) => {
  return (
    <button className="w-100" {...props}>
      <span className={cl.box}>{title}</span>
    </button>
  );
};

export default AnimatedBtn;
