import React from "react";
import cl from "./Games.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const PairPart = ({ items, onClick, num, active }) => {
  return (
    <TransitionGroup className={cl.container}>
      {items[num - 1].map((el) => (
        <CSSTransition
          timeout={500}
          classNames="expression"
          key={el.id + "&" + num}
        >
          <button
            className={[
              cl.list,
              num === 2 ? cl.side2 : "",
              active === el.id + "&" + num ? cl.active : "",
            ].join(" ")}
            id={el.id + "&" + num}
            onClick={onClick}
          >
            {el["side" + num]}
          </button>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default PairPart;
