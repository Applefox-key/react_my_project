import React, { useContext } from "react";
import MyModal from "../../UI/MyModal";
import { contentFromText } from "../../../utils/texts";
import { useState } from "react";
import { PopupContext } from "../../../context";
import Popup from "../../UI/popup/Popup";
import ModalPasteContentBtns from "./ModalPasteContentBtns";
import ModalPasteContentBody from "./ModalPasteContentBody";
import BaseExtraAPI from "../../../API/BaseExtraAPI";

const ModalPasteContent = ({ setVisible, setContent, pageParam }) => {
  const [dataArray, setDataArray] = useState();
  const [check, setCheck] = useState(true);
  const [dataString, setDataString] = useState("");

  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  const read = (sep) => {
    contentFromText(dataString, setDataArray, setPopupSettings, check, sep);
  };

  const back = () => {
    setDataArray();
  };

  const add = async () => {
    if (!dataArray) return;
    try {
      await BaseExtraAPI.createContentFromArray(
        dataArray,
        pageParam.collection.id
      );
      setDataString("");
      setDataArray(null);
      setVisible(false);
      setContent(await BaseExtraAPI.getContent(pageParam.collection.id));
    } catch (error) {
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  return (
    <MyModal
      showmodal={true}
      setShowModal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Adding"}>
      <ModalPasteContentBtns
        dataArray={dataArray}
        actions={{ read: read, add: add, back: back }}
        options={{
          check: check,
          setCheck: setCheck,
        }}
      />
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
