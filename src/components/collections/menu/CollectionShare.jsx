import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../../UI/input/MyInputGroup";
// import MyModal from "../../UI/MyModal";
import MyTable from "../../UI/table/MyTable";
import BaseAPI from "../../../API/BaseAPI";

const CollectionShare = (props) => {
  const [name, setName] = useState(props.collection.collectionContent.name);
  const [lang, setLang] = useState("");
  const [trainingList, setTrainingList] = useState(props.collection.content);
  const notShare = (expression) => {
    const id = expression.id;
    const arr = trainingList.filter((item) => item.id != id);
    setTrainingList(arr);
  };

  const share = async (lang, name, trainingList) => {
    let result = await BaseAPI.CreatePublicCollection(
      lang,
      name.trim(),
      trainingList
    );
    props.setVisible(false);
    if (result)
      props.setPopup([true, "the collection has been shared", "success"]);
    else props.setPopup([true, "something goes wrong", "error"]);
  };

  return (
    // <MyModal
    //   title="Share the collection"
    //   setVisible={props.setVisible}
    //   visible={props.visible}
    // >
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
        label="Language"
        type="text"
        value={lang}
        onChange={(e) => {
          setLang(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          share(lang, name, trainingList);
        }}
      >
        Share
      </Button>
      <MyTable
        dataArray={trainingList}
        namesArray={["expression", "phrase"]}
        btnsArray={[{ name: "X", callback: notShare }]}
      />
    </div>
  );
};

export default CollectionShare;
