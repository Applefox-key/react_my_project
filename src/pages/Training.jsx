import React, { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";
import UserAvatar from "../components/UserAvatar";
import WordList from "../components/words/WordsList";

const Training = () => {
  const [collectionid, setCollectionid] = useState(-1);
  const [list, setList] = useState(
    BaseAPI.getUnreadWordsByCollection(collectionid)
  );

  const wordUpdate = (word) => {
    BaseAPI.updateWord(word.id);
    setList(list.filter((item) => word.id !== item.id));
  };

  useEffect(() => {
    console.log("effect DB UnreadWords");
    setList(BaseAPI.getUnreadWordsByCollection(collectionid));
  }, [collectionid]);

  return (
    <div style={{ marginTop: "5rem" }}>
      <UserAvatar />
      <h1 className="display-1 mb-5">Training</h1>
      {!list ? (
        <h2>No words to read</h2>
      ) : (
        <WordList list={list} wordUpdate={wordUpdate} />
      )}
    </div>
  );
};

export default Training;
