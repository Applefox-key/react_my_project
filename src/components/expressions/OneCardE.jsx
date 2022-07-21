import React from "react";
import MyCardExpress from "../UI/card/MyCardExpress";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import HintCount from "./HintCount";

const OneCardE = ({ anim, dir, item }) => {
  const [hintForUser, overdue] = item.hintForReading;
  const count = item.stage < 7 ? 2 : 3;
  return (
    <>
      <div className="my-1" style={{ display: dir === 0 ? "block" : "none" }}>
        <SwitchTransition
          mode="out-in"
          className="my-3"
          style={{ display: dir === 0 ? "block" : "none" }}
        >
          <CSSTransition key={!anim} timeout={500} classNames="card_gallery">
            <div>
              <HintCount
                count={count}
                overdue={overdue}
                hintForUser={hintForUser}
              ></HintCount>
              <MyCardExpress item={item} />
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
              <HintCount
                count={count}
                overdue={overdue}
                hintForUser={hintForUser}
              ></HintCount>
              <MyCardExpress item={item} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="my-3" style={{ display: dir === 2 ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={anim} timeout={500} classNames="card_gallery_up">
            <div>
              <HintCount
                count={count}
                overdue={overdue}
                hintForUser={hintForUser}
              ></HintCount>
              <MyCardExpress item={item} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default OneCardE;
