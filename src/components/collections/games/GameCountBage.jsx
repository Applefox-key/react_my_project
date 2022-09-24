import React from "react";
import Button from "react-bootstrap/esm/Button";
import cl from "./Games.module.css";
import { Badge } from "react-bootstrap";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const GameCountBage = ({ value, lable, bg, text }) => {
  return (
    <SwitchTransition>
      <CSSTransition key={value} timeout={200} classNames={"count"}>
        <Button size="lg" variant="light" className={cl.countBtn}>
          <Badge pill text={text} bg={bg}>
            {lable}
            {value}
          </Badge>
        </Button>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default GameCountBage;
