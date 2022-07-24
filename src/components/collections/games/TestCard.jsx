import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { PopupContext } from "../../../context";
import { useGame } from "../../../hooks/useGame";
import { shuffle } from "../../../utils/arraysFunc";
import MyCardStatic from "../../UI/card/MyCardStatic";
import Result from "../../UI/card/Result";
import MySpinner from "../../UI/MySpinner";
import GameCount from "./GameCount";
import TestOptions from "./TestOptions";

const TestCard = () => {
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [items, setItems] = useState();
  const [num, setNum] = useState(0);
  const [active, setActive] = useState([]);
  const [count, setCount] = useState([0, 0]);
  const [right, setRight] = useState();
  const contentParts = (arr) => {
    shuffle(arr);
    let res = arr.map((el, i) => {
      let a = [...arr];
      a.splice(i, 1);
      let answ = shuffle(a).slice(0, 3);
      answ.push(el);
      shuffle(answ);
      return { item: el, answ: answ };
    });
    return res;
  };

  const [getContent, back, isLoading, error] = useGame(setItems, contentParts);

  useEffect(() => {
    getContent();
    if (error) setPopupSettings([true, error, "error"]);
  }, []);

  const choose = (e) => {
    if (items[num].item.id.toString() === e.target.id.toString()) {
      setRight(e.target.id);
      setCount([count[0] + 1, count[1]]);
      setTimeout(() => {
        setRight("");
        setActive([]);
        setNum(num + 1);
      }, 800);
    } else {
      setCount([count[0], count[1] + 1]);
      let na = [...active];
      na.push(e.target.id);
      setActive(na);
    }
  };
  return (
    <div>
      <Button variant="dark" size="lg" onClick={back}>
        {"❰ Back"}
      </Button>

      {isLoading || !items ? (
        <MySpinner />
      ) : num === items.length - 1 ? (
        <Result text="Job is done!" />
      ) : (
        <>
          <GameCount count={count} all={items.length - num} />

          <SwitchTransition mode="out-in">
            <CSSTransition timeout={500} key={num} classNames="card_gallery_up">
              <div>
                <MyCardStatic item={items[num].item} />
                <TestOptions
                  items={items[num].answ}
                  onClick={choose}
                  active={active}
                  right={right}
                />
              </div>
            </CSSTransition>
          </SwitchTransition>
        </>
      )}
    </div>
  );
};

export default TestCard;
