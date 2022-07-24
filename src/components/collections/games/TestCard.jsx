import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { PopupContext } from "../../../context";
import { useGame } from "../../../hooks/useGame";
import { shuffle } from "../../../utils/arraysFunc";
import MyCardStatic from "../../UI/card/MyCardStatic";
import Result from "../../UI/card/Result";
import MySpinner from "../../UI/MySpinner";
import TestOptions from "./TestOptions";

const TestCard = () => {
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [items, setItems] = useState();
  const [num, setNum] = useState(0);
  const [active, setActive] = useState([]);
  const [count, setCount] = useState(0);

  const contentParts = (arr) => {
    shuffle(arr);
    let res = arr.map((el, i) => {
      let a = [...arr];
      a.splice(i, 1);
      let answ = shuffle(a).slice(0, 3);
      answ.push(el);
      shuffle(answ);
      console.log({ item: el, answ: answ });
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
      setActive([]);
      setNum(num + 1);
    } else {
      setCount(count + 1);
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
          <h1 className="display-5 mt-2 mb-2">mistakes: {count}</h1>
          <h1>{items.length - num} </h1>
          <SwitchTransition mode="out-in">
            <CSSTransition timeout={500} key={num} classNames="card_gallery_up">
              <div>
                <MyCardStatic item={items[num].item} />
                <TestOptions
                  items={items[num].answ}
                  onClick={choose}
                  active={active}
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
