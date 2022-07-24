import React from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";

const Result = ({ text }) => {
  return (
    <div>
      <div className={cl["card-container"]}>
        <button className={cl["card-button"]}>
          <div className={cl["card-front"]}>
            <h1 className="display-1">{text}</h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Result;
