import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { PopupContext } from "../../../context";
import { useGame } from "../../../hooks/useGame";
import MySpinner from "../../UI/MySpinner";
import OneCardG from "./OneCardG";
import { shuffle } from "../../../utils/arraysFunc";

const CardsGallery = () => {
  const [items, setItems] = useState();
  const [direction, setDirection] = useState(true);
  const [itemNum, setItemNum] = useState(0);
  const [anim, setShowAnim] = useState(false);
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getContent, back, isLoading, error] = useGame(setItems, shuffle);

  useEffect(() => {
    getContent();
    if (error) setPopupSettings([true, error, "error"]);
  }, []);

  const next = () => {
    if (!direction) setDirection(true);
    setShowAnim(!anim);
    setItemNum(Math.min(itemNum + 1, items.length - 1));
  };

  const prew = () => {
    if (direction) setDirection(false);
    setShowAnim(!anim);
    setItemNum(Math.max(itemNum - 1, 0));
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Button variant="dark" size="lg" onClick={back}>
        {"❰ Back"}
      </Button>
      {!isLoading && items ? (
        <div>
          {" "}
          <p>{items && itemNum + 1 + "/" + items.length}</p>
          <OneCardG anim={anim} direction={direction} item={items[itemNum]} />
          <div className="mt-5">
            <Button variant="primary" onClick={prew} disabled={itemNum === 0}>
              {"❰ PREW"}
            </Button>{" "}
            <Button
              variant="primary"
              onClick={next}
              disabled={items.length - 1 === itemNum}>
              {"NEXT ❱"}
            </Button>
          </div>
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default CardsGallery;
