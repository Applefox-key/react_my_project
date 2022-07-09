import React, { useState, useEffect } from "react";

import BaseAPI from "../API/BaseAPI";
import CollectionList from "../components/collections/CollectionList";
import UserAvatar from "../components/UI/UserAvatar";

const UserCollections = () => {
  const [collectionList, setCollectionList] = useState([]);

  const addNewCollection = (name) => {
    if (!name) return;
    BaseAPI.createCollection(name);
    setCollectionList(BaseAPI.getCollectionsAll());
  };
  useEffect(() => {
    setCollectionList(BaseAPI.getCollectionsAll());
  }, []);

  return (
    <div>
      <UserAvatar />
      <h1 className="display-1">Collections</h1>

      {!collectionList ? (
        <h2>No collections</h2>
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
