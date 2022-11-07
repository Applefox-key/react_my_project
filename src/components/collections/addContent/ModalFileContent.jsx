import React, { useContext, useRef } from "react";
import MyModal from "../../UI/MyModal";
import { useState } from "react";
import { PopupContext } from "../../../context";
import Popup from "../../UI/popup/Popup";
import BaseExtraAPI from "../../../API/BaseExtraAPI";
import { contentFromTxtFile } from "../../../utils/files";
import ModalFileContentBtns from "./ModalFileContentBtns";
import MyTable from "../../UI/table/MyTable";
import { Button } from "react-bootstrap";

const ModalFileContent = ({ setVisible, setContent, colId }) => {
  const [fileContent, setFileContent] = useState();
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const inputFileName = useRef();

  const FileChange = async (e) => {
    try {
      await contentFromTxtFile(e.target.files[0], setFileContent);
    } catch (error) {
      inputFileName.current.value = "";
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  const addToColection = async () => {
    if (!fileContent) return;
    try {
      await BaseExtraAPI.createContentFromArray(fileContent, colId);
      setContent(await BaseExtraAPI.getContent(colId));

      setFileContent([]);
      inputFileName.current.value = "";
      setVisible(false);
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
      title={"Add new content from .txt file"}>
      {" "}
      <div>
        <Popup />{" "}
      </div>
      <ModalFileContentBtns
        ViewExpressions={addToColection}
        inputFileName={inputFileName}
        FileChange={FileChange}
      />
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
              namesArray={["question", "answer", "note"]}
            />
          </>
        )}
      </div>
    </MyModal>
  );
};

export default ModalFileContent;
