/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { PopupContext } from "../../../context";
import { useGame } from "../../../hooks/useGame";
import { shuffle } from "../../../utils/arraysFunc";
import Result from "../../UI/card/Result";
import MySpinner from "../../UI/MySpinner";
import TestBody from "./TestBody";

const TestCard = () => {
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [items, setItems] = useState();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button variant="dark" size="lg" onClick={back}>
        {"❰ Back"}
      </Button>

      {isLoading || !items ? (
        <MySpinner />
      ) : (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <TestBody items={items} />
        </CSSTransition>
      )}
    </div>
  );
};

export default TestCard;
