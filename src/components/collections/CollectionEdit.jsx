import React from "react";
import MyTable from "../UI/table/MyTable";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import BaseAPI from "../../API/BaseAPI";
import WordInfo from "../words/WordInfo";
import TabPills from "../UI/TabPills";
import NewWordOne from "../words/NewWordOne";
import NewWordFile from "../words/NewWordFile";
import CollectionMenu from "./CollectionMenu";
import CollectionRename from "./CollectionRename";

const CollectionEdit = () => {
  const [words, setWords] = useState();
  const [dataModal, setVDataModal] = useState(false);
  const [editMode, setEditMode] = useState({
    element: null,
    col: ["name", "sentence"],
  });
  const [editedValues, setEditedValues] = useState({});
  const collectionContent = useParams();
  const route = useNavigate();

  useEffect(() => {
    setWords(BaseAPI.getWordsByCollectionAll(collectionContent.id));
  }, [collectionContent]);

  //modal content
  const modalWordInfo = (word) => {
    setVDataModal(
      <WordInfo visible={true} setVisible={setVDataModal} word={word} />
    );
  };
  const modalRenameCollection = () => {
    setVDataModal(
      <CollectionRename
        visible={true}
        setVisible={setVDataModal}
        collection={collectionContent}
        onClick={Rename}
      />
    );
  };
  const modalWordEdit = (word) => {
    const takeNewEditVal = (col, val) => {
      let obj = {};
      obj[col] = val;
      let newv = { ...editedValues, ...obj };
      setEditedValues(newv);
      console.log(editedValues);
    };
    setEditMode({
      element: word,
      col: ["word", "sentence"],
      callbackElement: takeNewEditVal,
      btnSave: [
        { name: "Save", callback: editWord },
        {
          name: "Cancel",
          callback: () => {
            route(
              `/collections/${collectionContent.id}/${collectionContent.name}`
            );
          },
        },
      ],
    });

    // setVDataModal(
    //   <WordEdit
    //     visible={true}
    //     setVisible={setVDataModal}
    //     word={word}
    //     onClick={editWord}
    //   />
    // );
  };
  //actions

  const addWord = (newWord) => {
    BaseAPI.createWord(newWord.word, newWord.sentence, collectionContent.id);
    setWords(BaseAPI.getWordsByCollectionAll(collectionContent.id));
  };
  const addWordsFromFile = (newWordArr) => {
    if (!newWordArr) return;
    BaseAPI.createWordFromArray(newWordArr, collectionContent.id);
    setWords(BaseAPI.getWordsByCollectionAll(collectionContent.id));
  };
  const wordDelete = (word) => {
    if (!window.confirm("Delete the word?")) return;
    BaseAPI.deleteWord(word.id);
    let arr = words.filter((elem) => elem.id != word.id);
    setWords(arr);
  };
  const deleteAllWords = () => {
    if (!window.confirm("Delete all words?")) return;
    BaseAPI.deleteWordOfCollection(collectionContent.id);
    setWords([]);
  };
  const Rename = (newName) => {
    BaseAPI.renameCollection(newName.trim(), collectionContent.id);
    setVDataModal(false);
    route(`/collections/${collectionContent.id}/${newName.trim()}`);
  };
  // const editWord = (id, newWord, newSentence) => {
  //   BaseAPI.editWord(id, newWord, newSentence);
  //   setVDataModal(false);
  //   route(`/collections/${collectionContent.id}/${collectionContent.name}`);
  // };
  const editWord = () => {
    if (editMode.element) return;
    let id = editMode.element.id;
    let newWord = editedValues.word ? editedValues.word : editMode.element.word;
    let newSentence = editedValues.sentence
      ? editedValues.sentence
      : editMode.element.sentence;

    BaseAPI.editWord(id, newWord, newSentence);
    setVDataModal(false);
    setEditMode({
      element: null,
      col: ["name", "sentence"],
    });
    setEditedValues({});
    route(`/collections/${collectionContent.id}/${collectionContent.name}`);
  };
  console.log(editMode);

  return (
    <div className="mt-5">
      {dataModal ? dataModal : <></>}

      <TabPills tabsArr={["Collection menu ", "Add one word", "Add from File"]}>
        <CollectionMenu
          collectionContent={collectionContent}
          DeleteAllWords={deleteAllWords}
          Rename={modalRenameCollection}
        />
        <NewWordOne addWord={addWord} />
        <NewWordFile addWords={addWordsFromFile} />
      </TabPills>

      {words ? (
        <MyTable
          dataArray={words}
          namesArray={["word", "sentence", "stage"]}
          onRowClick={editMode.element ? "" : modalWordInfo}
          editMode={editMode}
          btnsArray={[
            { name: "Edit", callback: modalWordEdit },
            { name: "Delete", callback: wordDelete },
          ]}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollectionEdit;
