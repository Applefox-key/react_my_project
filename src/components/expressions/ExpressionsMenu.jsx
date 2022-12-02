import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import BackBtn from "../UI/BackBtn/BackBtn";

import ExpModalCommand from "./ExpModalCommand";

const ExpressionsMenu = ({ setExpressions, ...props }) => {
  const [mod, setMod] = useState(false);
  const modal = (el) => {
    setMod(el);
  };

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
        </ButtonGroup>
      </div>{" "}
      <BackBtn size="lg" />
    </div>
  );
};

export default ExpressionsMenu;
