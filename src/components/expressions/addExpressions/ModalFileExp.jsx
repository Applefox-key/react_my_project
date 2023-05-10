import React, { useState, useRef } from "react";
import Popup from "../../UI/popup/Popup";
import { Button } from "react-bootstrap";
import { expressionsFromTxtFile } from "../../../utils/files";
import MyModal from "../../UI/MyModal/MyModal";
import BaseAPI from "../../../API/BaseAPI";
import ModalFileExpBtns from "./ModalFileExpBtns";
import { usePopup } from "../../../hooks/usePopup";
import NewExpressionsList from "./NewExpressionsList";

const ModalFileExp = ({ setVisible, setExpressions }) => {
  const [fileContent, setFileContent] = useState();
  const setPopup = usePopup();
  const inputFileName = useRef();

  const FileChange = async (e) => {
    try {
      await expressionsFromTxtFile(e.target.files[0], setFileContent);
    } catch (error) {
      inputFileName.current.value = "";
      setPopup.error(error.message);
      return;
    }
  };

  const addToColection = async () => {
    if (!fileContent) return;
    try {
      await BaseAPI.createExpressionFromArray(fileContent);
      let res = await BaseAPI.getTrainingListAll();
      setPopup.success("The changes have been saved");
      setExpressions(res);

      setVisible(false);
      setFileContent([]);
      inputFileName.current.value = "";
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

            <NewExpressionsList
              dataArr={fileContent}
              setDataArr={setFileContent}
            />
          </>
        )}
      </div>
    </MyModal>
  );
};

export default ModalFileExp;
