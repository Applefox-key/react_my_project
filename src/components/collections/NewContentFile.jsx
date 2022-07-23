import React, { useState, useRef, useContext } from "react";
import { contentFromFile, contentFromTxtFile } from "../../utils/files";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { PopupContext } from "../../context";
import ModalFileList from "./ModalFileList";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import BaseExtraAPI from "../../API/BaseExtraAPI";

const NewContentFile = ({ setContent, pageParam }) => {
  const [fileContent, setFileContent] = useState();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [visible, setVisible] = useState(false);
  const inputFileName = useRef();

  const FileChange = (e) => {
    debugger;
    try {
      contentFromTxtFile(e.target.files[0], setFileContent);
    } catch (error) {
      inputFileName.current.value = "";
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  const ViewExpressions = (e) => {
    e.stopPropagation();
    if (!fileContent) return;
    setVisible(true);
  };

  const addToColection = async () => {
    if (!fileContent) return;
    try {
      await BaseExtraAPI.createContentFromArray(fileContent, pageParam.id);
      setContent(await BaseExtraAPI.getContent(pageParam.id));
      setVisible(false);
      setFileContent([]);
      inputFileName.current.value = "";
    } catch (error) {
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  return (
    <>
      <ModalFileList
        dataArray={fileContent}
        setVisible={setVisible}
        visible={visible}
        onClick={addToColection}
      />

      <div className="d-flex">
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip>
              Add the content from .txt file with semicolon as separator between
              question, answer and the note. arrange the each set in a separate
              line
            </Tooltip>
          }>
          <Button
            size="lg"
            className="mt-1"
            variant="outline-dark"
            onClick={ViewExpressions}>
            Add new content from file
          </Button>
        </OverlayTrigger>
        <InputGroup className="w-75">
          <Form.Control
            size="lg"
            className="mt-1"
            ref={inputFileName}
            type="file"
            onChange={FileChange}
          />
        </InputGroup>
      </div>
    </>
  );
};

export default NewContentFile;
