import React from "react";
import Button from "react-bootstrap/esm/Button";

const ModalPasteBtns = ({ dataArray, read, add, back }) => {
  return (
    <div className="pt-2">
      {!dataArray ? (
        <Button size="lg" onClick={read}>
          Next step
        </Button>
      ) : (
        <>
          <Button size="lg" onClick={back}>
            Step back
          </Button>{" "}
          <Button size="lg" onClick={add}>
            Add exprassions and phrase
          </Button>
        </>
      )}
    </div>
  );
};

export default ModalPasteBtns;
