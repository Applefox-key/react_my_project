import React from "react";
import MyCardExpress from "../../UI/CARDS/MyCardExpress";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const OneCardE = ({ anim, dir, item, setSett }) => {
  const hintForUser = item ? item.hintForReading : "";

  return (
    <>
      <div className="my-1">
        {" "}
        <SwitchTransition
          mode="out-in"
          className="my-3"
          style={{ display: dir === 0 ? "block" : "none" }}>
          <CSSTransition key={!anim} timeout={500} classNames="cardfade">
            <MyCardExpress item={item} hint={hintForUser[0]} />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default OneCardE;
