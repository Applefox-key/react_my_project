import React, { useState, useEffect } from "react";
import { useContext } from "react";
import BaseAPI from "../API/BaseAPI";
import CollectionList from "../components/collections/CollectionList";
import MySpinner from "../components/UI/MySpinner";
import UserAvatar from "../components/users/UserAvatar";
import { PopupContext } from "../context";
import { useQuery } from "../hooks/useQuery";

const UserCollections = () => {
  const [collectionList, setCollectionList] = useState([]);
  const { popupSetting, setPopupSettings } = useContext(PopupContext);
  const [getCollectionList, isLoading, error] = useQuery(async () => {
    const col = await BaseAPI.getCollectionAndWords();
    setCollectionList(col);
  });

  const addNewCollection = async (name) => {
    if (!name) {
      setPopupSettings([
        true,
        "please specify the name of the collection",
        "error",
      ]);
      return;
    }
    await BaseAPI.createCollection(name);
    const col = await BaseAPI.getCollectionAndWords();

    setCollectionList(col);
  };

  useEffect(() => {
    getCollectionList();
  }, []);

  return (
    <>
      <div className="d-flex pb-2 justify-content-center">
        <UserAvatar />
        <h1 className="display-1">Collections</h1>
      </div>

      {isLoading ? (
        <MySpinner />
      ) : (
        <CollectionList
          collectionList={collectionList}
          addNewCollection={addNewCollection}
        />
      )}
    </>
  );
};

export default UserCollections;
