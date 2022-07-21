import React from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";

const MyCardStatic = (item) => {
  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          // onClick={() => setFlipped(!flipped)}
        >
          <div className={cl["card-front"]}>
            <h1 className="display-1">{item.item.expression}</h1>
            <h1 className="display-5">{item.item.phrase}</h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyCardStatic;
