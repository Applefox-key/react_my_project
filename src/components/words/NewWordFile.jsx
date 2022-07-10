import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import MyTable from "../UI/table/MyTable";
import MyModal from "../UI/MyModal";
import { useRef } from "react";
import { wordsFromFiles } from "../../utils/files";

const NewWordFile = ({ addWords }) => {
  const [fileContent, setFileContent] = useState();
  const [visible, setVisible] = useState(false);
  const inputFileName = useRef();

  const FileChange = (e) => {
    let userFile = e.target;
    const [files] = userFile.files;
    // asf(files);
    wordsFromFiles(files, setFileContent);
  };

  const ViewAndAddWords = (e) => {
    e.stopPropagation();
    if (!fileContent) return;
    setVisible(true);
  };

  return (
    <>
      <MyModal
        title={"Import from file"}
        subtitle={"New words:"}
        visible={visible}
        setVisible={setVisible}
      >
        <MyTable dataArray={fileContent} namesArray={["word", "sentence"]} />

        <Button
          onClick={() => {
            addWords(fileContent);
            setVisible(false);
            setFileContent([]);
            inputFileName.current.value = "";
          }}
        >
          Add
        </Button>
      </MyModal>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control ref={inputFileName} type="file" onChange={FileChange} />
        <div className="d-flex p-2 justify-content-around">
          <p className="text-black-50">
            Add words from .txt file with semicolon as separator between word
            and sentence. arrange the word-sentence pair in a separate line
          </p>
          <Button
            className="my-2"
            variant="outline-dark"
            onClick={ViewAndAddWords}
          >
            Add new words from file
          </Button>
        </div>
      </Form.Group>
    </>
  );
};

export default NewWordFile;
