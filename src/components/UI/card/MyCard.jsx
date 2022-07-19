import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";

const MyCard = (item) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => setFlipped(!flipped)}
        >
          <CSSTransition
            in={!flipped}
            timeout={1000}
            classNames="front-face-transition"
          >
            <div className={cl["card-front"]}>
              <h1 className="display-1">{item.item.side1}</h1>
            </div>
          </CSSTransition>
          <CSSTransition
            in={flipped}
            timeout={1000}
            classNames="back-face-transition"
          >
            <div className={cl["card-back"]}>
              <h1 className="display-1">{item.item.side2}</h1>
              <p className="display-5">{item.item.tag}</p>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

export default MyCard;
// <CSSTransition
//   in={!side}
//   timeout={500}
//   classNames={cl.animation}
//   // unmountOnExit
//   onEnter={(node) => console.log(node.classList)}
//   onExited={(node) => console.log("exit")}
// >
//   <div className={cl.card}>
//     <h1 className="displwy-4">{side ? item.side1 : item.side2}</h1>
//     <p>{item.tag}</p>
//     <div>
//       <Button onClick={() => setSide(!side)}>rotate</Button>
//     </div>
//   </div>
// </CSSTransition>
