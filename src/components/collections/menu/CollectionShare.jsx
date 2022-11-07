import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../../UI/input/MyInputGroup";
// import MyModal from "../../UI/MyModal";
import MyTable from "../../UI/table/MyTable";
import { PopupContext } from "../../../context";
import MyModal from "../../UI/MyModal";
import BaseExtraAPI from "../../../API/BaseExtraAPI";

const CollectionShare = ({ colObj, setVisible }) => {
  const [note, setNote] = useState("");
  const [textFile, settextFile] = useState(null);
  const [contentList, setContentList] = useState(colObj.content);
  const [name, setName] = useState(colObj.collection.name);
  // eslint-disable-next-line no-unused-vars
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const notShare = (expression) => {
    const id = expression.id;
    const arr = contentList.filter((item) => item.id !== id);
    setContentList(arr);
  };

  const createFile = (note, name, trainingList) => {
    const content = trainingList
      .map((el) => el.question + ";" + el.answer + ";" + el.note + ";")
      .join("\n");
    console.log(content);
    console.log(typeof content);

    const data = new Blob([content], { type: "text/plain" });
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    settextFile(window.URL.createObjectURL(data));
  };

  const share = async (note, name, trainingList) => {
    try {
      await BaseExtraAPI.CreatePublicCollection(
        note,
        name.trim(),
        trainingList
      );

      setVisible(false);
      setPopupSettings([true, "the collection has been shared", "success"]);
    } catch (error) {
      setPopupSettings([true, error, "error"]);
    }
  };
  console.log(contentList);
  console.log(!contentList);

  return (
    <MyModal
      title="Share the collection"
      setShowModal={setVisible}
      // visible={true}
      showmodal={true}>
      <div>
        <MyInputGroup
          label="Collection name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{" "}
        <MyInputGroup
          label="Note"
          type="text"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <Button
          disabled={!contentList}
          onClick={() => {
            share(note, name, contentList);
          }}>
          Share public collection
        </Button>{" "}
        <Button
          disabled={!contentList}
          onClick={() => {
            createFile(note, name, contentList);
          }}>
          Create file for download
        </Button>
        {textFile ? (
          <a download={name} href={textFile}>
            Download
          </a>
        ) : (
          <></>
        )}
        <MyTable
          dataArray={contentList}
          namesArray={["question", "answer", "note"]}
          btnsArray={[{ name: "X", callback: notShare }]}
        />
      </div>
    </MyModal>
  );
};

export default CollectionShare;
