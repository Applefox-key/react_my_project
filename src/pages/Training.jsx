import React, { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";
import UserAvatar from "../components/users/UserAvatar";
import WordList from "../components/words/WordsList";
import MySelect from "../components/UI/MySelect";

const Training = () => {
  const [collectionid, setCollectionid] = useState(-1);
  const [list, setList] = useState();
  const [collectionsList, setCollectionsList] = useState();
  //hooks
  useEffect(() => {
    console.log("effect DB UnreadWords");
    setList(BaseAPI.getUnreadWordsByCollection(collectionid));
  }, [collectionid]);

  useEffect(() => {
    setCollectionsList(BaseAPI.getCollections());
  }, []);
  //actions
  const wordUpdate = (word) => {
    BaseAPI.updateWord(word.id);
    setList(list.filter((item) => word.id !== item.id));
  };
  const filterWordsList = (e) => {
    setCollectionid(e.target.value);
  };

  return (
    <div>
      <div className="d-flex p-2 justify-content-center ">
        <UserAvatar />
        <h1 className="display-1 mb-2">Training</h1>
      </div>
      {collectionsList && (
        <MySelect
          defaultOption={{ id: -1, name: "...all collections" }}
          onChange={filterWordsList}
          optionslist={collectionsList}
        />
      )}
      {!list ? (
        <h2>No words to read</h2>
      ) : (
        <WordList list={list} wordUpdate={wordUpdate} />
      )}
    </div>
  );
};

export default Training;
