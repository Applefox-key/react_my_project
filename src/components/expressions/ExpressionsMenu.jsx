import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";

import ExpModalCommand from "./ExpModalCommand";

const ExpressionsMenu = ({ setExpressions, ...props }) => {
  const [mod, setMod] = useState(false);
  const modal = (el) => {
    setMod(el);
  };
  const router = useNavigate();

  return (
    <div className="d-flex   justify-content-between p-2">
      <div className="d-flex   align-items-start p-2">
        {mod ? (
          <ExpModalCommand
            mod={mod}
            setMod={setMod}
            setExpressions={setExpressions}
          />
        ) : (
          <></>
        )}
        <ButtonGroup size="lg" aria-label="delete and adding buttons">
          <Button size="lg" variant="light" onClick={props.addOne}>
            Add one
          </Button>
          <Button size="lg" variant="light" onClick={() => modal("list")}>
            Add some
          </Button>
          <Button variant="light" onClick={() => modal("file")}>
            Add from the file
          </Button>{" "}
          <Button variant="light" onClick={() => router("/training")}>
            Back to training
          </Button>{" "}
        </ButtonGroup>
      </div>{" "}
    </div>
  );
};

export default ExpressionsMenu;
