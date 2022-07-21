import React, { useState } from "react";
import { useEffect } from "react";
import { useGame } from "../../../hooks/useGame";
import MySpinner from "../../UI/MySpinner";
import cl from "./Games.module.css";
import PairPart from "./PairPart";
import { shuffle, delId } from "../../../utils/arraysFunc";
import Button from "react-bootstrap/esm/Button";

const Pairs = () => {
  const [items, setItems] = useState();
  const [active, setActive] = useState();
  const [count, setCount] = useState(0);

  const addAtr = (arr) => {
    let arr1 = shuffle([...arr]);
    let arr2 = shuffle([...arr]);
    return [arr1, arr2];
  };

  const [getContent, back, isLoading, error] = useGame(setItems, addAtr);
  useEffect(() => {
    getContent();
  }, []);

  const choose = (e) => {
    if (!active) setActive(e.target.id);
    else {
      let num1 = active.split("&")[0];
      let num2 = e.target.id.split("&")[0];

      if (active === e.target.id) setActive("");
      else if (num1 === num2) {
        let arr1 = delId([...items[0]], num1);
        let arr2 = delId([...items[1]], num1);
        setItems([arr1, arr2]);
      } else setCount(count + 1);
      setActive("");
    }
  };

  return (
    <>
      <Button variant="dark" size="lg" onClick={back}>
        {"❰ Back"}
      </Button>
      {isLoading || !items ? (
        <MySpinner />
      ) : (
        <div>
          <h1 className="display-5 mt-2 mb-2">mistakes: {count}</h1>

          <div className={cl.main_container}>
            <PairPart items={items} onClick={choose} num={1} active={active} />
            <PairPart items={items} onClick={choose} num={2} active={active} />
          </div>
        </div>
      )}
    </>
  );
};

export default Pairs;
