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
  const collectionContent = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleRename, setVisibleRename] = useState(false);
  const [contentModal, setContentModal] = useState("");

  const route = useNavigate();
  useEffect(() => {
    setWords(BaseAPI.getWordsByCollectionAll(collectionContent.id));
  }, [collectionContent]);

  const wordInfo = (word) => {
    setVisibleModal(true);
    setContentModal(word);
  };

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
    console.log(words);
    let arr = words.filter((elem) => elem.id != word.id);
    console.log(arr);
    setWords(arr);
  };
  const RenameWin = () => {
    setVisibleRename(true);
  };

  const Rename = (newName) => {
    BaseAPI.renameCollection(newName.trim(), collectionContent.id);
    setVisibleRename(false);
    console.log(`/collections/${collectionContent.id}/${newName.trim()}`);

    route(`/collections/${collectionContent.id}/${newName.trim()}`);
  };
  const DeleteAllWords = () => {
    if (!window.confirm("Delete all words?")) return;
    BaseAPI.deleteWordOfCollection(collectionContent.id);
    setWords([]);
  };
  return (
    <div>
      <WordInfo
        visible={visibleModal}
        setVisible={setVisibleModal}
        word={contentModal}
      />
      <CollectionRename
        visible={visibleRename}
        setVisible={setVisibleRename}
        collection={collectionContent}
        onClick={Rename}
      />

      <TabPills tabsArr={["Collection menu ", "Add one word", "Add from File"]}>
        <CollectionMenu
          collectionContent={collectionContent}
          DeleteAllWords={DeleteAllWords}
          Rename={RenameWin}
        />
        <NewWordOne addWord={addWord} />
        <NewWordFile addWords={addWordsFromFile} />
      </TabPills>

      {words ? (
        <MyTable
          dataArray={words}
          namesArray={["word", "sentence", "stage"]}
          onRowClick={wordInfo}
          btnsArray={[{ name: "Delete", callback: wordDelete }]}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollectionEdit;
