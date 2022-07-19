import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";
import OneCardG from "./OneCardG";

const CardsGallery = () => {
  const pageParam = useParams();
  const [items, setItems] = useState();
  const [direction, setDirection] = useState(true);
  const [itemNum, setItemNum] = useState(0);
  const [anim, setShowAnim] = useState(false);
  const router = useNavigate();
  const [getContent, isLoading, error] = useQuery(async () => {
    const content = await BaseExtraAPI.getContent(pageParam.id);
    setItems(content);
  });

  useEffect(() => {
    getContent();
  }, [pageParam]);

  const back = () => {
    router(`/collections/${pageParam.id}/${pageParam.name}`);
  };

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
    <div>
      <Button variant="secondary" onClick={back}>
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
              disabled={items.length - 1 === itemNum}
            >
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
{
  /* <>
<div
  className="my-3"
  style={{ display: direction ? "block" : "none" }}
>
  <SwitchTransition mode="out-in">
    <CSSTransition
      key={!anim}
      timeout={500}
      classNames="card_gallery"
    >
      <MyCard item={items[itemNum]} />
    </CSSTransition>
  </SwitchTransition>
</div>
<div
  className="my-3"
  style={{ display: !direction ? "block" : "none" }}
>
  <SwitchTransition mode="out-in">
    <CSSTransition
      key={anim}
      timeout={500}
      classNames="card_gallery_back"
    >
      <MyCard item={items[itemNum]} />
    </CSSTransition>
  </SwitchTransition>
</div>
</> */
}
