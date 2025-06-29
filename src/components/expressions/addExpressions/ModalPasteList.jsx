import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import { phrasessFromText } from "../../../utils/texts";
import { useState } from "react";
import Popup from "../../UI/popup/Popup";
import ModalPasteBtns from "./ModalPasteBtns";
import ModalPasteBody from "./ModalPasteBody";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";

const ModalPasteList = ({ setVisible, onClick }) => {
  const [dataArray, setDataArray] = useState();
  const [dataString, setDataString] = useState("");
  const setPopup = usePopup();
  const read = () => {
    phrasessFromText(dataString, setDataArray, setPopup.advice);
  };

  const back = (e, close = false) => {
    if (close) setVisible(false);
    else setDataArray();
  };

  const addExpressions = async () => {
    if (!dataArray) {
      setPopup.error("Something goes wrong....");
      return;
    }
    try {
      await BaseAPI.createExpressionFromArray(dataArray);
      onClick(await BaseAPI.getTrainingListAll());
      setDataString("");
      setDataArray(null);
      setVisible(false);
    } catch (error) {
      setPopup.error(error.message);
      return;
    }
  };

  return (
    <MyModal
      showmodal={true}
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Adding"}
      bodyCl="visibleO"
      subtitle={
        <ModalPasteBtns
          dataArray={dataArray}
          read={read}
          add={addExpressions}
          back={back}
          setDataArr={setDataArray}
        />
      }>
      {/* <ModalPasteBtns
        dataArray={dataArray}
        read={read}
        add={addExpressions}
        back={back}
        setDataArr={setDataArray}
      /> */}
      <Popup />
      <ModalPasteBody
        dataArr={dataArray}
        dataStr={dataString}
        setDataStr={setDataString}
        setDataArr={setDataArray}
      />
    </MyModal>
  );
};

export default ModalPasteList;
