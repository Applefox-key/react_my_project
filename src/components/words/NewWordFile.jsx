import React, { useState, useRef, useContext } from "react";
import { wordsFromFiles } from "../../utils/files";
import Button from "react-bootstrap/esm/Button";
import ModalWordsList from "./ModalWordList";
import Form from "react-bootstrap/Form";
import { PopupContext } from "../../context";

const NewWordFile = ({ addWords }) => {
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
    wordsFromFiles(files, setFileContent);
  };

  const ViewWords = (e) => {
    e.stopPropagation();
    if (!fileContent) return;
    setVisible(true);
  };

  const addWordsToColection = () => {
    addWords(fileContent);
    setVisible(false);
    setFileContent([]);
    inputFileName.current.value = "";
  };

  return (
    <>
      <ModalWordsList
        dataArray={fileContent}
        setVisible={setVisible}
        visible={visible}
        onClick={addWordsToColection}
      />

      <Form.Control
        className="mt-1"
        ref={inputFileName}
        type="file"
        onChange={FileChange}
      />

      <div className="d-flex p-2  justify-content-around">
        <p className="text-black-50">
          Add words from .txt file with semicolon as separator between word and
          sentence. arrange the word-sentence pair in a separate line
        </p>
        <Button className="mt-1" variant="outline-dark" onClick={ViewWords}>
          Add new words from file
        </Button>
      </div>
    </>
  );
};

export default NewWordFile;
