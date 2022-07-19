import React from "react";
import MyCardStatic from "../UI/card/MyCardStatic";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Hint from "./Hint";

const OneCardE = ({ anim, dir, item }) => {
  const [hintForUser, overdue] = item.hintForReading;
  console.log(hintForUser);
  console.log(overdue);
  return (
    <>
      <div className="my-3" style={{ display: dir === 0 ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={!anim} timeout={500} classNames="card_gallery">
            <div>
              <MyCardStatic item={item} />
              <Hint overdue={overdue} hintForUser={hintForUser}></Hint>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="my-3" style={{ display: dir === 1 ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={anim}
            timeout={500}
            classNames="card_gallery_back"
          >
            <div>
              <MyCardStatic item={item} />
              <Hint overdue={overdue} hintForUser={hintForUser}></Hint>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="my-3" style={{ display: dir === 2 ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={anim} timeout={500} classNames="card_gallery_up">
            <div>
              <MyCardStatic item={item} />
              <Hint overdue={overdue} hintForUser={hintForUser}></Hint>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default OneCardE;
