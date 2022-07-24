import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cl from "./Games.module.css";
import Badge from "react-bootstrap/Badge";
const GameCount = ({ count, all }) => {
  return (
    <h1>
      <ButtonGroup className={cl.game_count}>
        <Button size="lg" variant="success" style={{ cursor: "auto" }}>
          {" POSITIVE: " + count[0]}
        </Button>{" "}
        <Button size="lg" variant="warning" style={{ cursor: "auto" }}>
          {"LEFT" + all}
        </Button>{" "}
        <Button size="lg" variant="danger" style={{ cursor: "auto" }}>
          {" NEGATIVE: " + count[1]}
        </Button>{" "}
        {/* <h1 className="display-5 mt-2 mb-2">mistakes: {positive}</h1> */}
      </ButtonGroup>
    </h1>
  );
};

export default GameCount;
