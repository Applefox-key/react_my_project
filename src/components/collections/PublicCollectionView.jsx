import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import MyTable from "../UI/table/MyTable";
import MySpinner from "../UI/MySpinner";
import BaseAPI from "../../API/BaseAPI";
import { PopupContext } from "../../context";
import PublicCollectionMenu from "./PublicCollectionMenu";

const PublicCollectionsView = () => {
  const [words, setWords] = useState();
  const collectionContent = useParams();
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  const [getWord, isLoading, error] = useQuery(async () => {
    const words = await BaseAPI.getPublicWordsByCollection(
      collectionContent.id
    );
    setWords(words);
  });

  useEffect(() => {
    getWord();
  }, [collectionContent]);

  const addToMyCollection = async () => {
    if (!words) return;
    if (!collectionContent) return;
    const colID = await BaseAPI.createCollection(collectionContent.name);
    await BaseAPI.createWordFromArray(words, colID);
    setPopupSettings([
      true,
      "the collection has been added to your list",
      "success",
    ]);
  };

  return (
    <div>
      <PublicCollectionMenu
        collectionContent={collectionContent}
        addToMyCollection={addToMyCollection}
      />

      {!isLoading ? (
        <MyTable dataArray={words} namesArray={["word", "sentence"]} />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default PublicCollectionsView;
