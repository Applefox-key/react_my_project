import React, { useContext, useRef } from "react";

import { useState } from "react";
import { PopupContext } from "../../../context";
import Popup from "../../UI/popup/Popup";
import MyTable from "../../UI/table/MyTable";
import { Button } from "react-bootstrap";
import { expressionsFromTxtFile } from "../../../utils/files";
import MyModal from "../../UI/MyModal";
import BaseAPI from "../../../API/BaseAPI";
import ModalFileExpBtns from "./ModalFileExpBtns";

const ModalFileExp = ({ setVisible, setExpressions }) => {
  const [fileContent, setFileContent] = useState();
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  // const [visible, setVisible] = useState(false);
  const inputFileName = useRef();

  const FileChange = async (e) => {
    try {
      await expressionsFromTxtFile(e.target.files[0], setFileContent);
    } catch (error) {
      inputFileName.current.value = "";
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  const addToColection = async () => {
    if (!fileContent) return;
    try {
      await BaseAPI.createExpressionFromArray(fileContent);
      setExpressions(await BaseAPI.getTrainingListAll());
      setVisible(false);
      setFileContent([]);
      inputFileName.current.value = "";
    } catch (error) {
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  return (
    <MyModal
      visible={true}
      setVisible={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Add new content from .txt file"}>
      {" "}
      <div>
        <Popup />{" "}
      </div>
      <ModalFileExpBtns inputFileName={inputFileName} FileChange={FileChange} />
      <div className="modal-h50">
        {!fileContent ? (
          <></>
        ) : (
          <>
            <Button
              size="lg"
              className="mt-1"
              variant="outline-secondary"
              onClick={addToColection}>
              Add the content
            </Button>
            <MyTable
              dataArray={fileContent}
              namesArray={["expression", "phrase"]}
            />
          </>
        )}
      </div>
    </MyModal>
  );
};

export default ModalFileExp;
