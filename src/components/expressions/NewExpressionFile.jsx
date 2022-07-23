import React, { useState, useRef, useContext } from "react";
import { expressionsFromTxtFile } from "../../utils/files";
import Button from "react-bootstrap/esm/Button";
import ModalFileContent from "./ModalFileContent";
import Form from "react-bootstrap/Form";
import { PopupContext } from "../../context";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InputGroup from "react-bootstrap/InputGroup";
import BaseAPI from "../../API/BaseAPI";

const NewExpressionFile = ({ setExpressions }) => {
  const [fileContent, setFileContent] = useState();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [visible, setVisible] = useState(false);
  const inputFileName = useRef();

  const FileChange = (e) => {
    try {
      expressionsFromTxtFile(e.target.files, setFileContent);
    } catch (error) {
      inputFileName.current.value = "";
      setPopupSettings([true, error.message, "error"]);
      return;
    }
  };

  const ViewExpressions = (e) => {
    e.stopPropagation();
    if (!fileContent) setPopupSettings([true, "Please choose a file", "error"]);
    else setVisible(true);
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
    <>
      <ModalFileContent
        dataArray={fileContent}
        setVisible={setVisible}
        visible={visible}
        onClick={addToColection}
      />{" "}
      <div className="d-flex">
        <OverlayTrigger
          placement={"bottom"}
          overlay={
            <Tooltip>
              Add expressions from .txt file with semicolon as separator between
              expression and phrase. arrange the expression-phrase pair in a
              separate line.
            </Tooltip>
          }>
          <Button variant="outline-dark" onClick={ViewExpressions}>
            Add new expressions from file
          </Button>
        </OverlayTrigger>

        <InputGroup className="w-75">
          <Form.Control
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

export default NewExpressionFile;
