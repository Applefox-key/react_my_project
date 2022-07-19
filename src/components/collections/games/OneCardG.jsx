import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MyCard from "../../UI/card/MyCard";

const OneCardG = ({ anim, direction, item }) => {
  return (
    <>
      <div className="my-3" style={{ display: direction ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={!anim} timeout={500} classNames="card_gallery">
            <MyCard item={item} />
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="my-3" style={{ display: !direction ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={anim}
            timeout={500}
            classNames="card_gallery_back"
          >
            <MyCard item={item} />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default OneCardG;
