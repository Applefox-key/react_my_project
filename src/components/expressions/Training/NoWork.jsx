import React from "react";
import Image from "react-bootstrap/Image";
import pict from "../../../img/sitting_man.png";

const NoWork = () => {
  return (
    <div>
      <h1 className="display-1 color-base">
        there are no expressions for training!
      </h1>
      <div className="color_container"></div>
      <Image src={pict} className="pict" />
    </div>
  );
};

export default NoWork;
