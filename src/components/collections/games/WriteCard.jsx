/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../context";
import { useGame } from "../../../hooks/useGame";
import MySpinner from "../../UI/MySpinner";
import { shuffle } from "../../../utils/arraysFunc";
import BackBtn from "../../UI/BackBtn/BackBtn";
import WriteCardBody from "./WriteCardBody";

const WriteCard = () => {
  const [items, setItems] = useState();

  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getContent, back, isLoading, error] = useGame(setItems, shuffle);

  useEffect(() => {
    getContent();
    if (error) setPopupSettings([true, error, "error"]);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <BackBtn size="lg" onClick={back} />
      {!isLoading && items ? <WriteCardBody items={items} /> : <MySpinner />}
    </div>
  );
};

export default WriteCard;
