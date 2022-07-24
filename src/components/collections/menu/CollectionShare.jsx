import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../../UI/input/MyInputGroup";
// import MyModal from "../../UI/MyModal";
import MyTable from "../../UI/table/MyTable";
import { PopupContext } from "../../../context";
import MyModal from "../../UI/MyModal";
import BaseExtraAPI from "../../../API/BaseExtraAPI";

const CollectionShare = ({ colObj, setVisible, visible }) => {
  const [note, setNote] = useState("");
  const [contentList, setContentList] = useState(colObj.content);
  const [name, setName] = useState(colObj.collection.name);
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const notShare = (expression) => {
    const id = expression.id;
    const arr = contentList.filter((item) => item.id !== id);
    setContentList(arr);
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

  return (
    <MyModal
      title="Share the collection"
      setVisible={setVisible}
      visible={visible}>
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
          onClick={() => {
            share(note, name, contentList);
          }}>
          Share
        </Button>
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
