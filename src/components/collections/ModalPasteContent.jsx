import React, { useContext } from "react";
import MyModal from "../UI/MyModal";
import { contentFromText } from "../../utils/texts";
import { useState } from "react";
import { PopupContext } from "../../context";
import Popup from "../UI/popup/Popup";
import ModalPasteContentBtns from "./ModalPasteContentBtns";
import ModalPasteContentBody from "./ModalPasteContentBody";
import BaseExtraAPI from "../../API/BaseExtraAPI";

const ModalPasteContent = ({ visible, setVisible, onClick, pageParam }) => {
  const [dataArray, setDataArray] = useState();
  const [check, setCheck] = useState(true);
  const [dataString, setDataString] = useState("");
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const read = () => {
    contentFromText(dataString, setDataArray, setPopupSettings, check);
  };

  const back = () => {
    setDataArray();
  };

  const add = async () => {
    if (!dataArray) return;
    try {
      await BaseExtraAPI.createContentFromArray(dataArray, pageParam.id);
      onClick(await BaseExtraAPI.getContent(pageParam.id));
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
        <ModalPasteContentBtns
          dataArray={dataArray}
          read={read}
          add={add}
          back={back}
          check={check}
          setCheck={setCheck}
        />
      }>
      <div className="modal-h50">
        <div>
          <Popup />{" "}
        </div>

        <ModalPasteContentBody
          dataArr={dataArray}
          dataStr={dataString}
          setDataStr={setDataString}
          setDataArr={setDataArray}
        />
      </div>
    </MyModal>
  );
};

export default ModalPasteContent;
