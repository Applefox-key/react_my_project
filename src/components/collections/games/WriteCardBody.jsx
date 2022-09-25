/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { PopupContext } from "../../../context";
import OneCardG from "./OneCardG";
import cl from "./Games.module.css";
import GameCount from "./GameCount";
import { onlyLetters } from "../../../utils/texts";
import Result from "../../UI/card/Result";
import { CSSTransition } from "react-transition-group";

const WriteCardBody = ({ items }) => {
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState([0, 0]); // const [card, setCard] = useState({ flip: false, num: 0, anim: false });
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const check = () => {
    if (flip) {
      setNum(Math.min(num + 1, items.length - 1));
      setAnswer("");
      setShowAnim(!anim);
    } else {
      let ra = onlyLetters(items[num].answer);
      let a = onlyLetters(answer);

      ra === a
        ? setCount([count[0] + 1, count[1]])
        : setCount([count[0], count[1] + 1]);
    }
    setFlip(!flip);
    console.log(num);
  };
  return (
    <div className={cl.cardSize}>
      {items.length === count[0] + count[1] && !flip ? (
        <div>
          <Result text="Job is done!" />
          <GameCount count={count} all={0} />
        </div>
      ) : (
        <CSSTransition
          appear={true}
          in={true}
          timeout={500}
          classNames="result">
          <div className="mt-1">
            <p>{items && num + 1 + "/" + items.length}</p>
            <div className={cl.cardSize}>
              <OneCardG
                anim={anim}
                item={items[num]}
                flip={flip}
                clickable={false}
              />{" "}
            </div>
            <div className="d-flex align-items-center justify-content-between w-50 m-auto">
              <GameCount
                count={count}
                all={items.length - count[0] - count[1]}
              />
              <Button onClick={check} size="lg" disabled={!answer}>
                {flip ? "NEXT" : "CHECK AN ANSWER"}
              </Button>{" "}
            </div>
            <textarea
              type={"text"}
              value={answer}
              className={cl.writeAnswer}
              onKeyPress={(e) => {
                if (e.key === "Enter") check();
              }}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default WriteCardBody;
