import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ModalPasteBtns = ({ dataArray, read, add, back, setCheck, check }) => {
  return (
    <div className="pt-2">
      {!dataArray ? (
        <>
          <Form.Check
            type="checkbox"
            checked={check}
            label="automatically determine the column name"
            onChange={(e) => {
              setCheck(e.target.checked);
            }}
          />
          <Button size="lg" onClick={read}>
            Next step
          </Button>
        </>
      ) : (
        <>
          <Button size="lg" onClick={back}>
            Step back
          </Button>{" "}
          <Button size="lg" onClick={add}>
            Add content
          </Button>
        </>
      )}
    </div>
  );
};

export default ModalPasteBtns;
