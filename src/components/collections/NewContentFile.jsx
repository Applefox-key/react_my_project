import React, { useState, useRef, useContext } from "react";
import { contentFromFile } from "../../utils/files";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { PopupContext } from "../../context";
import ModalFileList from "./ModalFileList";

const NewContentFile = ({ addContent }) => {
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
    contentFromFile(files, setFileContent);
  };

  const ViewExpressions = (e) => {
    e.stopPropagation();
    if (!fileContent) return;
    setVisible(true);
  };

  const addToColection = () => {
    addContent(fileContent);
    setVisible(false);
    setFileContent([]);
    inputFileName.current.value = "";
  };

  return (
    <>
      <ModalFileList
        dataArray={fileContent}
        setVisible={setVisible}
        visible={visible}
        onClick={addToColection}
      />

      <Form.Control
        className="mt-1"
        ref={inputFileName}
        type="file"
        onChange={FileChange}
      />

      <div className="d-flex p-2  justify-content-around">
        <p className="text-black-50">
          Add the content from .txt file with semicolon as separator between
          side1, side2 and the tag. arrange the each set in a separate line
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

export default NewContentFile;
