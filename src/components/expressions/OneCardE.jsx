import React from "react";
import MyCardExpress from "../UI/card/MyCardExpress";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import HintCount from "./HintCount";

const OneCardE = ({ anim, dir, item }) => {
  const hintForUser = item.hintForReading;

  return (
    <>
      <div className="my-1" style={{ display: dir === 0 ? "block" : "none" }}>
        <SwitchTransition
          mode="out-in"
          className="my-3"
          style={{ display: dir === 0 ? "block" : "none" }}>
          <CSSTransition key={!anim} timeout={500} classNames="card_gallery">
            <div>
              <HintCount hint={hintForUser}></HintCount>
              <MyCardExpress item={item} hint={hintForUser[0]} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>

      <div className="my-1" style={{ display: dir === 1 ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={anim}
            timeout={500}
            classNames="card_gallery_back">
            <div>
              <HintCount hint={hintForUser}></HintCount>
              <MyCardExpress item={item} hint={hintForUser[0]} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="my-1" style={{ display: dir === 2 ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={anim} timeout={500} classNames="card_gallery_up">
            <div>
              <HintCount hint={hintForUser}></HintCount>
              <MyCardExpress item={item} hint={hintForUser[0]} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default OneCardE;
