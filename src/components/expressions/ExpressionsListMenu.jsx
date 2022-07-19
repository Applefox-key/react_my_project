import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";

const ExpressionsListMenu = ({ ...props }) => {
  const router = useNavigate();

  const back = () => {
    router("/collections");
  };
  return (
    <div>
      <div className="d-flex  justify-content-start flex-column">
        <div className="d-flex   align-items-start">
          <ButtonGroup aria-label="delete and renaming buttons">
            <Button variant="secondary" onClick={props.deleteAllExpressions}>
              Delete all expressions
            </Button>
            <Button variant="secondary" onClick={back}>
              {"❰ Back"}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default ExpressionsListMenu;
