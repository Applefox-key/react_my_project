import React, { useState, useEffect } from "react";
import BaseAPI from "../API/BaseAPI";
import CollectionList from "../components/collections/CollectionList";
import MySpinner from "../components/UI/MySpinner";
import UserAvatar from "../components/users/UserAvatar";
import { useQuery } from "../hooks/useQuery";

const UserCollections = () => {
  const [collectionList, setCollectionList] = useState([]);

  const [getCollectionList, isLoading, error] = useQuery(async () => {
    const col = await BaseAPI.getCollectionsAll();
    setCollectionList(col);
  });

  const addNewCollection = async (name) => {
    if (!name) return;
    await BaseAPI.createCollection(name);
    const col = await BaseAPI.getCollectionsAll();
    setCollectionList(col);
  };

  useEffect(() => {
    getCollectionList();
  }, []);

  return (
    <div>
      <div className="d-flex p-2 justify-content-center">
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
    </div>
  );
};

export default UserCollections;
