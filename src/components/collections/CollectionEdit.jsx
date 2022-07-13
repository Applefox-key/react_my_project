import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import CollectionRename from "./CollectionRename";
import NewWordFile from "../words/NewWordFile";
import CollectionMenu from "./CollectionMenu";
import NewWordOne from "../words/NewWordOne";
import MyTable from "../UI/table/MyTable";
import WordInfo from "../words/WordInfo";
import WordEdit from "../words/WordEdit";
import MySpinner from "../UI/MySpinner";
import BaseAPI from "../../API/BaseAPI";
import TabPills from "../UI/TabPills";

const CollectionEdit = () => {
  const [words, setWords] = useState();
  const [dataModal, setVDataModal] = useState(false);
  const collectionContent = useParams();
  const route = useNavigate();

  const [getWord, isLoading, error] = useQuery(async () => {
    const words = await BaseAPI.getWordsByCollectionAll(collectionContent.id);
    setWords(words);
  });

  useEffect(() => {
    getWord();
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
    setVDataModal(
      <WordEdit
        visible={true}
        setVisible={setVDataModal}
        word={word}
        onClick={editWord}
      />
    );
  };
  //actions

  const addWord = async (newWord) => {
    await BaseAPI.createWord(
      newWord.word,
      newWord.sentence,
      collectionContent.id
    );
    setWords(await BaseAPI.getWordsByCollectionAll(collectionContent.id));
  };
  const addWordsFromFile = async (newWordArr) => {
    if (!newWordArr) return;
    await BaseAPI.createWordFromArray(newWordArr, collectionContent.id);
    setWords(await BaseAPI.getWordsByCollectionAll(collectionContent.id));
  };
  const wordDelete = async (word) => {
    if (!window.confirm("Delete the word?")) return;
    await BaseAPI.deleteWord(word.id);
    let arr = words.filter((elem) => elem.id != word.id);
    setWords(arr);
  };
  const deleteAllWords = async () => {
    if (!window.confirm("Delete all words?")) return;
    await BaseAPI.deleteWordOfCollection(collectionContent.id);
    setWords([]);
  };
  const Rename = async (newName) => {
    await BaseAPI.renameCollection(newName.trim(), collectionContent.id);
    setVDataModal(false);
    route(`/collections/${collectionContent.id}/${newName.trim()}`);
  };

  const editWord = async (word, newWord, newSentence) => {
    if (!word) return;
    await BaseAPI.editWord(word.id, newWord, newSentence);
    setVDataModal(false);
    route(`/collections/${collectionContent.id}/${collectionContent.name}`);
  };

  return (
    <div className="mt-5">
      {dataModal ? dataModal : <></>}

      <TabPills tabsArr={["Collection menu ", "Add one word", "Add from File"]}>
        <CollectionMenu
          collectionContent={collectionContent}
          deleteAllWords={deleteAllWords}
          rename={modalRenameCollection}
        />
        <NewWordOne addWord={addWord} />
        <NewWordFile addWords={addWordsFromFile} />
      </TabPills>

      {!isLoading ? (
        <MyTable
          dataArray={words}
          namesArray={["word", "sentence", "stage"]}
          onRowClick={modalWordInfo}
          btnsArray={[
            { name: "Edit", callback: modalWordEdit },
            { name: "Delete", callback: wordDelete },
          ]}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default CollectionEdit;
