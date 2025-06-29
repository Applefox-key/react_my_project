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
    <div className="modal-btn pt-2 ">
      {!dataArray ? (
        <>
          <Button size="lg" onClick={read}>
            Next step
          </Button>{" "}
          <Button size="lg" onClick={(e) => back(e, true)}>
            Cancel
          </Button>
        </>
      ) : (
        <div className={cl.titleBtns}>
          <div className={cl.lbl}>
            <SelectLabel isOne={true} onSelect={labelSelect} colCat={label} />
            {/* <span> for all rows</span> */}
          </div>{" "}
          <div>
            <Button size="lg" className="m-2" onClick={back}>
              Step back
            </Button>{" "}
            <Button size="lg" className="m-2" onClick={add}>
              Add
            </Button>
            <Button size="lg" className="m-2" onClick={(e) => back(e, true)}>
              Cancel
            </Button>
          </div>
          <span className={cl.spu}>
            select the part of the phrase you wanted to remember for each row
          </span>
        </div>
      )}
    </div>
  );
};

export default ModalPasteBtns;
