import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BackBtn from "../UI/BackBtn/BackBtn";

import ExpModalCommand from "./ExpModalCommand";

const ExpressionsMenu = ({ setExpressions, ...props }) => {
  const [mod, setMod] = useState(false);
  const router = useNavigate();
  // const pageParam = useParams();

  const back = () => {
    router("/training");
  };
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
          <Button variant="light" onClick={() => modal("file")}>
            Add from the file
          </Button>{" "}
          <Button variant="light" onClick={() => modal("list")}>
            Add from the list
          </Button>
        </ButtonGroup>
      </div>{" "}
      <BackBtn size="lg" onClick={back} />
    </div>
  );
};

export default ExpressionsMenu;
