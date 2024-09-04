import React from "react";
import { InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ModalFileExpBtns = ({ inputFileName, fileChange }) => {
  return (
    <div className="d-flex">
      <InputGroup>
        <Form.Control
          size="lg"
          className="mt-1"
          ref={inputFileName}
          type="file"
          onChange={fileChange}
        />
      </InputGroup>{" "}
      <OverlayTrigger
        placement={"top"}
        overlay={
          <Tooltip>
            semicolon as separator between expression and phrase. arrange the
            each set in a separate line: expression; phrase
          </Tooltip>
        }>
        <Button size="lg" className="mt-1" variant="outline-secondary">
          ?
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default ModalFileExpBtns;
