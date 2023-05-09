import React from "react";
import cl from "./MySpinner.module.scss";

const MySpinner = () => {
  return (
    <div style={{ marginTop: "10rem" }}>
      <div className={cl.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MySpinner;
