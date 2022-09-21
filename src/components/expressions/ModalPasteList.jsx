import React, { useContext } from "react";
import MyModal from "../UI/MyModal";
import { expressionsFromText } from "../../utils/texts";
import { useState } from "react";
import { PopupContext } from "../../context";
import Popup from "../UI/popup/Popup";
import ModalPasteBtns from "./addExpressions/ModalPasteBtns";
import ModalPasteBody from "./ModalPasteBody";
import BaseAPI from "../../API/BaseAPI";

const ModalCopyPasteList = ({ visible, setVisible, onClick }) => {
  const [dataArray, setDataArray] = useState();
  const [dataString, setDataString] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const read = () => {
    expressionsFromText(dataString, setDataArray, setPopupSettings);
  };

  const back = () => {
    setDataArray();
  };

  const addExpressions = async () => {
    if (!dataArray) return;
    try {
      await BaseAPI.createExpressionFromArray(dataArray);
      onClick(await BaseAPI.getTrainingListAll());
      setDataString("");
      setDataArray(null);
      setVisible(false);
    } catch (error) {
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  return (
    <MyModal
      visible={visible}
      setVisible={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Adding"}
      subtitle={
        <ModalPasteBtns
          dataArray={dataArray}
          read={read}
          add={addExpressions}
          back={back}
        />
      }>
      <div className="modal-h50">
        <div>
          <Popup />{" "}
        </div>
        <ModalPasteBody
          dataArr={dataArray}
          dataStr={dataString}
          setDataStr={setDataString}
          setDataArr={setDataArray}
        />
      </div>
    </MyModal>
  );
};

export default ModalCopyPasteList;
