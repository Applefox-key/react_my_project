import React, { useState, useRef, useContext } from "react";
import { expressionsFromFiles } from "../../utils/files";
import Button from "react-bootstrap/esm/Button";
import ModalTrainingList from "./ModalTrainingList";
import Form from "react-bootstrap/Form";
import { PopupContext } from "../../context";

const NewExpressionFile = ({ addExpressions }) => {
  const [fileContent, setFileContent] = useState();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [visible, setVisible] = useState(false);
  const inputFileName = useRef();

  const FileChange = (e) => {
    let userFile = e.target;
    const [files] = userFile.files;
    if (files.type !== "text/plain") {
      inputFileName.current.value = "";
      setPopupSettings([true, "wrong file type", "error"]);
      return;
    }
    expressionsFromFiles(files, setFileContent);
  };

  const ViewExpressions = (e) => {
    e.stopPropagation();
    if (!fileContent) return;
    setVisible(true);
  };

  const addExpressionsToColection = () => {
    addExpressions(fileContent);
    setVisible(false);
    setFileContent([]);
    inputFileName.current.value = "";
  };

  return (
    <>
      <ModalTrainingList
        dataArray={fileContent}
        setVisible={setVisible}
        visible={visible}
        onClick={addExpressionsToColection}
      />

      <Form.Control
        className="mt-1"
        ref={inputFileName}
        type="file"
        onChange={FileChange}
      />

      <div className="d-flex p-2  justify-content-around">
        <p className="text-black-50">
          Add expressions from .txt file with semicolon as separator between
          expression and phrase. arrange the expression-phrase pair in a
          separate line
        </p>
        <Button
          className="mt-1"
          variant="outline-dark"
          onClick={ViewExpressions}
        >
          Add new expressions from file
        </Button>
      </div>
    </>
  );
};

export default NewExpressionFile;
