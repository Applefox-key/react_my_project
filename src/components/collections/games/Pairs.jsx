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
  const [itemsV, setItemsV] = useState([]);
  const [active, setActive] = useState();
  const [count, setCount] = useState(0);

  const contentParts = (arr = null) => {
    let newArr = arr ? shuffle([...arr]) : [...items];
    if (!newArr.length) return [[], []];
    let leng = newArr.length === 7 ? 7 : Math.min(6, newArr.length);
    let part = newArr.splice(0, leng);
    setItems(newArr);
    let a1 = shuffle([...part]);
    let a2 = shuffle([...part]);
    return [a1, a2];
  };
  const [getContent, back, isLoading, error] = useGame(setItemsV, contentParts);
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
        let arr1 = delId([...itemsV[0]], num1);
        let arr2 = delId([...itemsV[1]], num1);
        if (arr1.length === 0) setItemsV(contentParts());
        else setItemsV([arr1, arr2]);
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
          <h1>{items.length + itemsV[0].length}</h1>
          <div className={cl.pairs_container}>
            <PairPart items={itemsV} onClick={choose} num={1} active={active} />
            <PairPart items={itemsV} onClick={choose} num={2} active={active} />
          </div>
        </div>
      )}
    </>
  );
};

export default Pairs;
