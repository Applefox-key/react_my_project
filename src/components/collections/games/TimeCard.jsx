import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { PopupContext } from "../../../context";
import { useGame } from "../../../hooks/useGame";
import MySpinner from "../../UI/MySpinner";
import OneCardG from "./OneCardG";
import { shuffle } from "../../../utils/arraysFunc";
import MyInputGroup from "../../UI/input/MyInputGroup";

const TimeCard = () => {
  const [items, setItems] = useState();
  const [oneDelay, setOneDelay] = useState(1.5);
  // const [card, setCard] = useState({ flip: false, num: 0, anim: false });
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getContent, back, isLoading, error] = useGame(setItems, shuffle);

  useEffect(() => {
    getContent();
    if (error) setPopupSettings([true, error, "error"]);
  }, []);

  const start = () => {
    items.forEach((element, i) => {
      setTimeout(() => {
        // setCard({ ...card, flip: true });
        setFlip(true);
        console.log(1000 * oneDelay * (i * 2 + 1));
        console.log("flip " + i);
      }, 1000 * oneDelay * (i * 2 + 1));

      if (i + 1 < items.length)
        setTimeout(() => {
          // setCard({ flip: false, num: i, anim: i });
          setShowAnim(i % 2 === 0);
          setFlip(false);
          setNum(i + 1);
          //   console.log(1000 * oneDelay * (i * 2 + 2));
          //   console.log("next " + i + 1);
          //   console.log((i + 1) % 2 === 0);
        }, 1000 * oneDelay * (i * 2 + 2));
    });

    //
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Button variant="dark" size="lg" onClick={back}>
        {"❰ Back"}
      </Button>
      <div className="center-div">
        <MyInputGroup
          label="delay in sec"
          value={oneDelay}
          type={"Number"}
          onChange={(e) => {
            setOneDelay(e.target.value);
          }}
        />
      </div>
      {!isLoading && items ? (
        <div>
          {" "}
          <p>{items && num + 1 + "/" + items.length}</p>
          <OneCardG
            anim={anim}
            direction={true}
            item={items[num]}
            flip={flip}
          />
          <div className="mt-5">
            <Button variant="primary" onClick={start} disabled={num !== 0}>
              {"START"}
            </Button>{" "}
            {/* <Button variant="primary" onClick={prew} disabled={itemNum === 0}>
              {"❰ PREW"}
            </Button>{" "}
            <Button
              variant="primary"
              onClick={next}
              disabled={items.length - 1 === itemNum}>
              {"NEXT ❱"}
            </Button> */}
          </div>
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default TimeCard;
