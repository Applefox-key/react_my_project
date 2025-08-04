import React, { useState, useRef } from "react";
import Popup from "../../UI/popup/Popup";
import { Button } from "react-bootstrap";
import { expressionsFromTxtFile } from "../../../utils/files";
import MyModal from "../../UI/MyModal/MyModal";
import BaseAPI from "../../../API/BaseAPI";
import ModalFileExpBtns from "./ModalFileExpBtns";
import { usePopup } from "../../../hooks/usePopup";
import NewExpressionsList from "./NewExpressionsList";
import SelectLabel from "../../Labels/SelectLabel";
import cl from "./addExpressions.module.scss";
import NewExpressionsPrew from "./NewExpressionsPrew";
const ModalFileExp = ({ setVisible, setExpressions }) => {
  const [fileContent, setFileContent] = useState(null);
  const [contentPrew, setContentPrew] = useState(null);
  const [fileLabel, setFileLabel] = useState({
    id: "",
    name: "",
  });
  const setPopup = usePopup();
  const inputFileName = useRef();

  const fileChange = async (e) => {
    try {
      await expressionsFromTxtFile(e.target.files[0], setContentPrew);
      setFileContent(null);
    } catch (error) {
      inputFileName.current.value = "";
      setPopup.error(error.message);
      return;
    }
  };

  const addToColection = async () => {
    if (!fileContent) return;
    try {
      const history = [{ action: "add", date: new Date() }];
      const content = fileContent.map((el) => {
        return {
          ...el,
          history: history,
          ...(fileLabel.id && { labelid: fileLabel.id }),
        };
      });

      await BaseAPI.createExpressionFromArray(content);
      let res = await BaseAPI.getTrainingListAll();
      setPopup.success("The changes have been saved");
      setExpressions(res);
      // setContentPrew(res);
      setVisible(false);
      setFileContent(null);
      inputFileName.current.value = "";
    } catch (error) {
      setPopup.error(error.message);
      return;
    }
  };
  const contentFromPrew = (prew) => {
    setContentPrew(null);
    setFileContent(prew);
  };
  const back = () => {
    const cont = fileContent.map((el) => [el.expression, el.phrase, el.note]);
    setContentPrew(cont);
    setFileContent(null);
  };
  return (
    <MyModal
      showmodal={true}
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Add new content from .txt file"}>
      <div>
        <Popup />
      </div>
      {!fileContent && (
        <ModalFileExpBtns
          inputFileName={inputFileName}
          fileChange={fileChange}
        />
      )}
      <div className={["modal-h50", cl.fileModal].join(" ")}>
        {!!fileContent && (
          <>
            <div className={cl.fileModalBtns}>
              <div>
                <Button
                  size="lg"
                  className="mt-1"
                  variant="outline-secondary"
                  onClick={() => setVisible(false)}>
                  Calcel
                </Button>{" "}
                <Button
                  size="lg"
                  className="mt-1"
                  variant="outline-secondary"
                  onClick={back}>
                  Back
                </Button>{" "}
              </div>
              <div className={cl.labelbox}>
                <SelectLabel
                  onSelect={setFileLabel}
                  colCat={fileLabel}
                  formForSet
                />
              </div>
              <Button
                size="lg"
                className="mt-1"
                variant="outline-secondary"
                onClick={addToColection}>
                Add content
              </Button>
            </div>
          </>
        )}
        {!!contentPrew && (
          <NewExpressionsPrew
            setSelectedContent={contentFromPrew}
            dataArray={contentPrew}
          />
        )}
        {!!fileContent && (
          <NewExpressionsList
            dataArr={fileContent}
            setDataArr={setFileContent}
            setVisible={setVisible}
          />
        )}
      </div>
    </MyModal>
  );
};

export default ModalFileExp;
