import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../UI/input/MyInputGroup";
import MyModal from "../UI/MyModal";
import MyTable from "../UI/table/MyTable";
import BaseAPI from "../../API/BaseAPI";

const CollectionShare = (props) => {
  const [name, setName] = useState(props.collection.collectionContent.name);
  const [lang, setLang] = useState("");
  const [wordList, setWordList] = useState(props.collection.words);
  const notShare = (word) => {
    const id = word.id;
    const arr = wordList.filter((item) => item.id != id);
    setWordList(arr);
  };

  const share = async (lang, name, wordList) => {
    let result = await BaseAPI.CreatePublicCollection(
      lang,
      name.trim(),
      wordList
    );
    props.setVisible(false);
    if (result)
      props.setPopup([true, "the collection has been shared", "success"]);
    else props.setPopup([true, "something goes wrong", "error"]);
  };

  return (
    <MyModal
      title="Share the collection"
      setVisible={props.setVisible}
      visible={props.visible}
    >
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
          share(lang, name, wordList);
        }}
      >
        Share
      </Button>
      <MyTable
        dataArray={wordList}
        namesArray={["word", "sentence"]}
        btnsArray={[{ name: "X", callback: notShare }]}
      />
    </MyModal>
  );
};

export default CollectionShare;
