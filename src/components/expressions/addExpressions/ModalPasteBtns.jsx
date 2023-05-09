import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import cl from "./addExpressions.module.scss";
import SelectLabel from "../../Labels/SelectLabel";
const ModalPasteBtns = ({ dataArray, read, add, back, setDataArr }) => {
  const [label, setLabel] = useState({
    id: "",
    name: "",
  });
  const labelSelect = (val) => {
    setLabel(val);
    setDataArr(
      dataArray.map((el) => {
        return { ...el, labelid: val.id };
      })
    );
  };
  return (
    <div className="pt-2">
      {" "}
      {!dataArray ? (
        <Button size="lg" onClick={read}>
          Next step
        </Button>
      ) : (
        <div className={cl.titleBtns}>
          <div className={cl["label-box"]}>
            <span>label for all rows</span>{" "}
            <SelectLabel isOne={true} onSelect={labelSelect} colCat={label} />
          </div>{" "}
          <div>
            <Button size="lg" onClick={back}>
              Step back
            </Button>{" "}
            <Button size="lg" onClick={add}>
              Add exprassions and phrase
            </Button>
          </div>
          <span>
            select the part of the phrase you wanted to remember for each row
          </span>
        </div>
      )}
    </div>
  );
};

export default ModalPasteBtns;
