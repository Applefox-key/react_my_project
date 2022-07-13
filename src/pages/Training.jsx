import React, { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";
import UserAvatar from "../components/users/UserAvatar";
import WordList from "../components/words/WordsList";
import MySelect from "../components/UI/MySelect";
import { useQuery } from "../hooks/useQuery";
import MySpinner from "../components/UI/MySpinner";

const Training = () => {
  const [collectionid, setCollectionid] = useState(-1);
  const [list, setList] = useState();
  const [collectionsList, setCollectionsList] = useState();
  //other hooks
  const [getList, isLoadingWords, errorWords] = useQuery(async () => {
    console.log("effect DB UnreadWords");
    const data = await BaseAPI.getUnreadWordsByCollection(collectionid);
    setList(data);
  });
  const [getCollections, isLoadingCollect, errorCollect] = useQuery(
    async () => {
      console.log("effect DB UnreadWords");
      const data = await BaseAPI.getCollections();
      setCollectionsList(data);
    }
  );

  useEffect(() => {
    getList();
  }, [collectionid]);

  useEffect(() => {
    getCollections();
  }, []);
  //actions
  const wordUpdate = async (word) => {
    await BaseAPI.updateWord(word.id);
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
      {isLoadingWords ? (
        <MySpinner />
      ) : (
        <WordList list={list} wordUpdate={wordUpdate} />
      )}
    </div>
  );
};

export default Training;
